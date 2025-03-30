import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getPaymentHistory } from '../services/pensioner_api';
import { formatDate } from '../services/formatDate';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const paymentHistoryData = await getPaymentHistory(token);
        
        // Map the status to "Received" or other values
        const updatedPaymentHistory = paymentHistoryData.map((payment) => ({
          ...payment,
          status: payment.status === 'released' ? 'Received' : payment.status === "scheduled" ? 'Pending' : payment.status,
        }));

        setPaymentHistory(updatedPaymentHistory);
        setFilteredHistory(updatedPaymentHistory);
      } catch (err) {
        console.error('Error fetching payment history:', err);
        setError('Failed to load payment history.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Apply filters whenever filter conditions change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, dateRange, paymentHistory]);

  // Filter function
  const applyFilters = () => {
    let filtered = [...paymentHistory];

    // Filter by search term (location)
    if (searchTerm) {
      filtered = filtered.filter(payment => 
        payment.payout_location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Filter by date range
    if (dateRange.start) {
      filtered = filtered.filter(payment => 
        new Date(payment.payout_date) >= new Date(dateRange.start)
      );
    }
    
    if (dateRange.end) {
      filtered = filtered.filter(payment => 
        new Date(payment.payout_date) <= new Date(dateRange.end)
      );
    }

    setFilteredHistory(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateRange({ start: '', end: '' });
  };

  // Helper function to determine badge color based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Received':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  
  if (loading) {
    return <div className='text-center'>Loading...</div>;
  }

  if (paymentHistory.length === 0) {
    return <div>No payment history available.</div>;
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h2>

      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <p className="text-gray-600 mb-4 md:mb-0 text-lg">Your pension payment records</p>
        <p className="text-sm text-gray-500">
          {filteredHistory.length} {filteredHistory.length === 1 ? 'record' : 'records'} found
        </p>
      </div>

      {/* Filter section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Location
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by location..."
              className="px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Status filter */}
          <div className="w-full md:w-48">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="Received">Received</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Date range - Start */}
          <div className="w-full md:w-48">
            <label htmlFor="dateStart" className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              id="dateStart"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Date range - End */}
          <div className="w-full md:w-48">
            <label htmlFor="dateEnd" className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              id="dateEnd"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Reset filters button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-150"
          >
            Reset Filters
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
  {/* Add a container with fixed height and overflow */}
  <div className="max-h-[400px] overflow-y-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 sticky top-0 z-10">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Location
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(payment.payout_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ₱{payment.payout_amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.payout_location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(payment.status)}`}
                >
                  {payment.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
              No payments match your filter criteria
            </td>
          </tr>
        )}
          </tbody>
        </table>
      </div>
    </div>
    </div>

  );
};

export default PaymentHistory;