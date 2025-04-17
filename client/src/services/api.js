import axios from 'axios';

const API_URL = '/api/v1';

// For the demo, we'll use a fixed user ID
// In a real app, this would come from authentication
const USER_ID = 1; 

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/${USER_ID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching points balance:', error);
    throw error;
  }
};

export const getRewards = async () => {
  try {
    const response = await axios.get(`${API_URL}/rewards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rewards:', error);
    throw error;
  }
};

export const getRewardById = async (rewardId) => {
  try {
    const response = await axios.get(`${API_URL}/rewards/${rewardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reward details:', error);
    throw error;
  }
};

export const redeemReward = async (rewardId) => {
  try {
    const response = await axios.post(`${API_URL}/users/${USER_ID}/redemptions`, {
      reward_id: rewardId
    });
    return response.data;
  } catch (error) {
    console.error('Error redeeming reward:', error);
    throw error;
  }
};

export const getRedemptionHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/${USER_ID}/redemptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching redemption history:', error);
    throw error;
  }
}; 
