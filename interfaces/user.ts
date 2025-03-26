export interface PrismUser {
  createdAt: Date;
  privyId: string;
  walletSigner: string;
  email?: string;
  google?: string;
  twitter?: string;
  discord?: string;
  username?: string;
  avatarId?: string;
  recentGames?: string[];
  recentChallenges?: string[];
}
