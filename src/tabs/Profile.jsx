import React, { useState, useEffect } from 'react';
import './Profile.css';

export const Profile = () => {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');
  const [isSignedIn, setIsSignedIn] = useState(false); // Mock auth state

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  if (!isSignedIn) {
    return (
      <div className="profile-tab fade-in flex flex-col items-center justify-center" style={{height: '100%', paddingBottom: 100}}>
        <div className="mb-6 rounded-full bg-surface p-4 shadow-md">
          <span className="material-symbols-outlined text-4xl text-primary">account_circle</span>
        </div>
        <h2 className="heading-2 mb-2">Sign in to StadBot</h2>
        <p className="text-muted text-sm text-center mb-8 max-w-[280px]">
          Access your tickets, order history, and connect with friends.
        </p>
        <button 
          className="google-btn shadow-md"
          onClick={() => setIsSignedIn(true)}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="google-icon" />
          <span>Sign in with Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className="profile-tab fade-in">
      <h1 className="heading-1 mb-6">Profile</h1>

      <div className="profile-card shadow-sm mb-6 bg-surface p-4 rounded-lg flex items-center gap-4">
        <div className="avatar bg-primary text-white font-bold rounded-full flex items-center justify-center">
          JD
        </div>
        <div className="flex-col">
          <span className="font-bold text-lg">John Doe</span>
          <span className="text-sm text-muted">john.doe@example.com</span>
        </div>
      </div>

      <div className="settings-group mb-6">
        <h3 className="text-xs text-muted font-bold tracking-widest mb-2 uppercase">Settings</h3>
        
        <div className="setting-item bg-surface rounded-lg p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-muted">dark_mode</span>
            <span className="font-semibold text-sm">Appearance</span>
          </div>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            <span className="material-symbols-outlined">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>

      <div className="settings-group">
         <h3 className="text-xs text-muted font-bold tracking-widest mb-2 uppercase">Account</h3>
         <button className="setting-item w-full text-left bg-surface rounded-lg p-4 flex items-center gap-3 shadow-sm text-danger" onClick={() => setIsSignedIn(false)}>
            <span className="material-symbols-outlined">logout</span>
            <span className="font-semibold text-sm">Sign Out</span>
         </button>
      </div>

      <div className="text-center mt-8 text-xs text-muted">
        <p>Smart Stadium Companion MVP</p>
        <p>Powered by Vite & React</p>
      </div>
    </div>
  );
};
