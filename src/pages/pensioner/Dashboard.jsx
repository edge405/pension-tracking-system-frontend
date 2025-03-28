import React from 'react';
import { Calendar, History, Bell } from 'lucide-react';

const Dashboard = ({ pensionerInfo, paymentHistory, notifications, setActiveTab }) => {
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
};

export default Dashboard;