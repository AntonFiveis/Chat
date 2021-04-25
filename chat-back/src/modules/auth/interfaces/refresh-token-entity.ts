export interface RefreshTokenEntity {
  refreshToken: string;
  userID: string;
  fingerprint: string;
  expiresIn: number;
}
