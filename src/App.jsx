import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AddClientPage from './pages/AddClientPage';
import ClientPage from './pages/ClientPage';
import UploadDocumentPage from './pages/UploadDocumentPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/addclient" element={<AddClientPage />} />
      <Route path="/client/:id" element={<ClientPage />} />
      <Route path="/upload/:id" element={<UploadDocumentPage />} />
    </Routes>
  )
}
export default App