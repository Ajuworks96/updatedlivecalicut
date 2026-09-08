'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Heart, MapPin, Clock, Briefcase, Home, Tag } from 'lucide-react';

export type ListingType = 'job' | 'property' | 'marketplace';

export interface UnifiedListingItem {
  id: string;
  type: ListingType;
  title: string;
  subtitle?: string;
  priceOrSalary: string;
  location: string;
  timeAgo: string;
  image?: string | null;
  href: string;
  badgeText?: string;
  badgeVariant?: 'blue' | 'purple' | 'emerald' | 'amber';
}

interface LatestListingsSectionProps {
  initialItems?: UnifiedListingItem[];
}

type TabKey = 'all' | 'jobs' | 'properties' | 'marketplace';

export const LatestListingsSection: React.FC<LatestListingsSectionProps> = ({
  initialItems = [],
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  if (!initialItems || initialItems.length === 0) {
    return null;
  }

  const allItems = initialItems;

  const filteredItems = allItems.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'jobs') return item.type === 'job';
    if (activeTab === 'properties') return item.type === 'property';
    if (activeTab === 'marketplace') return item.type === 'marketplace';
    return true;
  });

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getViewAllHref = () => {
    if (activeTab === 'jobs') return '/jobs';
    if (activeTab === 'properties') return '/properties';
    if (activeTab === 'marketplace') return '/marketplace';
    return '/marketplace';
  };

  return (
    <section className="w-full bg-slate-50/70 py-12 sm:py-16 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 sm:pb-8">
          {/* Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
                Latest Listings
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Fresh opportunities in Kozhikode
              </p>
            </div>
          </div>

          {/* Center Tabs & View All */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Tabs */}
            <div className="inline-flex items-center p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
              {[
                { key: 'all' as TabKey, label: 'All' },
                { key: 'jobs' as TabKey, label: 'Jobs' },
                { key: 'properties' as TabKey, label: 'Properties' },
                { key: 'marketplace' as TabKey, label: 'Buy & Sell' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View All Link */}
            <Link
              href={getViewAllHref()}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group ml-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredItems.map((item) => {
            const isFav = favorites[item.id];
            const isJob = item.type === 'job';

            return (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                {/* Visual Top Container */}
                <div className="relative w-full h-36 bg-slate-100 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    /* Fallback Icon Box for Jobs / text items */
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100/70 text-[#2563EB]">
                      {isJob ? (
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-[#2563EB]" />
                        </div>
                      ) : item.type === 'property' ? (
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                          <Home className="w-6 h-6 text-cyan-600" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                          <Tag className="w-6 h-6 text-purple-600" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFav(item.id, e)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-xs flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label="Favorite"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-white'}`}
                    />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-3.5 flex flex-col flex-1 justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-[11px] font-medium text-slate-400 truncate">
                        {item.subtitle}
                      </p>
                    )}
                    <p className="text-[13px] font-extrabold text-slate-900 font-sans">
                      {item.priceOrSalary}
                    </p>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-slate-100">
                    <div className="space-y-0.5 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{item.timeAgo}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-1">
                      <span
                        className={`w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${
                          isJob
                            ? 'bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white'
                            : 'bg-slate-100 text-slate-700 group-hover:bg-[#2563EB] group-hover:text-white'
                        }`}
                      >
                        {isJob ? 'Apply' : 'View'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
