export interface Users {
  userID: string;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  photo: string | undefined;
}
