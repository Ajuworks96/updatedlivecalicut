'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Crown, Star, MapPin, Heart, ArrowRight } from 'lucide-react';

export interface FeaturedBusinessItem {
  id: string;
  slug?: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  image?: string | null;
  phone?: string;
  isSponsored?: boolean;
}

interface FeaturedBusinessesSectionProps {
  businesses?: FeaturedBusinessItem[];
}

export const FeaturedBusinessesSection: React.FC<FeaturedBusinessesSectionProps> = ({
  businesses = [],
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  if (!businesses || businesses.length === 0) {
    return null;
  }

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full bg-slate-50/60 py-12 sm:py-16 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-6 sm:pb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
                Featured Businesses
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Top businesses in Kozhikode
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

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {businesses.map((biz) => {
            const isFav = favorites[biz.id];
            const href = biz.slug ? `/business/${biz.slug}` : `/business/${biz.id}`;

            return (
              <Link
                key={biz.id}
                href={href}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={biz.image || '/heroes/city-market.jpg'}
                    alt={biz.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Sponsored Tag */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-amber-400 text-slate-900 font-extrabold text-[10px] tracking-wider uppercase shadow-xs">
                    Sponsored
                  </span>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFav(biz.id, e)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label="Favorite"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-white'}`}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-[15px] sm:text-[16px] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {biz.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {biz.category}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{biz.rating ? biz.rating.toFixed(1) : '4.5'}</span>
                      </div>
                      <span className="text-slate-400 font-normal">
                        ({biz.reviewCount ? (biz.reviewCount >= 1000 ? `${(biz.reviewCount / 1000).toFixed(1)}k` : biz.reviewCount) : '120'})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{biz.location}</span>
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
