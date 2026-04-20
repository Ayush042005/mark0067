import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/useAppContext';
import { initialAlerts } from '../data/mockData';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const { cartCount } = useAppContext();

  return (
    <div className="home-tab fade-in">
      <header className="home-header">
        <h1 className="heading-1">Narendra Modi Stadium</h1>
        <p className="text-muted text-sm mt-1">ICC Men's T20 World Cup Final</p>
      </header>

      <section className="match-card shadow-sm mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="live-badge animate-pulse">LIVE</span>
          <span className="text-xs text-muted">14.2 Overs</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="team">
            <span className="font-bold">IND</span>
            <span className="score">132/4</span>
          </div>
          <div className="vs text-muted text-xs">V/S</div>
          <div className="team text-right">
            <span className="font-bold text-muted">AUS</span>
            <span className="score text-muted">Yet to bat</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-center text-muted border-t pt-2 border-divider">
          Rohit Sharma 64*(38) • Hardik Pandya 12*(8)
        </div>
      </section>

      <div className="quick-actions grid-2 gap-4 mb-4">
        <button className="action-card shadow-sm" onClick={() => navigate('/map')}>
          <span className="material-symbols-outlined text-primary mb-2">navigation</span>
          <span className="font-semibold text-sm">Navigate</span>
        </button>
        <button className="action-card shadow-sm" onClick={() => navigate('/food')}>
          <span className="material-symbols-outlined text-info mb-2">fastfood</span>
          <span className="font-semibold text-sm">Order Food</span>
          {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
        </button>
      </div>

      <section className="stats-section mb-4">
        <h2 className="heading-2 mb-3">Stadium Quick Stats</h2>
        <div className="stats-grid grid-2 gap-4">
          <div className="stat-card">
            <span className="material-symbols-outlined text-muted">group</span>
            <div className="stat-info">
              <span className="stat-value">92%</span>
              <span className="stat-label">Capacity</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="material-symbols-outlined text-muted">thermostat</span>
            <div className="stat-info">
              <span className="stat-value">32°C</span>
              <span className="stat-label">Temperature</span>
            </div>
          </div>
        </div>
      </section>
      
      <section className="recent-alerts">
        <div className="flex justify-between items-center mb-3">
          <h2 className="heading-2">Recent Updates</h2>
          <button className="text-primary text-xs font-semibold" onClick={() => navigate('/alerts')}>View All</button>
        </div>
        <div className="home-alerts-list flex-col gap-2">
          {initialAlerts.slice(0, 2).map(alert => (
            <div key={alert.id} className={`home-alert-card severity-${alert.severity} shadow-sm`}>
              <span className="font-semibold text-sm">{alert.title}</span>
              <p className="text-xs text-muted mt-1">{alert.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
