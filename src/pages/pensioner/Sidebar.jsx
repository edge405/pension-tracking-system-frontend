import React from 'react';
import { CreditCard, User, History, Bell } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, pensionerInfo, notifications }) => {
  const newNotifications = notifications.filter(n => n.isNew).length;
  
  return (
    <aside className="w-72 mr-6 hidden md:block">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 mb-3 border-4 border-white shadow-md">
            <span className="text-3xl font-semibold">
              {pensionerInfo.name.split(' ').map(name => name[0]).join('').substring(0, 2)}
            </span>
          </div>
          <h2 className="text-xl text-center font-semibold text-gray-800">{pensionerInfo.name}</h2>
          <p className="text-sm text-gray-500 mt-1">ID: {pensionerInfo.id}</p>
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
                {newNotifications > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                    {newNotifications}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;