import { useAppContext } from '../context/useAppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './AlertBanner.css';

export const AlertBanner = () => {
  const { alerts } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const activeAlert = alerts.find(
    (alert) =>
      !alert.isRead &&
      (alert.severity === 'critical' || alert.severity === 'warning')
  );

  // Don't show on the alerts page so it doesn't redundant
  if (!activeAlert || location.pathname === '/alerts') return null;

  return (
    <div 
      className={`alert-banner severity-${activeAlert.severity} animate-slide-up`}
      onClick={() => navigate('/alerts')}
      role="alert"
      aria-live="assertive"
    >
      <span className="material-symbols-outlined icon">
        {activeAlert.severity === 'critical' ? 'warning' : 'info'}
      </span>
      <div className="content">
        <span className="title font-bold text-sm">{activeAlert.title}</span>
        <span className="body text-xs">{activeAlert.body}</span>
      </div>
      <span className="material-symbols-outlined chevron">chevron_right</span>
    </div>
  );
};
