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

// Get all pending pensioners
export const getPendingPensioners = async (token) => {
  try {
    const response = await axios.get('/api/admin/pending-pensioners', {
      auth: {
        username: token,
      },
    });
    return response.data; // Array of pending pensioners
  } catch (error) {
    handleError(error);
  }
};

// Get all approved pensioners
export const getApprovedPensioners = async (token) => {
  try {
    const response = await axios.get('/api/admin/approved-pensioners', {
      auth: {
        username: token,
      },
    });
    return response.data; // Array of approved pensioners
  } catch (error) {
    handleError(error);
  }
};

// Get detailed information for a specific pensioner
export const getPensionerDetails = async (pensionerId, token) => {
  try {
    const response = await axios.get(`/api/admin/get-pensioners/${pensionerId}`, {
      auth: {
        username: token,
      },
    });
    return response.data; // Pensioner details
  } catch (error) {
    handleError(error);
  }
};

// Update the status of a pensioner
export const updatePensionerStatus = async (pensionerId, status, payoutAmount, token) => {
  try {
    const response = await axios.put(
      `/api/admin/pensioners/${pensionerId}/status`,
      { status: status, payout_amount: payoutAmount },
      {
        auth: {
          username: token,
        },
      }
    );
    return response.data; // { message: 'Pensioner status updated successfully' }
  } catch (error) {
    handleError(error);
  }
};

// Update the payout amount for a specific pensioner
export const updatePensionerPayout = async (pensionerId, payoutAmount, token) => {
  try {
    const response = await axios.put(
      `/api/admin/pensioners/${pensionerId}/payout`,
      { payout_amount: payoutAmount },
      {
        auth: {
          username: token,
        },
      }
    );
    return response.data; // { message: 'Payout amount updated successfully' }
  } catch (error) {
    handleError(error);
  }
};

// Create a new schedule payout
export const createSchedulePayout = async (scheduleData, token) => {
  try {
    const response = await axios.post('/api/admin/schedule-payout', scheduleData, {
      auth: {
        username: token,
      },
    });
    return response.data; // { success: true, message: 'Schedule payout created successfully', schedule_id: <id> }
  } catch (error) {
    handleError(error);
  }
};

// Get all schedule payouts
export const getSchedulePayouts = async (token) => {
  try {
    const response = await axios.get('/api/admin/schedule-payout', {
      auth: {
        username: token,
      },
    });
    return response.data; // Array of schedule payouts
  } catch (error) {
    handleError(error);
  }
};

// Get system alerts
export const getSystemAlert = async (token) => {
  try {
    const response = await axios.get('/api/admin/system-alert', {
      auth: {
        username: token,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// set schedule payouts
export const setSchedulePayouts = async (token, payload) => {
  try {
    const response = await axios.post('/api/admin/schedule-payout', payload, {
      auth: {
        username: token,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
