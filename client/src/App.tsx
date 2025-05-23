import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
// import PrivateRoute from "./components/Common/PrivateRoute";
import Dashboard from "./pages/dashboard";
import Diary from "./pages/diary";
import DiaryDetail from "./pages/diary_detail";
import DiaryWrite from "./pages/diary_write";
import History from "./pages/income_outgo";
import Login from "./pages/login";
import SignUp from "./pages/sign_up";
import PublicRoute from "./components/Common/PublicRoute";
import DiaryUpdate from "./pages/diary_update";
import ScrollToTop from "./utils/scrollToTop";
import Fixed from "./pages/fixed_account";
import Budget from "./pages/budget";
import MonthRadio from "./pages/monthChart";
import PasswordFind from "./pages/password";
import Landing from "./pages/landing";
import GoogleOAuth2RedirectPage from "./pages/login/Google";
import Inquiry from "./pages/inquiry";
import Setting from "./pages/account_setting";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 로그인 한 유저만 접근 가능 */}
        <Route element={<MainLayout />}>
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/history"} element={<History />} />
          <Route path={"/income"} element={<History />} />
          <Route path={"/outgo"} element={<History />} />
          <Route path={"/waste"} element={<History />} />
          <Route path={"/diary"} element={<Diary />} />
          <Route path={"/diary/:id"} element={<DiaryDetail />} />
          <Route path={"/diary/:id/update"} element={<DiaryUpdate />} />
          <Route path={"/diary/post"} element={<DiaryWrite />} />
          <Route path={"/fixed__account"} element={<Fixed />} />
          <Route path={"/fixed__account/update"} element={<Fixed />} />
          <Route path={"/budget"} element={<Budget />} />
          <Route path={"/monthRadio"} element={<MonthRadio />} />
          <Route path={"/inquiry"} element={<Inquiry />} />
          <Route path={"/setting"} element={<Setting />} />
        </Route>
        {/* 로그인 하지 않은 유저만 접근 가능 */}
        <Route element={<PublicRoute />}>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/oauthGoogle"} element={<GoogleOAuth2RedirectPage />} />
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/findPassword"} element={<PasswordFind />} />
        </Route>
      </Routes>
      <ToastContainer style={{ fontSize: "1.4rem" }} />
    </>
  );
}

export default App;
