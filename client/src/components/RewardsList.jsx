import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile, getRewards } from '../services/api';

const RewardsList = () => {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [userData, rewardsData] = await Promise.all([
          getUserProfile(),
          getRewards()
        ]);
        
        setPoints(userData.points);
        setRewards(rewardsData);
        setError(null);
      } catch (err) {
        setError('Failed to load rewards');
        console.error('Error loading rewards:', err);
      } finally {
        setLoading(false);
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
        Your Current Points: {points.toLocaleString()}
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
                  className={`btn ${points >= reward.points_cost ? 'btn-primary' : 'btn-disabled'}`}
                  aria-disabled={points < reward.points_cost}
                >
                  {points >= reward.points_cost ? 'View Details' : 'Not Enough Points'}
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
