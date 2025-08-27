'use client';

import { useEffect, useState } from 'react';
import { KPICard } from '@/components/sponsorship/KPICard';
import { 
  generateMockRacePerformance,
  mockSponsors
} from '@/lib/mockData';
import { RacePerformance } from '@/types/sponsorship';
import { 
  HiOutlineTrophy,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineMapPin,
  HiOutlineFlag,
  HiOutlineChartBar,
  HiOutlineEye,
  HiOutlineStar,
  HiOutlineSparkles
} from 'react-icons/hi2';

export default function RacePerformanceAnalytics() {
  const [raceData, setRaceData] = useState<RacePerformance[]>([]);
  const [performanceKPIs, setPerformanceKPIs] = useState<any[]>([]);
  const [seasonStats, setSeasonStats] = useState<any>({});

  useEffect(() => {
    const races = generateMockRacePerformance();
    setRaceData(races);

    // Calculate season statistics
    const totalRaces = races.length;
    const wins = races.filter(r => r.finishingPosition === 1).length;
    const topFives = races.filter(r => r.finishingPosition <= 5).length;
    const topTens = races.filter(r => r.finishingPosition <= 10).length;
    const avgFinish = races.reduce((sum, r) => sum + r.finishingPosition, 0) / totalRaces;
    const avgSpeed = races.reduce((sum, r) => sum + r.averageSpeed, 0) / totalRaces;
    const totalLapsLed = races.reduce((sum, r) => sum + r.lapsLed, 0);
    const totalMediaValue = races.reduce((sum, r) => sum + r.mediaValue, 0);

    setSeasonStats({
      totalRaces,
      wins,
      topFives,
      topTens,
      avgFinish,
      avgSpeed,
      totalLapsLed,
      totalMediaValue,
      points: 850 + Math.floor(Math.random() * 200), // Mock points
      championshipPosition: 3
    });

    // Performance KPIs
    setPerformanceKPIs([
      {
        title: 'Championship Position',
        value: '3rd',
        trend: 1.2,
        icon: 'star',
        color: 'yellow',
        description: 'Current season standing'
      },
      {
        title: 'Race Wins',
        value: wins,
        trend: wins > 0 ? 25.0 : 0,
        icon: 'star',
        color: 'green',
        description: 'Season victories'
      },
      {
        title: 'Top 5 Finishes',
        value: `${topFives}/${totalRaces}`,
        trend: (topFives / totalRaces) * 100,
        icon: 'trending',
        color: 'blue',
        description: 'Consistency metric'
      },
      {
        title: 'Average Finish',
        value: avgFinish.toFixed(1),
        trend: avgFinish < 10 ? 15.3 : -8.2,
        icon: 'trending',
        color: avgFinish < 10 ? 'green' : 'red',
        description: 'Season average position'
      },
      {
        title: 'Laps Led',
        value: totalLapsLed,
        trend: 18.7,
        icon: 'clock',
        color: 'purple',
        description: 'Total laps at front'
      },
      {
        title: 'Media Value',
        value: `$${(totalMediaValue / 1000).toFixed(0)}K`,
        trend: 28.4,
        icon: 'currency',
        color: 'green',
        description: 'Generated coverage value'
      }
    ]);
  }, []);

  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
    if (position <= 3) return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
    if (position <= 5) return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200';
    if (position <= 10) return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return '🏆';
    if (position <= 3) return '🥉';
    if (position <= 5) return '⭐';
    return '🏁';
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Race Performance Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive analysis of race results, performance trends, and sponsor exposure correlation
        </p>
      </div>

      {/* Performance KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {performanceKPIs.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Season Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Season Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            2024 Season Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Races Completed</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {seasonStats.totalRaces}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Championship Points</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {seasonStats.points}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Win Percentage</span>
              <span className="font-semibold text-green-600">
                {((seasonStats.wins / seasonStats.totalRaces) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Top 5 Rate</span>
              <span className="font-semibold text-blue-600">
                {((seasonStats.topFives / seasonStats.totalRaces) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Average Speed</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {seasonStats.avgSpeed?.toFixed(1)} mph
              </span>
            </div>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Performance Trends & Correlation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Finish Position Trend
              </h4>
              <div className="space-y-2">
                {raceData.slice(0, 6).map((race, index) => (
                  <div key={race.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Race {raceData.length - index}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getPositionIcon(race.finishingPosition)}</span>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getPositionColor(race.finishingPosition)}`}>
                        P{race.finishingPosition}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Sponsor Exposure vs Performance
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p>
                  <span className="font-medium text-green-600">Strong Correlation:</span> Top 5 finishes 
                  generate 340% more sponsor exposure than finishes outside top 10.
                </p>
                <p>
                  <span className="font-medium text-blue-600">Media Impact:</span> Race wins create 
                  $45K average media value vs $8K for mid-pack finishes.
                </p>
                <p>
                  <span className="font-medium text-purple-600">ROI Factor:</span> Performance directly 
                  impacts sponsor satisfaction and contract renewals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Race Results Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          2024 Race Results Timeline
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Track
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Start
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Finish
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Laps Led
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Avg Speed
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Media Value
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Sponsor Exposure
                </th>
              </tr>
            </thead>
            <tbody>
              {raceData.map((race, index) => {
                const totalExposure = Object.values(race.sponsorExposureTime).reduce((sum, time) => sum + time, 0);
                
                return (
                  <tr key={race.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <HiOutlineCalendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {race.raceDate.toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <HiOutlineMapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {race.track}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        P{race.startingPosition}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(race.finishingPosition)}`}>
                        {getPositionIcon(race.finishingPosition)} P{race.finishingPosition}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">
                      {race.lapsLed}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">
                      {race.averageSpeed.toFixed(1)} mph
                    </td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">
                      ${(race.mediaValue / 1000).toFixed(0)}K
                    </td>
                    <td className="py-4 px-4 text-center text-blue-600 font-semibold">
                      {Math.round(totalExposure / 60)} min
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sponsor Exposure by Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Exposure by Performance Category
          </h3>
          <div className="space-y-4">
            {[
              { category: 'Race Wins (P1)', count: seasonStats.wins, avgExposure: 180, color: 'bg-yellow-500' },
              { category: 'Podium (P2-P3)', count: seasonStats.topFives - seasonStats.wins, avgExposure: 145, color: 'bg-gray-400' },
              { category: 'Top 5 (P4-P5)', count: seasonStats.topFives - 3, avgExposure: 120, color: 'bg-orange-500' },
              { category: 'Top 10 (P6-P10)', count: seasonStats.topTens - seasonStats.topFives, avgExposure: 85, color: 'bg-blue-500' },
              { category: 'Outside Top 10', count: seasonStats.totalRaces - seasonStats.topTens, avgExposure: 35, color: 'bg-red-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${item.color} rounded`} />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {item.category}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.count} race{item.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {item.avgExposure} min
                  </div>
                  <div className="text-xs text-gray-500">
                    avg exposure
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Driver Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Driver Performance Metrics
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Jake Matthews - Car #23
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {seasonStats.avgFinish?.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Average Finish
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {((seasonStats.topFives / seasonStats.totalRaces) * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Top 5 Rate
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Key Achievements
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-green-600">
                  <HiOutlineSparkles className="h-4 w-4" />
                  <span>Season-high finish: 1st at Bristol Motor Speedway</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <HiOutlineFlag className="h-4 w-4" />
                  <span>Led {seasonStats.totalLapsLed} laps this season</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-600">
                  <HiOutlineEye className="h-4 w-4" />
                  <span>Generated ${(seasonStats.totalMediaValue / 1000).toFixed(0)}K in media value</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}