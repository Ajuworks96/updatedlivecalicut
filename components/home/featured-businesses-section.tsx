'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Crown, Star, MapPin, Heart, ArrowRight, Sparkles, PlusCircle, Megaphone } from 'lucide-react';

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

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const hasRealItems = businesses && businesses.length > 0;

  return (
    <section className="w-full bg-slate-50/70 py-12 sm:py-16 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 sm:pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
              <Crown className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
                  Featured &amp; Premium Businesses
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-amber-400/90 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase shadow-2xs">
                  Sponsored
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Top verified enterprises &amp; spotlight brands in Kozhikode
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/business/create"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Get Featured</span>
            </Link>
            <Link
              href="/business"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {hasRealItems ? (
          /* Live Database Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {businesses.map((biz) => {
              const isFav = favorites[biz.id];
              const href = biz.slug ? `/business/${biz.slug}` : `/business/${biz.id}`;

              return (
                <Link
                  key={biz.id}
                  href={href}
                  className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={biz.image || '/heroes/city-market.jpg'}
                      alt={biz.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Sponsored Tag */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase shadow-xs">
                      Featured
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
                          ({biz.reviewCount >= 1000 ? `${(biz.reviewCount / 1000).toFixed(1)}k` : biz.reviewCount || 1})
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
        ) : (
          /* Premium Advertiser Placement Slots when DB has 0 featured */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Spotlight Your Brand',
                desc: 'Reach thousands of shoppers looking for trusted services across Kozhikode daily.',
                badge: 'Prime Placement',
              },
              {
                title: 'Promote Your Restaurant',
                desc: 'Highlight signature biryanis, menus & offers on top of culinary search.',
                badge: 'Top Dining Ad',
              },
              {
                title: 'Feature Real Estate & Stays',
                desc: 'Showcase luxury villas, waterfront stays & rental listings directly to buyers.',
                badge: 'Verified Stays',
              },
              {
                title: 'Grow Your Local Store',
                desc: 'Direct WhatsApp inquiries, phone calls and footfall to your business in Calicut.',
                badge: 'Retail Growth',
              },
            ].map((slot, i) => (
              <Link
                key={i}
                href="/business/create"
                className="group p-6 rounded-2xl bg-white border-2 border-dashed border-amber-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-center items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-100 text-amber-600 flex items-center justify-center transition-colors">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase">
                    {slot.badge}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                    {slot.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {slot.desc}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] group-hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-xs transition-colors">
                  <PlusCircle className="w-3.5 h-3.5" /> Feature Your Business
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
