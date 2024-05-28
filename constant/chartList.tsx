import { Activity, Crown, HandCoins } from 'lucide-react';
import { NavItem } from '@/types/Navbar';

export const SCROLLBAR_ITEMS: NavItem[] = [
  {
    title: 'Total Products Sales',
    path: '/analytics/product/sales',
    icon: <Activity className="h-4 w-4" />,
  },
  {
    title: 'Favorite Products',
    path: '/analytics/product/favorites',
    icon: <Crown className="h-4 w-4" />,
  },
  {
    title: 'Income',
    path: '/analytics/income',
    icon: <HandCoins className="h-4 w-4" />,
  },
];
