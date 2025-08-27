'use client';

import { LiveRaceStatus } from '@/types/sponsorship';
import { 
  HiOutlineFlag,
  HiOutlineEye,
  HiOutlineCloud,
  HiOutlineMap
} from 'react-icons/hi2';

interface LiveStatusIndicatorProps {
  status: LiveRaceStatus | null;
}

const flagColors = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  checkered: 'bg-gray-800'
};

const flagLabels = {
  green: 'GREEN FLAG',
  yellow: 'CAUTION',
  red: 'RED FLAG',
  checkered: 'CHECKERED'
};

export const LiveStatusIndicator = ({ status }: LiveStatusIndicatorProps) => {
  // Return loading state if status is null or undefined
  if (!status) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full" />
              <div className="h-4 bg-gray-300 rounded w-24" />
            </div>
            <div className="h-6 bg-gray-300 rounded w-20" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Live Status Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${status.isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {status.isLive ? 'LIVE RACE' : 'RACE COMPLETED'}
          </span>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${flagColors[status.flagStatus]} text-white text-sm font-bold`}>
          <HiOutlineFlag className="h-4 w-4" />
          <span>{flagLabels[status.flagStatus]}</span>
        </div>
      </div>

      {/* Race Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {status.raceName}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {status.track}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">
            Position {status.position}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {status.gapToLeader}
          </div>
        </div>
      </div>

      {/* Race Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Lap Progress</span>
          <span>{status.currentLap} of {status.totalLaps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(status.currentLap / status.totalLaps) * 100}%` }}
          />
        </div>
      </div>

      {/* Race Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {status.lastLapTime}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Last Lap
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {status.estimatedTimeRemaining}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Time Left
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {status.weatherConditions.temperature}°F
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Temperature
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {status.weatherConditions.windSpeed} mph
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Wind Speed
          </div>
        </div>
      </div>

      {/* Weather Conditions */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HiOutlineCloud className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {status.weatherConditions.conditions}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <HiOutlineMap className="h-4 w-4" />
              <span>{status.weatherConditions.humidity}% Humidity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};