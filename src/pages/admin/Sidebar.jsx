import React from 'react';
import { ClipboardCheck, Users, Calendar, AlertCircle } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, pendingCount }) => {
  return (
    <aside className="w-72 mr-6 hidden md:block">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 sticky top-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-3">
            <li>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200 
                ${activeTab === 'pending' 
                  ? 'bg-blue-600 text-white shadow-md font-medium' 
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                onClick={() => setActiveTab('pending')}
              >
                <ClipboardCheck size={18} className={`${activeTab === 'pending' ? 'mr-3' : 'mr-3 text-blue-500'}`} />
                Pending Verification
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200
                ${activeTab === 'approved' 
                  ? 'bg-blue-600 text-white shadow-md font-medium' 
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                onClick={() => setActiveTab('approved')}
              >
                <Users size={18} className={`${activeTab === 'approved' ? 'mr-3' : 'mr-3 text-blue-500'}`} />
                Approved Pensioners
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200
                ${activeTab === 'schedule' 
                  ? 'bg-blue-600 text-white shadow-md font-medium' 
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                onClick={() => setActiveTab('schedule')}
              >
                <Calendar size={18} className={`${activeTab === 'schedule' ? 'mr-3' : 'mr-3 text-blue-500'}`} />
                Schedule Payout
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-medium text-orange-800 flex items-center mb-2">
              <AlertCircle size={16} className="mr-2" />
              System Alerts
            </h3>
            <ul className="text-sm text-orange-700 space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Pension payout scheduled for April 15, 2025</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>{pendingCount} new registrations pending verification</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;