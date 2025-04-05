import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/Index.jsx';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} index={true} element={<IndexPage />} />
        <Route path={'*'} element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
