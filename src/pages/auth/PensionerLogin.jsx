import React from 'react';
import { LogIn, User, Lock } from 'lucide-react';

const PensionerLogin = () => {
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
          <form>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                Senior Citizen ID
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your Senior Citizen"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Register here
              </a>
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