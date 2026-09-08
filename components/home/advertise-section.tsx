'use client';

import React from 'react';
import Link from 'next/link';
import {
  Megaphone,
  ArrowRight,
  Sparkles,
  Layout,
  Globe,
  Tag,
  Calendar,
  Briefcase,
} from 'lucide-react';

const PACKAGES = [
  {
    title: 'Featured Listing',
    desc: 'More visibility',
    icon: Sparkles,
  },
  {
    title: 'Banner Advertising',
    desc: 'Brand awareness',
    icon: Layout,
  },
  {
    title: 'Business Landing Page',
    desc: 'Your dedicated space',
    icon: Globe,
  },
  {
    title: 'Offer Promotion',
    desc: 'Attract more customers',
    icon: Tag,
  },
  {
    title: 'Event Promotion',
    desc: 'Get more attendees',
    icon: Calendar,
  },
  {
    title: 'Job Promotion',
    desc: 'Find the right talent',
    icon: Briefcase,
  },
];

export const AdvertiseSection: React.FC = () => {
  return (
    <section className="w-full bg-slate-50/70 py-12 sm:py-16 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-10 border border-blue-200/80 shadow-sm space-y-8">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-md">
                <Megaphone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
                  Advertise with LiveCalicut
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-normal leading-relaxed">
                  Reach thousands of people in Kozhikode. Grow your business with our promotional packages.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/merchant"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>View Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 6 Promo Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {PACKAGES.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.title}
                  className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug">
                    {pkg.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                    {pkg.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Sub-tagline */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-blue-100 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Malabar merchant advertising network</span>
            </div>
            <p className="font-serif italic text-slate-600 text-center sm:text-right">
              Let&apos;s grow together. Support Local, Grow Local.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
