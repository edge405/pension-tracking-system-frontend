import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CreditCard, LogOut, Bell, User, History, Phone } from 'lucide-react';

// Import components
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Profile from './Profile';
import PaymentHistory from './PaymentHistory';
import Notifications from './Notifications';
// import axios from "../../axios"
import { useNavigate } from 'react-router-dom';

const PensionerDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate();


  const handleLogout = () => {
    logout()

    navigate('/')
  }

  
  
  // Render the active tab content
  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <Dashboard 
            setActiveTab={setActiveTab} 
          />
        );
      
      case 'profile':
        return <Profile/>;
      
      case 'history':
        return <PaymentHistory />;
      
      case 'notifications':
        return <Notifications/>;
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <CreditCard className="mr-2" />
            Senior Citizens Pension System
          </h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 container mx-auto mt-6 px-4 mb-6">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />
        
        {/* Mobile Navigation */}
        <div className="md:hidden w-full mb-4">
          <div className="flex overflow-x-auto pb-2 space-x-2">
            <button 
              className={`flex-shrink-0 px-4 py-2 rounded-md flex items-center ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('home')}
            >
              <CreditCard size={16} className="mr-1" />
              Dashboard
            </button>
            <button 
              className={`flex-shrink-0 px-4 py-2 rounded-md flex items-center ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={16} className="mr-1" />
              Profile
            </button>
            <button 
              className={`flex-shrink-0 px-4 py-2 rounded-md flex items-center ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('history')}
            >
              <History size={16} className="mr-1" />
              History
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold flex items-center">
                <CreditCard className="mr-2" />
                Senior Citizens Pension System
              </h3>
              <p className="text-gray-400 mt-2">&copy; 2025 Alimodian Senior Citizens Pension System</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-center mb-2">
                <Phone size={18} className="text-blue-400 mr-2" />
                <span>Hotline: (02) 8-XXX-XXXX</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PensionerDashboard;