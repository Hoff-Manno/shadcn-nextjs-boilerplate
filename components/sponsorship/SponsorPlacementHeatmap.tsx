'use client';

import { PlacementEffectiveness } from '@/types/sponsorship';
import { formatNumber } from '@/lib/utils';

interface SponsorPlacementHeatmapProps {
  data: PlacementEffectiveness[];
}

export const SponsorPlacementHeatmap = ({ data }: SponsorPlacementHeatmapProps) => {
  const getHeatmapColor = (effectiveness: number) => {
    if (effectiveness >= 80) return 'bg-green-500 bg-opacity-80';
    if (effectiveness >= 60) return 'bg-yellow-500 bg-opacity-80';
    if (effectiveness >= 40) return 'bg-orange-500 bg-opacity-80';
    return 'bg-red-500 bg-opacity-80';
  };

  const getEffectivenessLabel = (effectiveness: number) => {
    if (effectiveness >= 80) return 'Excellent';
    if (effectiveness >= 60) return 'Good';
    if (effectiveness >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Sponsor Placement Effectiveness
      </h3>

      {/* Car Silhouette with Placement Zones */}
      <div className="relative w-full max-w-2xl mx-auto mb-6">
        <div className="relative w-full h-80 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          {/* Car Body Outline */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
          >
            {/* Car Silhouette */}
            <path
              d="M80 150 L100 100 L300 100 L320 150 L350 160 L350 200 L320 210 L300 240 L100 240 L80 210 L50 200 L50 160 Z"
              fill="#374151"
              stroke="#1F2937"
              strokeWidth="2"
            />
            
            {/* Car Details */}
            <rect x="120" y="120" width="160" height="60" rx="5" fill="#4B5563" />
            <rect x="140" y="130" width="120" height="15" rx="2" fill="#6B7280" />
            <circle cx="110" cy="220" r="15" fill="#1F2937" />
            <circle cx="290" cy="220" r="15" fill="#1F2937" />
          </svg>

          {/* Placement Zones Overlay */}
          {data.map((placement, index) => (
            <div
              key={index}
              className={`absolute rounded-lg ${getHeatmapColor(placement.effectiveness)} border-2 border-white cursor-pointer transition-all duration-200 hover:scale-105 hover:z-10`}
              style={{
                left: `${placement.x}%`,
                top: `${placement.y}%`,
                width: `${placement.width}%`,
                height: `${placement.height}%`
              }}
              title={`${placement.sponsor}: ${placement.effectiveness}% effective`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 px-2 py-1 rounded text-xs font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600">
                  {placement.effectiveness}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center space-x-6">
          {[
            { label: 'Excellent (80%+)', color: 'bg-green-500' },
            { label: 'Good (60-79%)', color: 'bg-yellow-500' },
            { label: 'Fair (40-59%)', color: 'bg-orange-500' },
            { label: 'Poor (<40%)', color: 'bg-red-500' }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-4 h-4 ${item.color} rounded`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Statistics Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                Placement
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                Sponsor
              </th>
              <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">
                Effectiveness
              </th>
              <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">
                Avg Exposure
              </th>
              <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">
                Cost Efficiency
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => b.effectiveness - a.effectiveness)
              .map((placement, index) => (
              <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-3 px-3 capitalize text-gray-900 dark:text-white">
                  {placement.placement.replace('_', ' ')}
                </td>
                <td className="py-3 px-3 text-gray-900 dark:text-white">
                  {placement.sponsor}
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    placement.effectiveness >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    placement.effectiveness >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    placement.effectiveness >= 40 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {placement.effectiveness}% {getEffectivenessLabel(placement.effectiveness)}
                  </span>
                </td>
                <td className="py-3 px-3 text-center text-gray-600 dark:text-gray-400">
                  {Math.round(placement.averageExposure)}s
                </td>
                <td className="py-3 px-3 text-center text-gray-600 dark:text-gray-400">
                  ${formatNumber(placement.costEfficiency, 2)}/min
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};