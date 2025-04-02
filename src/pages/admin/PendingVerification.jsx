import React, { useState, useEffect, useContext } from 'react';
import { Search, AlertCircle, Eye } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { getPendingPensioners, updatePensionerStatus } from '../services/admin_api';
import VerificationModal from './VerificationModal';
import Sidebar from './Sidebar';

const PendingVerification = () => {
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPensioner, setSelectedPensioner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPensioners, setFilteredPensioners] = useState([]);

  const { token } = useContext(AuthContext);

  // Fetch pending pensioners from the backend
  useEffect(() => {
    const fetchPendingPensioners = async () => {
      try {
        const response = await getPendingPensioners(token);

        if (response && Array.isArray(response)) {
          setPendingVerifications(response);
          setFilteredPensioners(response);
        } else {
          throw new Error('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch pending pensioners:', err.message);
        setError('Failed to load pending verifications. Please try again.');
        setLoading(false);
      }
    };

    fetchPendingPensioners();
  }, [token]);

  // Filter pensioners based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPensioners(pendingVerifications);
      return;
    }
    
    const lowercasedSearch = searchTerm.toLowerCase();
    const results = pendingVerifications.filter(pensioner => 
      pensioner.fullname.toLowerCase().includes(lowercasedSearch) ||
      pensioner.senior_citizen_id.toLowerCase().includes(lowercasedSearch) ||
      (pensioner.address && pensioner.address.toLowerCase().includes(lowercasedSearch)) ||
      String(pensioner.age).includes(lowercasedSearch)
    );
    
    setFilteredPensioners(results);
  }, [searchTerm, pendingVerifications]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle opening the verification modal
  const handleOpenVerification = (pensioner) => {
    setSelectedPensioner(pensioner);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedPensioner(null);
  };

  // Handle approving a pensioner
  const handleApprove = async (payoutAmount) => {
    try {
      await updatePensionerStatus(selectedPensioner.id, 'approved', payoutAmount, token);

      // Update the local state to reflect the change
      const updatedPensioners = pendingVerifications.filter(
        (pensioner) => pensioner.id !== selectedPensioner.id
      );
      setPendingVerifications(updatedPensioners);
      setFilteredPensioners(
        filteredPensioners.filter((pensioner) => pensioner.id !== selectedPensioner.id)
      );

      handleCloseModal();
    } catch (error) {
      console.error('Failed to approve pensioner:', error.message);
      alert('Failed to approve pensioner. Please try again.');
    }
  };

  // Handle rejecting a pensioner
  const handleReject = async () => {
    try {
      await updatePensionerStatus(selectedPensioner.id, 'rejected', null, token);

      // Update the local state to reflect the change
      const updatedPensioners = pendingVerifications.filter(
        (pensioner) => pensioner.id !== selectedPensioner.id
      );
      setPendingVerifications(updatedPensioners);
      setFilteredPensioners(
        filteredPensioners.filter((pensioner) => pensioner.id !== selectedPensioner.id)
      );

      handleCloseModal();
    } catch (error) {
      console.error('Failed to reject pensioner:', error.message);
      alert('Failed to reject pensioner. Please try again.');
    }
  };

  if (loading) {
    return <div className="p-6">Loading pending verifications...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div>
      {/* Main content */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Pending Verification</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pensioners..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
          <div className="flex">
            <AlertCircle className="text-orange-500" size={24} />
            <div className="ml-3">
              <p className="text-sm text-orange-700">
                <span className="font-bold">Attention:</span> There are{' '}
                {pendingVerifications.length} new pensioner registrations pending verification.
                {searchTerm && filteredPensioners.length < pendingVerifications.length && (
                  <span> Showing {filteredPensioners.length} matching results.</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Simple table with overflow-x-auto and max-height */}
        <div className="overflow-x-auto" style={{ maxHeight: '60vh' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Senior Citizen ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Age
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Submission Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPensioners.length > 0 ? (
                filteredPensioners.map((pensioner) => (
                  <tr key={pensioner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{pensioner.senior_citizen_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pensioner.fullname}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pensioner.age}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(pensioner.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {pensioner.address ? pensioner.address.split(',')[0] : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleOpenVerification(pensioner)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Eye className="cursor-pointer" size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No pensioners found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Modal */}
      {selectedPensioner && (
        <VerificationModal
          selectedPensioner={selectedPensioner}
          onClose={handleCloseModal}
          onApprove={(payoutAmount) => handleApprove(payoutAmount)}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default PendingVerification;