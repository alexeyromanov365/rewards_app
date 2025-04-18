import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile, getRewards, getRedemptionHistory } from '../services/api';

const Dashboard = () => {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [userData, rewardsData, redemptionsData] = await Promise.all([
          getUserProfile(),
          getRewards(),
          getRedemptionHistory()
        ]);
        
        setPoints(userData.points);
        setRewards(rewardsData.slice(0, 3));
        setRedemptions(redemptionsData.slice(0, 3));
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="points-display">
        Your Current Points: {points.toLocaleString()}
      </div>
      
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Available Rewards</h3>
            <Link to="/rewards" className="btn btn-primary">View All</Link>
          </div>
          
          <div className="card-content">
            {rewards.length > 0 ? (
              <ul className="dashboard-rewards-list">
                {rewards.map(reward => (
                  <li key={reward.id}>
                    <Link to={`/rewards/${reward.id}`}>{reward.name}</Link>
                    <span className="reward-points">{reward.points_cost} pts</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No rewards available at the moment.</p>
            )}
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Redemptions</h3>
            <Link to="/history" className="btn btn-primary">View All</Link>
          </div>
          
          <div className="card-content">
            {redemptions.length > 0 ? (
              <ul className="dashboard-history-list">
                {redemptions.map(redemption => (
                  <li key={redemption.id}>
                    <div className="history-reward">{redemption.reward.name}</div>
                    <div className="history-date">
                      {new Date(redemption.redeemed_at).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't redeemed any rewards yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
