'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LogoIcon } from '@/components/ui/Logo';
import {
  FiHome,
  FiUsers,
  FiMessageCircle,
  FiSend,
  FiPhone,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiDollarSign,
} from 'react-icons/fi';
import clsx from 'clsx';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'Contacts', href: '/dashboard/contacts', icon: FiUsers },
  { name: 'Conversations', href: '/dashboard/conversations', icon: FiMessageCircle },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: FiSend },
  { name: 'Phone Numbers', href: '/dashboard/phone-numbers', icon: FiPhone },
  { name: 'Analytics', href: '/dashboard/analytics', icon: FiBarChart2 },
  { name: 'Billing', href: '/dashboard/billing', icon: FiDollarSign },
  { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-brand-blue via-brand-blue to-brand-teal text-white">
      {/* Logo */}
      <div className="p-6 border-b border-white border-opacity-20">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <LogoIcon size="md" className="transition-transform group-hover:scale-110" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">
              Intello<span className="text-accent-green">Blast</span>
            </span>
            <span className="text-xs text-white/70">Dashboard</span>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-white border-opacity-20">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-emerald to-accent-green rounded-full flex items-center justify-center font-semibold shadow-lg">
            {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="ml-3">
            <div className="font-semibold">{session?.user?.name || 'User'}</div>
            <div className="text-sm text-gray-400">{session?.user?.email}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-green text-white'
                      : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white'
                  )}
                >
                  <Icon className="mr-3" size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-white border-opacity-10">
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white rounded-lg transition-colors"
        >
          <FiLogOut className="mr-3" size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
