import { createClient } from '@/lib/supabase/server';
import { HeroRedesign } from '@/components/home/hero-redesign';
import { ExploreCategories } from '@/components/home/explore-categories';
import { FeaturedBusinessesSection, FeaturedBusinessItem } from '@/components/home/featured-businesses-section';
import { PopularBusinessesSection, PopularBusinessItem } from '@/components/home/popular-businesses-section';
import { LatestListingsSection, UnifiedListingItem } from '@/components/home/latest-listings-section';
import { ExploreKozhikodeSection } from '@/components/home/explore-kozhikode-section';
import { AdvertiseSection } from '@/components/home/advertise-section';
import { StayUpdatedSection } from '@/components/home/stay-updated-section';

export const revalidate = 60; // ISR cache for 60 seconds

export default async function HomePage() {
  const supabase = await createClient();

  // Concurrent server-side data fetching from Supabase
  const [
    featuredRes,
    popularRes,
    jobsRes,
    propertiesRes,
    marketplaceRes,
    areasRes,
  ] = await Promise.all([
    supabase
      .from('businesses')
      .select('id, slug, name, phone, rating_avg, review_count, social_media, business_categories(name), areas(name)')
      .eq('status', 'active')
      .eq('is_featured', true)
      .is('deleted_at', null)
      .order('rating_avg', { ascending: false })
      .limit(4),

    supabase
      .from('businesses')
      .select('id, slug, name, phone, rating_avg, review_count, social_media, business_categories(name), areas(name)')
      .eq('status', 'active')
      .is('deleted_at', null)
      .order('rating_avg', { ascending: false })
      .limit(6),

    supabase
      .from('jobs')
      .select('id, slug, title, salary, employment_type, created_at, companies(name, logo), areas(name)')
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(4),

    supabase
      .from('properties')
      .select('id, slug, title, price, listing_type, location, created_at, property_categories(name)')
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(4),

    supabase
      .from('marketplace_items')
      .select('id, slug, title, price, condition, location, created_at, marketplace_categories(name)')
      .eq('status', 'active')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(4),

    supabase
      .from('areas')
      .select('id, name')
      .order('name', { ascending: true })
      .limit(30),
  ]);

  // Format Featured Businesses
  const featuredBusinesses: FeaturedBusinessItem[] = (featuredRes.data || []).map((biz: any) => ({
    id: biz.id,
    slug: biz.slug,
    name: biz.name,
    category: biz.business_categories?.name || 'Business',
    location: biz.areas?.name || 'Kozhikode',
    rating: Number(biz.rating_avg) || 4.5,
    reviewCount: Number(biz.review_count) || 0,
    image: biz.social_media?.cover_image || null,
    phone: biz.phone,
    isSponsored: true,
  }));

  // Format Popular Businesses
  const popularBusinesses: PopularBusinessItem[] = (popularRes.data || []).map((biz: any) => ({
    id: biz.id,
    slug: biz.slug,
    name: biz.name,
    category: biz.business_categories?.name || 'Business',
    location: biz.areas?.name || 'Kozhikode',
    rating: Number(biz.rating_avg) || 4.4,
    reviewCount: Number(biz.review_count) || 0,
    image: biz.social_media?.cover_image || null,
  }));

  // Format Unified Latest Listings
  const latestListings: UnifiedListingItem[] = [];

  // Add Jobs
  (jobsRes.data || []).forEach((j: any) => {
    latestListings.push({
      id: `job-${j.id}`,
      type: 'job',
      title: j.title,
      subtitle: j.companies?.name || 'Full-time',
      priceOrSalary: j.salary || '₹20,000 – 35,000',
      location: j.areas?.name || 'Kozhikode',
      timeAgo: formatTimeAgo(j.created_at),
      image: j.companies?.logo || null,
      href: `/jobs/${j.slug || j.id}`,
      badgeText: j.employment_type || 'Full-time',
      badgeVariant: 'blue',
    });
  });

  // Add Properties
  (propertiesRes.data || []).forEach((p: any) => {
    latestListings.push({
      id: `prop-${p.id}`,
      type: 'property',
      title: p.title,
      subtitle: p.property_categories?.name || (p.listing_type === 'rent' ? 'For Rent' : 'For Sale'),
      priceOrSalary: p.price ? (p.price.toString().startsWith('₹') ? p.price : `₹${Number(p.price).toLocaleString('en-IN')}`) : 'Price on Request',
      location: p.location || 'Kozhikode',
      timeAgo: formatTimeAgo(p.created_at),
      image: null,
      href: `/properties/${p.slug || p.id}`,
      badgeText: p.listing_type === 'rent' ? 'Rent' : 'Sale',
      badgeVariant: 'emerald',
    });
  });

  // Add Marketplace Items
  (marketplaceRes.data || []).forEach((m: any) => {
    latestListings.push({
      id: `mkt-${m.id}`,
      type: 'marketplace',
      title: m.title,
      subtitle: m.marketplace_categories?.name || m.condition || 'Pre-owned',
      priceOrSalary: m.price ? (m.price.toString().startsWith('₹') ? m.price : `₹${Number(m.price).toLocaleString('en-IN')}`) : 'Contact for price',
      location: m.location || 'Kozhikode',
      timeAgo: formatTimeAgo(m.created_at),
      image: null,
      href: `/marketplace/${m.slug || m.id}`,
      badgeText: m.condition || 'Good Condition',
      badgeVariant: 'purple',
    });
  });

  // Areas list for hero location dropdown
  const locations = (areasRes.data || []).map((a: any) => ({
    id: a.id,
    name: a.name,
  }));

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. HERO SECTION */}
      <HeroRedesign locations={locations} />

      {/* 2. EXPLORE CATEGORIES */}
      <ExploreCategories />

      {/* 3. FEATURED BUSINESSES (SPONSORED) */}
      <FeaturedBusinessesSection businesses={featuredBusinesses} />

      {/* 4. POPULAR BUSINESSES */}
      <PopularBusinessesSection businesses={popularBusinesses} />

      {/* 5. LATEST LISTINGS WITH TABS */}
      <LatestListingsSection initialItems={latestListings} />

      {/* 6. EXPLORE KOZHIKODE */}
      <ExploreKozhikodeSection />

      {/* 7. ADVERTISE WITH LIVECALICUT */}
      <AdvertiseSection />

      {/* 8. STAY UPDATED NEWSLETTER */}
      <StayUpdatedSection />
    </div>
  );
}

function formatTimeAgo(dateString?: string): string {
  if (!dateString) return 'Recently';
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  return 'Recently';
}
