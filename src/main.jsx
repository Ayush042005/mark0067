import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { registerSW } from 'virtual:pwa-register'

// Register Service Worker for PWA
registerSW({
  onNeedRefresh() {
    // We could show a prompt here in a real app
    console.log('New content available, refresh to update.');
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  },
})

// Initialize theme
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme : 'dark';
};

document.documentElement.setAttribute('data-theme', getInitialTheme());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
