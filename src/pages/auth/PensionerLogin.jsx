import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LogIn, User, Lock, Loader, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import axios from '../../axios';

const PensionerLogin = () => {
  // State to store the username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // State to handle error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setIsLoading(true); // Set loading to true when form is submitted

    try {
      const response = await axios.get('/api/pensioner/login', {
        auth: {
          username: username,
          password: password,
        },
      });

      const { token, user_type, pensioner } = response.data;

      // Check pensioner status
      if (pensioner?.status !== 'approved') {
        setError('Your account is still under verification. Please wait for approval.');
        return;
      }

      login(token, user_type, pensioner);
      navigate('/pensioner-dashboard');
    } catch (error) {
      // Handle specific error cases
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid Senior Citizen ID or password. Please try again.');
        } else if (error.response.status === 403) {
          setError('Your account has been suspended. Please contact the administrator.');
        } else if (error.response.data?.error) {
          setError(error.response.data.error);
        } else {
          setError('Login failed. Please try again later.');
        }
      } else if (error.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false); // Set loading back to false regardless of success or failure
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer); // Cleanup on unmount or error change
    }
  }, [error]);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 shadow-lg">
        <Link to="/">
          <div className="container mx-auto flex justify-between items-center cursor-pointer">
            <h1 className="text-2xl font-bold flex items-center">
              <LogIn className="mr-2" />
              Senior Citizens Pension System
            </h1>
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 container mx-auto mt-6 px-4 mb-6 justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

          {/* Error Message Section - Using improved styling */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md flex items-start" role="alert">
              <AlertTriangle size={20} className="text-red-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                Senior Citizen ID
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update state on change
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your Senior Citizen ID"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={20} className="mr-2" />
                  Login
                </>
              )}
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 Alimodian Senior Citizens Pension System</p>
        </div>
      </footer>
    </div>
  );
};

export default PensionerLogin;