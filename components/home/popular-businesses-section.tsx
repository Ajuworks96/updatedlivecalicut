'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Star, MapPin, ArrowRight } from 'lucide-react';

export interface PopularBusinessItem {
  id: string;
  slug?: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  image?: string | null;
}

interface PopularBusinessesSectionProps {
  businesses?: PopularBusinessItem[];
}

export const PopularBusinessesSection: React.FC<PopularBusinessesSectionProps> = ({
  businesses = [],
}) => {
  if (!businesses || businesses.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-12 sm:py-16 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-6 sm:pb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
                Popular Businesses
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Discover top rated businesses in Kozhikode
              </p>
            </div>
          </div>

          <Link
            href="/business"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 6 Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {businesses.map((biz) => {
            const href = biz.slug ? `/business/${biz.slug}` : `/business/${biz.id}`;

            return (
              <Link
                key={biz.id}
                href={href}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative w-full h-32 sm:h-36 bg-slate-100 overflow-hidden">
                  <img
                    src={biz.image || '/heroes/city-market.jpg'}
                    alt={biz.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="p-3.5 flex flex-col flex-1 justify-between space-y-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {biz.name}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5 truncate">
                      {biz.category}
                    </p>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-xs">
                      <div className="flex items-center gap-0.5 text-amber-600 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{biz.rating ? biz.rating.toFixed(1) : '4.4'}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">
                        ({biz.reviewCount ?? 150})
                      </span>
                    </div>

                    {biz.location && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{biz.location}</span>
                      </div>
                    )}
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
