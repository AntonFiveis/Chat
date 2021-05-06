export interface UsersDTO {
  name: string;
  nickname: string;
  phone: string;
  email: string;
  password: string;
}

export interface UsersUpdates {
  name?: string;
  nickname?: string;
  phone?: string;
}
