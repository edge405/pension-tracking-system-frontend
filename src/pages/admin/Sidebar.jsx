import React, { useState, useEffect, useContext } from 'react';
import { ClipboardCheck, Users, Calendar, AlertCircle, User } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { getSystemAlert } from '../services/admin_api';
import { formatDate } from '../services/formatDate';


const Sidebar = ({ activeTab, setActiveTab }) => {
  const [systemAlert, setSystemAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for API call
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading
        const systemAlertData = await getSystemAlert(token);

        
        setSystemAlert(systemAlertData); // Set fetched data
      } catch (err) {
        console.error('Error fetching system alert data:', err);
        setError('Failed to load system alerts.'); // Set error message
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchData();
  }, [token]);

  // Helper function to find the next payout date
  const getNextPayoutDate = () => {
    if (!systemAlert?.payout_schedules || systemAlert.payout_schedules.length === 0) return null;

    // Sort payouts by date and return the earliest one
    const sortedPayouts = [...systemAlert.payout_schedules].sort((a, b) =>
      new Date(a.payout_date) - new Date(b.payout_date)
    );

    return sortedPayouts[0];
  };

  const nextPayout = getNextPayoutDate();

  return (
    <aside className="w-72 mr-6 hidden md:block">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 sticky top-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>

        {/* Navigation */}
        <nav>
          <ul className="space-y-3">
          <li>
            <button
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200
              ${activeTab === 'profile' 
                ? 'bg-blue-600 text-white shadow-md font-medium' 
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} className={`${activeTab === 'profile' ? 'mr-3' : 'mr-3 text-blue-500'}`} />
              Profile Settings
            </button>
          </li>
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

        {/* System Alerts Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-medium text-orange-800 flex items-center mb-2">
              <AlertCircle size={16} className="mr-2" />
              System Alerts
            </h3>

            {/* Loading State */}
            {isLoading && (
              <p className="text-sm text-gray-500 flex items-center">
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading alerts...
              </p>
            )}

            {/* Error State */}
            {error && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-2" />
                {error}
              </p>
            )}

            {/* Success State */}
            {!isLoading && !error && (
              <ul className="text-sm text-orange-700 space-y-2">
                {nextPayout ? (
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>
                      Next payout scheduled for{' '}
                      <strong>{formatDate(new Date(nextPayout.payout_date).toLocaleDateString())}</strong> at{' '}
                      <strong>{nextPayout.payout_location}</strong>.
                    </span>
                  </li>
                ) : (
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>No upcoming payouts scheduled.</span>
                  </li>
                )}
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>
                    {systemAlert?.total_pending_pensioners || 0} new registrations pending verification.
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;