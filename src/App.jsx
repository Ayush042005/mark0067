import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import { useSimulator } from './hooks/useSimulator';
import { BottomNav } from './components/BottomNav';
import { AlertBanner } from './components/AlertBanner';

import { StadBotFAB } from './components/StadBotFAB';

// Lazy loading the tabs
const Home = React.lazy(() => import('./tabs/Home').then(m => ({ default: m.Home })));
const Map = React.lazy(() => import('./tabs/Map').then(m => ({ default: m.Map })));
const Food = React.lazy(() => import('./tabs/Food').then(m => ({ default: m.Food })));
const Alerts = React.lazy(() => import('./tabs/Alerts').then(m => ({ default: m.Alerts })));
const Profile = React.lazy(() => import('./tabs/Profile').then(m => ({ default: m.Profile })));

// A component to initialize hooks that require AppContext
const AppShell = () => {
  useSimulator(); // Start live simulations

  return (
    <BrowserRouter>
      <div className="app-container">
        <AlertBanner />
        <main className="main-content" id="main-content">
          <Suspense fallback={<div className="animate-pulse p-4">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/food" element={<Food />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>
        <StadBotFAB />
        <BottomNav />
      </div>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;
