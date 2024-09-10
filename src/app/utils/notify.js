import axios from 'axios';

export const sendNotification = async (message) => {
  try {
    const response = await axios.post('/api/line-notify', { message });
    return response.data;
  } catch (error) {
    console.error('Error sending notification', error);
    throw error;
  }
};
