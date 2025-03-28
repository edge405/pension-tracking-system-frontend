import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

const VerificationModal = ({ selectedPensioner, onClose, onApprove, onReject }) => {
  if (!selectedPensioner) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/80">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Verify Pensioner Application</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senior Citizen ID</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedPensioner.id}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {`${selectedPensioner.firstName} ${selectedPensioner.middleName} ${selectedPensioner.lastName}`}
              </div>
            </div>
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedPensioner.sex ?? "None"}
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
                {selectedPensioner.submissionDate}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Barangay</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedPensioner.barangay}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pension Payout Amount (₱)</label>
              <input 
                type="number" 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter pension payout amount"
                defaultValue="2000"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valid ID</label>
            <div className="h-72 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <img 
                  src={`/api/placeholder/400/320`} 
                  alt="Valid ID Preview" 
                  className="mx-auto rounded-lg"
                />
                <p className="text-gray-500 mt-3">ID: {selectedPensioner.validID}</p>
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
            onClick={onReject}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <XCircle size={18} />
            Reject
          </button>
          <button 
            onClick={onApprove}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
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