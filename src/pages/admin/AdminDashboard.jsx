import React, { useState } from 'react';
import { CreditCard, LogOut, ClipboardCheck, Users, Calendar } from 'lucide-react';

// Import components
import Sidebar from './Sidebar';
import PendingVerification from './PendingVerification';
import ApprovedPensioners from './ApprovedPensioners';
import SchedulePayout from './SchedulePayout';
import VerificationModal from './VerificationModal';
import EditModal from './EditModal';
import ScheduleModal from './ScheduleModal';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedPensioner, setSelectedPensioner] = useState(null);
  
  // Mock data for pending verifications
  const [pendingVerifications, setPendingVerifications] = useState([
    { 
      id: 'SC-78901', 
      firstName: 'Juan', 
      middleName: 'Dela', 
      lastName: 'Cruz', 
      sex: 'Male',
      age: 68,
      submissionDate: '2025-03-10',
      barangay: 'San Isidro',
      validID: 'senior_id_78901.jpg',
      status: 'pending'
    },
    { 
      id: 'SC-78902', 
      firstName: 'Maria', 
      middleName: 'Santos', 
      lastName: 'Reyes', 
      age: 72,
      submissionDate: '2025-03-12',
      barangay: 'San Jose',
      validID: 'senior_id_78902.jpg',
      status: 'pending'
    },
    { 
      id: 'SC-78903', 
      firstName: 'Pedro', 
      middleName: 'Gomez', 
      lastName: 'Lim', 
      age: 65,
      submissionDate: '2025-03-15',
      barangay: 'Poblacion',
      validID: 'senior_id_78903.jpg',
      status: 'pending'
    },
  ]);
  
  // Mock data for approved pensioners
  const [approvedPensioners, setApprovedPensioners] = useState([
    { 
      id: 'SC-123456', 
      name: 'Maria Christine Joy Susvilla', 
      age: 76,
      barangay: 'Poblacion',
      address: '123 Rizal Street, Poblacion, Alimodian, Iloilo',
      pensionAmount: 2000,
      lastPayoutDate: '2025-02-15',
      nextPayoutDate: '2025-04-15'
    },
    { 
      id: 'SC-123457', 
      name: 'Jose Rizal Dela Cruz', 
      age: 82,
      barangay: 'San Vicente',
      address: '45 Bonifacio St, San Vicente, Alimodian, Iloilo',
      pensionAmount: 2000,
      lastPayoutDate: '2025-02-15',
      nextPayoutDate: '2025-04-15'
    },
    { 
      id: 'SC-123458', 
      name: 'Andres Bonifacio Santos', 
      age: 70,
      barangay: 'San Jose',
      address: '78 Mabini Lane, San Jose, Alimodian, Iloilo',
      pensionAmount: 2000,
      lastPayoutDate: '2025-02-15',
      nextPayoutDate: '2025-04-15'
    },
    { 
      id: 'SC-123459', 
      name: 'Gabriela Silang Aguinaldo', 
      age: 68,
      barangay: 'San Isidro',
      address: '22 Luna Road, San Isidro, Alimodian, Iloilo',
      pensionAmount: 2000,
      lastPayoutDate: '2025-02-15',
      nextPayoutDate: '2025-04-15'
    },
  ]);
  
  // Mock data for scheduled payouts
  const [scheduledPayouts, setScheduledPayouts] = useState([
    {
      date: '2025-04-15',
      location: 'Barangay San Isidro Community Center',
      address: '123 San Isidro St., Alimodian, Iloilo',
      totalPensioners: 156,
      status: 'scheduled'
    },
    {
      date: '2025-03-15',
      location: 'Barangay San Jose Multi-purpose Hall',
      address: '45 San Jose Ave., Alimodian, Iloilo',
      totalPensioners: 148,
      status: 'released'
    },
    {
      date: '2025-02-15',
      location: 'Municipal Hall - Senior Citizens Affairs Office',
      address: '1 Municipal Plaza, Alimodian, Iloilo',
      totalPensioners: 152,
      status: 'released'
    }
  ]);

  // Handler to open verification modal
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
  
  // Handlers for verification actions
  const handleApproveVerification = () => {
    // In a real app, you would make an API call here
    // For now, we'll just update the local state
    
    // Create a new pensioner record
    const newPensioner = {
      id: selectedPensioner.id,
      name: `${selectedPensioner.firstName} ${selectedPensioner.middleName} ${selectedPensioner.lastName}`,
      age: selectedPensioner.age,
      barangay: selectedPensioner.barangay,
      address: `Sample Address, ${selectedPensioner.barangay}, Alimodian, Iloilo`,
      pensionAmount: 2000,
      lastPayoutDate: 'N/A',
      nextPayoutDate: scheduledPayouts.find(p => p.status === 'scheduled')?.date || 'TBD'
    };
    
    // Add to approved list
    setApprovedPensioners([...approvedPensioners, newPensioner]);
    
    // Remove from pending
    setPendingVerifications(pendingVerifications.filter(p => p.id !== selectedPensioner.id));
    
    // Close modal
    setShowVerificationModal(false);
    setSelectedPensioner(null);
  };
  
  const handleRejectVerification = () => {
    // Remove from pending
    setPendingVerifications(pendingVerifications.filter(p => p.id !== selectedPensioner.id));
    
    // Close modal
    setShowVerificationModal(false);
    setSelectedPensioner(null);
  };
  
  // Handler for pension amount update
  const handleUpdatePension = (id, newAmount) => {
    setApprovedPensioners(
      approvedPensioners.map(p => 
        p.id === id ? { ...p, pensionAmount: newAmount } : p
      )
    );
  };
  
  // Handler for scheduling new payout
  const handleSchedulePayout = (newPayout) => {
    setScheduledPayouts([newPayout, ...scheduledPayouts]);
  };
  
  // Render the active tab content
  const renderContent = () => {
    switch(activeTab) {
      case 'pending':
        return (
          <PendingVerification 
            pendingVerifications={pendingVerifications} 
            handleOpenVerification={handleOpenVerification} 
          />
        );
      case 'approved':
        return (
          <ApprovedPensioners 
            approvedPensioners={approvedPensioners} 
            handleOpenEdit={handleOpenEdit}
          />
        );
      case 'schedule':
        return (
          <SchedulePayout 
            scheduledPayouts={scheduledPayouts} 
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
            <button className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-200 ease-in-out">
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
          pendingCount={pendingVerifications.length} 
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
      
      {/* Modals */}
      {showVerificationModal && (
        <VerificationModal 
          selectedPensioner={selectedPensioner}
          onClose={() => setShowVerificationModal(false)}
          onApprove={handleApproveVerification}
          onReject={handleRejectVerification}
        />
      )}
      
      {showEditModal && (
        <EditModal 
          selectedPensioner={selectedPensioner}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdatePension}
        />
      )}
      
      {showScheduleModal && (
        <ScheduleModal 
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleSchedulePayout}
        />
      )}
    </div>
  );
};

export default AdminDashboard;