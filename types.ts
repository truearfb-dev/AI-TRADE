
export type TradeDirection = 'CALL' | 'PUT';

export type Language = 'pt' | 'en' | 'es' | 'fr';

export interface SignalData {
  pair: string;
  direction: TradeDirection;
  timeframe: string;
  accuracy: number;
  timestamp: number;
}

export interface MarketPair {
  name: string;
  volatility: string;
}

export interface NotificationItem {
  id: number;
  userName: string;
  amount: number;
  pair: string;
}
