import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/useAppContext';
import './BottomNav.css';

export const BottomNav = () => {
  const { cartCount, unreadAlertsCount } = useAppContext();

  const tabs = [
    { to: '/', icon: 'home', label: 'Home' },
    { to: '/map', icon: 'map', label: 'Map' },
    { to: '/food', icon: 'fastfood', label: 'Food', badge: cartCount },
    { to: '/alerts', icon: 'notifications', label: 'Alerts', badge: unreadAlertsCount },
    { to: '/profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <NavLink 
          key={tab.to} 
          to={tab.to} 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          aria-label={tab.label}
        >
          <span className="icon-wrapper">
            <span className={`material-symbols-roundeds material-symbols-outlined`}>{tab.icon}</span>
            {tab.badge > 0 && <span className="badge">{tab.badge > 99 ? '99+' : tab.badge}</span>}
          </span>
          <span className="label" aria-hidden="true">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
