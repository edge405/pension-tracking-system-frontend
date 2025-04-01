import React, { useState, useEffect, useContext } from 'react';
import { Calendar, MapPin, Plus } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { getSchedulePayouts } from '../services/admin_api';
import { formatDate } from '../services/formatDate';

const SchedulePayout = ({ handleOpenSchedule }) => {
  const [scheduledPayouts, setScheduledPayouts] = useState([]); // State to hold scheduled payouts
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for API call
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading
        const data = await getSchedulePayouts(token);
        setScheduledPayouts(data);
      } catch (err) {
        console.error('Error fetching schedule payouts:', err);
        setError('Failed to load schedule payouts.');
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Helper function to convert 24-hour time to 12-hour format
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date(2000, 0, 1, hours, minutes);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  // Sort payouts by date and find the earliest scheduled payout
  const nextPayout = [...scheduledPayouts]
    .filter(payout => payout.status === 'scheduled') // Filter only scheduled payouts
    .sort((a, b) => new Date(a.payout_date) - new Date(b.payout_date)) // Sort by date
    .shift(); // Get the first item (earliest date)

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Schedule Payout</h2>
        <button 
          onClick={handleOpenSchedule}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          <Plus size={18} />
          <span>New Schedule</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Next Scheduled Payout</h3>
              <p className="text-gray-600">{nextPayout ? formatDate(new Date(nextPayout.payout_date)) : 'No scheduled payouts'}</p>
            </div>
          </div>
          <div className="border-t border-blue-200 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Pensioners:</span>
              <span className="font-medium text-gray-800">{nextPayout ? nextPayout.total_pensioners : 'N/A'}</span>
            </div>
          </div>
        </div>
        
        {nextPayout && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gray-200 rounded-full">
                <MapPin size={24} className="text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Payout Location</h3>
                {/* <p className="text-gray-600">{nextPayout.payout_location}</p> */}
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 mb-2">{nextPayout.payout_location || 'Address not provided'}</p>
              <p className="text-gray-600">Operating Hours: {formatTime(nextPayout.start_time)} - {formatTime(nextPayout.end_time)}</p>
            </div>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Payouts</h3>
      {/* Add overflow to the upcoming payouts table */}
      <div className="overflow-auto max-h-[300px] border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pensioners
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scheduledPayouts.length > 0 ? (
              scheduledPayouts.map((payout, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(payout.payout_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payout.payout_location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payout.total_pensioners}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payout.status === 'scheduled' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {payout.status === 'scheduled' ? 'Scheduled' : 'Released'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No upcoming payouts</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePayout;