import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getNotifications } from '../services/pensioner_api';
import { formatDate } from '../services/formatDate';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notificationsData = await getNotifications(token);
        setNotifications(notificationsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data.');
      }
    };

    fetchData();
  }, [token]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!notifications) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h2>

      {/* Add overflow here */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className={`p-4 border rounded-lg bg-blue-50 border-blue-200`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(notification.created_at)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;