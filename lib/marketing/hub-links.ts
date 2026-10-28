import {
  Package, MapPin, ShieldCheck, ClipboardList,
  Briefcase, DollarSign, Lock,
  Building2, Zap, Stethoscope, Sofa,
} from 'lucide-react';
import type { HubPage } from '@/components/marketing/MarketingHub';

export const SHIPPER_HUB: HubPage[] = [
  { icon: Package,       title: 'Overview',          desc: 'You are here — ship anything, track live, pay on delivery.',              href: '/shippers',            active: true },
  { icon: ClipboardList, title: 'Shipping & Routes',  desc: 'Post shipments, multi-stop routes, and recurring routes.',               href: '/shippers/shipping' },
  { icon: MapPin,        title: 'Tracking & Pay',    desc: 'Live GPS, escrow payments, and delivery confirmation.',                  href: '/shippers/tracking' },
  { icon: ShieldCheck,   title: 'Verified Couriers', desc: 'Every courier vetted — identity, authority, background, human review.',  href: '/shippers/trust' },
];

export const CARRIER_HUB: HubPage[] = [
  { icon: Briefcase,   title: 'Overview',       desc: 'You are here — earn on your schedule, get paid faster.',                   href: '/carriers',                  active: true },
  { icon: DollarSign,  title: 'Earnings',       desc: 'Job board, bids, escrow payouts, and ratings.',                     href: '/carriers/earnings' },
  { icon: ShieldCheck, title: 'Trust & Safety', desc: '5-layer courier verification before any job is assigned.',           href: '/carrier-trust' },
];

export const HOW_IT_WORKS_HUB: HubPage[] = [
  { icon: ClipboardList, title: 'Overview',     desc: 'You are here — the full Zipmater workflow end to end.',            href: '/how-it-works',       active: true },
  { icon: Package,       title: 'Post & Match', desc: 'Describe your shipment and get quotes from vetted providers.',     href: '/how-it-works/post' },
  { icon: MapPin,        title: 'Track Live',   desc: 'GPS from pickup through delivery — alerts at every milestone.',    href: '/how-it-works/track' },
  { icon: Lock,          title: 'Pay Securely', desc: 'Escrow holds funds until delivery is confirmed by both parties.',  href: '/how-it-works/pay' },
];

/** Use Cases hub — leave as-is (overview + existing use-case pages). */
export const USE_CASES_HUB: HubPage[] = [
  { icon: Building2,   title: 'All Use Cases',  desc: 'You are here — browse every use case Zipmater serves.',                href: '/use-cases',                    active: true },
  { icon: Zap,         title: 'Same-Day',       desc: 'On-demand local delivery, multi-stop runs, and daily routes.',        href: '/use-cases/last-mile' },
  { icon: Stethoscope, title: 'Medical',        desc: 'Cold chain, chain of custody, and HIPAA-aligned delivery.',         href: '/use-cases/medical' },
  { icon: Sofa,        title: 'Household',      desc: 'Furniture, appliances, junk removal, and small moves.',             href: '/use-cases/household' },
];
