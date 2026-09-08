'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, Briefcase, ShoppingBag, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/business', label: 'Directory', icon: Building2 },
    { href: '/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/marketplace', label: 'Classifieds', icon: ShoppingBag },
    { href: '/profile', label: 'Account', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#2563EB] font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
