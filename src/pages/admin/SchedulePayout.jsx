import React from 'react';
import { Calendar, MapPin, Plus } from 'lucide-react';

const SchedulePayout = ({ scheduledPayouts, handleOpenSchedule }) => {
  // Get the next payout (first one with status 'scheduled')
  const nextPayout = scheduledPayouts.find(payout => payout.status === 'scheduled');
  
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
              <p className="text-gray-600">{nextPayout ? new Date(nextPayout.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No scheduled payouts'}</p>
            </div>
          </div>
          <div className="border-t border-blue-200 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Pensioners:</span>
              <span className="font-medium text-gray-800">{nextPayout ? nextPayout.totalPensioners : 'N/A'}</span>
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
                <p className="text-gray-600">{nextPayout.location}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 mb-2">{nextPayout.address}</p>
              <p className="text-gray-600">Operating Hours: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Payouts</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
            {scheduledPayouts.map((payout, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payout.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payout.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payout.totalPensioners}</div>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePayout;