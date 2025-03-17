import React, { useState } from 'react';
import { Bell, CreditCard, History, LogOut, Calendar, User, MapPin, Phone } from 'lucide-react';

const PensionerDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  // Mock data
  const pensionerInfo = {
    name: 'Maria Christine Joy Susvilla',
    id: 'SC-123456',
    birthdate: 'January 15, 1910',
    address: '123 Rizal Street, Poblacion, Alimodian, Iloilo',
    contact: '(+63) 912-345-6789',
    pensionAmount: '₱2,000',
    nextPayoutDate: 'April 15, 2025',
    nextPayoutLocation: 'Barangay San Isidro Community Center, Alimodian'
  };
  
  const paymentHistory = [
    { id: 1, date: '2025-02-15', amount: '₱2,000', location: 'Barangay Sample Community Center, Alimodian', status: 'Received' },
    { id: 2, date: '2025-01-15', amount: '₱2,000', location: 'Barangay Sample Community Center, Alimodian', status: 'Received' },
    { id: 4, date: '2024-11-15', amount: '₱2,000', location: 'Barangay Sample Community Center, Alimodian', status: 'Received' },
    { id: 5, date: '2024-10-15', amount: '₱2,000', location: 'Barangay Sample Community Center, Alimodian', status: 'Received' },
  ];
  
  const notifications = [
    { id: 1, message: 'Your next pension payment is scheduled for April 15, 2025', date: '2025-03-10', isNew: true },
    { id: 2, message: 'Payout location is on Barangay Sample Community Center, Alimodian', date: '2025-02-28', isNew: true },
    // { id: 3, message: 'Pension payment for February has been processed', date: '2025-02-15', isNew: false },
  ];
  
  // Render different content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {pensionerInfo.name}!</h2>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex items-center">
                <Calendar size={36} className="mr-4 text-white" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Next Pension Payment</h3>
                  <p className="text-base">
                    <span className="font-bold">{pensionerInfo.nextPayoutDate}</span> - <span className="text-xl font-bold">{pensionerInfo.pensionAmount}</span>
                  </p>
                  <p className="text-base mt-1">
                    <span className="opacity-80">Location:</span> {pensionerInfo.nextPayoutLocation}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-5">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <History size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Recent Payments</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {paymentHistory.slice(0, 3).map(payment => (
                    <li key={payment.id} className="py-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">{payment.date}</span>
                        <span className="text-lg font-semibold text-green-600">{payment.amount}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{payment.location}</div>
                    </li>
                  ))}
                </ul>
                <button 
                  className="mt-6 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 flex items-center w-full justify-center"
                  onClick={() => setActiveTab('history')}
                >
                  <History size={16} className="mr-2" />
                  View all payment history
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-5">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Bell size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
                </div>
                <ul className="space-y-4">
                  {notifications.slice(0, 3).map(notification => (
                    <li key={notification.id} className={`p-3 rounded-lg ${notification.isNew ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
                      <div className="flex items-start">
                        {notification.isNew && (
                          <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mt-1 mr-2 flex-shrink-0"></span>
                        )}
                        <div>
                          <span className="text-gray-800">{notification.message}</span>
                          <div className="text-xs text-gray-500 mt-1">{notification.date}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button 
                  className="mt-6 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center w-full justify-center"
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell size={16} className="mr-2" />
                  View all notifications
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h2>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 mb-4 border-4 border-white shadow">
                    <span className="text-5xl font-semibold">MS</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">{pensionerInfo.name}</h3>
                  <p className="text-gray-500 mb-4">Senior Citizen ID: {pensionerInfo.id}</p>
                  <div className="w-full">
                    <div className="bg-green-100 text-green-800 text-center py-2 px-4 rounded-lg font-medium">
                      Active Pensioner
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo.name}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Birthdate</label>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo.birthdate}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo.address}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo.contact}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Monthly Pension Amount</label>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo.pensionAmount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h2>
            
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
              <p className="text-gray-600 mb-4 md:mb-0 text-lg">
                Your pension payment records
              </p>
              <div className="flex space-x-3">
                <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All payments</option>
                  <option value="12">Last 12 months</option>
                  <option value="6">Last 6 months</option>
                  <option value="3">Last 3 months</option>
                </select>
                
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                  Apply
                </button>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
        case 'notifications':
          return (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h2>
              
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <span className="mr-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {notifications.filter(n => n.isNew).length} New
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                    {notifications.length} Total
                  </span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Mark all as read
                </button>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-4 border rounded-lg ${notification.isNew ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                      </div>
                      {notification.isNew && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">New</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        
      case 'locations':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payout Locations</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <span className="font-bold">Your Next Payout:</span> {pensionerInfo.nextPayoutDate} at {pensionerInfo.nextPayoutLocation}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Available Payout Centers</h3>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-start">
                    <div className="p-2 bg-green-100 rounded-md">
                      <MapPin size={24} className="text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Barangay San Isidro Community Center</h4>
                      <p className="text-sm text-gray-500 mt-1">123 San Isidro St., Manila</p>
                      <p className="text-sm text-gray-500">Operating Hours: 8:00 AM - 5:00 PM (Mon-Fri)</p>
                      <div className="mt-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Your Default Center</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-md">
                      <MapPin size={24} className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Manila City Hall - Senior Citizens Affairs Office</h4>
                      <p className="text-sm text-gray-500 mt-1">City Hall Complex, Manila</p>
                      <p className="text-sm text-gray-500">Operating Hours: 8:00 AM - 5:00 PM (Mon-Fri)</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-md">
                      <MapPin size={24} className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">San Andres Bukid Multipurpose Hall</h4>
                      <p className="text-sm text-gray-500 mt-1">San Andres Bukid, Manila</p>
                      <p className="text-sm text-gray-500">Operating Hours: 8:00 AM - 5:00 PM (Mon-Fri)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium mb-2">Request Payout Location Change</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you need to change your payout location, please contact our support line or visit your barangay office to submit a request.
              </p>
              <div className="flex items-center">
                <Phone size={18} className="text-blue-600 mr-2" />
                <span className="text-blue-600">Hotline: (02) 8-XXX-XXXX</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Dashboard Home</div>;
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
            <button className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-200 ease-in-out transform hover:scale-105">
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 container mx-auto mt-6 px-4 mb-6">
        {/* Sidebar */}
        <aside className="w-72 mr-6 hidden md:block">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 mb-3 border-4 border-white shadow-md">
                <span className="text-3xl font-semibold">MS</span>
              </div>
              <h2 className="text-xl text-center font-semibold text-gray-800">Maria Christine Joy Susvilla</h2>
              <p className="text-sm text-gray-500 mt-1">ID: SC-123456</p>
              <span className="mt-3 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 shadow-sm">
                Active
              </span>
            </div>
            <nav>
              <ul className="space-y-3">
                <li>
                  <button 
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200 
                    ${activeTab === 'home' 
                      ? 'bg-blue-600 text-white shadow-md font-medium' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                    onClick={() => setActiveTab('home')}
                  >
                    <CreditCard size={18} className={`${activeTab === 'home' ? 'mr-3' : 'mr-3 text-blue-500'}`} />
                    Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200
                    ${activeTab === 'profile' 
                      ? 'bg-blue-600 text-white shadow-md font-medium' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User size={18} className={`${activeTab === 'profile' ? 'mr-3' : 'mr-3 text-blue-500'}`} />
                    Profile
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200
                    ${activeTab === 'history' 
                      ? 'bg-blue-600 text-white shadow-md font-medium' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                    onClick={() => setActiveTab('history')}
                  >
                    <History size={18} className={`${activeTab === 'history' ? 'mr-3' : 'mr-3 text-blue-500'}`} />
                    Payment History
                  </button>
                </li>

                <li>
                  <button 
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200
                    ${activeTab === 'notifications' 
                      ? 'bg-blue-600 text-white shadow-md font-medium' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Bell size={18} className={`${activeTab === 'notifications' ? 'mr-3' : 'mr-3 text-blue-500'}`} />
                    Notifications
                    {notifications.some(n => n.isNew) && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                        {notifications.filter(n => n.isNew).length}
                      </span>
                    )}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        
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
            <button 
              className={`flex-shrink-0 px-4 py-2 rounded-md flex items-center ${activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={16} className="mr-1" />
              Alerts
              {notifications.some(n => n.isNew) && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.filter(n => n.isNew).length}
                </span>
              )}
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
              {/* <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors duration-200">Terms</button>
                <button className="text-gray-400 hover:text-white transition-colors duration-200">Privacy</button>
                <button className="text-gray-400 hover:text-white transition-colors duration-200">Help</button>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PensionerDashboard;