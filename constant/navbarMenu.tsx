import { Home, LineChart, Package, ShoppingCart, Archive } from 'lucide-react';
import { NavItem } from '@/types/Navbar';

export const NAVBAR_ITEMS: NavItem[] = [
  {
    title: 'Home',
    path: '/home',
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: 'Product',
    path: '/product',
    icon: <Package className="h-4 w-4" />,
  },
  {
    title: 'Records',
    path: '/records',
    icon: <Archive className="h-4 w-4" />,
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: <LineChart className="h-4 w-4" />,
  },
];
