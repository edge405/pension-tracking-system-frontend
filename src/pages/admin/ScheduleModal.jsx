import React, { useState } from 'react';
import { XCircle, Calendar, AlertCircle } from 'lucide-react';

const ScheduleModal = ({ onClose, onSchedule }) => {
  const [payoutDate, setPayoutDate] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  
  const handleSchedule = () => {
    const newPayout = {
      date: payoutDate,
      location: location,
      totalPensioners: 147, // Mock value
      status: 'scheduled',
      startTime: startTime,
      endTime: endTime
    };
    
    onSchedule(newPayout);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/80">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Schedule New Payout</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={24} />
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payout Date</label>
          <input 
            type="date" 
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={payoutDate}
            onChange={(e) => setPayoutDate(e.target.value)}
          />
        </div>
        
        <div className="mt-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Payout Location</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input 
              type="time" 
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input 
              type="time" 
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-6">
          <div className="flex items-start">
            <div className="pt-0.5">
              <AlertCircle size={18} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-600">Estimated Payout Information</h4>
              <div className="mt-2 text-sm text-blue-500">
                <div className="flex justify-between mb-1">
                  <span>Total Pensioners:</span>
                  <span className="font-medium">147</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSchedule}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Calendar size={18} />
            Schedule Payout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;