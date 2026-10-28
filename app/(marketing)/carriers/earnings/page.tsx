'use client';

import { MarketingSubPage } from '@/components/marketing/MarketingSubPage';
import { DollarSign } from 'lucide-react';

export default function CarriersEarningsPage() {
  return (
    <MarketingSubPage
      badge="For Couriers"
      icon={DollarSign}
      title="Earnings & Payouts"
      accent="Bid, haul, get paid."
      subtitle="Matching job board, open-market bids, contracted direct offers, and fast escrow payouts — no factoring, no invoice chasing."
      points={[
        'Matching job board — only see jobs that fit your vehicle, service types, and operating region.',
        'Bid on open market jobs or accept contracted direct offers from client networks you\'re approved on.',
        'Escrow payout on delivery confirmation — upload your POD and funds release to your connected bank account.',
        'Average payout within 48 hours of confirmed delivery — no waiting for weekly payout cycles.',
        'Build your rating — every completed job adds to your profile visibility and client trust.',
        'Earnings dashboard — active jobs, pending escrow, and lifetime earnings in one view.',
      ]}
      cta={{ label: 'Create courier profile', href: '/register?role=carrier' }}
      secondaryCta={{ label: 'Courier overview', href: '/carriers' }}
    />
  );
}
