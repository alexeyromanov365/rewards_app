import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRewards, getPointsBalance } from '../services/api';

const RewardsList = () => {
  const [rewards, setRewards] = useState([]);
  const [pointsBalance, setPointsBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch rewards and points balance in parallel
        const [rewardsData, pointsData] = await Promise.all([
          getRewards(),
          getPointsBalance()
        ]);
        
        setRewards(rewardsData);
        setPointsBalance(pointsData.points);
        setLoading(false);
      } catch (err) {
        setError('Failed to load rewards. Please try again later.');
        setLoading(false);
        console.error('Error fetching rewards:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading rewards...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="rewards">
      <h2>Available Rewards</h2>
      
      <div className="points-display">
        Your Current Points: {pointsBalance.toLocaleString()}
      </div>
      
      {rewards.length > 0 ? (
        <div className="rewards-grid">
          {rewards.map(reward => (
            <div key={reward.id} className="card reward-card">
              <div className="card-header">
                <h3 className="card-title">{reward.name}</h3>
                <span className="reward-points">{reward.points_cost} pts</span>
              </div>
              
              <div className="card-content">
                <p>{reward.description}</p>
              </div>
              
              <div className="card-footer">
                <Link 
                  to={`/rewards/${reward.id}`} 
                  className={`btn ${pointsBalance >= reward.points_cost ? 'btn-primary' : 'btn-disabled'}`}
                  aria-disabled={pointsBalance < reward.points_cost}
                >
                  {pointsBalance >= reward.points_cost ? 'View Details' : 'Not Enough Points'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No rewards available at the moment.</p>
      )}
    </div>
  );
};

export default RewardsList; 