import React, { useState, useEffect, useCallback } from 'react';
import { initialAlerts, foodStalls } from '../data/mockData';
import { AppContext } from './appContext';

export const AppProvider = ({ children }) => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [stalls, setStalls] = useState(foodStalls);
  const [cartCount, setCartCount] = useState(0);
  
  // Real-time Simulation: Food stall wait times changing
  useEffect(() => {
    const timer = setInterval(() => {
      setStalls(currentStalls => 
        currentStalls.map(stall => {
          // Randomly change wait time by -2, -1, 0, 1, or 2 minutes, maintaining bounds 1 to 45
          const delta = Math.floor(Math.random() * 5) - 2;
          const newWait = Math.max(1, Math.min(45, stall.waitTime + delta));
          return { ...stall, waitTime: newWait };
        })
      );
    }, 10000); // Every 10 seconds
    return () => clearInterval(timer);
  }, []);

  // Simulator helper to push new alerts periodically
  const pushAlert = useCallback((newAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
  }, []);

  const markAlertAsRead = useCallback((id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  }, []);

  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  return (
    <AppContext.Provider value={{
      alerts,
      pushAlert,
      markAlertAsRead,
      unreadAlertsCount,
      stalls,
      cartCount,
      setCartCount
    }}>
      {children}
    </AppContext.Provider>
  );
};
