import React, { useState } from 'react';
import { XCircle, CheckCircle, UserCheck } from 'lucide-react';

const EditModal = ({ selectedPensioner, onClose, onUpdate }) => {
  const [newAmount, setNewAmount] = useState(
    selectedPensioner.payout_amount || '');

  if (!selectedPensioner) return null;

  const handleUpdate = () => {
    // Convert empty string to null, otherwise parse as number
    const amountToUpdate = newAmount === '' ? null : parseFloat(newAmount);
    onUpdate(selectedPensioner.id, amountToUpdate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/80">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Update Pension Amount</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <UserCheck size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{selectedPensioner.fullname}</h3>
              <p className="text-sm text-gray-500">ID: {selectedPensioner.senior_citizen_id}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Pension Amount</label>
            <div className="p-3 bg-gray-100 rounded-lg border border-gray-200 font-semibold">
              ₱{selectedPensioner.payout_amount ? parseFloat(selectedPensioner.payout_amount).toLocaleString() : 'N/A'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Pension Amount (₱)</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new pension amount"
              value={newAmount}
              onChange={(e) => {
                // Allow empty string or numbers only
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  setNewAmount(value);
                }
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle size={18} />
            Update Pension Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;