import { useEffect } from 'react';
import { useAppContext } from '../context/useAppContext';

export const useSimulator = () => {
  const { pushAlert } = useAppContext();

  useEffect(() => {
    // Alert Simulator
    const alertInterval = setInterval(() => {
      const mockLiveAlerts = [
        { type: 'safety', title: 'Hydration Reminder', body: 'Temperatures are high today. Drink plenty of water.', severity: 'info' },
        { type: 'crowd', title: 'Food Area Busy', body: 'The Food Court North is currently at capacity.', severity: 'warning' },
        { type: 'match', title: 'Wicket!', body: 'India strikes! Batsman caught out at long-on.', severity: 'info' },
        { type: 'match', title: 'Match Update', body: 'Strategic timeout has begun. Play resumes in 2.5 minutes.', severity: 'info' },
      ];
      
      const randomAlert = mockLiveAlerts[Math.floor(Math.random() * mockLiveAlerts.length)];
      
      pushAlert({
        id: `mock-${Date.now()}`,
        timestamp: new Date().toISOString(),
        isRead: false,
        ...randomAlert
      });
      
    }, 25000 + Math.random() * 15000); // 25-40 seconds

    return () => clearInterval(alertInterval);
  }, [pushAlert]);
};
