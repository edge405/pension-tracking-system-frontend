import { Calendar, History, Bell } from 'lucide-react';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getNotifications, getPaymentHistory, getPensionerProfile } from '../services/pensioner_api';
import { formatDate } from '../services/formatDate';

const Dashboard = ({ setActiveTab }) => {
  const [pensionerInfo, setPensionerInfo] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getPensionerProfile(token);
        setPensionerInfo(profileData);

        const notificationsData = await getNotifications(token);
        setNotifications(notificationsData);

        const paymentHistoryData = await getPaymentHistory(token);
        setPaymentHistory(paymentHistoryData);
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

  if (!pensionerInfo || !notifications || !paymentHistory) {
    return <div className='text-center'>Loading...</div>;
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {pensionerInfo?.fullname || 'User'}!</h2>
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center">
          <Calendar size={36} className="mr-4 text-white" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Next Pension Payment</h3>
            <p className="text-base">
              <span className="font-bold">{formatDate(notifications[0]?.payout_date) || 'N/A'}</span> -{' '}
              <span className="text-xl font-bold">₱{pensionerInfo?.payout_amount || 'N/A'}</span>
            </p>
            <p className="text-base mt-1">
              <span className="opacity-80">Location:</span> {notifications[0]?.location || 'N/A'}
            </p>
            <p className="text-base mt-1">
              <span className="opacity-80">Time:</span> {notifications[0]?.time || 'N/A'}
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
            {paymentHistory.slice(0, 3).map((payment) => (
              <li key={payment.id} className="py-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">{formatDate(payment.payout_date)}</span>
                  <span className="text-lg font-semibold text-green-600">{payment.payout_amount}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{payment.payout_location}</div>
              </li>
            ))}
          </ul>
          <button
            className="mt-6 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 flex items-center w-full justify-center cursor-pointer"
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
        {notifications.slice(0, 3).map((notification) => (
          <li 
            key={notification.id} 
            className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm hover:bg-blue-100 transition-colors duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="ml-1">
                <p className="text-gray-800 font-medium">{notification.message}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

          <button
            className="mt-6 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center w-full justify-center cursor-pointer"
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