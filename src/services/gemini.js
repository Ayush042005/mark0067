import { GoogleGenAI } from '@google/genai';
import { foodStalls, friends, initialAlerts, pois } from '../data/mockData';

const apiKey = import.meta.env.VITE_GEMINI_KEY;

const SYSTEM_PROMPT =
  'You are StadBot, an AI assistant for Narendra Modi Stadium. ' +
  'Help users find washrooms, food stalls, seats, gates, and navigate the stadium. ' +
  'Keep responses concise (under 60 words), friendly, and stadium-specific. ' +
  'If asked something unrelated to the stadium, politely redirect.';

let chatSession = null;
let messageCount = 0;
const MAX_MESSAGES = 10;
let lastRequestTime = 0;
let ai = null;

const normalizeText = (value) => value.toLowerCase().trim();

const getNearestPoi = (type) => {
  const matches = pois.filter((poi) => poi.type === type);
  return matches.sort((a, b) => a.waitTime - b.waitTime)[0] ?? null;
};

const getFastestFoodStall = () => {
  const openStalls = foodStalls.filter((stall) => stall.isOpen);
  return openStalls.sort((a, b) => a.waitTime - b.waitTime)[0] ?? null;
};

const getBusiestGateAlert = () =>
  initialAlerts.find((alert) => alert.type === 'crowd' || alert.type === 'gate') ?? null;

const buildFallbackResponse = (message) => {
  const text = normalizeText(message);

  if (text.includes('washroom') || text.includes('restroom') || text.includes('toilet')) {
    const washroom = getNearestPoi('washroom');
    if (washroom) {
      return `${washroom.name} is your best bet right now on ${washroom.floor}. Current wait is about ${washroom.waitTime} minutes.`;
    }
  }

  if (text.includes('food') || text.includes('stall') || text.includes('eat') || text.includes('drink')) {
    const stall = getFastestFoodStall();
    if (stall) {
      return `${stall.name} is the quickest open option right now. It's about ${stall.distance}m away with a ${stall.waitTime} minute wait.`;
    }
  }

  if (text.includes('seat') || text.includes('section') || text.includes('where am i')) {
    const friend = friends[1];
    return `If you’re finding your seat, open the Map tab and tap a nearby gate or facility to start walking directions. ${friend.name} is in Section ${friend.section}, Seat ${friend.seat}.`;
  }

  if (text.includes('gate') || text.includes('entry') || text.includes('entrance')) {
    const gateAlert = getBusiestGateAlert();
    if (gateAlert) {
      return `${gateAlert.body} Right now, Main Gate A looks calmer than Gate E.`;
    }
  }

  if (text.includes('medical') || text.includes('first aid') || text.includes('help')) {
    const medical = getNearestPoi('medical');
    if (medical) {
      return `${medical.name} is available on the ${medical.floor} level near the central concourse.`;
    }
  }

  if (text.includes('parking')) {
    const parking = getNearestPoi('parking');
    if (parking) {
      return `${parking.name} is available on the ${parking.floor}. Current congestion is around ${Math.round(parking.crowdLevel * 100)}%.`;
    }
  }

  return 'I can help with seats, gates, washrooms, food stalls, parking, and first aid around the stadium.';
};

export const initChatSession = () => {
  messageCount = 0;
  lastRequestTime = 0;

  if (!apiKey) {
    chatSession = null;
    ai = null;
    return;
  }

  ai = new GoogleGenAI({ apiKey });

  chatSession = ai.chats.create({
    model: 'gemini-2.0-flash',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      maxOutputTokens: 150,
    },
    history: [],
  });

};

export const resetChatSession = () => {
  chatSession = null;
  ai = null;
  initChatSession();
};

export const sendChatMessage = async (message) => {
  if (!apiKey) {
    messageCount++;
    return buildFallbackResponse(message);
  }

  if (messageCount >= MAX_MESSAGES) {
    throw new Error('SESSION_LIMIT_REACHED');
  }

  // Debounce: minimum 1 s between requests
  const now = Date.now();
  if (now - lastRequestTime < 1000) {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 - (now - lastRequestTime))
    );
  }

  if (!chatSession) {
    initChatSession();
  }

  try {
    lastRequestTime = Date.now();
    const response = await chatSession.sendMessage({ message });
    messageCount++;
    return response.text || buildFallbackResponse(message);
  } catch (error) {
    console.error('Gemini API Error:', error);
    messageCount++;
    return buildFallbackResponse(message);
  }
};

export const getMessageCount = () => messageCount;
export const getMaxMessages = () => MAX_MESSAGES;
