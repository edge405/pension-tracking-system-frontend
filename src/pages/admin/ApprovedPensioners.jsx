import React, { useState, useEffect, useContext } from 'react';
import { Search, UserCheck, Edit } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { getApprovedPensioners, updatePensionerPayout, deletePensioner } from '../services/admin_api';
import EditModal from './EditModal'; // Import the EditModal component
import {ToastContainer, toast} from 'react-toastify';

const ApprovedPensioners = () => {
  const [approvedPensioners, setApprovedPensioners] = useState([]);
  const [filteredPensioners, setFilteredPensioners] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPensioner, setSelectedPensioner] = useState(null); // Track selected pensioner for modal

  const { token } = useContext(AuthContext);

  // Fetch approved pensioners from the backend
  useEffect(() => {
    const fetchApprovedPensioners = async () => {
      try {
        const response = await getApprovedPensioners(token); // Fetch approved pensioners

        // Ensure the response contains the expected data structure
        if (response && Array.isArray(response)) {
          setApprovedPensioners(response); // Set fetched data to state
          setFilteredPensioners(response); // Initially set filtered to all pensioners
        } else {
          throw new Error('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch approved pensioners:', err.message);
        setError('Failed to load approved pensioners. Please try again.');
        setLoading(false);
      }
    };

    fetchApprovedPensioners();
  }, [token]);

  // Filter pensioners based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // If search is empty, show all pensioners
      setFilteredPensioners(approvedPensioners);
    } else {
      // Filter the pensioners based on the search query
      const filtered = approvedPensioners.filter((pensioner) => {
        const query = searchQuery.toLowerCase();
        return (
          pensioner.fullname?.toLowerCase().includes(query) ||
          pensioner.senior_citizen_id?.toLowerCase().includes(query) ||
          pensioner.address?.toLowerCase().includes(query)
        );
      });
      setFilteredPensioners(filtered);
    }
  }, [searchQuery, approvedPensioners]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle opening the edit modal
  const handleOpenEdit = (pensioner) => {
    setSelectedPensioner(pensioner); // Open modal with selected pensioner
  };

  const handleDelete = async (pensionerId) => {
    try {
      const response = await deletePensioner(pensionerId, token); // Call the API to delete the pensioner
      setApprovedPensioners((prev) => prev.filter((p) => p.id !== pensionerId)); // Update local state
      toast.info(response.message || 'Pensioner deleted successfully!'); // Show success message
    } catch (error) {
      console.error('Failed to delete pensioner:', error.message);
      toast.error('Failed to delete pensioner. Please try again.');
    }
  }

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedPensioner(null); // Close modal
  };

  // Handle updating the pension amount
  const handleUpdatePayout = async (pensionerId, newAmount) => {
    try {
      const response = await updatePensionerPayout(pensionerId, newAmount, token);

      // Update the local state to reflect the change
      const updatedPensioners = approvedPensioners.map((pensioner) =>
        pensioner.id === pensionerId ? { ...pensioner, payout_amount: newAmount } : pensioner
      );
      
      setApprovedPensioners(updatedPensioners);
      toast.success(response.message || 'Pension amount updated successfully!'); // Show success message
      handleCloseModal(); // Close the modal after update
    } catch (error) {
      console.error('Failed to update pension amount:', error.message);
      alert('Failed to update pension amount. Please try again.');
    }
  };

  if (loading) {
    return <div className="p-6">Loading approved pensioners...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div>
      {/* Render the table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Approved Pensioners</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pensioners..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <UserCheck className="text-green-500" size={24} />
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <span className="font-bold">Total Active Pensioners:</span> {approvedPensioners.length}
                {searchQuery && (
                  <span className="ml-2">
                    (Showing {filteredPensioners.length} {filteredPensioners.length === 1 ? 'result' : 'results'})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
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
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pension Amount
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
                      <div className="text-sm text-gray-900">{pensioner.address.split(',')[0]}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {pensioner.payout_amount ? `₱${parseFloat(pensioner.payout_amount).toLocaleString()}` : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleOpenEdit(pensioner)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="cursor-pointer" size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No pensioners found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render the modal */}
      {selectedPensioner && (
        <EditModal
          selectedPensioner={selectedPensioner}
          onClose={handleCloseModal}
          onUpdate={(id, newAmount) => handleUpdatePayout(id, newAmount)}
          onDelete={handleDelete}
        />
      )}
      <ToastContainer/>
    </div>
  );
};

export default ApprovedPensioners;