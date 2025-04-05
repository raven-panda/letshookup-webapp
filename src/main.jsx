import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const isStrictModeEnabled = import.meta.env.VITE_ENABLE_STRICTMODE === 'true';

createRoot(document.getElementById('root')).render(
  isStrictModeEnabled ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  ),
);
