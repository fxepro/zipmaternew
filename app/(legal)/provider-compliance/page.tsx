import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Truck, FileText, ShieldCheck, Activity,
  CheckCircle2, XCircle, ArrowRight, RefreshCw,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Service Provider Compliance — Zipmater',
  description: 'Requirements all couriers and service providers must meet to operate on the Zipmater platform.',
};

const REQUIREMENTS_BY_SERVICE = [
  {
    service: 'Medical Courier / Hospital / Lab Specimen',
    icon: Activity,
    required: [
      'Commercial Auto Liability — minimum $500,000',
      'HIPAA Privacy & Security Training (annual)',
      'OSHA Bloodborne Pathogens Certification (annual)',
      'Background Check — federal level',
    ],
    recommended: ['Chain of Custody Certification', 'OSHA Hazard Communication (HazCom)'],
  },
  {
    service: 'Food & Grocery Delivery',
    icon: Truck,
    required: [
      'Personal Auto Insurance — state minimum',
      'Background Check',
    ],
    recommended: ['Food Handler / ServSafe Certification', 'Insulated bags or cooler for temperature-sensitive orders'],
  },
  {
    service: 'Furniture, Appliances & Moving Help',
    icon: Truck,
    required: [
      'Personal or Commercial Auto Insurance',
      'Cargo Insurance — minimum $25,000',
      'Background Check',
    ],
    recommended: ['Pickup truck, cargo van, or box truck', 'Moving blankets and straps'],
  },
  {
    service: 'White Glove / Fine Art / Specialty',
    icon: ShieldCheck,
    required: [
      'Commercial Auto Liability — minimum $500,000',
      'Cargo Insurance — minimum $250,000',
      'Background Check',
    ],
    recommended: ['White Glove Courier Network Certification', 'Fine Art Handling & Packing', 'Home Goods Delivery (A4DD)'],
  },
  {
    service: 'Last Mile / Local Delivery',
    icon: FileText,
    required: [
      'Personal Auto Insurance — state minimum',
      'Background Check',
    ],
    recommended: ['Defensive Driving Certification'],
  },
];

const ONGOING = [
  'Insurance certificates must remain active — expiry is tracked and couriers are suspended 7 days before lapse if not renewed',
  "Driver's license expiry is tracked — couriers are prompted to renew before it lapses",
  'HIPAA and Bloodborne Pathogens training requires annual renewal',
  'Couriers falling below a 3.0 rating are placed under review',
  'Background checks may be re-run annually for medical and high-value service types',
];

export default function ProviderCompliancePage() {
  return (
    <div className="bg-[var(--color-cream)]">

      {/* Hero */}
      <div className="bg-[var(--color-slate)] text-white px-6 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-sage-light)] mb-4">For Couriers & Service Providers</p>
        <h1 className="text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Service Provider<br />Compliance Requirements
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-[var(--color-sage-light)] leading-relaxed">
          Every courier and service provider on Zipmater must meet minimum standards that protect clients, receivers, and the integrity of the platform. Requirements vary by service type.
        </p>
      </div>

      {/* Requirements by service type */}
      <div className="mx-auto max-w-6xl px-6 py-20 space-y-6">
        <h2 className="text-2xl font-semibold text-[var(--color-slate)] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
          Requirements by Service Type
        </h2>
        {REQUIREMENTS_BY_SERVICE.map(({ service, icon: Icon, required, recommended }) => (
          <div key={service} className="rounded-2xl border border-[var(--color-cream-dark)] bg-[var(--color-white)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-teal-pale)]">
                <Icon size={18} className="text-[var(--color-teal)]" />
              </div>
              <h3 className="text-base font-semibold text-[var(--color-slate)]">{service}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-3">Required</p>
                <ul className="space-y-2">
                  {required.map(r => (
                    <li key={r} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-red-500" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-teal)] mb-3">Recommended</p>
                <ul className="space-y-2">
                  {recommended.map(r => (
                    <li key={r} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[var(--color-teal)]" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ongoing compliance */}
      <div className="bg-[var(--color-white)] border-t border-b border-[var(--color-cream-dark)] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw size={20} className="text-[var(--color-teal)]" />
            <h2 className="text-2xl font-semibold text-[var(--color-slate)]" style={{ fontFamily: 'var(--font-display)' }}>
              Ongoing Compliance
            </h2>
          </div>
          <p className="text-[var(--color-text-muted)] mb-6">Approval to join the platform is not permanent. Couriers must maintain active standing:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {ONGOING.map(item => (
              <div key={item} className="flex items-start gap-2.5 rounded-xl border border-[var(--color-cream-dark)] p-3.5">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[var(--color-teal)]" />
                <p className="text-sm text-[var(--color-text-muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suspension */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <XCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-red-700 mb-2">Grounds for Suspension</p>
              <p className="text-sm text-red-600 leading-relaxed">
                Couriers with lapsed insurance, expired driver's licenses, failed background checks, sustained complaint patterns, or serious driving violations are suspended from receiving new jobs. Suspended accounts receive notice and a 14-day resolution window before account termination.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[var(--color-slate)] text-white px-6 py-16 text-center">
        <h2 className="text-3xl text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Ready to join the network?</h2>
        <p className="text-[var(--color-sage-light)] mb-8">Create your courier account and complete your profile with your certifications and service types.</p>
        <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-teal)] px-8 py-3 text-sm font-semibold text-white hover:bg-[var(--color-teal-light)] transition-colors">
          Apply as a courier <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
