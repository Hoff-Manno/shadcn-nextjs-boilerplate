// Auth Imports
import { IRoute } from '@/types/types';
import {
  HiOutlineHome,
  HiOutlineCpuChip,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineTrophy
} from 'react-icons/hi2';
import { HiOutlineDocument } from 'react-icons/hi';

export const routes: IRoute[] = [
  {
    name: 'Sponsorship Overview',
    path: '/dashboard/sponsorship/overview',
    icon: <HiOutlineChartBar className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Computer Vision',
    path: '/dashboard/sponsorship/computer-vision',
    icon: <HiOutlineEye className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Social Sentiment',
    path: '/dashboard/sponsorship/social-sentiment',
    icon: <HiOutlineHeart className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'ROI Analytics',
    path: '/dashboard/sponsorship/roi-analytics',
    icon: <HiOutlineCurrencyDollar className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Race Performance',
    path: '/dashboard/sponsorship/race-performance',
    icon: <HiOutlineTrophy className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'Sponsor Reports',
    path: '/dashboard/sponsorship/reports',
    icon: <HiOutlineDocument className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  },
  {
    name: 'AI Chat',
    path: '/dashboard/ai-chat',
    icon: (
      <HiOutlineCpuChip className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: true
  },
  {
    name: 'Profile Settings',
    path: '/dashboard/settings',
    icon: (
      <HiOutlineCog className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
    ),
    collapse: false,
    disabled: true
  },
  {
    name: 'Main Dashboard',
    path: '/dashboard/main',
    icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false,
    disabled: true
  }
];
