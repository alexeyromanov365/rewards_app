import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRewards, getUserProfile } from '../services/api';

const RewardsList = () => {
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rewardsData, userData] = await Promise.all([
          getRewards(),
          getUserProfile()
        ]);
        setRewards(rewardsData);
        setPoints(userData.points);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Available Rewards</h1>
        <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-lg">
          Your Points: <span className="font-bold">{points.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="card-header">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800">{reward.name}</h3>
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {reward.points_cost} pts
                </span>
              </div>
            </div>

            <div className="card-content">
              <p className="text-gray-600 mb-4">{reward.description}</p>
              
              {!reward.available && (
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm">
                  This reward is currently unavailable
                </div>
              )}
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
    </div>
  );
};

export default RewardsList; 
