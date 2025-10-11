export interface UserBase {
  id: string;
  avatarUrl?: string;
  displayName: string;
  username: string;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface ChatParticpant extends UserBase {}

export interface ChatListProps {
  chats: ChatParticpant[];
  onSelect: (chat: string) => void;
  selectedChat: string | null;
}
