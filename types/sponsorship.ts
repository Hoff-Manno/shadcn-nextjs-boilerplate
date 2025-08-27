export interface SponsorshipExposure {
  id: string;
  sponsorId: string;
  raceId: string;
  timestamp: Date;
  exposureType: 'tv_broadcast' | 'social_media' | 'in_person';
  duration: number; // seconds
  visibility: 'high' | 'medium' | 'low';
  screenPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  confidenceScore: number; // 0-1
  platformDetails?: {
    channel?: string;
    viewership?: number;
    demographics?: Record<string, any>;
  };
}

export interface SocialMention {
  id: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'tiktok' | 'youtube';
  timestamp: Date;
  content: string;
  author: string;
  authorFollowers: number;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    views?: number;
  };
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number; // -1 to 1
  mentions: string[]; // sponsor brands mentioned
  reach: number;
  impressions: number;
  hashtags: string[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  investment: number;
  contractStart: Date;
  contractEnd: Date;
  tier: 'primary' | 'secondary' | 'associate';
  placement: 'car_hood' | 'car_side' | 'car_rear' | 'suit' | 'helmet' | 'trackside' | 'hauler';
  color: string; // hex color for charts
  industry: string;
  contactPerson?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface RacePerformance {
  id: string;
  raceId: string;
  raceName: string;
  raceDate: Date;
  track: string;
  driverId: string;
  driverName: string;
  carNumber: string;
  startingPosition: number;
  finishingPosition: number;
  lapTimes: number[];
  averageSpeed: number;
  topSpeed: number;
  incidents: number;
  lapsLed: number;
  mediaValue: number;
  sponsorExposureTime: Record<string, number>;
  tvCoverage: {
    liveMinutes: number;
    highlightMinutes: number;
    mentions: number;
  };
}

export interface ROIMetrics {
  sponsorId: string;
  timeframe: 'race' | 'month' | 'season' | 'yearly';
  investment: number;
  exposureValue: number;
  socialMediaValue: number;
  tvBroadcastValue: number;
  totalGeneratedValue: number;
  roi: number; // percentage
  costPerImpression: number;
  impressions: number;
  reach: number;
  brandAwareness: {
    before: number;
    after: number;
    lift: number;
  };
  conversionMetrics?: {
    websiteTraffic: number;
    salesLift: number;
    brandSearches: number;
  };
}

export interface ComputerVisionDetection {
  id: string;
  timestamp: Date;
  sponsorId: string;
  confidence: number; // 0-1
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  frameNumber: number;
  videoSource: string;
  exposureDuration: number;
  visibility: 'high' | 'medium' | 'low';
  cameraAngle: string;
  lighting: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface DashboardKPI {
  title: string;
  value: string | number;
  trend: number; // percentage change
  icon: string;
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
  description?: string;
}

export interface ChartData {
  name: string;
  data: Array<{
    x: string | number | Date;
    y: number;
    [key: string]: any;
  }>;
  color?: string;
}

export interface SentimentTrend {
  date: Date;
  platform: string;
  positive: number;
  neutral: number;
  negative: number;
  totalMentions: number;
  overallScore: number; // -1 to 1
}

export interface PlacementEffectiveness {
  placement: string;
  sponsor: string;
  effectiveness: number; // 0-100
  averageExposure: number;
  costEfficiency: number;
  x: number; // position on car/suit diagram
  y: number;
  width: number;
  height: number;
}

export interface LiveRaceStatus {
  isLive: boolean;
  raceName: string;
  track: string;
  currentLap: number;
  totalLaps: number;
  position: number;
  gapToLeader: string;
  lastLapTime: string;
  estimatedTimeRemaining: string;
  flagStatus: 'green' | 'yellow' | 'red' | 'checkered';
  weatherConditions: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    conditions: string;
  };
}

export interface ExportableReport {
  id: string;
  title: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  sponsors: string[];
  metrics: string[];
  format: 'pdf' | 'excel' | 'csv';
  frequency: 'one-time' | 'weekly' | 'monthly' | 'race-day';
  recipients: string[];
  lastGenerated?: Date;
  status: 'active' | 'inactive' | 'generating';
}