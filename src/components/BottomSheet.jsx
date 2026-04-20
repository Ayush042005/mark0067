import React, { useEffect } from 'react';
import './BottomSheet.css';

export const BottomSheet = ({ isOpen, onClose, title, children }) => {
  // Prevent scrolling on body when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="bottom-sheet-backdrop fade-in" onClick={onClose} aria-hidden="true" />
      <div className="bottom-sheet-container animate-slide-up" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div className="bottom-sheet-header">
          <div className="drag-handle" />
          {title && <h2 id="sheet-title" className="heading-2">{title}</h2>}
          <button className="close-btn" onClick={onClose} aria-label="Close sheet">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="bottom-sheet-content">
          {children}
        </div>
      </div>
    </>
  );
};
