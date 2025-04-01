import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CreditCard, LogOut, ClipboardCheck, Users, Calendar } from 'lucide-react';

// Import components
import Sidebar from './Sidebar';
import PendingVerification from './PendingVerification';
import ApprovedPensioners from './ApprovedPensioners';
import SchedulePayout from './SchedulePayout';
import VerificationModal from './VerificationModal';
import EditModal from './EditModal';
import ScheduleModal from './ScheduleModal';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedPensioner, setSelectedPensioner] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext)
  
  const handleLogout = () => {
    logout()
    navigate('/admin-login')
  }
  
  // Mock data for pending verifications
  const [pendingVerifications, setPendingVerifications] = useState([]);
  
  const handleOpenVerification = (pensioner) => {
    setSelectedPensioner(pensioner);
    setShowVerificationModal(true);
  };
  
  // Handler to open edit modal for approved pensioner
  const handleOpenEdit = (pensioner) => {
    setSelectedPensioner(pensioner);
    setShowEditModal(true);
  };
  
  // Handler to open schedule modal
  const handleOpenSchedule = () => {
    setShowScheduleModal(true);
  };
  
  
  // Render the active tab content
  const renderContent = () => {
    switch(activeTab) {
      case 'pending':
        return (
          <PendingVerification  
          />
        );
      case 'approved':
        return (
          <ApprovedPensioners 
            handleOpenEdit={handleOpenEdit}
          />
        );
      case 'schedule':
        return (
          <SchedulePayout 
            handleOpenSchedule={handleOpenSchedule} 
          />
        );
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
            Senior Citizens Pension System - Admin
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center mr-2">
                <span className="font-bold">A</span>
              </div>
              <span className="hidden md:inline">Admin User</span>
            </div>
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
              className={`flex-shrink-0 px-4 py-2 rounded-md flex items-center ${activeTab === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('pending')}
            >
              <ClipboardCheck size={16} className="mr-1" />
              Pending
              {pendingVerifications.length > 0 && (
                <span className={`ml-1 ${activeTab === 'pending' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'} text-xs rounded-full w-4 h-4 flex items-center justify-center`}>
                  {pendingVerifications.length}
                </span>
              )}
            </button>
            <button 
              className={`flex-shrink-0 px-4 py-2 rounded-md flex items-center ${activeTab === 'approved' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('approved')}
            >
              <Users size={16} className="mr-1" />
              Approved
            </button>
            <button 
              className={`flex-shrink-0 px-4 py-2 rounded-md flex items-center ${activeTab === 'schedule' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('schedule')}
            >
              <Calendar size={16} className="mr-1" />
              Schedule
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
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Administrator Portal v1.0</span>
            </div>
          </div>
        </div>
      </footer>
      
      {showEditModal && (
        <EditModal 
          selectedPensioner={selectedPensioner}
          onClose={() => setShowEditModal(false)}
        />
      )}
      
      {showScheduleModal && (
        <ScheduleModal 
          onClose={() => setShowScheduleModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;