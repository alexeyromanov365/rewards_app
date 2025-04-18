import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfile, getRewardById, redeemReward } from '../services/api';

const RewardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [redeemError, setRedeemError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userData, rewardData] = await Promise.all([
          getUserProfile(),
          getRewardById(id)
        ]);
        
        setPoints(userData.points);
        setReward(rewardData);
        setError(null);
      } catch (err) {
        setError('Failed to load reward details');
        console.error('Error loading reward:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRedeem = async () => {
    try {
      setRedeeming(true);
      setRedeemError(null);
      
      await redeemReward(id);
      
      setRedeemSuccess(true);
      const userData = await getUserProfile();
      setPoints(userData.points);
      
      setTimeout(() => {
        navigate('/history');
      }, 1000);
    } catch (err) {
      setRedeemError('Failed to redeem reward. Please try again.');
      console.error('Error redeeming reward:', err);
    } finally {
      setRedeeming(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!reward) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Reward not found
        </div>
      </div>
    );
  }

  const canRedeem = points >= reward.points_cost && reward.available;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Reward Details</h1>
          <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-lg">
            Your Points: <span className="font-bold">{points.toLocaleString()}</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold text-gray-800">{reward.name}</h2>
              <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                {reward.points_cost} pts
              </span>
            </div>
          </div>

          <div className="card-content">
            <p className="text-gray-600 mb-6">{reward.description}</p>

            {!reward.available && (
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg mb-4">
                This reward is currently unavailable
              </div>
            )}

            {redeemSuccess && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4">
                Reward successfully redeemed! Redirecting to your redemption history...
              </div>
            )}

            {redeemError && (
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg mb-4">
                {redeemError}
              </div>
            )}

            {!canRedeem && points < reward.points_cost && !redeemSuccess && (
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
                You need {reward.points_cost - points} more points to redeem this reward
              </div>
            )}
          </div>

          <div className="card-footer">
            <button
              onClick={handleRedeem}
              className={`btn ${canRedeem ? 'btn-primary' : 'btn-disabled'}`}
              disabled={!canRedeem || redeeming || redeemSuccess}
            >
              {redeeming ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Redeeming...
                </span>
              ) : (
                'Redeem Reward'
              )}
            </button>
            <button
              onClick={() => navigate('/rewards')}
              className="btn bg-gray-600 text-white hover:bg-gray-700 ml-4"
            >
              Back to Rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardDetail; 
