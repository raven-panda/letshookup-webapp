import { ToastContainer } from 'react-toastify';
import AppRouter from './router.jsx';
import { AuthenticationProvider } from './components/hook/AuthHook.jsx';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    return () => document.body.classList.remove('disabled-transition');
  }, []);

  return (
    <AuthenticationProvider>
      <ToastContainer />
      <AppRouter />
    </AuthenticationProvider>
  );
}

export default App;
