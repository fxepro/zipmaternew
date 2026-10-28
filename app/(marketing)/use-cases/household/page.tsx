'use client';

import { MarketingSubPage } from '@/components/marketing/MarketingSubPage';
import { Sofa } from 'lucide-react';

export default function UseCaseHouseholdPage() {
  return (
    <MarketingSubPage
      badge="Use Cases"
      icon={Sofa}
      title="Household & Moving"
      accent="Furniture, appliances, small moves. Handled with care."
      subtitle="Vetted local helpers with the right vehicle for store deliveries, marketplace pickups, junk removal, and small moves."
      points={[
        'Match by vehicle — pickup truck, cargo van, or box truck.',
        'Add helpers for stairs, assembly, or heavy items.',
        'Condition photos before and after — disputes settled with evidence.',
        'Retailer and marketplace deliveries, junk haul-away, and small moves.',
        'Upfront pricing with no surprise fees at the door.',
        'Ratings and reviews on every completed job.',
      ]}
      cta={{ label: 'Book a helper', href: '/register' }}
      secondaryCta={{ label: 'All use cases', href: '/use-cases' }}
    />
  );
}
