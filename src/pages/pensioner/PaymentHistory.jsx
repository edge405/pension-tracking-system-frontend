import React, { useState } from 'react';

const PaymentHistory = ({ paymentHistory }) => {
  const [filter, setFilter] = useState('all');
  
  // In a real app, this would filter data based on the selection
  const handleFilter = () => {
    // Filtering logic would go here
    console.log(`Filter applied: ${filter}`);
  };
  
  return (
    <div className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h2>
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <p className="text-gray-600 mb-4 md:mb-0 text-lg">
          Your pension payment records
        </p>
        <div className="flex space-x-3">
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All payments</option>
            <option value="12">Last 12 months</option>
            <option value="6">Last 6 months</option>
            <option value="3">Last 3 months</option>
          </select>
          
          <button 
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            onClick={handleFilter}
          >
            Apply
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
            {paymentHistory.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {payment.status}
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

export default PaymentHistory;