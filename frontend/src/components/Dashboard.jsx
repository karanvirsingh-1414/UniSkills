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
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Fetch dashboard stats from backend
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dashboard/stats');
        setStats({
          totalUsers: response.data.totalUsers || 0,
          totalSkills: response.data.totalSkills || 0,
          totalSessions: response.data.totalSessions || 0,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch stats", err);
        setLoading(false);
      }
    };
    fetchStats();

    // Socket.io for live connection status
    const socket = io('http://localhost:8080');
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    return () => socket.disconnect();
  }, []);

  const fakeSessions = [
    { id: 1, name: "Sarah M.", topic: "Python Basics", duration: "55 min", time: "LIVE", color: "#ec4899" },
    { id: 2, name: "Liam K.", topic: "Digital Marketing", duration: "45 min", time: "5 mins ago", color: "#3b82f6" },
    { id: 3, name: "Chen L.", topic: "UI/UX Design", duration: "1.2 hrs", time: "5 mins ago", color: "#10b981" },
    { id: 4, name: "Maria G.", topic: "Public Speaking", duration: "1.2 hrs", time: "5 mins ago", color: "#f59e0b" }
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar Overlay */}
      <div className="sidebar">
        <div className="brand">
          <div className="brand-icon">U+S</div>
          <div>UniSkills</div>
        </div>
        <div className="nav-menu">
          <div className="nav-item active">🏠 Dashboard</div>
          <div className="nav-item">📚 Skills</div>
          <div className="nav-item">🤝 Mentorship</div>
          <div className="nav-item">💳 Wallet</div>
          <div className="nav-item">💬 Messages</div>
          <div className="nav-item">⚙️ Profile</div>
        </div>
        <div className="nav-item logout">↪ Logout</div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="dashboard-header">
          <div className="header-title">
            <h1>Dashboard</h1>
            <p>Oct 26, 2026</p>
          </div>
          <div className={`live-badge ${isConnected ? 'connected' : 'disconnected'}`}>
            <div className="pulse"></div>
            {isConnected ? 'LIVE UPDATES ACTIVE' : 'CONNECTING...'}
          </div>
        </div>

        {loading ? (
          <h3 style={{color: '#94a3b8'}}>Loading Premium Assets...</h3>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card purple-card">
                <div className="stat-icon">👥</div>
                <div className="stat-label">Total Users</div>
                <div className="stat-value">{stats.totalUsers.toLocaleString()}</div>
                <div className="stat-growth">↗ 3.20%</div>
              </div>
              
              <div className="stat-card blue-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-label">Total Skills</div>
                <div className="stat-value">{stats.totalSkills.toLocaleString()}</div>
                <div className="stat-growth">↗ 4.78%</div>
              </div>
              
              <div className="stat-card indigo-card">
                <div className="stat-icon">📅</div>
                <div className="stat-label">Total Sessions</div>
                <div className="stat-value">{stats.totalSessions.toLocaleString()}</div>
                <div className="stat-growth">↗ 3.79%</div>
              </div>
            </div>

            <div className="feed-panel">
              <div className="feed-header">
                <h3>Recent Skill-Sharing Sessions</h3>
                <div className="dots">•••</div>
              </div>
              <div className="feed-list">
                {fakeSessions.map((session) => (
                  <div className="feed-item" key={session.id}>
                    <div className="avatar" style={{background: session.color}}>
                      {session.name.charAt(0)}
                    </div>
                    <div className="feed-info">
                      <span className="feed-name">{session.name}</span>
                      <span className="feed-topic">{session.topic}</span>
                      <span className="feed-duration">{session.duration}</span>
                      {session.time === 'LIVE' ? (
                        <span className="badge-live">LIVE</span>
                      ) : (
                        <span className="feed-time">{session.time}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
