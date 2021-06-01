export interface ChatsDTO {
  isGroup?: boolean;
  chatName: string;
  ownerEmail: string;
}

export interface ChatsWithUsersDTO extends ChatsDTO {
  users: string[];
}
export interface ChatsUpdates {
  chatName?: string;
  photo?: string;
}
