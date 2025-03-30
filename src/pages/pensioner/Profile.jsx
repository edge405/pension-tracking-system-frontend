import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getPensionerProfile } from '../services/pensioner_api';

const Profile = () => {
  const [pensionerInfo, setPensionerInfo] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getPensionerProfile(token);
        console.log(profileData);
        setPensionerInfo(profileData);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data.');
      }
    };

    fetchData();
  }, [token]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!pensionerInfo) {
    return <div className='text-center'>Loading...</div>;
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 mb-4 border-4 border-white shadow">
              <span className="text-5xl font-semibold">MS</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-2">{pensionerInfo?.fullname || 'N/A'}</h3>
            <p className="text-gray-500 mb-4">Senior Citizen ID: {pensionerInfo?.senior_citizen_id || 'N/A'}</p>
            <div className="w-full">
              <div className="bg-green-100 text-green-800 text-center py-2 px-4 rounded-lg font-medium">
                Active Pensioner
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo?.fullname || 'N/A'}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Sex</label>
                <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo?.sex || 'N/A'}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Birthdate</label>
                <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo?.birthdate || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
                <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo?.age || 'N/A'}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo?.address || 'N/A'}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
                <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo?.contact_number || 'N/A'}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Monthly Pension Amount</label>
                <div className="p-3 bg-white rounded-lg border border-gray-200">{pensionerInfo?.payout_amount || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;