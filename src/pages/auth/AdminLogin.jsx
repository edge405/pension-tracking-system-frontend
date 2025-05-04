import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LogIn, User, Lock, Shield, Loader, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';


const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear any previous errors
    
    try {
      const response = await axios.get('/api/admin/login', {
        auth: {
          username: username,
          password: password
        }
      });
      
      const { access_token, user_type } = response.data;
      login(access_token, user_type);
      navigate('/admin-dashboard');
    } catch (error) {
      // Handle specific error cases
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid username or password. Please try again.');
        } else if (error.response.status === 403) {
          setError('You do not have permission to access the admin portal.');
        } else {
          setError(error.response.data?.error || 'Login failed. Please try again later.');
        }
      } else if (error.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      
      console.error('Admin login failed:', error.response?.data?.error || 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000); // Hide after seconds
  
      return () => clearTimeout(timer); // Cleanup on unmount or error change
    }
  }, [error]);
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-800 to-indigo-700 text-white p-4 shadow-lg">
       <Link to="/">
        <div className="container mx-auto flex justify-between items-center cursor-pointer">
          <h1 className="text-2xl font-bold flex items-center">
            <Shield className="mr-2" />
            Admin Portal | Senior Citizens Pension System
          </h1>
        </div>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 container mx-auto mt-6 px-4 mb-6 justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border-t-4 border-indigo-600">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-indigo-100">
              <Shield size={40} className="text-indigo-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Admin Login</h2>
          <p className="text-center text-gray-600 mb-6">Secure access for administrators only</p>
          
          {/* Error Message Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md flex items-start">
              <AlertTriangle size={20} className="text-red-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="admin-username" className="block text-sm font-medium text-gray-600 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="admin-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter admin username"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 cursor-pointer flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={20} className="mr-2" />
                  Sign in to Admin Portal
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 text-center">
                This portal is restricted to authorized personnel only. Unauthorized access attempts will be logged.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 Alimodian Senior Citizens Pension System | Admin Portal</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;