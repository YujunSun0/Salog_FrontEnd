import axios from 'axios';
import { getCookie, setCookie, removeCookie } from './cookie';

export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { "Content-Type": "application/json" },
});

let subscribers: any[] = [];
let isAlreadyFetchingAccessToken = false;

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken'); 
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response: errorResponse } = error;
    
    // 인증 에러 발생시
    if (errorResponse && errorResponse.status === 401) {
      return await resetTokenAndReattemptRequest(error);
    }
    return Promise.reject(error);
  }
);

// 구독자 추가 함수
const addSubscriber = (callback: (accessToken: string | null) => void) => {
  subscribers.push(callback);
};

// 액세스 토큰 획득 후 처리 함수
const onAccessTokenFetched = (accessToken: string) => {
  subscribers.forEach((callback) => callback(accessToken));
  subscribers = [];
};

// 로그아웃 처리 함수
const signOut = () => {
  removeCookie('accessToken');
  localStorage.removeItem("accessToken");
  removeCookie('refreshToken');
  window.location.href = "/login";
};

// 토큰 재발급 함수
const RefreshToken = async (): Promise<string> => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = getCookie("refreshToken");
      
  const { data } = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/refresh`,
    {
      accessToken,
      refreshToken,
    }
  );

  const current = new Date();
  
  // accessToken 설정
  current.setMinutes(current.getMinutes() + 30);
  setCookie('accessToken', data.accessToken, {
    path: "/",
    expires: current,
  });
  localStorage.setItem("accessToken", data.accessToken);

  // refreshToken 설정
  current.setMinutes(current.getMinutes() + 1440);
  setCookie('refreshToken', data.refreshToken, {
    path: "/",
    expires: current,
  });

  // 대기 중인 모든 요청에 새 토큰 전달
  onAccessTokenFetched(data.accessToken);

  return data.accessToken;
};

// 토큰 재발급 및 원본 요청 재시도 함수
const resetTokenAndReattemptRequest = async (error: any) => {
  try {
    const { response: errorResponse } = error;
    
    // 새로운 토큰을 기다리는 Promise 생성
    const retryOriginalRequest = new Promise((resolve, reject) => {
      addSubscriber(async (accessToken: string | null) => {
        if (!accessToken) {
          reject(new Error('Token refresh failed'));
          return;
        }
        
        try {
          errorResponse.config.headers.Authorization = `${accessToken}`;
          resolve(api.request(errorResponse.config));
        } catch (err) {
          reject(err);
        }
      });
    });

    // 이미 토큰 갱신 중이 아니라면
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;

      try {
        // 토큰 재발급 시도
        await RefreshToken();
      } catch (refreshError) {
        // 토큰 재발급 실패 시
        console.error('Token refresh failed:', refreshError);
        subscribers.forEach(callback => callback(null)); // 모든 구독자에게 null 전달
        subscribers = []; // 구독자 초기화
        signOut(); // 로그아웃 처리
        return Promise.reject(refreshError); 
      } finally {
        isAlreadyFetchingAccessToken = false;
      }
    }

    return await retryOriginalRequest;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default api;