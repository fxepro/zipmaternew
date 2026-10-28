'use client';

import { MarketingSubPage } from '@/components/marketing/MarketingSubPage';
import { Zap } from 'lucide-react';

export default function UseCaseLastMilePage() {
  return (
    <MarketingSubPage
      badge="Use Cases"
      icon={Zap}
      title="Same-Day & Last Mile"
      accent="Post it now. Delivered today."
      subtitle="On-demand local delivery with nearby, background-checked couriers — single drops, multi-stop runs, and recurring routes."
      points={[
        'Instant dispatch to nearby couriers — car, SUV, cargo van, or bike.',
        'Single drops, multi-stop runs, and recurring daily routes on one platform.',
        'Live GPS from pickup to drop-off, with ETA shared with the recipient.',
        'Photo, signature, and timestamp captured at every drop.',
        'Every courier background-checked and insured before their first job.',
        'Payment released only when delivery is confirmed.',
      ]}
      cta={{ label: 'Send a delivery', href: '/register' }}
      secondaryCta={{ label: 'All use cases', href: '/use-cases' }}
    />
  );
}
