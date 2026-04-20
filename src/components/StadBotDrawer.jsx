import React, { useState, useRef, useEffect } from 'react';
import { BottomSheet } from './BottomSheet';
import {
  sendChatMessage,
  getMessageCount,
  getMaxMessages,
} from '../services/gemini';
import './StadBot.css';

const INITIAL_MESSAGE = {
  id: 1,
  text: "Hi! I'm StadBot. How can I help you at Narendra Modi Stadium today?",
  sender: 'bot',
};

export const StadBotDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState('');
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Nearest washroom?", "Fastest food stall?", "Where's my seat?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend, options = {}) => {
    const text = textToSend || input.trim();
    const { skipUserMessage = false } = options;
    if (!text || isTyping) return;

    if (!skipUserMessage) {
      const newMsg = { id: Date.now(), text, sender: 'user' };
      setMessages(prev => [...prev, newMsg]);
    }
    setInput('');
    setIsTyping(true);
    setError(null);
    setLastFailedMessage(text);

    try {
      const responseText = await sendChatMessage(text);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'bot' }]);
      setLastFailedMessage('');
    } catch (err) {
      if (err.message === "SESSION_LIMIT_REACHED") {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: "You've reached the session limit. Please close and reopen the chat to start a new session.", sender: 'bot' }]);
      } else {
        setError('Failed to reach StadBot. Please try again.');
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSend(lastFailedMessage, { skipUserMessage: true });
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="StadBot Assistant">
      <div className="stadbot-chat-container">
        <div className="messages-list">
          {messages.map(msg => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="message-bubble bot typing-indicator">
              <span>.</span><span>.</span><span>.</span>
            </div>
          )}
          {error && (
            <div className="error-state">
              <span className="material-symbols-outlined text-danger">error</span>
              <p className="text-xs text-danger">{error}</p>
              <button className="retry-btn" onClick={handleRetry}>Retry</button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && !isTyping && (
          <div className="quick-replies animate-slide-up">
            {quickReplies.map(reply => (
              <button key={reply} className="chip" onClick={() => handleSend(reply)}>
                {reply}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input-area">
          <input 
            type="text" 
            placeholder="Ask StadBot anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isTyping || getMessageCount() >= getMaxMessages()}
          />
          <button 
            className="send-btn" 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping || getMessageCount() >= getMaxMessages()}
            aria-label="Send message"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
        
        <div className="message-counter">
          {getMessageCount()} / {getMaxMessages()} messages sent
        </div>
      </div>
    </BottomSheet>
  );
};
