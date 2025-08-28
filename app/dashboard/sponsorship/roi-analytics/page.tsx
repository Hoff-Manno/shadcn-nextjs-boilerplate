'use client';

import { useState, useEffect } from 'react';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils';
import { SponsorshipCharts } from '@/components/sponsorship/SponsorshipCharts';
import { KPICard } from '@/components/sponsorship/KPICard';
import { 
  generateMockROIMetrics,
  mockSponsors,
  generateChartData
} from '@/lib/mockData';
import { ROIMetrics, Sponsor } from '@/types/sponsorship';
import { 
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineCalculator,
  HiOutlineEye,
  HiOutlineGlobeAlt,
  HiOutlineArrowUpRight,
  HiOutlineArrowDownRight,
  HiOutlinePresentationChartLine,
  HiOutlineArrowUp
} from 'react-icons/hi2';

interface ROIComparison {
  sponsor: Sponsor;
  metrics: ROIMetrics;
  previousPeriod: {
    roi: number;
    investment: number;
    generatedValue: number;
  };
}

export default function ROIAnalytics() {
  const [roiMetrics, setRoiMetrics] = useState<ROIMetrics[]>([]);
  const [roiComparisons, setRoiComparisons] = useState<ROIComparison[]>([]);
  const [roiKPIs, setRoiKPIs] = useState<any[]>([]);
  const [investmentTrends, setInvestmentTrends] = useState<any[]>([]);
  const [valueBreakdown, setValueBreakdown] = useState<any[]>([]);

  useEffect(() => {
    const metrics = generateMockROIMetrics();
    setRoiMetrics(metrics);

    // Create ROI comparisons with mock previous period data
    const comparisons = metrics.map(metric => {
      const sponsor = mockSponsors.find(s => s.id === metric.sponsorId)!;
      const previousRoi = metric.roi - (Math.random() * 40 - 20); // ±20% change
      const previousInvestment = metric.investment * (0.8 + Math.random() * 0.4); // 80%-120% of current
      const previousValue = previousInvestment * (previousRoi / 100);

      return {
        sponsor,
        metrics: metric,
        previousPeriod: {
          roi: previousRoi,
          investment: previousInvestment,
          generatedValue: previousValue
        }
      };
    });

    setRoiComparisons(comparisons.sort((a, b) => b.metrics.roi - a.metrics.roi));

    // Calculate ROI KPIs
    const totalInvestment = metrics.reduce((sum, m) => sum + m.investment, 0);
    const totalGeneratedValue = metrics.reduce((sum, m) => sum + m.totalGeneratedValue, 0);
    const averageROI = metrics.reduce((sum, m) => sum + m.roi, 0) / metrics.length;
    const totalImpressions = metrics.reduce((sum, m) => sum + m.impressions, 0);
    const totalReach = metrics.reduce((sum, m) => sum + m.reach, 0);
    const avgCostPerImpression = metrics.reduce((sum, m) => sum + m.costPerImpression, 0) / metrics.length;

    setRoiKPIs([
      {
        title: 'Total Investment',
        value: `$${(totalInvestment / 1000).toFixed(0)}K`,
        trend: 8.5,
        icon: 'currency',
        color: 'blue',
        description: 'Season sponsorship investment'
      },
      {
        title: 'Generated Value',
        value: `$${(totalGeneratedValue / 1000).toFixed(0)}K`,
        trend: 18.3,
        icon: 'trending',
        color: 'green',
        description: 'Total marketing value created'
      },
      {
        title: 'Average ROI',
        value: `${averageROI.toFixed(0)}%`,
        trend: 12.7,
        icon: 'currency',
        color: 'green',
        description: 'Return on investment'
      },
      {
        title: 'Total Impressions',
        value: `${(totalImpressions / 1000000).toFixed(1)}M`,
        trend: 22.1,
        icon: 'eye',
        color: 'purple',
        description: 'Across all platforms'
      },
      {
        title: 'Total Reach',
        value: `${(totalReach / 1000000).toFixed(1)}M`,
        trend: 15.6,
        icon: 'eye',
        color: 'blue',
        description: 'Unique audience reached'
      },
      {
        title: 'Cost Per Impression',
        value: `$${formatNumber(avgCostPerImpression, 3)}`,
        trend: -5.2,
        icon: 'currency',
        color: 'green',
        description: 'Average CPI across sponsors'
      }
    ]);

    // Generate investment trends data
    setInvestmentTrends(generateChartData('roi'));

    // Generate value breakdown data
    const breakdown = [
      { category: 'TV Broadcast Value', value: 4200000, percentage: 45 },
      { category: 'Social Media Value', value: 2800000, percentage: 30 },
      { category: 'Event Exposure Value', value: 1400000, percentage: 15 },
      { category: 'Digital Marketing Value', value: 930000, percentage: 10 }
    ];
    setValueBreakdown(breakdown);
  }, []);

  const getROIColor = (roi: number) => {
    if (roi >= 300) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    if (roi >= 200) return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
    if (roi >= 100) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
  };

  const getROILabel = (roi: number) => {
    if (roi >= 300) return 'Excellent';
    if (roi >= 200) return 'Good';
    if (roi >= 100) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ROI Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive return on investment analysis for all sponsorship partnerships
        </p>
      </div>

      {/* ROI KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {roiKPIs.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI Comparison Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Sponsor ROI Comparison
          </h3>
          <SponsorshipCharts 
            type="roi" 
            roiData={roiComparisons.map(c => ({ 
              name: c.sponsor.name, 
              roi: c.metrics.roi 
            }))}
          />
        </div>

        {/* Investment vs Generated Value */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Investment vs Generated Value
          </h3>
          <div className="space-y-4">
            {roiComparisons.slice(0, 6).map((comparison, index) => {
              const efficiency = (comparison.metrics.totalGeneratedValue / comparison.metrics.investment) * 100;
              
              return (
                <div key={comparison.sponsor.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: comparison.sponsor.color }}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {comparison.sponsor.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatCurrency(comparison.metrics.investment)} invested
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(comparison.metrics.totalGeneratedValue)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {efficiency.toFixed(0)}% efficiency
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed ROI Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Detailed ROI Performance Analysis
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Sponsor
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Investment
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Generated Value
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  ROI
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Cost Per Impression
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Impressions
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {roiComparisons.map((comparison, index) => {
                const roiChange = comparison.metrics.roi - comparison.previousPeriod.roi;
                const isPositiveTrend = roiChange > 0;
                
                return (
                  <tr key={comparison.sponsor.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                          style={{ backgroundColor: comparison.sponsor.color }}
                        >
                          {comparison.sponsor.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {comparison.sponsor.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                            {comparison.sponsor.tier} Sponsor
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-900 dark:text-white">
                      {formatCurrency(comparison.metrics.investment)}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-900 dark:text-white">
                      {formatCurrency(comparison.metrics.totalGeneratedValue)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getROIColor(comparison.metrics.roi)}`}>
                        {Math.round(comparison.metrics.roi)}% {getROILabel(comparison.metrics.roi)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">
                      ${comparison.metrics.costPerImpression.toFixed(3)}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">
                      {(comparison.metrics.impressions / 1000).toFixed(0)}K
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`flex items-center justify-center space-x-1 ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositiveTrend ? (
                          <HiOutlineArrowUpRight className="h-4 w-4" />
                        ) : (
                          <HiOutlineArrowDownRight className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">
                          {Math.abs(roiChange).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Value Breakdown and Brand Awareness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marketing Value Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Marketing Value Breakdown
          </h3>
          <div className="space-y-4">
            {valueBreakdown.map((item, index) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatCurrency(item.value)} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">
                Total Marketing Value
              </span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(valueBreakdown.reduce((sum, item) => sum + item.value, 0))}
              </span>
            </div>
          </div>
        </div>

        {/* Brand Awareness Impact */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Brand Awareness Impact
          </h3>
          <div className="space-y-6">
            {roiComparisons.slice(0, 4).map((comparison) => (
              <div key={comparison.sponsor.id} className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: comparison.sponsor.color }}
                  />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {comparison.sponsor.name}
                  </h4>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Before</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {comparison.metrics.brandAwareness.before.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">After</div>
                    <div className="text-lg font-bold text-green-600">
                      {comparison.metrics.brandAwareness.after.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Lift</div>
                    <div className="text-lg font-bold text-blue-600">
                      +{comparison.metrics.brandAwareness.lift.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${comparison.metrics.brandAwareness.after}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Performance Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center space-x-2 mb-2">
              <HiOutlineArrowUp className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Top Performer
              </h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              {roiComparisons[0]?.sponsor.name} achieves {Math.round(roiComparisons[0]?.metrics.roi || 0)}% ROI, 
              leading the sponsorship portfolio with excellent brand integration and exposure.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <div className="flex items-center space-x-2 mb-2">
              <HiOutlineCalculator className="h-5 w-5 text-yellow-600" />
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                Optimization Opportunity
              </h4>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Consider repositioning lower-performing sponsors to high-visibility car placements 
              to improve their ROI and justify continued investment.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center space-x-2 mb-2">
              <HiOutlinePresentationChartLine className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Portfolio Health
              </h4>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Overall portfolio ROI of {roiKPIs[2]?.value} exceeds industry standards. 
              Strong performance positions team well for sponsor retention and acquisition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}