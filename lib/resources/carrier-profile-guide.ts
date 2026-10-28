/**
 * Customer-facing Profile guide (carrier Account → Profile).
 * Mirrors shipper guide structure; no admin/vendor setup content.
 */

import type { GuideMatrix, GuideSection } from '@/lib/resources/profile-guide';

export const CARRIER_PROFILE_TABS: GuideSection[] = [
  {
    id: 'tab-personal',
    title: 'Personal',
    summary:
      'Who you are and how to reach you. Name, phone, date of birth, and home address are required for identity and background checks.',
    bullets: [
      'Required: first name, last name, phone (+ country code), date of birth (18+), street, city, state, ZIP',
      "Driver's license number, state, and expiry — needed for the driving record check",
      'Email is required and read-only (from your login)',
      'Optional: middle name, suffix, WhatsApp',
      'Stripe Identity verifies government ID + selfie — start it here; results update automatically',
    ],
  },
  {
    id: 'tab-services',
    title: 'Services',
    summary:
      'Select the delivery services you offer. Your selections drive which Insurance fields and certifications become required.',
    bullets: [
      'Choose all service types you offer',
      'Required fields for those types appear in the amber banner until completed',
      'Save after changing selections',
    ],
  },
  {
    id: 'tab-certifications',
    title: 'Certifications',
    summary:
      'Optional credentials that help clients trust you for specialized work.',
    bullets: [
      'Optional: select certifications you hold',
      'No required fields for account completeness',
    ],
  },
  {
    id: 'tab-insurance',
    title: 'Insurance',
    summary:
      'Auto liability and cargo coverage. Policy numbers become required based on the services you selected.',
    bullets: [
      'Auto policy number — required for most service types',
      'Cargo policy number — required for medical, white glove, and other high-value services',
      'Upload Certificate of Insurance (COI) and keep expiry current',
    ],
  },
  {
    id: 'tab-financial',
    title: 'Financial',
    summary:
      'Platform onboarding fee and Stripe Connect for payouts. These are action flows, not banner fields.',
    bullets: [
      'Pay the onboarding fee when prompted',
      'Connect Stripe to receive payouts',
      'Tax / SSN details are collected inside Stripe — not stored on this form',
    ],
  },
  {
    id: 'tab-background',
    title: 'Background',
    summary:
      'Checkr background check and driving record (MVR). Complete Personal first.',
    bullets: [
      'Checkr needs first name, last name, and date of birth (18+) saved on Personal',
      'You enter SSN on Checkr’s secure form — we never store full SSN',
      "Driving record check uses the driver's license saved on Personal",
    ],
  },
  {
    id: 'tab-vehicles',
    title: 'Vehicles',
    summary:
      'The car, van, truck, or bike you use on jobs. Add at least one once you have selected services.',
    bullets: [
      'Required to add: year, make, model',
      'Upload registration and vehicle photos',
      'Banner reminds you if no vehicle is on file after selecting services',
    ],
  },
  {
    id: 'tab-reviews',
    title: 'Reviews',
    summary:
      'Ratings from clients after completed jobs. Read-only — nothing to fill in.',
    bullets: [
      'View ratings and feedback',
      'No required fields',
    ],
  },
];

export const CARRIER_VERIFICATION_MATRIX: GuideMatrix = {
  title: 'Verification checklist',
  description:
    'Identity, background, and driving record are person checks. Insurance and certifications follow from the services you offer. Action failures toast on click — they are not listed in the amber banner.',
  columns: ['Step', 'Required first', 'What you do', 'When it is done'],
  rows: [
    [
      'Identity (Stripe)',
      'Courier account',
      'Verify Identity → photograph ID + selfie on Stripe',
      'Identity Verified badge on Personal',
    ],
    [
      'Age',
      'Date of birth saved (18+); confirmed again by Stripe ID',
      'Save DOB on Personal; complete Identity',
      'Age Verified',
    ],
    [
      'Background (Checkr)',
      'First + last name and DOB (18+) on Personal',
      'Run Background Check → complete Checkr form (SSN on Checkr)',
      'Background status clear / consider',
    ],
    [
      'Payouts',
      'Onboarding fee paid; Stripe Connect complete',
      'Financial tab → Connect / pay fee',
      'Ready for payouts',
    ],
  ],
};

export const CARRIER_REQUIREMENTS_MATRIX: GuideMatrix = {
  title: 'What is required where',
  description:
    'Always-required Personal fields plus service-driven Insurance fields. The amber banner lists missing items and links to the right tab.',
  columns: ['Item', 'Where', 'Rule', 'Shown in'],
  rows: [
    ['First / last name', 'Personal', 'Required (Checkr)', 'Banner + save'],
    ['Email', 'Personal', 'Required (login)', 'Banner'],
    ['Phone + country code', 'Personal', 'Required; 6–12 local digits', 'Banner + save'],
    ['WhatsApp', 'Personal', 'Optional', '—'],
    ['Date of birth', 'Personal', 'Required; must be 18+', 'Banner + save'],
    ['Home address', 'Personal', 'Street, city, state, ZIP required', 'Banner + save'],
    ['Stripe Identity', 'Personal', 'Gov ID + selfie', 'Toast / Stripe'],
    ['Service types', 'Services', 'Drive other required fields', 'Save'],
    ['Auto policy #', 'Insurance', 'Required for most services', 'Banner + save'],
    ['Cargo policy #', 'Insurance', 'Required for many services', 'Banner + save'],
    ['COI upload', 'Insurance', 'Upload current certificate', 'Upload'],
    ["Driver's license", 'Personal', 'Number, state, expiry', 'Save'],
    ['Vehicle year/make/model', 'Vehicles', 'Required to add a unit', 'Toast on add'],
    ['≥1 vehicle', 'Vehicles', 'After services selected', 'Banner'],
    ['Checkr', 'Background', 'Name + DOB first', 'Toast on click'],
    ['Onboarding fee / Stripe', 'Financial', 'Action flows', 'Toast / Stripe'],
  ],
};

export const CARRIER_VALIDATION_BEHAVIOR_MATRIX: GuideMatrix = {
  title: 'How validation works',
  description:
    'Same three layers as client Account Settings: banner for missing data, save blockers on tabs, and toasts for verification actions.',
  columns: ['Layer', 'When it appears', 'What it covers'],
  rows: [
    [
      'Amber banner',
      'While browsing any Profile tab',
      'Personal required fields + service-driven Insurance / Vehicles gaps',
    ],
    [
      'Save on tab',
      'When you click Save',
      'Personal and Insurance rules for your services; vehicle add rules',
    ],
    [
      'Action toast',
      'When you click Verify Identity, Run Background Check, or pay / Connect',
      'Prerequisites for that action only',
    ],
  ],
};
