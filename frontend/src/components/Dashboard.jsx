import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSkills: 0,
    totalSessions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Fetch initial stats
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats({
          totalUsers: response.data.totalUsers || 0,
          totalSkills: response.data.totalSkills || 0,
          totalSessions: response.data.totalSessions || 0,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch stats", err);
        setError("Could not load dashboard data.");
        setLoading(false);
      }
    };

    fetchStats();

    // Socket.io for live notifications (matches backend port 5000)
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) return <div className="loader">Loading Dashboard...</div>;
  if (error) return <div className="loader" style={{ color: '#ef4444' }}>{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="live-badge">
          <div className="pulse"></div>
          {isConnected ? 'Live Updates Active' : 'Connecting to Live Server...'}
        </div>
        <h1>UniSkills Admin Dashboard</h1>
        <p>Real-time platform statistics & insights</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{stats.totalUsers}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-label">Total Skills</div>
          <div className="stat-value">{stats.totalSkills}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-label">Total Sessions</div>
          <div className="stat-value">{stats.totalSessions}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
