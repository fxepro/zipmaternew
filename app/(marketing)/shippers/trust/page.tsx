'use client';

import Link from 'next/link';
import {
  ArrowRight, ShieldCheck, ScanFace, FileSearch, BadgeCheck,
  ClipboardCheck, Star, Lock, CheckCircle2,
  Globe2, Activity, Users, X, UserCheck,
} from 'lucide-react';
import { MarketingHub } from '@/components/marketing/MarketingHub';
import { SHIPPER_HUB } from '@/lib/marketing/hub-links';
import { T } from '@/lib/type-scale';


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
  gray70:   '#525252',
  gray50:   '#8D8D8D',
  gray20:   '#E0E0E0',
  gray10:   '#F4F4F4',
  white:    '#FFFFFF',
  green:    '#1B9C6B',
};
const BODY = 'var(--font-body)';
const DISPLAY = 'var(--font-display)';

const STATS = [
  { value: '100+',    label: 'Countries — identity verification' },
  { value: '5-layer', label: 'Independent checks per courier' },
  { value: '0',       label: 'Jobs without human approval' },
  { value: 'FCRA',    label: 'Compliant background screening' },
];

const LAYERS = [
  {
    icon: ScanFace,
    step: '01',
    title: 'Government ID + selfie match',
    badge: 'Identity verification',
    desc: 'Every courier submits a government-issued ID and a live selfie. Document photos are cross-matched with liveness detection — spoofed images and mismatched identities are rejected before onboarding continues.',
    bullets: ['100+ countries and thousands of document types', 'Liveness check blocks photos and deepfakes', 'Date of birth extracted and age-verified from the document'],
    color: B.tealDeep,
  },
  {
    icon: Activity,
    step: '02',
    title: "Driver's license & driving record",
    badge: 'Motor vehicle record',
    desc: "A valid driver's license is confirmed and the motor vehicle record is pulled — suspensions, revocations, and major violations are caught before a courier ever sees a job.",
    bullets: ['License status and expiry confirmed', 'Suspensions and DUIs block approval', 'Expiry tracked with renewal prompts'],
    color: B.green,
  },
  {
    icon: FileSearch,
    step: '03',
    title: 'Background screening',
    badge: 'Compliance-grade checks',
    desc: 'Criminal history, watchlist, and county-level records screened to the standard expected of people entering homes, hospitals, and businesses. Couriers are notified and have dispute rights under applicable law.',
    bullets: ['Criminal history and county court records', 'Sex offender and global watchlist screening', 'Re-screening triggered on policy violations'],
    color: '#1a56db',
  },
  {
    icon: ClipboardCheck,
    step: '04',
    title: 'Insurance & service credentials',
    badge: 'Matched to the job type',
    desc: 'Auto and cargo insurance are uploaded and reviewed. Specialty services require the matching credentials — HIPAA and bloodborne pathogens for medical, food handler cards for food delivery.',
    bullets: ['Auto liability policy for every courier', 'Cargo coverage for high-value and medical work', 'HIPAA and chain-of-custody certs for medical', 'Lapsed coverage pauses job access'],
    color: '#7e1f05',
  },
  {
    icon: BadgeCheck,
    step: '05',
    title: 'Human approval',
    badge: 'Zipmater trust team',
    desc: 'No courier accepts a job until a human reviewer signs off on the complete verification record.',
    bullets: ['Admin queue — approve or reject with notes', 'Insurance expiry tracking with renewal alerts', 'Ongoing monitoring on expired documents'],
    color: B.tealNavy,
  },
];

const COMPARE = [
  { feature: 'Identity verified against government ID',     loadboard: false, zipmater: true },
  { feature: 'Driving record (MVR) checked',                loadboard: 'Sometimes', zipmater: true },
  { feature: 'Background screening before first job',       loadboard: 'Sometimes', zipmater: true },
  { feature: 'Credentials matched to job type',             loadboard: false, zipmater: true },
  { feature: 'Human approval before first job',             loadboard: false, zipmater: true },
  { feature: 'Post-job ratings from completed deliveries',  loadboard: 'Sometimes', zipmater: true },
  { feature: 'Insurance on file with expiry tracking',      loadboard: false, zipmater: true },
];

const ASSIGN_FLOW = [
  { n: '01', title: 'Review offers', desc: 'Nearby couriers and your preferred couriers surface with verification badges, ratings, and vehicle type visible before you open the profile.' },
  { n: '02', title: 'Inspect the courier profile', desc: 'See identity status, driving record, background result, insurance expiry, certifications, and completed delivery count — not just a first name.' },
  { n: '03', title: 'Build your network', desc: 'Add couriers you trust to a preferred list. Recurring routes and direct dispatch only go to couriers you have already accepted.' },
  { n: '04', title: 'Assign with confidence', desc: 'Payment is held on assignment. GPS and proof-of-delivery build an audit trail tied to a verified person — not an anonymous account.' },
];

const SHIPPER_CONTROLS = [
  { icon: Users,       title: 'Preferred courier lists',  desc: 'Build an approved network. Only couriers you have explicitly added receive direct offers from your organisation.' },
  { icon: Lock,        title: 'Credential-gated jobs',    desc: 'Medical and high-value jobs can be restricted to couriers holding the right certifications — no open-market exposure.' },
  { icon: Star,        title: 'Ratings drive selection',  desc: 'Reliability, communication, and overall scores accumulate after every completed job. Low-rated couriers are visible before you assign.' },
  { icon: Globe2,      title: 'Local-first matching',     desc: 'Jobs go to couriers near the pickup, with the vehicle the job needs — car, van, truck, or bike.' },
];

const PROFILE_BADGES = [
  { label: 'Identity verified',     status: 'Passed',  ok: true },
  { label: 'Driving record',        status: 'Clear',   ok: true },
  { label: 'Background screening',  status: 'Clear',   ok: true },
  { label: 'Insurance on file',     status: 'Valid',   ok: true },
  { label: 'Human approval',        status: 'Approved', ok: true },
  { label: 'Overall rating',        status: '4.9 ★',   ok: true },
];

export default function ShippersTrustPage() {
  return (
    <div style={{ fontFamily: BODY, WebkitFontSmoothing: 'antialiased', background: B.white }}>

      {/* Hero */}
      <section style={{ background: `linear-gradient(145deg, ${B.tealNavy} 0%, ${B.tealDark} 55%, ${B.teal} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="relative mx-auto max-w-[1200px] px-6 pt-24 pb-24 text-center">
          <p style={{ fontWeight: 600, fontSize: T.label, letterSpacing: '0.12em', textTransform: 'uppercase', color: B.tealPale, marginBottom: 20 }}>
            Verified Couriers
          </p>
          <h1 style={{ fontWeight: 700, fontSize: T.hero, lineHeight: 1.07, letterSpacing: '-0.025em', color: B.white, maxWidth: 800, margin: '0 auto' }}>
            No self-reported credentials.<br />
            <span style={{ color: B.tealPale }}>Every courier, verified five layers deep.</span>
          </h1>
          <p style={{ fontSize: T.body, lineHeight: 1.75, color: 'rgba(255,255,255,0.80)', marginTop: 24, maxWidth: 640, margin: '24px auto 0' }}>
            Identity, driving record, background screening, insurance, and human approval — completed before any courier accepts a job on Zipmater. You see the full record before you assign.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link href="/register"
              style={{ background: B.tealDark, fontSize: T.body, fontWeight: 600, color: B.white, padding: '13px 28px', borderRadius: 6, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              className="hover:opacity-90 transition-opacity">
              Ship with confidence <ArrowRight size={16} />
            </Link>
            <Link href="/carrier-trust"
              style={{ fontSize: T.body, fontWeight: 500, color: 'rgba(255,255,255,0.80)', padding: '13px 24px', borderRadius: 6, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              className="hover:border-white hover:text-white transition-colors">
              Technical verification details
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: B.tealNavy, borderBottom: '1px solid rgba(144,224,239,0.15)' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p style={{ fontWeight: 800, fontSize: T.h2, color: B.tealMid }}>{value}</p>
              <p style={{ fontSize: T.label, color: 'rgba(255,255,255,0.6)', marginTop: 4, lineHeight: 1.4 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <MarketingHub heading="Clients" pages={SHIPPER_HUB.map(p => ({ ...p, active: p.href === '/shippers/trust' }))} />

      {/* Intro */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(48px, 6vw, 72px) 24px', textAlign: 'center' }}>
        <p style={{ fontWeight: 600, fontSize: T.label, letterSpacing: '0.10em', textTransform: 'uppercase', color: B.tealDark, marginBottom: 12 }}>Trust & safety</p>
        <h2 style={{ fontWeight: 700, fontSize: T.h2, color: B.gray100, margin: '0 0 16px' }}>The problem with &ldquo;verified&rdquo; gig apps</h2>
        <p style={{ fontSize: T.body, color: B.gray70, lineHeight: 1.75 }}>
          Most platforms accept courier information at face value. A license number typed into a sign-up form is not verification.
          Zipmater runs live registry lookups, identity and background checks, and requires human approval — checks that cannot be falsified by the courier.
        </p>
      </section>

      {/* Comparison table */}
      <section style={{ background: B.gray10 }}>
        <div className="mx-auto max-w-[900px] px-6 py-20">
          <p style={{ fontWeight: 600, fontSize: T.label, letterSpacing: '0.10em', textTransform: 'uppercase', color: B.tealDark, textAlign: 'center', marginBottom: 12 }}>Comparison</p>
          <h2 style={{ fontWeight: 700, fontSize: T.h2, color: B.gray100, textAlign: 'center', marginBottom: 40 }}>Typical gig app vs Zipmater</h2>
          <div style={{ background: B.white, borderRadius: 12, border: `1px solid ${B.gray20}`, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', gap: 0, background: B.tealBg, padding: '14px 20px', borderBottom: `1px solid ${B.gray20}` }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: B.tealNavy, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Verification</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: B.gray50, textAlign: 'center' }}>Typical</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: B.tealDeep, textAlign: 'center' }}>Zipmater</span>
            </div>
            {COMPARE.map((row, i) => (
              <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', padding: '14px 20px', borderBottom: i < COMPARE.length - 1 ? `1px solid ${B.gray10}` : 'none', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: B.gray70 }}>{row.feature}</span>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {row.loadboard === false
                    ? <X size={18} color="#d64545" />
                    : <span style={{ fontSize: 12, color: B.gray50 }}>{row.loadboard}</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {row.zipmater === true && <CheckCircle2 size={18} color={B.green} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification layers */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(48px, 6vw, 72px) 24px clamp(64px, 8vw, 96px)' }}>
        <p style={{ fontWeight: 600, fontSize: T.label, letterSpacing: '0.10em', textTransform: 'uppercase', color: B.tealDark, textAlign: 'center', marginBottom: 12 }}>Verification stack</p>
        <h2 style={{ fontWeight: 700, fontSize: T.h2, color: B.gray100, textAlign: 'center', marginBottom: 48 }}>Five independent layers — every courier</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {LAYERS.map((layer) => {
            const Icon = layer.icon;
            return (
              <div key={layer.step} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 28, background: B.gray10, borderRadius: 16, padding: 'clamp(20px, 3vw, 36px)', border: `1px solid ${B.gray20}` }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: layer.color + '18', border: `1.5px solid ${layer.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color={layer.color} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: layer.color, letterSpacing: '0.12em' }}>{layer.step}</span>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                    <h3 style={{ fontSize: T.h3, fontWeight: 700, color: B.darkCard, margin: 0 }}>{layer.title}</h3>
                    <span style={{ fontSize: 10, fontWeight: 600, color: layer.color, background: layer.color + '15', border: `1px solid ${layer.color}30`, borderRadius: 99, padding: '2px 10px', letterSpacing: '0.04em' }}>
                      {layer.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: 15, color: B.gray70, lineHeight: 1.7, margin: '0 0 16px' }}>{layer.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '6px 16px' }}>
                    {layer.bullets.map(b => (
                      <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <CheckCircle2 size={13} color={layer.color} style={{ marginTop: 3, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: B.gray70, lineHeight: 1.5 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Courier profile preview */}
      <section style={{ background: B.white }}>
        <div className="mx-auto max-w-[1080px] px-6 py-24">
          <p style={{ fontWeight: 600, fontSize: T.label, letterSpacing: '0.10em', textTransform: 'uppercase', color: B.tealDark, textAlign: 'center', marginBottom: 12 }}>Courier profile</p>
          <h2 style={{ fontWeight: 700, fontSize: T.h2, color: B.gray100, textAlign: 'center', marginBottom: 48 }}>What you see before you assign a job</h2>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div style={{ background: B.gray10, borderRadius: 16, padding: '32px 28px', border: `1px solid ${B.gray20}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: B.tealNavy, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={26} color={B.teal} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 18, color: B.gray100, margin: '0 0 4px' }}>Maria Reyes</p>
                  <p style={{ fontSize: 13, color: B.gray50, margin: 0 }}>Cargo van · Medical certified · 284 deliveries</p>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: B.green, background: '#E4F6EE', borderRadius: 99, padding: '4px 10px' }}>Verified</span>
              </div>
              {PROFILE_BADGES.map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${B.gray20}` }}>
                  <span style={{ fontSize: 14, color: B.gray70 }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: row.ok ? B.green : B.gray50 }}>{row.status}</span>
                </div>
              ))}
              <p style={{ fontSize: 12, color: B.gray50, marginTop: 16, fontStyle: 'italic' }}>Illustrative profile — actual data shown at assignment time.</p>
            </div>
            <div>
              <p style={{ fontSize: T.body, color: B.gray70, lineHeight: 1.75, marginBottom: 24 }}>
                Every bid and direct offer links to a courier profile with verification status, credential expiry dates,
                vehicle details, service types, and post-job ratings. Dispatch decisions are based on evidence — not a rate and a phone number.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Auto and cargo insurance with expiry dates visible',
                  'HIPAA, food handler, and specialty certifications listed',
                  'Reliability and communication scores after each job',
                  'Vehicle type and service categories matched to your job',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Lock size={14} color={B.tealDeep} style={{ marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: B.gray70, lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assign workflow */}
      <section style={{ background: B.gray10 }}>
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <p style={{ fontWeight: 600, fontSize: T.label, letterSpacing: '0.10em', textTransform: 'uppercase', color: B.tealDark, textAlign: 'center', marginBottom: 12 }}>Your workflow</p>
          <h2 style={{ fontWeight: 700, fontSize: T.h2, color: B.gray100, textAlign: 'center', marginBottom: 56 }}>How clients use verification at assignment</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ASSIGN_FLOW.map(({ n, title, desc }) => (
              <div key={n} style={{ background: B.white, borderRadius: 8, padding: '28px 24px', border: '1px solid rgba(0,150,199,0.12)' }}>
                <p style={{ fontWeight: 700, fontSize: T.h2, color: B.tealBg, lineHeight: 1, marginBottom: 16 }}>{n}</p>
                <h3 style={{ fontWeight: 600, fontSize: T.h4, color: B.gray100, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: T.body, color: B.gray70, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client controls */}
      <section style={{ background: B.darkSec }}>
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <p style={{ fontWeight: 600, fontSize: T.label, letterSpacing: '0.10em', textTransform: 'uppercase', color: B.teal, textAlign: 'center', marginBottom: 12 }}>Your controls</p>
          <h2 style={{ fontWeight: 700, fontSize: T.h2, color: B.white, textAlign: 'center', marginBottom: 48 }}>Verification is the floor — your network is the filter</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {SHIPPER_CONTROLS.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '28px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
                <Icon size={22} color={B.teal} style={{ marginBottom: 14 }} />
                <h3 style={{ fontWeight: 600, fontSize: T.h4, color: B.white, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: T.body, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulated deliveries callout */}
      <section style={{ background: B.white, borderTop: `1px solid ${B.gray10}` }}>
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '28px 32px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <ShieldCheck size={24} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontWeight: 600, fontSize: T.h4, color: '#14532d', marginBottom: 8 }}>Medical deliveries need more than a background check</p>
              <p style={{ fontSize: T.body, color: '#166534', lineHeight: 1.65 }}>
                Medical and high-value deliveries can be restricted to couriers with HIPAA, bloodborne pathogen, and chain-of-custody certifications on file. Zipmater enforces credential requirements at the job level — not just at onboarding.{' '}
                <Link href="/use-cases/medical" style={{ color: '#16a34a', fontWeight: 500 }}>Medical courier details →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* International */}
      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${B.tealNavy} 0%, ${B.darkSec} 100%)` }}>
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center">
          <ShieldCheck size={36} color={B.teal} style={{ margin: '0 auto 20px' }} />
          <h2 style={{ fontWeight: 700, fontSize: T.h2, color: B.white, marginBottom: 16 }}>Assign jobs to verified couriers</h2>
          <p style={{ fontSize: T.body, color: 'rgba(255,255,255,0.70)', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
            Build a preferred courier network, run recurring routes with approved couriers, and post open-market jobs knowing every courier passed the same five-layer stack.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/register"
              style={{ background: B.tealDark, fontSize: T.body, fontWeight: 600, color: B.white, padding: '14px 32px', borderRadius: 6, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              className="hover:opacity-90 transition-opacity">
              Create free client account <ArrowRight size={16} />
            </Link>
            <Link href="/shippers/shipping"
              style={{ fontSize: T.body, fontWeight: 500, color: 'rgba(255,255,255,0.80)', padding: '13px 24px', borderRadius: 6, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              className="hover:border-white hover:text-white transition-colors">
              Shipping & routes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
