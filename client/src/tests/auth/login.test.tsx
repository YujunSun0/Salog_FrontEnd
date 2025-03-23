import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/login/index';
import axios from 'axios';
import { api } from 'src/utils/refreshToken';
import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from 'src/store';

// axios와 api 모킹
jest.mock('axios');
jest.mock('src/utils/refreshToken');

describe('Login 컴포넌트', () => {
  let store;

  // 각 테스트 전에 실행될 설정
  beforeEach(() => {
    store = configureStore({
      reducer: {
        persistedReducer,
      },
    });

    jest.clearAllMocks();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });

  // 1. 입력값 처리 테스트
  test('이메일과 비밀번호 입력이 정상적으로 동작한다', async () => {
    const emailInput = screen.getByRole('textbox', { name: /이메일/i });
    const passwordInput = screen.getByLabelText(/비밀번호/i);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  // 2. 비밀번호 표시/숨김 기능 테스트
  test('비밀번호 표시/숨김 토글이 정상적으로 동작한다', () => {
    const passwordInput = screen.getByLabelText(/비밀번호/i);
    const visibilityToggle = screen.getByRole('button');

    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(visibilityToggle);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(visibilityToggle);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  // 3. 로그인 API 호출 테스트
  test('로그인 성공 시 대시보드로 이동한다', async () => {
    const mockNavigate = jest.fn();
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { 
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token'
      }
    });
    
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { data: { /* mock user data */ } }
    });

    await userEvent.type(screen.getByRole('textbox', { name: /이메일/i }), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/비밀번호/i), 'password123');
    
    const loginButton = screen.getByText('로그인');
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  // 4. 로그인 에러 처리 테스트
  test('존재하지 않는 계정으로 로그인 시도시 에러 메시지를 표시한다', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { status: 404 } }
    });

    await userEvent.type(screen.getByRole('textbox', { name: /이메일/i }), 'wrong@example.com');
    await userEvent.type(screen.getByLabelText(/비밀번호/i), 'wrongpass');
    
    const loginButton = screen.getByText('로그인');
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('존재하지 않는 계정입니다.')).toBeInTheDocument();
    });
  });

  // 5. 네비게이션 테스트
  test('회원가입 링크 클릭 시 회원가입 페이지로 이동한다', () => {
    const signupLink = screen.getByText('회원가입');
    fireEvent.click(signupLink);
    expect(window.location.pathname).toBe('/signup');
  });

  // 6. 소셜 로그인 테스트
  test('구글 로그인 버튼 클릭 시 구글 OAuth URL로 이동한다', () => {
    const googleButton = screen.getByRole('button', { name: /google/i });
    fireEvent.click(googleButton);
    
    expect(window.location.href).toBe('https://server.salog.kro.kr/oauth2/authorization/google');
  });
});