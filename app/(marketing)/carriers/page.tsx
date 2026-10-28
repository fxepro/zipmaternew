'use client';

import Link from 'next/link';
import {
  ArrowRight, UserCheck, Search, Truck, CreditCard, Eye,
  MapPin, ShieldCheck, Star, CheckCircle2, ChevronDown,
  TrendingUp, Clock, Globe2, BadgeCheck,
} from 'lucide-react';
import { useState } from 'react';
import { MarketingHub } from '@/components/marketing/MarketingHub';
import { CARRIER_HUB } from '@/lib/marketing/hub-links';
import { T } from '@/lib/type-scale';


// ── Design tokens ─────────────────────────────────────────────────────────────
const B = {
  teal:     '#90E0EF',
  tealMid:  '#48CAE4',
  tealDark: '#0096C7',
  tealDeep: '#0077B6',
  tealNavy: '#023E8A',
  darkSec:  '#0A2E40',
  darkCard: '#0A1520',
  gray70:   '#525252',
  gray20:   '#E0E0E0',
  gray10:   '#F4F4F4',
  white:    '#FFFFFF',
  green:    '#1B9C6B',
};
const BODY = 'var(--font-body)';
const DISPLAY = 'var(--font-display)';

// ── How it works steps ────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: UserCheck,
    title: 'Create profile & verify identity',
    desc: 'Sign up in minutes. Complete our 5-layer verification: government ID, selfie match, driving record, background check, and insurance. Verification unlocks full job access.',
    color: B.tealDeep,
  },
  {
    step: '02',
    icon: Search,
    title: 'Browse & bid on jobs',
    desc: 'Search thousands of available jobs filtered by origin, destination, equipment type, and rate. Submit competitive bids directly to clients — no middleman, no phone tag.',
    color: B.tealMid,
  },
  {
    step: '03',
    icon: Truck,
    title: 'Deliver & get paid fast',
    desc: 'Complete the delivery, upload your POD, and get paid directly to your Stripe account. Average payout within 48 hours of delivery confirmation — no factoring needed.',
    color: B.green,
  },
];

// ── Why Zipmater ─────────────────────────────────────────────────────────────

const WHY = [
  {
    icon: CreditCard,
    title: 'Fast payouts via Stripe Connect',
    desc: 'Get paid directly to your bank account through Stripe. No waiting for weekly payout cycles. Average courier payout is within 48 hours of POD upload.',
    color: B.tealDeep,
  },
  {
    icon: Eye,
    title: 'Full job transparency',
    desc: 'See the complete job details before you bid — origin, destination, commodity, weight, equipment type, and client rating. No hidden fees, no surprise deductions.',
    color: B.tealMid,
  },
  {
    icon: MapPin,
    title: 'Real-time tracking',
    desc: 'Clients track your job in real time via GPS. Less calls, less check-ins. You drive, we handle the communication. No separate ELD app required.',
    color: B.tealDark,
  },
  {
    icon: ShieldCheck,
    title: 'Identity-verified clients',
    desc: 'Every client on the platform has gone through identity verification. You\'re not picking up from an anonymous posting — you know exactly who you\'re working with.',
    color: B.green,
  },
];

// ── Requirements ──────────────────────────────────────────────────────────────

const REQUIREMENTS: { label: string; required: boolean; note?: string }[] = [
  { label: "Valid driver's license", required: true },
  { label: 'At least 21 years old with 1+ year of driving experience', required: true },
  { label: 'Stripe account for direct payouts', required: true },
  { label: 'Government-issued photo ID for identity verification', required: true },
  { label: 'Personal auto insurance (cargo coverage for medical & high-value jobs)', required: true },
  { label: 'Smartphone with GPS — car, van, truck, or bike', required: true },
];

// ── Stats ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '10,000+',  label: 'Jobs completed',          icon: Truck },
  { value: '48 hrs',   label: 'Average payout time',       icon: Clock },
  { value: '100+',     label: 'Countries for ID verify',   icon: Globe2 },
  { value: '4.9 / 5',  label: 'Average courier rating',    icon: Star },
];

// ── Earnings ──────────────────────────────────────────────────────────────────

const EARNINGS = [
  { type: 'Part-time courier',       weekly: '$300–$600',      annual: '$15,000–$30,000',   note: '15–20 hrs, car' },
  { type: 'Full-time courier',       weekly: '$900–$1,400',    annual: '$45,000–$70,000',   note: '40 hrs, car or van' },
  { type: 'Medical courier',         weekly: '$1,100–$1,700',  annual: '$55,000–$85,000',   note: 'Certified, recurring routes' },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'How long does courier onboarding take?',
    a: 'Most couriers complete onboarding within 24–48 hours. Identity verification (Stripe Identity) takes minutes. Background checks and driving records (Checkr) typically return within a few hours. Our trust team\'s human review is usually completed within one business day.',
  },
  {
    q: 'Do I need a commercial license or my own business?',
    a: 'No. A regular driver\'s license, your own vehicle, and personal auto insurance are enough for most jobs. Medical, food, and high-value work need the matching certifications and cargo coverage, which you can add to your profile any time.',
  },
  {
    q: 'How does the payout work? Is there a factoring fee?',
    a: 'Payouts are processed through Stripe Connect. There is no factoring. When the client confirms delivery and you upload your POD, the job payment is released to your Stripe account, minus the platform fee. Funds typically arrive in your bank account within 1–2 business days after payout release.',
  },
  {
    q: 'What vehicles can I use?',
    a: 'Cars, SUVs, pickup trucks, cargo vans, box trucks, and bikes for downtown routes. You only see jobs that fit your vehicle and the services you have selected.',
  },
  {
    q: 'What if a client disputes the delivery?',
    a: 'Zipmater has a structured dispute resolution process. You\'ll always have the opportunity to provide evidence (photos, GPS logs, signatures, POD). Our team reviews disputes within 48 hours. Couriers with good standing and complete documentation are protected.',
  },
];

// ── FAQ Item ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${B.gray20}`, padding: '18px 0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, gap: 16, textAlign: 'left' }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: B.darkCard, lineHeight: 1.4 }}>{q}</span>
        <ChevronDown size={18} color={B.gray70} style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <p style={{ fontSize: 15, color: B.gray70, lineHeight: 1.75, margin: '12px 0 0' }}>{a}</p>
      )}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CarriersPage() {
  return (
    <div style={{ fontFamily: BODY, background: B.white, color: B.darkCard }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${B.tealNavy} 0%, ${B.darkSec} 100%)`, padding: 'clamp(64px, 8vw, 112px) 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(144,224,239,0.12)', border: '1px solid rgba(144,224,239,0.3)', borderRadius: 99, padding: '6px 16px', marginBottom: 24 }}>
            <Truck size={14} color={B.teal} />
            <span style={{ fontSize: 12, fontWeight: 600, color: B.teal, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              For Couriers
            </span>
          </div>
          <h1 style={{ fontSize: T.hero, fontWeight: 700, color: B.white, lineHeight: 1.15, margin: '0 0 20px' }}>
            Earn on your schedule.<br />
            <span style={{ color: B.tealMid }}>Get paid faster.</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 36px' }}>
            Zipmater connects verified couriers to quality jobs with transparent rates and Stripe-powered payouts — no factoring, no phone tag, no hidden deductions.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/register?role=carrier"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: B.tealMid, color: B.tealNavy, fontWeight: 700, fontSize: 15, padding: '13px 30px', borderRadius: 10, textDecoration: 'none' }}
            >
              Create your courier profile <ArrowRight size={16} />
            </Link>
            <Link
              href="/carrier-trust"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: B.white, fontWeight: 600, fontSize: 15, padding: '13px 30px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)', textDecoration: 'none' }}
            >
              How verification works
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────────── */}
      <section style={{ background: B.tealNavy, borderBottom: `1px solid rgba(144,224,239,0.15)` }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '28px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24 }}>
          {STATS.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.value} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                  <Icon size={18} color={B.tealMid} />
                </div>
                <p style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, color: B.tealMid, margin: '0 0 4px' }}>{s.value}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <MarketingHub heading="Couriers" pages={CARRIER_HUB.map(p => ({ ...p, active: p.href === '/carriers' }))} />

      {/* ── How it works ─────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: T.h2, fontWeight: 700, color: B.darkCard, margin: '0 0 12px' }}>
            How it works
          </h2>
          <p style={{ fontSize: T.body, color: B.gray70, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Three steps from sign-up to your first payout.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                style={{
                  background: B.gray10,
                  border: `1px solid ${B.gray20}`,
                  borderRadius: 16,
                  padding: 'clamp(24px, 3vw, 32px)',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: step.color + '18', border: `1.5px solid ${step.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} color={step.color} />
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: step.color, letterSpacing: '0.12em', display: 'block', marginBottom: 4 }}>STEP {step.step}</span>
                    <h3 style={{ fontSize: T.h3, fontWeight: 700, color: B.darkCard, margin: 0, lineHeight: 1.3 }}>{step.title}</h3>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: B.gray70, lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div style={{ display: 'none' }} aria-hidden />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Why Zipmater ────────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${B.tealNavy} 0%, ${B.darkSec} 100%)`, padding: 'clamp(48px, 6vw, 80px) 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: T.h2, fontWeight: 700, color: B.white, margin: '0 0 12px' }}>
              Why couriers choose Zipmater
            </h2>
            <p style={{ fontSize: T.body, color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              We built Zipmater for the people who actually make the deliveries.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {WHY.map(item => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  style={{
                    background: 'rgba(144,224,239,0.06)',
                    border: '1px solid rgba(144,224,239,0.15)',
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: item.color + '20', border: `1.5px solid ${item.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Icon size={20} color={item.color} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: B.white, margin: '0 0 8px', lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Earnings potential ───────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: B.green + '15', border: `1px solid ${B.green}30`, borderRadius: 99, padding: '6px 16px', marginBottom: 16 }}>
            <TrendingUp size={14} color={B.green} />
            <span style={{ fontSize: 12, fontWeight: 600, color: B.green, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Earnings potential</span>
          </div>
          <h2 style={{ fontSize: T.h2, fontWeight: 700, color: B.darkCard, margin: '0 0 12px' }}>
            What couriers earn on Zipmater
          </h2>
          <p style={{ fontSize: T.body, color: B.gray70, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Estimates based on average job rates for verified couriers with full-time availability. Actual earnings vary by city, vehicle, hours, and job availability.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {EARNINGS.map(e => (
            <div
              key={e.type}
              style={{
                background: B.gray10,
                border: `1px solid ${B.gray20}`,
                borderRadius: 16,
                padding: 28,
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, color: B.tealDark, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 8px' }}>{e.type}</p>
              <p style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: B.darkCard, margin: '0 0 4px', lineHeight: 1.2 }}>{e.weekly}</p>
              <p style={{ fontSize: 12, color: B.gray70, margin: '0 0 12px' }}>per week</p>
              <div style={{ height: 1, background: B.gray20, margin: '12px 0' }} />
              <p style={{ fontSize: 13, fontWeight: 600, color: B.green, margin: '0 0 4px' }}>{e.annual}</p>
              <p style={{ fontSize: 12, color: B.gray70, margin: 0 }}>estimated annual gross</p>
              <p style={{ fontSize: 11, color: B.gray70, marginTop: 8, fontStyle: 'italic' }}>{e.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Requirements ─────────────────────────────────────────────────────── */}
      <section style={{ background: B.gray10, padding: 'clamp(48px, 6vw, 80px) 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: T.h2, fontWeight: 700, color: B.darkCard, margin: '0 0 12px' }}>
              Courier requirements
            </h2>
            <p style={{ fontSize: T.body, color: B.gray70, lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
              We maintain high standards to protect clients and keep quality jobs on the platform.
            </p>
          </div>
          <div style={{ background: B.white, border: `1px solid ${B.gray20}`, borderRadius: 16, overflow: 'hidden' }}>
            {REQUIREMENTS.map((req, i) => (
              <div
                key={req.label}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '16px 24px',
                  borderBottom: i < REQUIREMENTS.length - 1 ? `1px solid ${B.gray20}` : 'none',
                  background: i % 2 === 0 ? B.white : B.gray10,
                }}
              >
                <BadgeCheck size={16} color={req.note === 'optional' ? B.tealDark : B.green} style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 14, color: B.darkCard, fontWeight: 500, lineHeight: 1.5 }}>{req.label}</span>
                  {req.note && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: B.tealDark, background: B.tealDark + '12', border: `1px solid ${B.tealDark}25`, borderRadius: 99, padding: '1px 8px', marginLeft: 8, letterSpacing: '0.04em' }}>
                      {req.note}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) 24px' }}>
        <h2 style={{ fontSize: T.h2, fontWeight: 700, color: B.darkCard, textAlign: 'center', margin: '0 0 8px' }}>
          Courier FAQ
        </h2>
        <p style={{ fontSize: 16, color: B.gray70, textAlign: 'center', margin: '0 0 40px' }}>
          More questions? <a href="/contact" style={{ color: B.tealDark, textDecoration: 'none', fontWeight: 600 }}>Reach out to our team</a>.
        </p>
        <div>
          {FAQS.map(faq => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${B.tealNavy} 0%, ${B.darkSec} 100%)`, padding: 'clamp(48px, 6vw, 80px) 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            {[
              { label: '10,000+ jobs', icon: Truck },
              { label: '48hr payouts', icon: Clock },
              { label: 'Verified clients', icon: ShieldCheck },
            ].map(({ label, icon: Icon }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color={B.tealMid} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
          <h2 style={{ fontSize: T.h2, fontWeight: 700, color: B.white, margin: '0 0 16px' }}>
            Start earning more today
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 36px' }}>
            Join thousands of verified couriers already delivering on Zipmater. Create your profile in minutes.
          </p>
          <Link
            href="/register?role=carrier"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: B.tealMid, color: B.tealNavy, fontWeight: 700, fontSize: 16, padding: '14px 34px', borderRadius: 10, textDecoration: 'none' }}
          >
            Create your courier profile <ArrowRight size={17} />
          </Link>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 14 }}>
            Free to join. No subscription fees for couriers.
          </p>
        </div>
      </section>

    </div>
  );
}
