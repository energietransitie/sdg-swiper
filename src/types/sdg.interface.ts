export interface ISdg {
  id?: string;
  number?: number;
  title?: string;
  description?: string;
  iconUrl?: string;
  thumbnailUrl?: string;
  backgroundColor?: string;
}

export interface ISdgImpact {
  number?: number;
  impact?: ImpactType;
}

export type SdgImpactExtended = ISdg & ISdgImpact & { hideColorIndicator?: boolean };

export type SdgImpactResultCount = {
  positive: number;
  negative: number;
  neutral: number;
  unknown: number;
};

export type SwipeDirection = 'up' | 'down' | 'left' | 'right';
export type ImpactType = 'positive' | 'negative' | 'neutral' | 'unknown';
