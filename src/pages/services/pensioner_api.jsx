import axios from '../../axios';


// Helper function to handle errors consistently
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    console.error('Server Error:', error.response.status, error.response.data);
    throw new Error(error.response.data.error || 'An error occurred while processing your request.');
  } else if (error.request) {
    // No response received from the server
    console.error('No response received from server:', error.request);
    throw new Error('No response received from the server. Please check your network connection.');
  } else {
    // Something else went wrong
    console.error('Error during API call:', error.message);
    throw new Error('An unexpected error occurred.');
  }
};

// Get the profile of the logged-in pensioner
export const getPensionerProfile = async (token) => {
    try {
      const response = await axios.get('/api/pensioner/profile',{
        auth: {
            username: token
        }
      });
      return response.data; // Pensioner profile data
    } catch (error) {
      handleError(error);
    }
  };
  
  // Update the profile of the logged-in pensioner
  export const updatePensionerProfile = async (updatedData, token) => {
    try {
      const response = await axios.put('/api/pensioner/profile', updatedData,{
        auth: {
            username: token
        }
      });
      return response.data; // { message: 'Profile updated successfully' }
    } catch (error) {
      handleError(error);
    }
  };
  
  // Get payment history for the logged-in pensioner
  export const getPaymentHistory = async (token) => {
    try {
      const response = await axios.get('/api/pensioner/payments-history',{
        auth: {
            username: token
        }
      });
      return response.data; // Array of payment history
    } catch (error) {
      handleError(error);
    }
  };
  
  // Get notifications for the logged-in pensioner
  export const getNotifications = async (token) => {
    try {
      const response = await axios.get('/api/pensioner/notifications',{
        auth: {
            username: token
        }
      });
      return response.data; // Array of notifications
    } catch (error) {
      handleError(error);
    }
  };