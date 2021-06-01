export interface RefreshTokenEntity {
  refreshToken: string;
  userEmail: string;
  fingerprint: string;
  expiresIn: number;
}
