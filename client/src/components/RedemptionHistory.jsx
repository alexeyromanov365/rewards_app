import React, { useState, useEffect } from 'react';
import { getRedemptionHistory } from '../services/api';

const RedemptionHistory = () => {
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getRedemptionHistory();
        setRedemptions(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load redemption history. Please try again later.');
        setLoading(false);
        console.error('Error fetching redemption history:', err);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="loading">Loading redemption history...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="redemption-history">
      <h2>Redemption History</h2>
      
      {redemptions.length > 0 ? (
        <div className="card">
          <ul className="history-list">
            {redemptions.map(redemption => (
              <li key={redemption.id} className="history-item">
                <div className="history-reward">{redemption.reward.name}</div>
                <div className="history-date">{formatDate(redemption.redeemed_at)}</div>
                <div className="history-points">{redemption.reward.points_cost} points</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You haven't redeemed any rewards yet.</p>
      )}
    </div>
  );
};

export default RedemptionHistory; 