// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/auth/AdminLogin';
import PensionerLogin from './pages/auth/PensionerLogin';
import PensionTrackingCoverPage from './pages/auth/PensionerCover';
import Register from './pages/auth/Register';
import PensionerDashboard from './pages/pensioner/PensionerDashboard';
import PrivateRoute from './components/PrivateRoute'; // Create this component later
import { AuthProvider } from './context/AuthContext'; // Create this context later

function App() {
  return (
    <AuthProvider>
      <Router basename="/">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PensionTrackingCoverPage />} />
          <Route path="/pensioner-login" element={<PensionerLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/pensioner-dashboard"
            element={
              <PrivateRoute>
                <PensionerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;