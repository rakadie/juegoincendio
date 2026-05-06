export interface CampaignIndicator {
  icon: string;
  text: string;
  tone: 'good' | 'warn' | 'bad';
}

export interface CampaignOption {
  id: string;
  text: string;
  recommended: boolean;
  resourceEffects: Record<string, number>;
  terrainEffects?: Record<string, number>;
  fireDelta?: number;
  burnedDelta?: number;
  indicators: CampaignIndicator[];
  diagnosisHint?: string;
}

export interface CampaignNode {
  id: string;
  title: string;
  context: string;
  options: CampaignOption[];
}

export interface CampaignContent {
  winterNodes: CampaignNode[];
  summerNodes: CampaignNode[];
}
