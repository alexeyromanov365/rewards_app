import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPointsBalance, getRewards, getRedemptionHistory } from '../services/api';

const Dashboard = () => {
  const [pointsBalance, setPointsBalance] = useState(0);
  const [recentRewards, setRecentRewards] = useState([]);
  const [recentRedemptions, setRecentRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel
        const [pointsData, rewardsData, redemptionsData] = await Promise.all([
          getPointsBalance(),
          getRewards(),
          getRedemptionHistory()
        ]);
        
        setPointsBalance(pointsData.points);
        setRecentRewards(rewardsData.slice(0, 3)); // Show only first 3 rewards
        setRecentRedemptions(redemptionsData.slice(0, 3)); // Show only first 3 redemptions
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
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
        Your Current Points: {pointsBalance.toLocaleString()}
      </div>
      
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Available Rewards</h3>
            <Link to="/rewards" className="btn btn-primary">View All</Link>
          </div>
          
          <div className="card-content">
            {recentRewards.length > 0 ? (
              <ul className="dashboard-rewards-list">
                {recentRewards.map(reward => (
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
            {recentRedemptions.length > 0 ? (
              <ul className="dashboard-history-list">
                {recentRedemptions.map(redemption => (
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