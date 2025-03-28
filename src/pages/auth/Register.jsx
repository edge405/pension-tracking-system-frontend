import React, { useState } from 'react';
import { UserPlus, User, Lock, MapPin, Phone, Camera, FilePlus } from 'lucide-react';

const Register = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idFile, setIdFile] = useState(null);

  const handleIdFileChange = (e) => {
    const file = e.target.files[0];
    setIdFile(file);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <UserPlus className="mr-2" />
            Senior Citizens Pension System
          </h1>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex flex-1 container mx-auto mt-6 px-4 mb-6 justify-center items-center">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register Account</h2>
          <form>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="id" className="block text-sm font-medium text-gray-600 mb-1">
                Senior Citizen ID
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="id"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your Senior Citizen ID"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-600 mb-1">
                Birthdate
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="birthdate"
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-600 mb-1">
                Contact Number
              </label>
              <div className="relative">
                <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="contact"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your contact number"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <div className="relative">
                <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your address"
                  required
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Re-enter your password"
                  required
                />
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="idFile" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Valid ID with Selfie
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
                  idFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <Camera size={40} className="text-gray-500" />
                  <p className="text-sm text-gray-600">
                    Drag and drop your file here or{' '}
                    <span className="text-blue-600 font-medium cursor-pointer">browse</span>
                  </p>
                  <input
                    type="file"
                    id="idFile"
                    accept="image/*"
                    onChange={handleIdFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              {idFile && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-full max-w-xs">
                      <img
                        src={URL.createObjectURL(idFile)}
                        alt="Uploaded ID Preview"
                        className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                      />
                    </div>
                    <div className="text-center">
                      <p
                        className="text-sm font-medium text-gray-800 break-all"
                        title={idFile.name}
                      >
                        {idFile.name.length > 30 ? `${idFile.name.substring(0, 30)}...` : idFile.name}
                      </p>
                      <p className="text-xs text-gray-500">{Math.round(idFile.size / 1024)} KB</p>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium"
                      onClick={() => setIdFile(null)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition-colors duration-200 cursor-pointer"
              disabled={password !== confirmPassword || !idFile}
            >
              Register
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Login here
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

export default Register;