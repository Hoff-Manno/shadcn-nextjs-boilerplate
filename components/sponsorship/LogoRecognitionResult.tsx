'use client';

import { Sponsor } from '@/types/sponsorship';
import { formatConfidence } from '@/lib/utils';
import { HiOutlineEye, HiOutlineClock } from 'react-icons/hi2';

interface LogoRecognitionResultProps {
  sponsor: Sponsor;
  confidence: number;
  screenTime: number;
  detectionCount: number;
  lastSeen: Date;
}

export const LogoRecognitionResult = ({ 
  sponsor, 
  confidence, 
  screenTime, 
  detectionCount,
  lastSeen
}: LogoRecognitionResultProps) => {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.9) return 'text-green-600 bg-green-100 dark:bg-green-900';
    if (conf >= 0.8) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
    return 'text-red-600 bg-red-100 dark:bg-red-900';
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        {/* Sponsor Logo */}
        <div className="relative">
          <div className="w-12 h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center">
            <div 
              className="w-10 h-8 rounded flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: sponsor.color }}
            >
              {sponsor.name.substring(0, 3).toUpperCase()}
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </div>

        {/* Sponsor Information */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {sponsor.name}
          </h4>
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <HiOutlineClock className="h-4 w-4" />
              <span>{Math.round(screenTime)}s exposure</span>
            </div>
            <div className="flex items-center space-x-1">
              <HiOutlineEye className="h-4 w-4" />
              <span>{detectionCount} detections</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Last seen: {formatTimeAgo(lastSeen)}
          </div>
        </div>
      </div>

      {/* Detection Metrics */}
      <div className="text-right space-y-2">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getConfidenceColor(confidence)}`}>
          {formatConfidence(confidence)} confidence
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Tier: <span className="font-medium capitalize">{sponsor.tier}</span>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Placement: <span className="font-medium">{sponsor.placement.replace('_', ' ')}</span>
        </div>
      </div>
    </div>
  );
};