
export type TradeDirection = 'CALL' | 'PUT';

export type Language = 'pt' | 'en' | 'es' | 'fr';

export type UserTier = 'FREE' | 'VIP';

export interface SignalData {
  pair: string;
  direction: TradeDirection;
  timeframe: string;
  accuracy: number;
  timestamp: number;
  isVip?: boolean; // New field for monetization
}

export interface MarketPair {
  name: string;
  volatility: string;
  isVipOnly?: boolean; // New field to lock pairs
}

export interface NotificationItem {
  id: number;
  userName: string;
  amount: number;
  pair: string;
}