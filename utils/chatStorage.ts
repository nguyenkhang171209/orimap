
import { ChatSession } from '../types';

const STORAGE_KEY = 'oriemap_chat_sessions';

export const chatStorage = {
  getSessions: (): ChatSession[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveSessions: (sessions: ChatSession[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  },

  addSession: (session: ChatSession) => {
    const sessions = chatStorage.getSessions();
    sessions.unshift(session);
    chatStorage.saveSessions(sessions);
  },

  updateSession: (id: string, updates: Partial<ChatSession>) => {
    const sessions = chatStorage.getSessions();
    const index = sessions.findIndex(s => s.id === id);
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updates };
      chatStorage.saveSessions(sessions);
    }
  },

  deleteSession: (id: string) => {
    const sessions = chatStorage.getSessions();
    const filtered = sessions.filter(s => s.id !== id);
    chatStorage.saveSessions(filtered);
  },

  getSessionById: (id: string): ChatSession | undefined => {
    const sessions = chatStorage.getSessions();
    return sessions.find(s => s.id === id);
  }
};
