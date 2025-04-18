import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Components
import Dashboard from './components/Dashboard.jsx';
import RewardsList from './components/RewardsList.jsx';
import RewardDetail from './components/RewardDetail.jsx';
import RedemptionHistory from './components/RedemptionHistory.jsx';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-primary-50';
  };

  return (
    <nav className="flex space-x-4">
      <Link
        to="/"
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/')}`}
      >
        Dashboard
      </Link>
      <Link
        to="/rewards"
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/rewards')}`}
      >
        Rewards
      </Link>
      <Link
        to="/history"
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/history')}`}
      >
        History
      </Link>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  Rewards App
                </h1>
              </div>
              <Navigation />
            </div>
          </div>
        </header>

        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rewards" element={<RewardsList />} />
              <Route path="/rewards/:id" element={<RewardDetail />} />
              <Route path="/history" element={<RedemptionHistory />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Rewards Redemption App
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App; 
