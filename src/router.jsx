import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/Index.jsx';
import { useAuthentication } from './components/hook/AuthHook.jsx';
import NotificationsMainPage from './pages/dashboard/NotificationsMain.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import AuthenticatePage from './pages/auth/Authenticate.jsx';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <IndexPage />
            </PublicRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <PublicRoute publicOnly>
              <AuthenticatePage />
            </PublicRoute>
          }
        />
        <Route
          path={'/dashboard'}
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<NotificationsMainPage />} />
          <Route path="notifications" element={<NotificationsMainPage />} />
        </Route>
        <Route path={'*'} element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthentication();

  if (isAuthenticated === false) {
    return <Navigate to="/" replace />;
  }

  if (typeof isAuthenticated !== 'boolean') {
    return null;
  }

  return children;
};

const PublicRoute = ({ publicOnly = false, children }) => {
  const { isAuthenticated } = useAuthentication();

  if (publicOnly && isAuthenticated === true) {
    return <Navigate to="/dashboard" replace />;
  }

  if (publicOnly && typeof isAuthenticated !== 'boolean') {
    return null;
  }

  return children;
};
