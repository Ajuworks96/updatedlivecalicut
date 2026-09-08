import { createPublicClient } from '@/lib/supabase/server';
import { HeroRedesign } from '@/components/home/hero-redesign';
import { ExploreCategories } from '@/components/home/explore-categories';
import { FeaturedBusinessesSection, FeaturedBusinessItem } from '@/components/home/featured-businesses-section';
import { PopularBusinessesSection, PopularBusinessItem } from '@/components/home/popular-businesses-section';
import { LatestListingsSection, UnifiedListingItem } from '@/components/home/latest-listings-section';
import { ExploreKozhikodeSection } from '@/components/home/explore-kozhikode-section';
import { AdvertiseSection } from '@/components/home/advertise-section';
import { StayUpdatedSection } from '@/components/home/stay-updated-section';

export const revalidate = 60; // ISR cache for 60 seconds

function extractBusinessImage(biz: any): string | null {
  if (!biz) return null;
  if (biz.cover_image) return biz.cover_image;
  if (biz.image_url) return biz.image_url;
  if (biz.social_media?.cover_image) return biz.social_media.cover_image;
  if (biz.social_media?.image_url) return biz.social_media.image_url;
  if (biz.social_media?.logo) return biz.social_media.logo;
  if (Array.isArray(biz.business_images) && biz.business_images.length > 0) {
    return biz.business_images[0]?.url || null;
  }
  return null;
}

export default async function HomePage() {
  let featuredBusinesses: FeaturedBusinessItem[] = [];
  let popularBusinesses: PopularBusinessItem[] = [];
  const latestListings: UnifiedListingItem[] = [];
  let locations: Array<{ id: string; name: string }> = [];

  try {
    const supabase = createPublicClient();

    // Concurrent server-side data fetching from Supabase
    const [
      featuredRes,
      allBizRes,
      jobsRes,
      propertiesRes,
      marketplaceRes,
      areasRes,
    ] = await Promise.all([
      // 1. Explicitly Featured / Premium / Sponsored Businesses
      supabase
        .from('businesses')
        .select('id, slug, name, phone, rating_avg, review_count, is_featured, is_premium, is_verified, social_media, business_images(url), business_categories(name), areas(name)')
        .or('is_featured.eq.true,is_premium.eq.true')
        .is('deleted_at', null)
        .order('rating_avg', { ascending: false })
        .limit(8),

      // 2. All Active Businesses in Calicut
      supabase
        .from('businesses')
        .select('id, slug, name, phone, rating_avg, review_count, is_featured, is_premium, is_verified, social_media, business_images(url), business_categories(name), areas(name)')
        .is('deleted_at', null)
        .order('rating_avg', { ascending: false })
        .limit(16),

      // 3. Published Jobs
      supabase
        .from('jobs')
        .select('id, slug, title, salary, employment_type, created_at, companies(name, logo), areas(name)')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(6),

      // 4. Published Real Estate Properties
      supabase
        .from('properties')
        .select('id, slug, title, price, listing_type, location, created_at, property_categories(name)')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(6),

      // 5. Active Marketplace / Classifieds
      supabase
        .from('marketplace_items')
        .select('id, slug, title, price, condition, location, created_at, marketplace_categories(name)')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(6),

      // 6. Areas / Localities for search
      supabase
        .from('areas')
        .select('id, name')
        .order('name', { ascending: true })
        .limit(30),
    ]);

    // Map Featured Businesses
    const rawFeatured = featuredRes?.data || [];
    const rawAll = allBizRes?.data || [];

    if (rawFeatured.length > 0) {
      featuredBusinesses = rawFeatured.map((biz: any) => ({
        id: biz.id,
        slug: biz.slug,
        name: biz.name,
        category: biz.business_categories?.name || 'Business',
        location: biz.areas?.name || 'Kozhikode',
        rating: Number(biz.rating_avg) || 4.5,
        reviewCount: Number(biz.review_count) || 0,
        image: extractBusinessImage(biz),
        phone: biz.phone,
        isSponsored: true,
      }));
    }

    // Map Popular / Verified Businesses
    if (rawAll.length > 0) {
      popularBusinesses = rawAll.map((biz: any) => ({
        id: biz.id,
        slug: biz.slug,
        name: biz.name,
        category: biz.business_categories?.name || 'Business',
        location: biz.areas?.name || 'Kozhikode',
        rating: Number(biz.rating_avg) || 4.4,
        reviewCount: Number(biz.review_count) || 0,
        image: extractBusinessImage(biz),
      }));

      // If no businesses were marked is_featured=true, use top items from all active businesses
      if (featuredBusinesses.length === 0) {
        featuredBusinesses = rawAll.slice(0, 4).map((biz: any) => ({
          id: biz.id,
          slug: biz.slug,
          name: biz.name,
          category: biz.business_categories?.name || 'Business',
          location: biz.areas?.name || 'Kozhikode',
          rating: Number(biz.rating_avg) || 4.5,
          reviewCount: Number(biz.review_count) || 0,
          image: extractBusinessImage(biz),
          phone: biz.phone,
          isSponsored: true,
        }));
      }
    }

    // Add Jobs
    (jobsRes?.data || []).forEach((j: any) => {
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
    (propertiesRes?.data || []).forEach((p: any) => {
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
    (marketplaceRes?.data || []).forEach((m: any) => {
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
    if (areasRes?.data) {
      locations = areasRes.data.map((a: any) => ({
        id: a.id,
        name: a.name,
      }));
    }
  } catch (err) {
    console.error('[HomePage] Supabase fetch error handled safely:', err);
  }

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
