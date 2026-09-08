'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  ShoppingBag,
  Briefcase,
  Home,
  Building2,
  Calendar,
  Wrench,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POST_OPTIONS = [
  {
    title: 'Sell Something',
    desc: 'Pre-owned items, mobiles, cars, gadgets & furniture',
    icon: ShoppingBag,
    href: '/marketplace/create',
    color: 'bg-rose-50 text-rose-600 border-rose-200 group-hover:bg-rose-600 group-hover:text-white',
    badge: 'Classifieds',
  },
  {
    title: 'Post a Job',
    desc: 'Tech openings, regional walk-ins, retail & office vacancies',
    icon: Briefcase,
    href: '/merchant',
    color: 'bg-blue-50 text-blue-600 border-blue-200 group-hover:bg-blue-600 group-hover:text-white',
    badge: 'Hiring',
  },
  {
    title: 'Post a Property',
    desc: 'Flats, villas, commercial plots for rent or sale',
    icon: Home,
    href: '/properties/create',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-200 group-hover:bg-cyan-600 group-hover:text-white',
    badge: 'Real Estate',
  },
  {
    title: 'Add a Business',
    desc: 'Digital storefront, contact desk & catalog directory',
    icon: Building2,
    href: '/merchant',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white',
    badge: 'Directory',
  },
  {
    title: 'Add an Event',
    desc: 'Cultural fests, workshops, exhibitions & schedules',
    icon: Calendar,
    href: '/events',
    color: 'bg-amber-50 text-amber-600 border-amber-200 group-hover:bg-amber-600 group-hover:text-white',
    badge: 'Events',
  },
  {
    title: 'Offer a Service',
    desc: 'Home repairs, freelance, catering, tuition & logistics',
    icon: Wrench,
    href: '/business?category=Services',
    color: 'bg-purple-50 text-purple-600 border-purple-200 group-hover:bg-purple-600 group-hover:text-white',
    badge: 'Services',
  },
];

export const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-2 sm:p-6 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[92dvh] overflow-hidden">
        {/* Header (Always Visible at Top) */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 font-sans tracking-tight truncate">
                What would you like to post?
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-normal truncate">
                Choose a category to create your verified listing across Kozhikode
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6 Category Options Grid (Scrollable inside modal on mobile) */}
        <div className="flex-1 overflow-y-auto py-3 pr-0.5 space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3.5">
          {POST_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <Link
                key={opt.title}
                href={opt.href}
                onClick={onClose}
                className="group flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-[#2563EB]/40 hover:bg-slate-50/60 hover:shadow-md transition-all duration-200 relative overflow-hidden"
              >
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border flex items-center justify-center shrink-0 transition-colors duration-200 ${opt.color}`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#2563EB] transition-colors truncate">
                      {opt.title}
                    </h4>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                    {opt.desc}
                  </p>
                </div>

                <div className="self-center pl-1 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Helper Footer */}
        <div className="pt-2.5 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] sm:text-xs text-slate-400 border-t border-slate-100">
          <span>Need help publishing a corporate campaign?</span>
          <Link
            href="/contact"
            onClick={onClose}
            className="font-semibold text-[#2563EB] hover:underline"
          >
            Contact LiveCalicut Support &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
