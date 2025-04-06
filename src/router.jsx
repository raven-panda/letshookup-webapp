import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import IndexPage from './pages/Index.jsx';
import { useAuthentication } from './components/hook/AuthHook.jsx';
import { useEffect } from 'react';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <AuthenticationManager needAuth={false} returnUri={'/dashboard'}>
              <IndexPage />
            </AuthenticationManager>
          }
        />
        <Route
          path={'/dashboard'}
          element={<AuthenticationManager needAuth={true} returnUri={'/'} />}
        >
          <Route path={''} element={<>ça devrais pas marcher là</>} />
        </Route>
        <Route path={'*'} element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

const AuthenticationManager = ({ needAuth, returnUri, children }) => {
  const { isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof isAuthenticated === 'boolean' && isAuthenticated !== needAuth)
      navigate(returnUri);
  }, [needAuth, navigate, isAuthenticated, returnUri]);

  return children;
};
