import React, { useEffect } from 'react';
import './Toast.css';

export const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast-container animate-slide-in-toast type-${type}`} role="alert">
      <span className="material-symbols-outlined icon">
        {type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
      </span>
      <span className="message">{message}</span>
      <button className="close-btn" onClick={onClose} aria-label="Close notification">
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
};
