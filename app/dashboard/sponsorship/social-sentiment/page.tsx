'use client';

import { useState, useEffect } from 'react';
import { formatNumber, formatPercent } from '@/lib/utils';
import { SponsorshipCharts } from '@/components/sponsorship/SponsorshipCharts';
import { KPICard } from '@/components/sponsorship/KPICard';
import { SponsorshipNavigation } from '@/components/sponsorship/SponsorshipNavigation';
import { 
  generateMockSocialData,
  mockSponsors,
  generateChartData
} from '@/lib/mockData';
import { SocialMention } from '@/types/sponsorship';
import { 
  HiOutlineHeart,
  HiOutlineUsers,
  HiOutlineHashtag,
  HiOutlineChartBar,
  HiOutlineEye,
  HiOutlineShare,
  HiOutlineChatBubbleLeft,
  HiOutlineFaceSmile,
  HiOutlineFaceFrown,
  HiOutlineArrowUp,
  HiOutlineArrowDown
} from 'react-icons/hi2';

interface PlatformStats {
  platform: string;
  mentions: number;
  sentiment: number;
  reach: number;
  engagement: number;
  color: string;
  icon: any;
}

export default function SocialSentimentAnalytics() {
  const [socialData, setSocialData] = useState<SocialMention[]>([]);
  const [sentimentData, setSentimentData] = useState<any[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([]);
  const [trendingHashtags, setTrendingHashtags] = useState<any[]>([]);
  const [recentMentions, setRecentMentions] = useState<SocialMention[]>([]);
  const [sentimentKPIs, setSentimentKPIs] = useState<any[]>([]);

  useEffect(() => {
    const mentions = generateMockSocialData();
    setSocialData(mentions);
    setSentimentData(generateChartData('sentiment'));

    // Calculate platform statistics
    const platforms = ['twitter', 'instagram', 'facebook', 'tiktok', 'youtube'];
    const platformIcons = {
      twitter: HiOutlineHashtag,
      instagram: HiOutlineHeart,
      facebook: HiOutlineUsers,
      tiktok: HiOutlineChartBar,
      youtube: HiOutlineEye
    };
    const platformColors = {
      twitter: '#1DA1F2',
      instagram: '#E4405F',
      facebook: '#1877F2',
      tiktok: '#000000',
      youtube: '#FF0000'
    };

    const stats = platforms.map(platform => {
      const platformMentions = mentions.filter(m => m.platform === platform);
      const avgSentiment = platformMentions.length > 0 
        ? formatNumber(platformMentions.reduce((sum, m) => sum + m.sentimentScore, 0) / platformMentions.length, 2)
        : 0;
      const totalReach = platformMentions.reduce((sum, m) => sum + m.reach, 0);
      const totalEngagement = platformMentions.reduce((sum, m) => 
        sum + m.engagement.likes + m.engagement.shares + m.engagement.comments, 0);

      return {
        platform: platform.charAt(0).toUpperCase() + platform.slice(1),
        mentions: platformMentions.length,
        sentiment: Math.round((avgSentiment + 1) * 50), // Convert -1 to 1 scale to 0-100
        reach: totalReach,
        engagement: totalEngagement,
        color: platformColors[platform as keyof typeof platformColors],
        icon: platformIcons[platform as keyof typeof platformIcons]
      };
    });

    setPlatformStats(stats.sort((a, b) => b.mentions - a.mentions));

    // Generate trending hashtags
    const hashtagCounts: Record<string, number> = {};
    mentions.forEach(mention => {
      mention.hashtags.forEach(tag => {
        hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
      });
    });

    const trending = Object.entries(hashtagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag, count], index) => ({
        tag,
        count,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        change: Math.floor(Math.random() * 50) + 10
      }));

    setTrendingHashtags(trending);

    // Get recent mentions
    setRecentMentions(mentions.slice(0, 20));

    // Calculate sentiment KPIs
    const totalMentions = mentions.length;
    const positiveMentions = mentions.filter(m => m.sentiment === 'positive').length;
    const negativeMentions = mentions.filter(m => m.sentiment === 'negative').length;
    const avgSentimentScore = formatNumber(mentions.reduce((sum, m) => sum + m.sentimentScore, 0) / totalMentions, 2);
    const totalReach = mentions.reduce((sum, m) => sum + m.reach, 0);
    const totalImpressions = mentions.reduce((sum, m) => sum + m.impressions, 0);

    setSentimentKPIs([
      {
        title: 'Overall Sentiment',
        value: `${Math.round((avgSentimentScore + 1) * 50)}/100`,
        trend: 12.3,
        icon: 'star',
        color: 'green'
      },
      {
        title: 'Total Mentions',
        value: totalMentions.toLocaleString(),
        trend: 8.7,
        icon: 'heart',
        color: 'blue'
      },
      {
        title: 'Positive Sentiment',
        value: `${Math.round((positiveMentions / totalMentions) * 100)}%`,
        trend: 5.2,
        icon: 'trending',
        color: 'green'
      },
      {
        title: 'Social Reach',
        value: `${formatNumber(totalReach / 1000000, 1)}M`,
        trend: 15.8,
        icon: 'eye',
        color: 'purple'
      },
      {
        title: 'Total Impressions',
        value: `${formatNumber(totalImpressions / 1000000, 1)}M`,
        trend: 22.1,
        icon: 'currency',
        color: 'yellow'
      },
      {
        title: 'Engagement Rate',
        value: '4.7%',
        trend: -1.3,
        icon: 'heart',
        color: 'red'
      }
    ]);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'negative': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return HiOutlineFaceSmile;
      case 'negative': return HiOutlineFaceFrown;
      default: return HiOutlineUsers;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Social Media Sentiment Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time monitoring of social media mentions, sentiment trends, and brand engagement across platforms
          </p>
        </div>
        
        {/* Navigation */}
        <SponsorshipNavigation />
      </div>

      {/* Sentiment KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {sentimentKPIs.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Trends Over Time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Sentiment Trends (Last 30 Days)
          </h3>
          <SponsorshipCharts 
            type="sentiment" 
            sentimentData={sentimentData}
          />
        </div>

        {/* Platform Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Platform Performance
          </h3>
          <div className="space-y-4">
            {platformStats.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div key={platform.platform} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${platform.color}20` }}>
                      <Icon className="h-5 w-5" style={{ color: platform.color }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {platform.platform}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {platform.mentions.toLocaleString()} mentions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {platform.sentiment}%
                    </div>
                    <div className="text-xs text-gray-500">
                      Sentiment Score
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Hashtags */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Trending Hashtags
          </h3>
          <div className="space-y-3">
            {trendingHashtags.map((hashtag, index) => {
              const TrendIcon = hashtag.trend === 'up' ? HiOutlineArrowUp : HiOutlineArrowDown;
              const trendColor = hashtag.trend === 'up' ? 'text-green-600' : 'text-red-600';
              
              return (
                <div key={hashtag.tag} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {hashtag.tag}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {hashtag.count} mentions
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${trendColor}`}>
                    <TrendIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {hashtag.change}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Mentions */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Recent Mentions
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentMentions.slice(0, 10).map((mention, index) => {
              const SentimentIcon = getSentimentIcon(mention.sentiment);
              
              return (
                <div key={mention.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                          {mention.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          @{mention.author}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {mention.platform} • {mention.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(mention.sentiment)}`}>
                      <SentimentIcon className="h-3 w-3" />
                      <span className="capitalize">{mention.sentiment}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {mention.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <HiOutlineHeart className="h-3 w-3" />
                        <span>{mention.engagement.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HiOutlineShare className="h-3 w-3" />
                        <span>{mention.engagement.shares.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HiOutlineChatBubbleLeft className="h-3 w-3" />
                        <span>{mention.engagement.comments.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <HiOutlineEye className="h-3 w-3" />
                      <span>{mention.reach.toLocaleString()} reach</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sponsor-Specific Sentiment Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Sponsor Sentiment Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSponsors.map((sponsor) => {
            const sponsorMentions = socialData.filter(m => 
              m.mentions.some(mention => mention.toLowerCase().includes(sponsor.name.toLowerCase()))
            );
            const avgSentiment = sponsorMentions.length > 0 
              ? formatNumber(sponsorMentions.reduce((sum, m) => sum + m.sentimentScore, 0) / sponsorMentions.length, 2)
              : 0;
            const sentimentPercentage = Math.round((avgSentiment + 1) * 50);
            
            return (
              <div key={sponsor.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: sponsor.color }}
                  >
                    {sponsor.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {sponsor.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {sponsorMentions.length} mentions
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Sentiment Score</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {sentimentPercentage}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        sentimentPercentage >= 70 ? 'bg-green-500' :
                        sentimentPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${sentimentPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}