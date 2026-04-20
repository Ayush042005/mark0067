import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/useAppContext';
import { BottomSheet } from '../components/BottomSheet';
import { Toast } from '../components/Toast';
import './Food.css';

export const Food = () => {
  const { stalls, setCartCount } = useAppContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedStall, setSelectedStall] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null); // null, 'Queued', 'Preparing', 'Ready'
  const [orderNumber, setOrderNumber] = useState(null);
  const [showToast, setShowToast] = useState('');

  const filteredStalls = useMemo(() => {
    return stalls.filter(stall => {
      if (search && !stall.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter === '< 5 min' && stall.waitTime >= 5) return false;
      if (filter === 'Vegetarian' && !stall.isVeg) return false;
      if (filter === 'Open Now' && !stall.isOpen) return false;
      return true;
    });
  }, [stalls, search, filter]);

  const placeOrder = () => {
    setCartCount(0);
    setOrderStatus('Queued');
    setOrderNumber(Math.floor(Math.random() * 900) + 100);
    setSelectedStall(null);
    setShowToast('Order placed successfully!');
    
    // Simulate order progress
    setTimeout(() => setOrderStatus('Preparing'), 15000);
    setTimeout(() => {
      setOrderStatus('Ready');
      setShowToast('Your order is ready for pickup!');
    }, 30000);
  };

  return (
    <div className="food-tab fade-in">
      <div className="sticky-header">
        <h1 className="heading-1 mb-3">Food & Beverage</h1>
        
        {/* Search */}
        <div className="search-bar mb-3">
          <span className="material-symbols-outlined icon text-muted">search</span>
          <input 
            type="text" 
            placeholder="Search stalls or cuisines..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="filter-scroll">
          {['All', '< 5 min', 'Vegetarian', 'Open Now'].map(f => (
            <button 
              key={f} 
              className={`filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {orderStatus && (
        <div className="order-status-card shadow-sm mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Current Order</h3>
            <span className="text-primary font-bold text-sm">#{orderNumber}</span>
          </div>
          <div className="stepper">
            <div className={`step ${orderStatus === 'Queued' || orderStatus === 'Preparing' || orderStatus === 'Ready' ? 'active' : ''}`}>
              <div className="step-icon"><span className="material-symbols-outlined">receipt_long</span></div>
              <span className="step-label">Queued</span>
            </div>
            <div className="step-line" />
            <div className={`step ${orderStatus === 'Preparing' || orderStatus === 'Ready' ? 'active' : ''}`}>
              <div className="step-icon"><span className="material-symbols-outlined">skillet</span></div>
              <span className="step-label">Preparing</span>
            </div>
            <div className="step-line" />
            <div className={`step ${orderStatus === 'Ready' ? 'active alert' : ''}`}>
              <div className="step-icon"><span className="material-symbols-outlined">takeout_dining</span></div>
              <span className="step-label">Ready</span>
            </div>
          </div>
          {orderStatus === 'Ready' && (
            <button
              className="primary-btn mt-3 full-width"
              onClick={() => {
                setOrderStatus(null);
                setOrderNumber(null);
              }}
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      <div className="stalls-list flex-col gap-3">
        {filteredStalls.map(stall => (
          <div 
            key={stall.id} 
            className={`stall-card shadow-sm ${!stall.isOpen ? 'opacity-50' : ''}`}
            onClick={() => stall.isOpen && setSelectedStall(stall)}
          >
            <div className="stall-emoji">{stall.emoji}</div>
            <div className="stall-info">
              <span className="font-bold">{stall.name}</span>
              <span className="text-xs text-muted">{stall.cuisine} • {stall.distance}m</span>
              <div className="wait-time-indicator mt-1">
                <span className={`material-symbols-outlined text-xs ${stall.waitTime > 10 ? 'text-danger' : 'text-success'}`}>
                  schedule
                </span>
                <span className={`text-xs ml-1 font-semibold ${stall.waitTime > 15 ? 'text-danger' : 'text-success'}`}>
                  {stall.waitTime} min wait
                </span>
              </div>
            </div>
            <div className="crowd-bar-container">
              <div className="crowd-bar">
                <div 
                  className={`crowd-fill ${stall.crowdLevel > 0.7 ? 'bg-danger' : stall.crowdLevel > 0.4 ? 'bg-warning' : 'bg-success'}`} 
                  style={{height: `${stall.crowdLevel * 100}%`}} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomSheet isOpen={!!selectedStall} onClose={() => setSelectedStall(null)} title={selectedStall?.name}>
        {selectedStall && (
          <div className="menu-container">
            <h3 className="font-bold mb-3">Menu</h3>
            <div className="menu-list flex-col gap-3 mb-4">
              {selectedStall.menu.map((item, i) => (
                <div key={i} className="menu-item flex justify-between items-center bg-surface p-3 rounded-md border border-divider">
                  <span className="font-semibold">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold">{item.price}</span>
                    <button 
                      className="add-btn bg-primary text-white p-1 rounded-full flex items-center justify-center"
                      onClick={() => {
                        setCartCount(c => c + 1);
                        setShowToast(`Added ${item.name} to cart`);
                      }}
                    >
                      <span className="material-symbols-outlined" style={{fontSize: 16}}>add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="primary-btn full-width" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        )}
      </BottomSheet>

      {showToast && <Toast message={showToast} onClose={() => setShowToast('')} type="success" />}
    </div>
  );
};
