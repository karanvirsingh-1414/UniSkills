import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 3450, totalSkills: 1128, totalSessions: 7890 });
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dashboard/stats');
        setStats({
          totalUsers: response.data.totalUsers || 3450,
          totalSkills: response.data.totalSkills || 1128,
          totalSessions: response.data.totalSessions || 7890,
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchStats();

    const socket = io('http://localhost:8080');
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    return () => socket.disconnect();
  }, []);

  const fakeSessions = [
    { id: 1, name: "Sarah M.", topic: "Python Basics", duration: "55 min", time: "LIVE", img: "https://i.pravatar.cc/150?img=5" },
    { id: 2, name: "Liam K.", topic: "Digital Marketing", duration: "45 min", time: "5 mins ago", img: "https://i.pravatar.cc/150?img=11" },
    { id: 3, name: "Chen L.", topic: "UI/UX Design", duration: "1.2 hrs", time: "5 mins ago", img: "https://i.pravatar.cc/150?img=8" },
    { id: 4, name: "Maria G.", topic: "Public Speaking", duration: "1.2 hrs", time: "5 mins ago", img: "https://i.pravatar.cc/150?img=9" }
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
          <div className="nav-item active"><span className="nav-icon">🏠</span> Dashboard</div>
          <div className="nav-item"><span className="nav-icon">📚</span> Skills</div>
          <div className="nav-item"><span className="nav-icon">👥</span> Mentorship</div>
          <div className="nav-item"><span className="nav-icon">💳</span> Wallet</div>
          <div className="nav-item"><span className="nav-icon">💬</span> Messages</div>
          <div className="nav-item"><span className="nav-icon">⚙️</span> Profile</div>
        </div>
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
            LIVE UPDATES ACTIVE
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card purple-card">
            <div className="stat-icon">👤</div>
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
            <div style={{color: '#8b95a5', letterSpacing: '2px', fontWeight: 'bold'}}>•••</div>
          </div>
          <div className="feed-list">
            {fakeSessions.map((session) => (
              <div className="feed-item" key={session.id}>
                <div className="avatar-wrapper">
                  <img src={session.img} alt={session.name} className="avatar" />
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
      </div>
    </div>
  );
};
export default Dashboard;
