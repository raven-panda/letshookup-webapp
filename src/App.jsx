import { ToastContainer } from 'react-toastify';
import AppRouter from './router.jsx';
import { AuthenticationProvider } from './components/hook/AuthHook.jsx';

function App() {
  return (
    <AuthenticationProvider>
      <ToastContainer />
      <AppRouter />
    </AuthenticationProvider>
  );
}

export default App;
