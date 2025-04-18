import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Components
import Dashboard from './components/Dashboard.jsx';
import RewardsList from './components/RewardsList.jsx';
import RewardDetail from './components/RewardDetail.jsx';
import RedemptionHistory from './components/RedemptionHistory.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Rewards Redemption</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/rewards">Rewards</Link>
              </li>
              <li>
                <Link to="/history">History</Link>
              </li>
            </ul>
          </nav>
        </header>
        
        <main className="App-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rewards" element={<RewardsList />} />
            <Route path="/rewards/:id" element={<RewardDetail />} />
            <Route path="/history" element={<RedemptionHistory />} />
          </Routes>
        </main>
        
        <footer className="App-footer">
          <p>&copy; {new Date().getFullYear()} Rewards Redemption App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App; 
