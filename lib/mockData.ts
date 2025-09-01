import { 
  Sponsor, 
  SponsorshipExposure, 
  SocialMention, 
  RacePerformance, 
  ROIMetrics, 
  ComputerVisionDetection,
  DashboardKPI,
  SentimentTrend,
  PlacementEffectiveness,
  LiveRaceStatus
} from '@/types/sponsorship';
import { formatNumber } from './utils';

// Mock sponsor data
export const mockSponsors: Sponsor[] = [
  {
    id: 'sponsor-1',
    name: 'AutoZone',
    logo: '/logos/autozone.png',
    website: 'https://autozone.com',
    investment: 150000,
    contractStart: new Date('2024-01-01'),
    contractEnd: new Date('2024-12-31'),
    tier: 'primary',
    placement: 'car_hood',
    color: '#DC2626',
    industry: 'Automotive Parts',
    contactPerson: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@autozone.com',
      phone: '(555) 123-4567'
    }
  },
  {
    id: 'sponsor-2',
    name: 'Valvoline',
    logo: '/logos/valvoline.png',
    website: 'https://valvoline.com',
    investment: 125000,
    contractStart: new Date('2024-01-01'),
    contractEnd: new Date('2024-12-31'),
    tier: 'primary',
    placement: 'car_side',
    color: '#F59E0B',
    industry: 'Motor Oil',
    contactPerson: {
      name: 'Mike Thompson',
      email: 'mike.thompson@valvoline.com',
      phone: '(555) 234-5678'
    }
  },
  {
    id: 'sponsor-3',
    name: 'Mobil 1',
    logo: '/logos/mobil1.png',
    website: 'https://mobil1.com',
    investment: 100000,
    contractStart: new Date('2024-01-01'),
    contractEnd: new Date('2024-12-31'),
    tier: 'secondary',
    placement: 'car_rear',
    color: '#EF4444',
    industry: 'Motor Oil',
    contactPerson: {
      name: 'Lisa Chen',
      email: 'lisa.chen@mobil1.com',
      phone: '(555) 345-6789'
    }
  },
  {
    id: 'sponsor-4',
    name: 'Goodyear',
    logo: '/logos/goodyear.png',
    website: 'https://goodyear.com',
    investment: 80000,
    contractStart: new Date('2024-01-01'),
    contractEnd: new Date('2024-12-31'),
    tier: 'secondary',
    placement: 'suit',
    color: '#3B82F6',
    industry: 'Tires',
    contactPerson: {
      name: 'David Rodriguez',
      email: 'david.rodriguez@goodyear.com',
      phone: '(555) 456-7890'
    }
  },
  {
    id: 'sponsor-5',
    name: 'NAPA Auto Parts',
    logo: '/logos/napa.png',
    website: 'https://napaonline.com',
    investment: 60000,
    contractStart: new Date('2024-01-01'),
    contractEnd: new Date('2024-12-31'),
    tier: 'associate',
    placement: 'helmet',
    color: '#10B981',
    industry: 'Auto Parts',
    contactPerson: {
      name: 'Jennifer Walsh',
      email: 'jennifer.walsh@napaonline.com',
      phone: '(555) 567-8901'
    }
  },
  {
    id: 'sponsor-6',
    name: 'Lucas Oil',
    logo: '/logos/lucasoil.png',
    website: 'https://lucasoil.com',
    investment: 45000,
    contractStart: new Date('2024-01-01'),
    contractEnd: new Date('2024-12-31'),
    tier: 'associate',
    placement: 'trackside',
    color: '#8B5CF6',
    industry: 'Lubricants'
  }
];

// Generate mock exposure data
export const generateMockExposureData = (): SponsorshipExposure[] => {
  const exposures: SponsorshipExposure[] = [];
  const now = new Date();
  
  mockSponsors.forEach(sponsor => {
    // Generate data for the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      
      // 3-8 exposures per day per sponsor
      const dailyExposures = Math.floor(Math.random() * 6) + 3;
      
      for (let j = 0; j < dailyExposures; j++) {
        const exposureTypes: ('tv_broadcast' | 'social_media' | 'in_person')[] = ['tv_broadcast', 'social_media', 'in_person'];
        const visibilityLevels: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
        
        exposures.push({
          id: `exposure-${sponsor.id}-${i}-${j}`,
          sponsorId: sponsor.id,
          raceId: `race-${Math.floor(i / 7) + 1}`,
          timestamp: new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000),
          exposureType: exposureTypes[Math.floor(Math.random() * exposureTypes.length)],
          duration: Math.floor(Math.random() * 120) + 5, // 5-125 seconds
          visibility: visibilityLevels[Math.floor(Math.random() * visibilityLevels.length)],
          screenPosition: {
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            width: Math.random() * 20 + 5,
            height: Math.random() * 15 + 5
          },
          confidenceScore: formatNumber(Math.random() * 0.3 + 0.7, 3), // 0.7-1.0
          platformDetails: {
            channel: ['FOX Sports', 'ESPN', 'NBC Sports', 'CBS Sports'][Math.floor(Math.random() * 4)],
            viewership: Math.floor(Math.random() * 500000) + 100000,
            demographics: {
              age_18_34: formatNumber(Math.random() * 40 + 10, 1),
              age_35_54: formatNumber(Math.random() * 40 + 20, 1),
              age_55_plus: formatNumber(Math.random() * 30 + 15, 1)
            }
          }
        });
      }
    }
  });
  
  return exposures.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate mock social media data
export const generateMockSocialData = (): SocialMention[] => {
  const mentions: SocialMention[] = [];
  const platforms: ('twitter' | 'instagram' | 'facebook' | 'tiktok' | 'youtube')[] = 
    ['twitter', 'instagram', 'facebook', 'tiktok', 'youtube'];
  const sentiments: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative'];
  const now = new Date();
  
  // Sample content templates
  const contentTemplates = [
    "Amazing race today! @ASDMotorsports really showed their speed with that {sponsor} car! 🏁 #Racing #SuperLateMod",
    "That {sponsor} car is looking fast out there! Go @ASDMotorsports! 🏎️ #RaceDay",
    "Love seeing {sponsor} supporting local racing. Great partnership with @ASDMotorsports! 👏",
    "What a finish! @ASDMotorsports and {sponsor} bringing the heat! 🔥 #Racing",
    "Been using {sponsor} products for years, great to see them in racing too! @ASDMotorsports",
    "That {sponsor} livery looks incredible on the @ASDMotorsports car! 😍 #Racecar",
    "Another podium finish for @ASDMotorsports! {sponsor} power! 🏆 #Victory",
    "Race day ready with @ASDMotorsports and {sponsor}! Let's go racing! 🏁"
  ];
  
  mockSponsors.forEach(sponsor => {
    // Generate 20-50 mentions per sponsor over 30 days
    const mentionCount = Math.floor(Math.random() * 30) + 20;
    
    for (let i = 0; i < mentionCount; i++) {
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      const content = contentTemplates[Math.floor(Math.random() * contentTemplates.length)]
        .replace('{sponsor}', sponsor.name);
      
      const baseEngagement = platform === 'tiktok' ? 1000 : platform === 'instagram' ? 500 : 200;
      const multiplier = sentiment === 'positive' ? 1.5 : sentiment === 'negative' ? 0.6 : 1.0;
      
      mentions.push({
        id: `mention-${sponsor.id}-${platform}-${i}`,
        platform,
        timestamp: new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        content,
        author: `user${Math.floor(Math.random() * 10000)}`,
        authorFollowers: Math.floor(Math.random() * 50000) + 500,
        engagement: {
          likes: Math.floor(Math.random() * baseEngagement * multiplier) + 10,
          shares: Math.floor(Math.random() * baseEngagement * 0.3 * multiplier) + 2,
          comments: Math.floor(Math.random() * baseEngagement * 0.2 * multiplier) + 1,
          views: platform === 'tiktok' || platform === 'youtube' ? 
            Math.floor(Math.random() * baseEngagement * 10 * multiplier) + 1000 : undefined
        },
        sentiment,
        sentimentScore: sentiment === 'positive' ? 
          formatNumber(Math.random() * 0.6 + 0.4, 3) : // 0.4 to 1.0
          sentiment === 'negative' ? 
          formatNumber(Math.random() * 0.6 - 1.0, 3) : // -1.0 to -0.4
          formatNumber(Math.random() * 0.8 - 0.4, 3), // -0.4 to 0.4
        mentions: [sponsor.name, 'ASD Motorsports'],
        reach: Math.floor(Math.random() * 100000) + 10000,
        impressions: Math.floor(Math.random() * 500000) + 50000,
        hashtags: ['#Racing', '#SuperLateMod', '#ASDMotorsports', '#RaceDay', '#Motorsports']
      });
    }
  });
  
  return mentions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate mock race performance data
export const generateMockRacePerformance = (): RacePerformance[] => {
  const races: RacePerformance[] = [];
  const trackNames = [
    'Charlotte Motor Speedway', 'Bristol Motor Speedway', 'Richmond Raceway',
    'Martinsville Speedway', 'North Wilkesboro Speedway', 'Hickory Motor Speedway',
    'South Boston Speedway', 'Motor Mile Speedway', 'Franklin County Speedway'
  ];
  
  // Generate 12 races for the season
  for (let i = 0; i < 12; i++) {
    const raceDate = new Date('2024-03-01');
    raceDate.setDate(raceDate.getDate() + i * 14); // Every 2 weeks
    
    const startPos = Math.floor(Math.random() * 24) + 1;
    const finishPos = Math.floor(Math.random() * 24) + 1;
    const laps = Math.floor(Math.random() * 100) + 100;
    
    // Generate lap times (simulate realistic lap times)
    const baseLapTime = formatNumber(18.5 + Math.random() * 2, 2); // 18.5-20.5 seconds
    const lapTimes: number[] = [];
    for (let lap = 0; lap < laps; lap++) {
      const variation = formatNumber((Math.random() - 0.5) * 1.0, 2); // ±0.5 second variation
      lapTimes.push(formatNumber(baseLapTime + variation, 2));
    }
    
    // Calculate sponsor exposure times
    const sponsorExposureTime: Record<string, number> = {};
    mockSponsors.forEach(sponsor => {
      // Better finishing position = more TV time
      const baseExposure = (25 - finishPos) * 30; // 30 seconds per position
      const randomVariation = Math.random() * 60 - 30; // ±30 seconds
      sponsorExposureTime[sponsor.id] = Math.max(0, baseExposure + randomVariation);
    });
    
    races.push({
      id: `race-${i + 1}`,
      raceId: `race-${i + 1}`,
      raceName: `Super Late Model Series Round ${i + 1}`,
      raceDate,
      track: trackNames[i % trackNames.length],
      driverId: 'driver-asd-1',
      driverName: 'Jake Matthews',
      carNumber: '23',
      startingPosition: startPos,
      finishingPosition: finishPos,
      lapTimes,
      averageSpeed: formatNumber(85 + Math.random() * 10, 1), // 85-95 mph
      topSpeed: formatNumber(95 + Math.random() * 8, 1), // 95-103 mph
      incidents: Math.floor(Math.random() * 3), // 0-2 incidents
      lapsLed: finishPos <= 5 ? Math.floor(Math.random() * 20) : 0,
      mediaValue: (25 - finishPos) * 5000 + Math.random() * 10000, // Better position = more value
      sponsorExposureTime,
      tvCoverage: {
        liveMinutes: formatNumber((25 - finishPos) * 2 + Math.random() * 10, 1),
        highlightMinutes: formatNumber(finishPos <= 10 ? Math.random() * 5 + 2 : Math.random() * 2, 1),
        mentions: finishPos <= 5 ? Math.floor(Math.random() * 10) + 5 : Math.floor(Math.random() * 5)
      }
    });
  }
  
  return races.sort((a, b) => b.raceDate.getTime() - a.raceDate.getTime());
};

// Generate mock ROI metrics
export const generateMockROIMetrics = (): ROIMetrics[] => {
  const roiMetrics: ROIMetrics[] = [];
  
  mockSponsors.forEach(sponsor => {
    // Calculate realistic ROI based on investment tier
    const baseROI = sponsor.tier === 'primary' ? 250 : sponsor.tier === 'secondary' ? 180 : 120;
    const roiVariation = formatNumber(Math.random() * 100 - 50, 1); // ±50%
    const actualROI = formatNumber(baseROI + roiVariation, 1);
    
    const exposureValue = formatNumber(sponsor.investment * (actualROI / 100) * 0.6, 2);
    const socialMediaValue = formatNumber(sponsor.investment * (actualROI / 100) * 0.25, 2);
    const tvBroadcastValue = formatNumber(sponsor.investment * (actualROI / 100) * 0.15, 2);
    
    roiMetrics.push({
      sponsorId: sponsor.id,
      timeframe: 'season',
      investment: sponsor.investment,
      exposureValue,
      socialMediaValue,
      tvBroadcastValue,
      totalGeneratedValue: exposureValue + socialMediaValue + tvBroadcastValue,
      roi: actualROI,
      costPerImpression: sponsor.investment / (Math.random() * 2000000 + 500000),
      impressions: Math.floor(Math.random() * 2000000) + 500000,
      reach: Math.floor(Math.random() * 1000000) + 200000,
      brandAwareness: {
        before: Math.random() * 30 + 10,
        after: Math.random() * 40 + 35,
        lift: Math.random() * 25 + 15
      },
      conversionMetrics: {
        websiteTraffic: Math.floor(Math.random() * 10000) + 2000,
        salesLift: Math.random() * 15 + 5,
        brandSearches: Math.floor(Math.random() * 5000) + 1000
      }
    });
  });
  
  return roiMetrics;
};

// Generate mock computer vision detections
export const generateMockComputerVisionData = (): ComputerVisionDetection[] => {
  const detections: ComputerVisionDetection[] = [];
  const now = new Date();
  
  // Generate detections for the last race (3 hours)
  const raceStart = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  
  mockSponsors.forEach(sponsor => {
    // Generate 50-200 detections per sponsor during the race
    const detectionCount = Math.floor(Math.random() * 150) + 50;
    
    for (let i = 0; i < detectionCount; i++) {
      const timestamp = new Date(raceStart.getTime() + Math.random() * 3 * 60 * 60 * 1000);
      
      detections.push({
        id: `detection-${sponsor.id}-${i}`,
        timestamp,
        sponsorId: sponsor.id,
        confidence: formatNumber(Math.random() * 0.3 + 0.7, 3), // 0.7-1.0
        boundingBox: {
          x: Math.random() * 60 + 20,
          y: Math.random() * 60 + 20,
          width: Math.random() * 15 + 10,
          height: Math.random() * 10 + 8
        },
        frameNumber: Math.floor(Math.random() * 324000), // 3 hours at 30fps
        videoSource: ['main_camera', 'pit_camera', 'helicopter', 'trackside_1', 'trackside_2'][
          Math.floor(Math.random() * 5)
        ],
        exposureDuration: Math.random() * 8 + 2, // 2-10 seconds
        visibility: (['high', 'medium', 'low'] as const)[Math.floor(Math.random() * 3)],
        cameraAngle: ['front', 'side', 'rear', 'three_quarter', 'overhead'][Math.floor(Math.random() * 5)],
        lighting: (['excellent', 'good', 'fair', 'poor'] as const)[Math.floor(Math.random() * 4)]
      });
    }
  });
  
  return detections.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate dashboard KPIs
export const generateDashboardKPIs = (): DashboardKPI[] => {
  return [
    {
      title: 'Total Sponsorship Value',
      value: '$2.4M',
      trend: 12.5,
      icon: 'currency',
      color: 'green',
      description: 'Season contract value'
    },
    {
      title: 'Race Season Exposure',
      value: '14.2M',
      trend: 8.3,
      icon: 'eye',
      color: 'blue',
      description: 'Total impressions'
    },
    {
      title: 'Social Media Reach',
      value: '892K',
      trend: -2.1,
      icon: 'heart',
      color: 'purple',
      description: 'Platform interactions'
    },
    {
      title: 'Average Screen Time',
      value: '47s',
      trend: 15.7,
      icon: 'clock',
      color: 'yellow',
      description: 'Per sponsor exposure'
    },
    {
      title: 'Sentiment Score',
      value: '8.3/10',
      trend: 5.2,
      icon: 'star',
      color: 'green',
      description: 'Overall brand sentiment'
    },
    {
      title: 'ROI Average',
      value: '340%',
      trend: 22.8,
      icon: 'trending',
      color: 'red',
      description: 'Sponsor return on investment'
    }
  ];
};

// Generate live race status
export const generateLiveRaceStatus = (): LiveRaceStatus => {
  return {
    isLive: Math.random() > 0.7, // 30% chance of live race
    raceName: 'Super Late Model Series - Round 8',
    track: 'Charlotte Motor Speedway',
    currentLap: Math.floor(Math.random() * 200) + 50,
    totalLaps: 200,
    position: Math.floor(Math.random() * 5) + 1, // Top 5 position
    gapToLeader: Math.random() > 0.5 ? 'LEADER' : `+${formatNumber(Math.random() * 2, 2)}s`,
    lastLapTime: `${formatNumber(18 + Math.random() * 2, 3)}`,
    estimatedTimeRemaining: `${Math.floor(Math.random() * 60) + 15}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    flagStatus: (['green', 'yellow', 'green', 'green'] as const)[Math.floor(Math.random() * 4)], // Bias toward green
    weatherConditions: {
      temperature: Math.floor(Math.random() * 20) + 65, // 65-85°F
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 mph
      conditions: ['Clear', 'Partly Cloudy', 'Overcast', 'Light Rain'][Math.floor(Math.random() * 4)]
    }
  };
};

// Helper function to generate chart-ready data
export const generateChartData = (dataType: 'exposure' | 'sentiment' | 'roi') => {
  const now = new Date();
  const days = 30;
  const data: Array<{ name: string; [key: string]: any }> = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayName = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (dataType === 'exposure') {
      const entry: any = { name: dayName };
      mockSponsors.forEach(sponsor => {
        entry[sponsor.name] = Math.floor(Math.random() * 300) + 100; // 100-400 minutes
      });
      data.push(entry);
    } else if (dataType === 'sentiment') {
      data.push({
        name: dayName,
        positive: Math.floor(Math.random() * 200) + 100,
        neutral: Math.floor(Math.random() * 100) + 50,
        negative: Math.floor(Math.random() * 50) + 10
      });
    } else if (dataType === 'roi') {
      data.push({
        name: dayName,
        generated_value: Math.floor(Math.random() * 50000) + 20000,
        investment: Math.floor(Math.random() * 20000) + 10000
      });
    }
  }
  
  return data;
};