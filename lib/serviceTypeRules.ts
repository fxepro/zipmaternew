export type ProfileTab = 'personal' | 'dot_commercial' | 'insurance' | 'medical' | 'financial' | 'background';

interface RuleSet {
  required: string[];
  recommended: string[];
  tabs: ProfileTab[];
}

const RULES: Record<string, RuleSet> = {
  // Medical & Pharmaceutical
  medical_courier:         { required: ['auto_policy_number'], recommended: ['background_check_status'], tabs: ['personal', 'insurance'] },
  pharma_courier:          { required: ['auto_policy_number', 'cargo_policy_number'], recommended: ['background_check_status'], tabs: ['personal', 'insurance'] },
  hospital_courier:        { required: ['auto_policy_number'], recommended: ['cargo_policy_number', 'background_check_status'], tabs: ['personal', 'insurance'] },
  blood_platelets:         { required: ['auto_policy_number'], recommended: ['cargo_policy_number', 'background_check_status'], tabs: ['personal', 'insurance'] },
  temp_controlled_courier: { required: ['auto_policy_number', 'cargo_policy_number'], recommended: ['background_check_status'], tabs: ['personal', 'insurance'] },
  life_science:            { required: ['auto_policy_number'], recommended: ['cargo_policy_number', 'background_check_status'], tabs: ['personal', 'insurance'] },

  // Auto & Vehicles
  auto_parts:              { required: ['auto_policy_number'], recommended: [], tabs: ['personal', 'insurance'] },
  motorcycle_transport:    { required: ['auto_policy_number'], recommended: ['cargo_policy_number'], tabs: ['personal', 'insurance'] },

  // Art, Antiques & Specialty
  white_glove:       { required: ['auto_policy_number', 'cargo_policy_number'], recommended: ['background_check_status'], tabs: ['personal', 'insurance'] },
  fine_art:          { required: ['auto_policy_number', 'cargo_policy_number'], recommended: ['background_check_status'], tabs: ['personal', 'insurance'] },
  antiques_estate:   { required: ['auto_policy_number', 'cargo_policy_number'], recommended: [], tabs: ['personal', 'insurance'] },
  fragile_highvalue: { required: ['auto_policy_number', 'cargo_policy_number'], recommended: [], tabs: ['personal', 'insurance'] },

  // Food & Beverage
  restaurant_supply: { required: ['auto_policy_number'], recommended: ['cargo_policy_number'], tabs: ['personal', 'insurance'] },
  grocery_retail:    { required: ['auto_policy_number'], recommended: ['cargo_policy_number'], tabs: ['personal', 'insurance'] },
  cold_chain_food:   { required: ['auto_policy_number', 'cargo_policy_number'], recommended: [], tabs: ['personal', 'insurance'] },
  alcohol_spirits:   { required: ['auto_policy_number'], recommended: ['cargo_policy_number'], tabs: ['personal', 'insurance'] },

  // Household
  moving_relocation:  { required: ['auto_policy_number', 'cargo_policy_number'], recommended: ['background_check_status'], tabs: ['personal', 'insurance'] },
  appliance_delivery: { required: ['auto_policy_number'], recommended: ['cargo_policy_number'], tabs: ['personal', 'insurance'] },
  furniture_delivery: { required: ['auto_policy_number'], recommended: ['cargo_policy_number'], tabs: ['personal', 'insurance'] },
  junk_removal:       { required: ['auto_policy_number'], recommended: [], tabs: ['personal', 'insurance'] },
  compost_pickup:     { required: ['auto_policy_number'], recommended: [], tabs: ['personal', 'insurance'] },

  // Local & Last Mile
  same_day_courier: { required: ['auto_policy_number'], recommended: ['background_check_status'], tabs: ['personal', 'insurance'] },
  last_mile:        { required: ['auto_policy_number'], recommended: ['background_check_status'], tabs: ['personal', 'insurance'] },
  parcel_delivery:  { required: ['auto_policy_number'], recommended: [], tabs: ['personal', 'insurance'] },
  b2b_local:        { required: ['auto_policy_number'], recommended: [], tabs: ['personal', 'insurance'] },
};

export function getRequiredFields(selectedKeys: string[]): string[] {
  const fields = new Set<string>();
  for (const key of selectedKeys) for (const f of RULES[key]?.required ?? []) fields.add(f);
  return [...fields];
}

export function getRecommendedFields(selectedKeys: string[]): string[] {
  const fields = new Set<string>();
  for (const key of selectedKeys) for (const f of RULES[key]?.recommended ?? []) fields.add(f);
  return [...fields];
}

export function getRelevantTabs(selectedKeys: string[]): ProfileTab[] {
  const tabs = new Set<ProfileTab>(['personal']);
  for (const key of selectedKeys) for (const t of RULES[key]?.tabs ?? []) tabs.add(t);
  if (selectedKeys.length > 0) { tabs.add('financial'); tabs.add('background'); }
  return [...tabs];
}

export function requiresDot(selectedKeys: string[]): boolean {
  return selectedKeys.some(k => RULES[k]?.required.includes('dot_number'));
}

export function isFieldRequired(field: string, selectedKeys: string[]): boolean {
  return getRequiredFields(selectedKeys).includes(field);
}
