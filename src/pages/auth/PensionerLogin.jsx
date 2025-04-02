import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LogIn, User, Lock, Loader } from 'lucide-react';
import axios from '../../axios';

const PensionerLogin = () => {
  // State to store the username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      console.log(response.data);

      const { token, user_type, pensioner } = response.data;
      if (pensioner?.status !== 'approved') {
        setError('Your account is still under verification. Please wait for approval.');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }
  
      login(token, user_type, pensioner);
      navigate('/pensioner-dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Invalid Credentials. Please try again');

      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setIsLoading(false); // Set loading back to false regardless of success or failure
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <LogIn className="mr-2" />
            Senior Citizens Pension System
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 container mx-auto mt-6 px-4 mb-6 justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

          {/* Error Message Section */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
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
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state on change
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
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
                'Login'
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