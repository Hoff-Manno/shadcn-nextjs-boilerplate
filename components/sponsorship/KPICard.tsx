'use client';

import { 
  HiOutlineCurrencyDollar,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineArrowUp,
  HiOutlineArrowDown
} from 'react-icons/hi2';
import { DashboardKPI } from '@/types/sponsorship';

interface KPICardProps extends DashboardKPI {}

const iconMap = {
  currency: HiOutlineCurrencyDollar,
  eye: HiOutlineEye,
  heart: HiOutlineHeart,
  clock: HiOutlineClock,
  star: HiOutlineStar,
  trending: HiOutlineArrowUp
};

const colorMap = {
  red: {
    bg: 'bg-red-100 dark:bg-red-900',
    icon: 'text-red-600 dark:text-red-400',
    trend: 'text-red-600'
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900',
    icon: 'text-blue-600 dark:text-blue-400',
    trend: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900',
    icon: 'text-green-600 dark:text-green-400',
    trend: 'text-green-600'
  },
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-900',
    icon: 'text-yellow-600 dark:text-yellow-400',
    trend: 'text-yellow-600'
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900',
    icon: 'text-purple-600 dark:text-purple-400',
    trend: 'text-purple-600'
  }
};

export const KPICard = ({ 
  title, 
  value, 
  trend, 
  icon, 
  color,
  description 
}: KPICardProps) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || HiOutlineArrowUp;
  const colors = colorMap[color];
  const TrendIcon = trend >= 0 ? HiOutlineArrowUp : HiOutlineArrowDown;
  const trendColor = trend >= 0 ? 'text-green-600' : 'text-red-600';
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <IconComponent className={`h-6 w-6 ${colors.icon}`} />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${trendColor}`}>
          <TrendIcon className="h-4 w-4" />
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </h3>
      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
        {title}
      </p>
      {description && (
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
};