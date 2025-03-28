import React from 'react';

const Notifications = ({ notifications, markAllAsRead }) => {
  // In a real app, this would call an API to mark all notifications as read
  const handleMarkAllAsRead = () => {
    if (typeof markAllAsRead === 'function') {
      markAllAsRead();
    }
  };
  
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
        <button 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={handleMarkAllAsRead}
        >
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
};

export default Notifications;