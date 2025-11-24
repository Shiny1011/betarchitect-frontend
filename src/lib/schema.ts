export type BonusStatus =
  | 'draft'
  | 'active'
  | 'granted'
  | 'expired'
  | 'completed'
  | 'converted'
  | 'forfeited'
  | 'revoked'
  | 'void';
export type StepKey = 'init' | 'step2' | 'step3' | 'success' | 'error';
export type Tab = 'all' | 'casino' | 'sport' | 'community';
export type AccountTab = 'profile' | 'bonus' | 'wallet' | 'security' | 'history' | 'limits' | 'exclusion' | 'logout';
export type PaymentMethod = 'card' | 'revolut' | 'paysafe' | 'neteller' | 'skrill';
export type DocVerificationType = 'passport' | 'id_card';
export type DocVerificationKind = 'passport' | 'address' | 'id_front' | 'id_back';

export interface IUser {
  id: string;
  email: string;
  username?: string;
  email_verified: boolean;
  phone_verified: boolean;
  first_name?: string;
  last_name?: string;
  birthday?: string; // ISO date string
  phone?: string;
  country?: string;
  promo_code: string;
  two_factor_enable: boolean;
  notification: boolean;
  kyc_verified: boolean;
  kyc_verified_at?: string; // ISO date string
  profile_complete: boolean;
  preference?: {
    language: string;
  };
  role: string;
  affiliate_id?: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date strin
}

export interface IAuthData {
  user?: IUser | null;
  session_valid?: boolean;
}

export interface BonusGrant {
  id: string;
  playerId: string;
  playerEmail: string;
  playerUsername: string;
  bonusDefinitionId: string;
  bonusDefinitionName: string;
  status: BonusStatus;
  currencyCode: string;
  amountGranted: number;
  amountRemaining: number;
  winningsBucket: number;
  wagerTarget: number;
  wagerProgress: number;
  completionPercentage: number;
  isWithdrawalBlocked: boolean;
  isWrZero: boolean;
  promoCodeUsed: string | null;
  grantedAt: string;
  activatedAt: string;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
  active?: boolean;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  isActive: boolean;
  minBet: number;
  maxBet: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICountry {
  id: string;
  name: string;
  alpha2: string;
  alpha3: string;
  numeric: string;
  createdAt: string;
  updatedAt: string;
}

// TODO: Should be match with BE schema
export interface VipLevel {
  id: string;
  name: string;
  description: string;
  wagerAmount: number;
  cashbackRate: number;
  rakebackRate: number;
  benefits: string[];
  media?: {
    icon?: string;
    badge?: string;
    background?: string;
  };
}

// TODO: Should be match with BE schema
export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  category: Exclude<Tab, 'all'>;
}
