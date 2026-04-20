import React, { useState } from 'react';
import { StadBotDrawer } from './StadBotDrawer';
import { resetChatSession } from '../services/gemini';
import './StadBot.css';

export const StadBotFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  const handleOpen = () => {
    resetChatSession();
    setSessionKey((current) => current + 1);
    setIsOpen(true);
  };

  const handleClose = () => {
    resetChatSession();
    setIsOpen(false);
  };

  return (
    <>
      <button 
        className="stadbot-fab shadow-lg" 
        onClick={handleOpen}
        aria-label="Open AI Assistant StadBot"
      >
        <span className="material-symbols-outlined star-icon">smart_toy</span>
      </button>

      <StadBotDrawer key={sessionKey} isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
