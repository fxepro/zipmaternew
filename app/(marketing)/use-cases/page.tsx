'use client';

import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, MapPin, Stethoscope,
  Frame, ShoppingCart, Sofa,
  Shield, FileText, Lock, Zap,
} from 'lucide-react';
import { MarketingHub } from '@/components/marketing/MarketingHub';
import { USE_CASES_HUB } from '@/lib/marketing/hub-links';
import { T } from '@/lib/type-scale';


// ── Palette & scale ───────────────────────────────────────────────────────────
const B = {
  teal:     '#90E0EF',
  tealMid:  '#48CAE4',
  tealDark: '#0096C7',
  tealDeep: '#0077B6',
  tealNavy: '#023E8A',
  tealBg:   '#E0F7FA',
  tealPale: '#CAF0F8',
  darkSec:  '#0A2E40',
  darkCard: '#0A1520',
  gray100:  '#161616',
  gray90:   '#262626',
  gray70:   '#525252',
  gray50:   '#8D8D8D',
  gray10:   '#F4F4F4',
  white:    '#FFFFFF',
};


const BODY = 'var(--font-body)';
const DISPLAY = 'var(--font-display)';

// ── Industries ────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  {
    id: 'last-mile',
    icon: Zap,
    label: 'Same-Day & Last Mile',
    headline: 'Post it now.\nPicked up in minutes.\nDelivered today.',
    intro: 'Local businesses need things moved across town today, not next week. Zipmater matches same-day jobs to nearby, background-checked couriers in cars, vans and on bikes. Post a pickup, see who is close, and follow the delivery live until a photo and signature close it out.',
    points: [
      'Instant dispatch to nearby couriers — car, SUV, cargo van or bike',
      'Single drops, multi-stop runs and recurring daily routes on one platform',
      'Live GPS from pickup to drop-off with ETA shared with the recipient',
      'Photo, signature and timestamp captured at every drop',
      'Every courier background-checked and insured before their first job',
      'Payment released only when delivery is confirmed',
    ],
    scenario: {
      title: 'A print shop sends rush orders to three downtown clients',
      items: [
        { time: '11:05am', text: 'Three-stop job posted — deliver by 1pm' },
        { time: '11:08am', text: 'Courier 1.2 miles away accepts' },
        { time: '11:21am', text: 'Pickup confirmed · Photos taken' },
        { time: '12:14pm', text: 'Stop 2 of 3 delivered · Signature captured' },
        { time: '12:41pm', text: 'All drops confirmed · Courier paid' },
      ],
      tag: '3 stops · 1 courier · Done before lunch',
    },
  },
  {
    id: 'medical',
    icon: Stethoscope,
    label: 'Medical & Pharmaceutical',
    headline: 'Cold chain.\nChain of custody.\nNo exceptions.',
    intro: 'Medical and pharmaceutical deliveries carry compliance requirements that a standard courier simply can\'t meet. Zipmater enforces cold chain handling, logs temperature at every stage, captures photo proof at pickup and delivery, and produces a complete chain of custody record exportable for regulatory purposes.',
    points: [
      'Cold chain handling enforcement — only providers with refrigerated capability are matched',
      'Temperature logging at pickup, in transit and at delivery — timestamped and stored',
      'Lot number and batch reference fields for pharmaceutical traceability',
      'Photo proof captured at both ends — condition documented, not assumed',
      'GPS chain of custody record exportable for audit, compliance or insurance',
      'Approved vendor lists supported through contracted provider model',
    ],
    scenario: {
      title: 'A biotech lab ships temperature-sensitive samples',
      items: [
        { time: '4:45am',  text: 'Request posted — cold chain required, arrival by 7am' },
        { time: '4:53am',  text: 'Provider confirmed — refrigerated vehicle, credentialed' },
        { time: '5:20am',  text: 'Pickup confirmed · Temp logged 2.1°C · Photos taken' },
        { time: '6:48am',  text: 'En route · Temp 2.0°C · ETA 7:02am' },
        { time: '6:59am',  text: 'Delivered · Temp 2.1°C · Lot verified · Record exported' },
      ],
      tag: 'Cold chain maintained · Full compliance record generated',
    },
  },
  {
    id: 'household',
    icon: Sofa,
    label: 'Household & Moving',
    headline: 'Furniture, appliances,\nsmall moves.\nHandled with care.',
    intro: 'Marketplace pickups, store deliveries, junk removal and studio moves are too big for a car and too small for a moving company. Zipmater connects customers and retailers with vetted local helpers who have the right vehicle and an extra pair of hands.',
    points: [
      'Match by vehicle — pickup truck, cargo van or box truck',
      'Add helpers for stairs, assembly or heavy items',
      'Condition photos before and after — damage disputes settled with evidence',
      'Retailer and marketplace deliveries, junk haul-away and small moves',
      'Upfront pricing with no surprise fees at the door',
      'Ratings and reviews on every completed job',
    ],
    scenario: {
      title: 'A customer buys a sofa from a local furniture store',
      items: [
        { time: '2:00pm', text: 'Delivery requested — 2 helpers, cargo van' },
        { time: '2:06pm', text: 'Courier with helper accepts' },
        { time: '3:15pm', text: 'Pickup at store · Condition photos taken' },
        { time: '3:52pm', text: 'Delivered to 3rd-floor apartment · Placed in room' },
        { time: '3:58pm', text: 'Customer confirms · Courier rated 5 stars' },
      ],
      tag: 'Same day · 2 helpers · Zero damage',
    },
  },
  {
    id: 'art-antiques',
    icon: Frame,
    label: 'Art, Antiques & Estate Moves',
    headline: 'Irreplaceable handled\nby the irreplaceable few.',
    intro: 'Fine art, signed pieces, antique furniture, estate contents. These items can\'t be replaced and can\'t be handled by someone who\'s never done it before. Zipmater filters providers by certification, specialist experience and coverage level — so only those qualified to handle your item ever see the job.',
    points: [
      'Declared value field — providers see coverage requirements before bidding',
      'Provider filtering by certification and specialist handling credentials',
      'White-glove and climate-controlled handling requirements supported',
      'Photographic condition record at pickup and delivery — stored permanently',
      'Insurance verification at the item level before provider is assigned',
      'Estate executor support — multi-item, multi-destination moves coordinated in one request',
    ],
    scenario: {
      title: 'An estate executor ships antique furniture to auction',
      items: [
        { time: 'Day 1',  text: 'Request posted — declared value $24,000, white-glove required' },
        { time: 'Day 1',  text: 'Provider confirmed — specialist certified, insured to value' },
        { time: '8:30am', text: 'Pickup · Condition photos · Pieces wrapped and logged' },
        { time: '1:15pm', text: 'En route · Live tracking' },
        { time: '3:40pm', text: 'Delivered to auction house · Condition confirmed · Record closed' },
      ],
      tag: 'Declared value: $24,000 · Specialist certified · Condition verified',
    },
  },
  {
    id: 'food-beverage',
    icon: ShoppingCart,
    label: 'Food & Beverage Distribution',
    headline: 'Recurring routes.\nTemperature held.\nEvery time.',
    intro: 'Food and beverage distribution runs on reliability. The same routes, the same standards, the same providers — every week. Zipmater\'s contracted model supports recurring schedules, refrigerated handling enforcement, and multi-stop batch dispatch. Miss a temperature window and you\'ll know before it becomes a problem.',
    points: [
      'Contracted providers for recurring routes — same provider, same standard, every run',
      'Refrigerated handling enforcement — non-compliant providers cannot bid on cold jobs',
      'Batch dispatch for multi-stop delivery runs — single request, multiple destinations',
      'Temperature logging per stop — every handoff recorded',
      'Scheduled weekly or daily delivery automation — post once, run continuously',
      'Delivery history and cost summaries per route available for accounts and compliance',
    ],
    scenario: {
      title: 'A restaurant group runs weekly multi-stop supply deliveries',
      items: [
        { time: 'Every Mon', text: 'Recurring request auto-posted · Provider pre-assigned' },
        { time: '5:00am',    text: 'Provider confirmed · Refrigerated vehicle logged' },
        { time: '5:45am',    text: 'Pickup confirmed · Temp 3°C · Batch manifest signed' },
        { time: '7:30am',    text: 'Stop 1 delivered · Temp 3.1°C · Signed' },
        { time: '9:10am',    text: 'Stop 3 delivered · All locations confirmed · Log closed' },
      ],
      tag: 'Recurring · 3 stops · Cold chain held across all deliveries',
    },
  },
];

// ── Scenario card ─────────────────────────────────────────────────────────────

function ScenarioCard({ scenario }: { scenario: typeof INDUSTRIES[0]['scenario'] }) {
  return (
    <div style={{ background: B.darkSec, borderRadius: 8, overflow: 'hidden', boxShadow: '0 20px 56px rgba(0,0,0,0.18)' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${B.tealNavy} 0%, ${B.darkSec} 100%)`, padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2 mb-3">
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
          <span style={{ fontFamily: BODY, fontSize: T.label, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Live delivery</span>
        </div>
        <p style={{ fontFamily: BODY, fontWeight: 600, fontSize: T.h4, color: B.white, lineHeight: 1.4 }}>{scenario.title}</p>
      </div>
      {/* Timeline */}
      <div style={{ padding: '24px 28px' }}>
        {scenario.items.map((item, i) => (
          <div key={i} className="flex items-start gap-4" style={{ paddingBottom: i < scenario.items.length - 1 ? 20 : 0 }}>
            <div className="flex flex-col items-center" style={{ flexShrink: 0, width: 16 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === scenario.items.length - 1 ? '#22C55E' : B.tealDark, flexShrink: 0, marginTop: 4, border: `2px solid ${i === scenario.items.length - 1 ? '#16A34A' : B.tealDeep}` }} />
              {i < scenario.items.length - 1 && (
                <div style={{ width: 1, background: 'rgba(255,255,255,0.12)', marginTop: 5, minHeight: 24, flex: 1 }} />
              )}
            </div>
            <div style={{ paddingBottom: 2 }}>
              <span style={{ fontFamily: BODY, fontSize: T.label, fontWeight: 700, color: B.tealMid }}>{item.time}</span>
              <p style={{ fontFamily: BODY, fontSize: T.body, color: 'rgba(255,255,255,0.72)', marginTop: 3, lineHeight: 1.55 }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Footer tag */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '16px 28px' }}>
        <span style={{ fontFamily: BODY, fontSize: T.label, fontWeight: 600, color: B.teal }}>{scenario.tag}</span>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UseCasesPage() {
  return (
    <div style={{ fontFamily: BODY, WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', background: B.white }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(145deg, ${B.tealNavy} 0%, ${B.tealDeep} 50%, ${B.tealDark} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="relative mx-auto max-w-[1200px] px-6 pt-20 pb-20">
          <div className="max-w-2xl">
            <p style={{ fontFamily: BODY, fontSize: T.label, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: B.teal, marginBottom: 16 }}>
              Industries
            </p>
            <h1 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: T.hero, lineHeight: 1.1, letterSpacing: '-0.025em', color: B.white }}>
              Built for the industries<br />
              <span style={{ color: B.tealPale }}>that can't afford to get it wrong.</span>
            </h1>
            <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: T.body, lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', marginTop: 20, maxWidth: 540 }}>
              Five industries. Different requirements, different stakes — one platform built to handle all of them with the same standard of vetting, tracking and accountability.
            </p>
          </div>
          {/* Industry jump links (in-page anchors — use-cases stays as one long page) */}
          <div className="flex flex-wrap gap-2 mt-12">
            {INDUSTRIES.map(ind => (
              <a key={ind.id} href={`#${ind.id}`}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', fontFamily: BODY, fontSize: T.label, fontWeight: 500, color: 'rgba(255,255,255,0.80)', padding: '8px 16px', borderRadius: 6, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                className="hover:bg-white/15 transition-colors">
                <ind.icon size={13} />
                {ind.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <MarketingHub heading="Use Cases" pages={USE_CASES_HUB.map(p => ({ ...p, active: p.href === '/use-cases' }))} />

      {/* ── INDUSTRY SECTIONS ────────────────────────────────────────────── */}
      {INDUSTRIES.map((ind, i) => {
        const isEven = i % 2 === 0;
        const bg = isEven ? B.white : B.gray10;
        return (
          <section key={ind.id} id={ind.id}
            style={{ background: bg, borderTop: '1px solid #E0E0E0' }}
            className="py-24">
            <div className="mx-auto max-w-[1200px] px-6">
              <div className="grid md:grid-cols-2 gap-16 items-start">

                {/* Text side */}
                <div className={!isEven ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-6">
                    <div style={{ width: 48, height: 48, background: B.tealBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ind.icon size={22} style={{ color: B.tealDark }} />
                    </div>
                    <p style={{ fontFamily: BODY, fontSize: T.label, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: B.tealDark }}>{ind.label}</p>
                  </div>
                  <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: T.h2, letterSpacing: '-0.02em', color: B.gray100, lineHeight: 1.2, whiteSpace: 'pre-line' }}>
                    {ind.headline}
                  </h2>
                  <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: T.body, color: B.gray70, marginTop: 16, lineHeight: 1.75 }}>
                    {ind.intro}
                  </p>
                  <div className="mt-8 space-y-3">
                    {ind.points.map(pt => (
                      <div key={pt} className="flex items-start gap-3">
                        <CheckCircle2 size={18} style={{ color: B.tealDark, marginTop: 2, flexShrink: 0 }} />
                        <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: T.body, color: B.gray70, lineHeight: 1.65 }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 28 }}>
                    <Link href="/register"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: B.tealDark, fontFamily: BODY, fontSize: T.body, fontWeight: 600, color: B.white, padding: '12px 22px', borderRadius: 6, textDecoration: 'none' }}
                      className="hover:opacity-90 transition-opacity">
                      Get started <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>

                {/* Scenario card side */}
                <div className={!isEven ? 'md:order-1' : ''}>
                  <ScenarioCard scenario={ind.scenario} />
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── CONSISTENT STANDARD ──────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(160deg, #051520 0%, ${B.darkSec} 55%, ${B.tealDeep} 100%)` }} className="py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <p style={{ fontFamily: BODY, fontSize: T.label, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: B.teal }}>Across every industry</p>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: T.h2, letterSpacing: '-0.02em', color: B.white, marginTop: 10, lineHeight: 1.2 }}>
              The platform standard doesn't change.<br />The industry requirements do.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.07)' }}>
            {[
              { icon: Shield,   title: 'Vetted providers',  desc: 'Background-checked, insured and credential-verified before their first delivery — regardless of industry.' },
              { icon: MapPin,   title: 'Live GPS',          desc: 'Real-time position from pickup to delivery. Every mile tracked, every milestone logged.' },
              { icon: Lock,     title: 'Secure payments',   desc: 'Payment held in escrow and only released when the recipient confirms delivery.' },
              { icon: FileText, title: 'Full audit trail',  desc: 'Every handoff, photo, temperature reading and status change logged permanently.' },
            ].map(item => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.03)', padding: '32px 28px' }}>
                <div style={{ width: 44, height: 44, background: 'rgba(144,224,239,0.10)', border: `1px solid ${B.teal}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginBottom: 16 }}>
                  <item.icon size={20} style={{ color: B.teal }} />
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: T.h4, color: B.white, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: T.body, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ background: B.tealBg, borderTop: `1px solid #B0DDE8` }} className="py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: T.h1, letterSpacing: '-0.025em', color: B.gray100, lineHeight: 1.15 }}>
            Your industry. Your requirements.<br />Our platform.
          </h2>
          <p style={{ fontFamily: BODY, fontWeight: 400, fontSize: T.body, color: B.gray70, marginTop: 20, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.75 }}>
            Free to start. Tell us what you need to move and we'll show you who can handle it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link href="/register"
              style={{ background: B.tealDark, fontFamily: BODY, fontSize: T.body, fontWeight: 700, color: B.white, padding: '16px 36px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
              className="hover:opacity-90 transition-opacity">
              Get started free <ArrowRight size={16} />
            </Link>
            <Link href="/how-it-works"
              style={{ border: `2px solid ${B.tealDark}`, fontFamily: BODY, fontSize: T.body, fontWeight: 600, color: B.tealDark, padding: '14px 36px', borderRadius: 6, textDecoration: 'none' }}
              className="hover:bg-white transition-colors">
              See how it works
            </Link>
          </div>
          <p style={{ fontFamily: BODY, fontSize: T.fine, color: B.gray50, marginTop: 20 }}>
            No setup fees · No long-term commitment
          </p>
        </div>
      </section>

    </div>
  );
}
