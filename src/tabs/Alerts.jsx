import React, { useState } from 'react';
import { useAppContext } from '../context/useAppContext';
import './Alerts.css';

export const Alerts = () => {
  const { alerts, markAlertAsRead } = useAppContext();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'crowd', 'gate', 'match', 'safety'];

  const filteredAlerts = alerts.filter(a => filter === 'All' || a.type === filter);

  const getIconForType = (type) => {
    switch (type) {
      case 'crowd': return 'groups';
      case 'gate': return 'door_front';
      case 'match': return 'sports_cricket';
      case 'safety': return 'health_and_safety';
      default: return 'notifications';
    }
  };

  const getRelativeTime = (isoString) => {
    const diff = Math.floor((new Date() - new Date(isoString)) / 60000); // mins
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff/60)}h ago`;
  };

  return (
    <div className="alerts-tab fade-in">
      <h1 className="heading-1 mb-4">Notifications</h1>

      <div className="filter-scroll mb-4">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`filter-pill ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
            style={{textTransform: 'capitalize'}}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="alerts-feed flex-col gap-3">
        {filteredAlerts.length === 0 ? (
          <div className="text-center text-muted mt-8">
            <span className="material-symbols-outlined text-4xl mb-2">notifications_paused</span>
            <p>No alerts in this category.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div 
              key={alert.id} 
              className={`alert-card shadow-sm severity-${alert.severity} ${!alert.isRead ? 'unread' : ''}`}
              onClick={() => markAlertAsRead(alert.id)}
            >
              <div className="alert-icon-wrapper">
                <span className="material-symbols-outlined">{getIconForType(alert.type)}</span>
              </div>
              <div className="alert-content">
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-bold ${!alert.isRead ? 'text-primary' : ''}`}>{alert.title}</span>
                  <span className="text-muted text-xs whitespace-nowrap ml-2">{getRelativeTime(alert.timestamp)}</span>
                </div>
                <p className={`text-sm ${!alert.isRead ? 'font-semibold' : 'text-muted'}`}>{alert.body}</p>
              </div>
              {!alert.isRead && <div className="unread-dot" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
