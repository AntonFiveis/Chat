export interface ChatsDTO {
  isGroup?: boolean;
  chatName: string;
  ownerID: string;
}

export interface ChatsWithUsersDTO extends ChatsDTO {
  users: string[];
}
export interface ChatsUpdates {
  chatName?: string;
  photo?: string;
}
