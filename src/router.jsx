import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import IndexPage from './pages/Index.jsx';
import { useAuthentication } from './components/hook/AuthHook.jsx';
import { useEffect } from 'react';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticationManager needAuth={false} returnUri={'/dashboard'} />
          }
        >
          <Route index element={<IndexPage />} />
        </Route>
        <Route
          path={'/dashboard'}
          element={<AuthenticationManager needAuth={true} returnUri={'/'} />}
        >
          <Route index element={<>Hello user !</>} />
        </Route>
        <Route path={'*'} element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

const AuthenticationManager = ({ needAuth, returnUri }) => {
  const { isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof isAuthenticated === 'boolean' && isAuthenticated !== needAuth)
      navigate(returnUri);
  }, [needAuth, navigate, isAuthenticated, returnUri]);

  return <Outlet />;
};
