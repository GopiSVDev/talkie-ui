import { create } from 'zustand';

interface SidebarStore {
  mode: 'chats' | 'search' | 'profile' | 'settings';
  searchQuery: string;

  setMode: (mode: SidebarStore['mode']) => void;
  setSearchQuery: (query: string) => void;
}

export const useSidebarStore = create<SidebarStore>()((set) => ({
  mode: 'chats',
  searchQuery: '',
  setMode: (mode) => set({ mode }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
