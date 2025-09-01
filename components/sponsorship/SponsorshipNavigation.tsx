'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HiOutlineCurrencyDollar,
  HiOutlineHeart,
  HiOutlineCpuChip,
  HiOutlineTrophy,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineArrowRight
} from 'react-icons/hi2';

const navigationItems = [
  {
    href: '/dashboard/sponsorship/overview',
    label: 'Overview',
    icon: HiOutlineChartBar,
    color: 'text-gray-600'
  },
  {
    href: '/dashboard/sponsorship/roi-analytics',
    label: 'ROI Analytics',
    icon: HiOutlineCurrencyDollar,
    color: 'text-green-600'
  },
  {
    href: '/dashboard/sponsorship/social-sentiment',
    label: 'Social Sentiment',
    icon: HiOutlineHeart,
    color: 'text-pink-600'
  },
  {
    href: '/dashboard/sponsorship/computer-vision',
    label: 'Computer Vision',
    icon: HiOutlineCpuChip,
    color: 'text-blue-600'
  },
  {
    href: '/dashboard/sponsorship/race-performance',
    label: 'Race Performance',
    icon: HiOutlineTrophy,
    color: 'text-yellow-600'
  },
  {
    href: '/dashboard/sponsorship/reports',
    label: 'Reports',
    icon: HiOutlineDocumentText,
    color: 'text-purple-600'
  }
];

export const SponsorshipNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 lg:gap-3">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link key={item.href} href={item.href}>
            <div className={`flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer group ${
              isActive 
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' 
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
            }`}>
              <Icon className={`h-4 w-4 lg:h-5 lg:w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : item.color}`} />
              <span className={`text-xs lg:text-sm font-medium ${
                isActive 
                  ? 'text-blue-700 dark:text-blue-300' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {item.label}
              </span>
              {!isActive && (
                <HiOutlineArrowRight className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
