import { Navigate, Outlet } from 'react-router-dom';

// 유저인증 됬으면 요청한 자식 컴포넌트로 없으면 로그인 페이지로
const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
