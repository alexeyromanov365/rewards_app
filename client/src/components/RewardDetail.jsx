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
      // Update points balance after redemption
      const userData = await getUserProfile();
      setPoints(userData.points);
      
      setRedeeming(false);
      
      // Redirect to history page after a short delay
      setTimeout(() => {
        navigate('/history');
      }, 2000);
    } catch (err) {
      setRedeemError('Failed to redeem reward. Please try again.');
      setRedeeming(false);
      console.error('Error redeeming reward:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading reward details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!reward) {
    return <div className="error">Reward not found.</div>;
  }

  const canRedeem = points >= reward.points_cost && reward.available;

  return (
    <div className="reward-detail">
      <h2>Reward Details</h2>
      
      <div className="points-display">
        Your Current Points: {points.toLocaleString()}
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{reward.name}</h3>
          <span className="reward-points">{reward.points_cost} pts</span>
        </div>
        
        <div className="card-content">
          <p>{reward.description}</p>
          
          {!reward.available && (
            <div className="unavailable-notice">
              This reward is currently unavailable.
            </div>
          )}
          
          {redeemSuccess && (
            <div className="success-message">
              Reward successfully redeemed! Redirecting to your redemption history...
            </div>
          )}
          
          {redeemError && (
            <div className="error-message">
              {redeemError}
            </div>
          )}
        </div>
        
        <div className="card-footer">
          <button
            onClick={handleRedeem}
            className={`btn ${canRedeem ? 'btn-success' : 'btn-disabled'}`}
            disabled={!canRedeem || redeeming || redeemSuccess}
          >
            {redeeming ? 'Redeeming...' : 'Redeem Reward'}
          </button>
          <button
            onClick={() => navigate('/rewards')}
            className="btn btn-primary"
            style={{ marginLeft: '10px' }}
          >
            Back to Rewards
          </button>
        </div>
      </div>
      
      {!canRedeem && points < reward.points_cost && (
        <div className="not-enough-points">
          <p>You need {reward.points_cost - points} more points to redeem this reward.</p>
        </div>
      )}
    </div>
  );
};

export default RewardDetail; 
