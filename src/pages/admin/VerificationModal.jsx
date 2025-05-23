import { useState } from 'react';
import { XCircle, CheckCircle, User } from 'lucide-react';
import { formatDate } from '../services/formatDate';

const VerificationModal = ({ selectedPensioner, onClose, onApprove, onReject }) => {
  // State for payout amount and error handling
  const [payoutAmount, setPayoutAmount] = useState(selectedPensioner.payout_amount || '');
  const [error, setError] = useState('');

  if (!selectedPensioner) return null;

  // Handle Approve with validation only if amount is provided
  const handleApprove = () => {
    // Allow empty value (optional), but if value exists it must be > 0
    if (payoutAmount && payoutAmount <= 0) {
      setError('Pension Payout Amount must be greater than 0.');
      return;
    }
    setError('');
    onApprove(payoutAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/80">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Verify Pensioner Application</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="cursor-pointer" size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senior Citizen ID</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedPensioner.senior_citizen_id}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {`${selectedPensioner.fullname}`}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {`${formatDate(selectedPensioner.birthdate)}`}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedPensioner.sex ?? "None"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedPensioner.civil_status ?? "None"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedPensioner.contact_number ?? "None"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedPensioner.age}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {formatDate(selectedPensioner.created_at)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedPensioner.address}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pension Payout Amount (₱) - Optional</label>
              <input
                type="number"
                className={`w-full p-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter pension payout amount (optional)"
                value={payoutAmount}
                onChange={(e) => {
                  setPayoutAmount(e.target.value);
                  setError(''); // Clear error when user starts typing
                }}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          </div>

          {/* Right Column (Valid ID Section) */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Valid ID</label>
            <div className="h-96 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              {selectedPensioner.valid_id ? (
                <img
                  src={`${import.meta.env.VITE_PTS_BACKEND_SERVER}/${selectedPensioner.valid_id}`}
                  alt="Valid ID"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <User size={200} className="text-gray-400" />
                  {/* <p className="text-gray-500 mt-4">No Valid ID Provided</p> */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onReject}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 cursor-pointer"
          >
            <XCircle size={18} />
            Reject
          </button>
          <button
            onClick={handleApprove}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle size={18} />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;