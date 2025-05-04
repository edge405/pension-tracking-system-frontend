import React, { useState } from 'react';
import { XCircle, CheckCircle, UserCheck, Image, Trash2, AlertTriangle } from 'lucide-react';

const EditModal = ({ selectedPensioner, onClose, onUpdate, onDelete }) => {
  const [newAmount, setNewAmount] = useState(
    selectedPensioner.payout_amount || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!selectedPensioner) return null;

  const handleUpdate = () => {
    // Convert empty string to null, otherwise parse as number
    const amountToUpdate = newAmount === '' ? null : parseFloat(newAmount);
    onUpdate(selectedPensioner.id, amountToUpdate);
    onClose();
  };

  const handleDelete = () => {
    onDelete(selectedPensioner.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/80">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl border border-gray-200 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Update Pension Amount</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
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
          
          {/* Valid ID Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valid ID</label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {selectedPensioner.valid_id ? (
                <div className="bg-gray-50">
                  <img 
                    src={`${import.meta.env.VITE_PTS_BACKEND_SERVER}/${selectedPensioner.valid_id}`}
                    alt={`Valid ID of ${selectedPensioner.fullname}`}
                    className="object-contain w-full h-48"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-4">
                  <Image size={48} className="mb-2" />
                  <p className="text-center">No Valid ID Available</p>
                </div>
              )}
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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Confirmation</h3>
              </div>
              
              <p className="mb-6 text-gray-700">
                Are you sure you want to delete the record for <span className="font-semibold">{selectedPensioner.fullname}</span>? 
                This action cannot be undone.
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 size={16} />
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between border-t border-gray-200 pt-4">
          {/* Delete Button */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-5 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2 cursor-pointer"
          >
            <Trash2 size={18} />
            Delete Record
          </button>
          
          <div className="flex gap-3">
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
    </div>
  );
};

export default EditModal;