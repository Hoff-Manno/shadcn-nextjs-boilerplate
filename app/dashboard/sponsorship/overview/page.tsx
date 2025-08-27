'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { KPICard } from '@/components/sponsorship/KPICard';
import { LiveStatusIndicator } from '@/components/sponsorship/LiveStatusIndicator';
import { SponsorshipCharts } from '@/components/sponsorship/SponsorshipCharts';
import { 
  generateDashboardKPIs,
  generateLiveRaceStatus,
  generateChartData,
  mockSponsors,
  generateMockROIMetrics,
  generateMockSocialData
} from '@/lib/mockData';
import { 
  HiOutlineUsers,
  HiOutlineTrophy,
  HiOutlineChartBar,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineCpuChip,
  HiOutlineDocumentText,
  HiOutlineArrowRight
} from 'react-icons/hi2';

export default function SponsorshipOverview() {
  const [kpis, setKpis] = useState<any[]>([]);
  const [liveStatus, setLiveStatus] = useState<any>(null);
  const [exposureData, setExposureData] = useState<any[]>([]);
  const [sentimentData, setSentimentData] = useState<any[]>([]);
  const [roiMetrics, setRoiMetrics] = useState<any[]>([]);
  const [recentHighlights, setRecentHighlights] = useState<any[]>([]);

  useEffect(() => {
    // Load dashboard data
    setKpis(generateDashboardKPIs());
    setLiveStatus(generateLiveRaceStatus());
    setExposureData(generateChartData('exposure'));
    setSentimentData(generateChartData('sentiment'));
    setRoiMetrics(generateMockROIMetrics());

    // Generate recent highlights
    const highlights = [
      {
        id: 1,
        title: 'Record Breaking Exposure',
        description: 'AutoZone achieved 4.2M impressions during Charlotte race',
        time: '2 hours ago',
        type: 'exposure',
        value: '+340%',
        color: 'green'
      },
      {
        id: 2,
        title: 'Social Media Surge',
        description: 'Valvoline mentions increased 150% after podium finish',
        time: '4 hours ago',
        type: 'social',
        value: '+150%',
        color: 'blue'
      },
      {
        id: 3,
        title: 'New Sponsor Interest',
        description: '3 potential sponsors requested ROI reports',
        time: '6 hours ago',
        type: 'business',
        value: '3 leads',
        color: 'purple'
      },
      {
        id: 4,
        title: 'Performance Achievement',
        description: 'Top 3 finish at Bristol Motor Speedway',
        time: '1 day ago',
        type: 'performance',
        value: 'P3',
        color: 'yellow'
      }
    ];
    setRecentHighlights(highlights);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ASD Motorsports - Sponsorship Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time insights into sponsor performance, exposure metrics, and ROI analysis
          </p>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/sponsorship/roi-analytics">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 cursor-pointer group">
              <HiOutlineCurrencyDollar className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">ROI Analytics</span>
              <HiOutlineArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
          </Link>
          
          <Link href="/dashboard/sponsorship/social-sentiment">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 cursor-pointer group">
              <HiOutlineHeart className="h-5 w-5 text-pink-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Social Sentiment</span>
              <HiOutlineArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
          </Link>
          
          <Link href="/dashboard/sponsorship/computer-vision">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 cursor-pointer group">
              <HiOutlineCpuChip className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Computer Vision</span>
              <HiOutlineArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
          </Link>
          
          <Link href="/dashboard/sponsorship/race-performance">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 cursor-pointer group">
              <HiOutlineTrophy className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Race Performance</span>
              <HiOutlineArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
          </Link>
          
          <Link href="/dashboard/sponsorship/reports">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 cursor-pointer group">
              <HiOutlineDocumentText className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Reports</span>
              <HiOutlineArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
          </Link>
        </div>
      </div>

      {/* Live Race Status */}
      <LiveStatusIndicator status={liveStatus} />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sponsor Exposure Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Daily Sponsor Exposure (Last 30 Days)
          </h3>
          <SponsorshipCharts 
            type="exposure" 
            exposureData={exposureData}
          />
        </div>

        {/* Social Sentiment Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Social Media Sentiment Trends
          </h3>
          <SponsorshipCharts 
            type="sentiment" 
            sentimentData={sentimentData}
          />
        </div>
      </div>

      {/* Secondary Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Sponsors */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Top Performing Sponsors
          </h3>
          <div className="space-y-4">
            {roiMetrics
              .sort((a, b) => b.roi - a.roi)
              .slice(0, 5)
              .map((sponsor, index) => {
                const sponsorData = mockSponsors.find(s => s.id === sponsor.sponsorId);
                return (
                  <div key={sponsor.sponsorId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {sponsorData?.name || 'Unknown'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {sponsorData?.tier} Sponsor
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {Math.round(sponsor.roi)}%
                      </div>
                      <div className="text-xs text-gray-500">ROI</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Recent Highlights */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Recent Highlights
          </h3>
          <div className="space-y-4">
            {recentHighlights.map((highlight) => {
              const iconMap = {
                exposure: HiOutlineChartBar,
                social: HiOutlineUsers,
                business: HiOutlineTrophy,
                performance: HiOutlineCalendar
              };
              const Icon = iconMap[highlight.type as keyof typeof iconMap];
              
              const colorMap = {
                green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
                blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
                purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
                yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
              };

              return (
                <div key={highlight.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className={`p-2 rounded-lg ${colorMap[highlight.color as keyof typeof colorMap]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {highlight.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {highlight.time}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorMap[highlight.color as keyof typeof colorMap]}`}>
                      {highlight.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">
            {mockSponsors.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Active Sponsors
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            12
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Races This Season
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            ${(mockSponsors.reduce((sum, s) => sum + s.investment, 0) / 1000).toFixed(0)}K
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Investment
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            95.7%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Detection Accuracy
          </div>
        </div>
      </div>
    </div>
  );
}