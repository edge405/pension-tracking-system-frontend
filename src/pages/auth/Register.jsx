import React, { useState } from 'react';
import { UserPlus, User, Lock, MapPin, Phone, Camera, Loader } from 'lucide-react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idFile, setIdFile] = useState(null);
  const [sex, setSex] = useState(''); // State for sex
  const [civilStatus, setCivilStatus] = useState(''); // Add state for civil status
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleIdFileChange = (e) => {
    const file = e.target.files[0];
    setIdFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form fields
    if (!password || !confirmPassword || password !== confirmPassword) {
      alert('Passwords do not match or are missing.');
      return;
    }
    if (!idFile) {
      alert('Please upload a valid ID with a selfie.');
      return;
    }
    if (!sex) {
      alert('Please select your gender.');
      return;
    }
    if (!civilStatus) {
      alert('Please select your civil status.');
      return;
    }

    // Set loading state to true
    setIsLoading(true);

    // Create FormData object
    const formData = new FormData();
    formData.append('fullname', e.target.name.value);
    formData.append('senior_citizen_id', e.target.id.value);
    formData.append('birthdate', e.target.birthdate.value);
    formData.append('contact_number', e.target.contact.value);
    formData.append('address', e.target.address.value);
    formData.append('password', password);
    formData.append('valid_id', idFile); // Append the file
    formData.append('sex', sex);
    formData.append('civil_status', civilStatus); // Append civil status

    try {
      // Send POST request to the backend
      const response = await axios.post(
        '/api/pensioner/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct content type
          },
        }
      );

      alert(response.data.message || 'Registration successful!');
      // Reset form fields after submission
      setPassword('');
      setConfirmPassword('');
      setIdFile(null);
      setSex('');
      setCivilStatus(''); // Reset civil status
      e.target.reset();
    } catch (error) {
      // Handle error response
      console.error('Error during registration:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'An error occurred during registration.');
    } finally {
      // Set loading state back to false
      setIsLoading(false);
    }
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
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            {/* Sex Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-1">Sex</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={sex === 'male'}
                    onChange={(e) => setSex(e.target.value)}
                    className="form-radio text-blue-500"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={sex === 'female'}
                    onChange={(e) => setSex(e.target.value)}
                    className="form-radio text-blue-500"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-gray-700">Female</span>
                </label>
              </div>
            </div>
            {/* Civil Status Field */}
            <div className="mb-6">
              <label htmlFor="civilStatus" className="block text-sm font-medium text-gray-600 mb-1">
                Civil Status
              </label>
              <div className="relative">
                <select
                  id="civilStatus"
                  name="civilStatus"
                  value={civilStatus}
                  onChange={(e) => setCivilStatus(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                >
                  <option value="" disabled>Select your civil status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Separated">Separated</option>
                </select>
              </div>
            </div>
            {/* Senior Citizen ID */}
            <div className="mb-6">
              <label htmlFor="id" className="block text-sm font-medium text-gray-600 mb-1">
                Senior Citizen ID
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="id"
                  name="id"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your Senior Citizen ID"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            {/* Birthdate */}
            <div className="mb-6">
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-600 mb-1">
                Birthdate
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            {/* Contact Number */}
            <div className="mb-6">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-600 mb-1">
                Contact Number
              </label>
              <div className="relative">
                <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your contact number"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            {/* Address */}
            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <div className="relative">
                <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your address"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            {/* Confirm Password */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Re-enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            {/* Upload Valid ID with Selfie */}
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
                    disabled={isLoading}
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
                      disabled={isLoading}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition-colors duration-200 cursor-pointer flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </button>
            {/* Login Link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/" className="text-blue-600 hover:underline font-medium">
                Login here
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

export default Register;