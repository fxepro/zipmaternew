import {
  Stethoscope, ShoppingCart,
  Store, Landmark, Frame,
  type LucideIcon,
} from 'lucide-react';

export interface IndustryCapability {
  title: string;
  desc: string;
}

export interface IndustryScenarioStep {
  time: string;
  text: string;
}

export interface IndustryPage {
  slug: string;
  title: string;
  accent: string;
  subtitle: string;
  /** Drop your photo at public/industries/{slug}.jpg */
  image: string;
  imageAlt: string;
  challengeTitle: string;
  challenge: string;
  approachTitle: string;
  approach: string;
  capabilities: IndustryCapability[];
  scenarioTitle: string;
  scenarioTag: string;
  scenario: IndustryScenarioStep[];
  outcomes: string[];
  icon: LucideIcon;
}

/** The Industries — independent pages under /industries/[slug]. */
export const INDUSTRIES: IndustryPage[] = [
  {
    slug: 'healthcare-pharma',
    icon: Stethoscope,
    title: 'Healthcare & Pharma',
    accent: 'Cold chain. Chain of custody. No exceptions.',
    subtitle:
      'Lab samples, medications, and medical equipment move under temperature control, photo proof, and an exportable audit trail — not a standard courier workflow.',
    image: '/industries/healthcare-pharma.jpg',
    imageAlt: 'Medical courier loading temperature-controlled specimens',
    challengeTitle: 'Medical deliveries fail on gaps, not miles',
    challenge:
      'A missed temperature window, an undocumented handoff, or an unvetted courier can invalidate a specimen run or expose a compliance gap. Healthcare and pharma logistics need couriers who are matched to cold-chain capability, jobs that capture lot and batch data, and a record that survives an audit — not a status emoji in a text thread.',
    approachTitle: 'How Zipmater runs medical moves',
    approach:
      'Post with handling requirements that filter the field. Contracted pools keep approved vendors only. Every stop can log temperature context, photos, and GPS. When the run closes, you export a chain-of-custody record tied to a verified courier — not an anonymous phone number.',
    capabilities: [
      {
        title: 'Cold-chain matching',
        desc: 'Jobs that require refrigerated handling only surface to couriers with the right equipment profile. Non-compliant bidders stay out of the pool.',
      },
      {
        title: 'Lot and batch fields',
        desc: 'Capture pharmaceutical identifiers on the job so traceability lives with the shipment record, not in a side spreadsheet.',
      },
      {
        title: 'Photo + GPS custody',
        desc: 'Pickup and delivery evidence with timestamps and location creates an auditable handoff history for compliance and insurance.',
      },
      {
        title: 'Approved vendor pools',
        desc: 'Contracted courier lists keep sensitive routes off the open market when your compliance policy requires a closed network.',
      },
      {
        title: 'Exportable audit trail',
        desc: 'Shipment history, evidence, and status changes stay attached to the job for regulatory review and internal QA.',
      },
      {
        title: 'Time-critical dispatch',
        desc: 'Post with arrival windows and live tracking so labs, clinics, and pharmacies see the same ETA as your ops team.',
      },
    ],
    scenarioTitle: 'A biotech lab ships temperature-sensitive samples before clinic open',
    scenarioTag: 'Cold chain held · Full custody record exported',
    scenario: [
      { time: '4:45am', text: 'Job posted — cold chain required, arrival by 7:00am' },
      { time: '4:53am', text: 'Contracted refrigerated courier confirmed' },
      { time: '5:20am', text: 'Pickup photos + temp logged · GPS custody starts' },
      { time: '6:48am', text: 'En route · live ETA shared with receiving lab' },
      { time: '6:59am', text: 'Delivered · POD + lot verified · record closed' },
    ],
    outcomes: [
      'Only refrigerated-capable couriers see the job',
      'Temperature and photo evidence at both ends',
      'GPS chain of custody exportable for audit',
      'Approved vendors via contracted pools',
    ],
  },
  {
    slug: 'food-beverage',
    icon: ShoppingCart,
    title: 'Food & Beverage',
    accent: 'Recurring routes. Temperature held. Every time.',
    subtitle:
      'Restaurant groups and distributors running the same refrigerated routes week after week — with multi-stop dispatch and a log at every handoff.',
    image: '/industries/food-beverage.jpg',
    imageAlt: 'Refrigerated delivery at a food service dock',
    challengeTitle: 'Food logistics is a calendar problem as much as a truck problem',
    challenge:
      'Miss a temperature window and product is waste. Miss a recurring stop and a kitchen is short. Food and beverage distribution needs contracted reliability, refrigerated enforcement, and multi-stop batching — not a new spot auction every Monday morning.',
    approachTitle: 'How Zipmater runs food & beverage',
    approach:
      'Stand up contracted couriers for your weekly routes. Require refrigerated handling so the wrong equipment never bids. Batch multi-stop runs into one job, log temperature context per stop, and keep route cost history for accounting and compliance.',
    capabilities: [
      {
        title: 'Contracted recurring routes',
        desc: 'Same courier, same standard, predictable rates — without renegotiating every week.',
      },
      {
        title: 'Refrigerated enforcement',
        desc: 'Cold jobs only match couriers with refrigerated capability. Ambient equipment stays filtered out.',
      },
      {
        title: 'Multi-stop batch dispatch',
        desc: 'One request, multiple destinations — restaurant groups and distributors run the full loop in a single job.',
      },
      {
        title: 'Per-stop confirmation',
        desc: 'Delivery confirmation and evidence at each location so nothing “falls off” the route silently.',
      },
      {
        title: 'Temperature-aware logging',
        desc: 'Capture cold-chain context alongside GPS and photos for QA and supplier disputes.',
      },
      {
        title: 'Route cost history',
        desc: 'Summaries per route for accounts payable, franchise reporting, and continuous improvement.',
      },
    ],
    scenarioTitle: 'A restaurant group runs its Monday multi-stop supply loop',
    scenarioTag: 'Recurring · 3 stops · Cold chain held',
    scenario: [
      { time: 'Mon 4:50am', text: 'Recurring job active — contracted refrigerated courier pre-assigned' },
      { time: '5:00am', text: 'Courier confirms · refrigerated unit logged' },
      { time: '5:45am', text: 'DC pickup · temp noted · batch manifest started' },
      { time: '7:30am', text: 'Stop 1 delivered · signed · temp held' },
      { time: '9:10am', text: 'Final stop complete · route log closed' },
    ],
    outcomes: [
      'Contracted couriers for weekly routes',
      'Refrigerated matching enforced',
      'Multi-stop batch in one job',
      'Per-stop confirmation and history',
    ],
  },
  {
    slug: 'retail-ecommerce',
    icon: Store,
    title: 'Retail & E-Commerce',
    accent: 'From DC to doorstep — tracked every mile.',
    subtitle:
      'Store replenishment, returns, and high-touch last-mile with live GPS, proof of delivery, and escrow that releases when the drop is confirmed.',
    image: '/industries/retail-ecommerce.jpg',
    imageAlt: 'Retail distribution and last-mile parcel staging',
    challengeTitle: 'Retail delivery spans the stockroom and the front door',
    challenge:
      'DC-to-store replenishment, customer returns, and white-glove last-mile are different jobs with the same requirement: visibility and proof. Chargebacks and “where is my order” tickets explode when tracking and POD are afterthoughts.',
    approachTitle: 'How Zipmater runs retail moves',
    approach:
      'Batch multi-stop store runs, share live tracking with ops or the customer, and require POD with photos and signature. Use recurring routes for standing replenishment and open market when volume spikes. Escrow holds payment until delivery is confirmed.',
    capabilities: [
      {
        title: 'DC and store multi-stop',
        desc: 'Replenish a region in one job — every store stop confirmed individually.',
      },
      {
        title: 'Last-mile and white glove',
        desc: 'High-value retail and furniture-style drops with handling requirements and photo POD.',
      },
      {
        title: 'Shared live tracking',
        desc: 'Give stores, customers, or franchise ops the same map your desk uses.',
      },
      {
        title: 'Proof at every drop',
        desc: 'Photos and signatures close the loop for chargebacks and customer support.',
      },
      {
        title: 'Route flexibility',
        desc: 'Contracted capacity for standing routes; open market when peak season hits.',
      },
      {
        title: 'Escrow on confirmation',
        desc: 'Funds release when delivery is confirmed — not when the truck leaves the yard.',
      },
    ],
    scenarioTitle: 'A regional retailer replenishes eight stores before weekend open',
    scenarioTag: 'Multi-stop · Live tracking · POD at every door',
    scenario: [
      { time: 'Thu 6:00pm', text: 'Multi-stop replenishment job posted from DC' },
      { time: 'Thu 7:10pm', text: 'Contracted courier assigned · manifest locked' },
      { time: 'Fri 5:30am', text: 'DC loaded · GPS live for store ops' },
      { time: 'Fri 11:40am', text: 'Stops 1–5 delivered · photo POD each' },
      { time: 'Fri 3:20pm', text: 'Final store complete · escrow release queued' },
    ],
    outcomes: [
      'Multi-stop store and DC runs',
      'Live GPS for ops and customers',
      'POD with photos and signature',
      'Escrow release on confirmation',
    ],
  },
  {
    slug: 'government',
    icon: Landmark,
    title: 'Government & Public Sector',
    accent: 'Verified couriers. Full audit trail. No shortcuts.',
    subtitle:
      'Agency and municipal deliveries with background-checked couriers, chain of custody, role-based access, and records you can export for oversight.',
    image: '/industries/government.jpg',
    imageAlt: 'Secure public-sector delivery at a civic building',
    challengeTitle: 'Public deliveries are judged on process, not just arrival',
    challenge:
      'Government and public-sector moves must survive FOIA, inspector general review, and internal audit. Anonymous couriers, missing custody logs, and informal payment trails create exposure. You need verified operators, closed preferred pools when required, and an exportable record of every handoff and payment.',
    approachTitle: 'How Zipmater runs public-sector moves',
    approach:
      'Only verified couriers — identity, authority, screening, insurance. Restrict sensitive work to contracted approved vendors. Capture photos, GPS, and signatures. Give agencies role-based org access and escrow release on confirmed delivery with a payment history you can export.',
    capabilities: [
      {
        title: 'Verified courier only',
        desc: 'Background-checked, credential-verified operators — no anonymous loadboard pickup.',
      },
      {
        title: 'Chain of custody',
        desc: 'Photos, GPS, timestamps, and signatures build a defensible custody record.',
      },
      {
        title: 'Approved vendor pools',
        desc: 'Contracted lists keep work inside pre-cleared courier networks when policy requires it.',
      },
      {
        title: 'Role-based org access',
        desc: 'Departments and agencies manage users and permissions without sharing one login.',
      },
      {
        title: 'Exportable records',
        desc: 'Shipment and payment history available for oversight, audit, and retention policy.',
      },
      {
        title: 'Escrow on confirmation',
        desc: 'Funds release when delivery is confirmed — clean settlement trail for finance.',
      },
    ],
    scenarioTitle: 'An agency relocates sealed materials between facilities',
    scenarioTag: 'Verified courier · Custody logged · Export ready',
    scenario: [
      { time: 'Day 0', text: 'Job restricted to contracted approved courier pool' },
      { time: '08:00', text: 'Verified courier assigned · credentials on profile' },
      { time: '09:15', text: 'Pickup — sealed crates photographed · GPS starts' },
      { time: '11:40', text: 'En route — agency ops watching live tracking' },
      { time: '13:05', text: 'Delivered — signature POD · escrow + export archive' },
    ],
    outcomes: [
      'Verified couriers only',
      'Full photo + GPS custody trail',
      'Approved vendor pools when required',
      'Exportable shipment and payment records',
    ],
  },
  {
    slug: 'arts-specialty',
    icon: Frame,
    title: 'Arts & Specialty',
    accent: 'Irreplaceable handled by the qualified few.',
    subtitle:
      'Fine art, antiques, instruments, and estate contents with declared value, white-glove handling, and condition photography at every handoff.',
    image: '/industries/arts-specialty.jpg',
    imageAlt: 'Specialty art crate prepared for white-glove transport',
    challengeTitle: 'Specialty delivery is about who never sees the job',
    challenge:
      'Irreplaceable items cannot be “generally insured cargo.” The wrong handler should never receive the job. You need declared value visible before bid, specialist credentials, climate or white-glove requirements, and a photographic condition record that outlasts the move.',
    approachTitle: 'How Zipmater runs specialty moves',
    approach:
      'Post declared value and handling requirements so only qualified couriers engage. Filter on certifications and ratings. Capture condition photos at pickup and delivery. Coordinate multi-item estate and multi-destination specialty moves in one structured request.',
    capabilities: [
      {
        title: 'Declared value on the job',
        desc: 'Couriers see coverage expectations before they bid — no bait-and-switch on risk.',
      },
      {
        title: 'Specialist filtering',
        desc: 'Certification and experience filters keep general couriers off high-value jobs.',
      },
      {
        title: 'White-glove handling',
        desc: 'Climate control, white-glove, and fragile handling as first-class job requirements.',
      },
      {
        title: 'Condition photography',
        desc: 'Before-and-after photo sets stored with the shipment for insurers and estates.',
      },
      {
        title: 'Insurance verification',
        desc: 'Confirm coverage posture before assignment when the item’s value demands it.',
      },
      {
        title: 'Estate multi-destination',
        desc: 'Coordinate multi-item, multi-stop specialty moves without splintering into email chaos.',
      },
    ],
    scenarioTitle: 'An estate executor ships antique furniture to auction',
    scenarioTag: 'Declared value · Specialist certified · Condition verified',
    scenario: [
      { time: 'Day 1', text: 'Request posted — declared value, white-glove required' },
      { time: 'Day 1', text: 'Specialist courier confirmed · insured to value' },
      { time: '8:30am', text: 'Pickup — condition photos · pieces wrapped and logged' },
      { time: '1:15pm', text: 'En route — live tracking for executor' },
      { time: '3:40pm', text: 'Delivered to auction — condition confirmed · record closed' },
    ],
    outcomes: [
      'Declared value visible before bid',
      'Specialist and white-glove filtering',
      'Photographic condition at both ends',
      'Multi-item estate coordination',
    ],
  },
];

export function getIndustry(slug: string): IndustryPage | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
