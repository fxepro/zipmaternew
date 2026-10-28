<?php

namespace App\Services;

class ServiceTypeRules
{
    private const RULES = [
        // ── Medical & Pharmaceutical ──────────────────────────────────────
        'medical_courier'         => ['required' => ['auto_policy_number'], 'recommended' => ['cargo_policy_number', 'background_check_status'], 'tabs' => ['personal', 'insurance']],
        'pharma_courier'          => ['required' => ['auto_policy_number', 'cargo_policy_number'], 'recommended' => ['background_check_status'], 'tabs' => ['personal', 'insurance']],
        'hospital_courier'        => ['required' => ['auto_policy_number'], 'recommended' => ['cargo_policy_number', 'background_check_status'], 'tabs' => ['personal', 'insurance']],
        'blood_platelets'         => ['required' => ['auto_policy_number'], 'recommended' => ['cargo_policy_number', 'background_check_status'], 'tabs' => ['personal', 'insurance']],
        'temp_controlled_courier' => ['required' => ['auto_policy_number', 'cargo_policy_number'], 'recommended' => ['background_check_status'], 'tabs' => ['personal', 'insurance']],
        'life_science'            => ['required' => ['auto_policy_number'], 'recommended' => ['cargo_policy_number', 'background_check_status'], 'tabs' => ['personal', 'insurance']],

        // ── Auto & Vehicles ───────────────────────────────────────────────
        'auto_parts'              => ['required' => ['auto_policy_number'], 'recommended' => [], 'tabs' => ['personal', 'insurance']],
        'motorcycle_transport'    => ['required' => ['auto_policy_number'], 'recommended' => ['cargo_policy_number'], 'tabs' => ['personal', 'insurance']],

        // ── Art, Antiques & Specialty ─────────────────────────────────────
        'white_glove'      => ['required' => ['auto_policy_number', 'cargo_policy_number'], 'recommended' => ['background_check_status'], 'tabs' => ['personal', 'insurance']],
        'fine_art'         => ['required' => ['auto_policy_number', 'cargo_policy_number'], 'recommended' => ['background_check_status'], 'tabs' => ['personal', 'insurance']],
        'antiques_estate'  => ['required' => ['auto_policy_number', 'cargo_policy_number'], 'recommended' => [], 'tabs' => ['personal', 'insurance']],
        'fragile_highvalue'=> ['required' => ['auto_policy_number', 'cargo_policy_number'], 'recommended' => [], 'tabs' => ['personal', 'insurance']],

        // ── Food & Beverage ───────────────────────────────────────────────
        'restaurant_supply' => ['required' => ['auto_policy_number'], 'recommended' => ['cargo_policy_number'], 'tabs' => ['personal', 'insurance']],
        'grocery_retail'    => ['required' => ['auto_policy_number'], 'recommended' => ['cargo_policy_number'], 'tabs' => ['personal', 'insurance']],
        'cold_chain_food'   => ['required' => ['auto_policy_number', 'cargo_policy_number'], 'recommended' => [], 'tabs' => ['personal', 'insurance']],
        'alcohol_spirits'   => ['required' => ['auto_policy_number'], 'recommended' => ['cargo_policy_number'], 'tabs' => ['personal', 'insurance']],

        // ── Household ─────────────────────────────────────────────────────
        'moving_relocation'  => ['required' => ['auto_policy_number', 'cargo_policy_number'], 'recommended' => ['background_check_status'], 'tabs' => ['personal', 'insurance']],
        'appliance_delivery' => ['required' => ['auto_policy_number'], 'recommended' => ['cargo_policy_number'], 'tabs' => ['personal', 'insurance']],
        'furniture_delivery' => ['required' => ['auto_policy_number'], 'recommended' => ['cargo_policy_number'], 'tabs' => ['personal', 'insurance']],
        'junk_removal'       => ['required' => ['auto_policy_number'], 'recommended' => [], 'tabs' => ['personal', 'insurance']],
        'compost_pickup'     => ['required' => ['auto_policy_number'], 'recommended' => [], 'tabs' => ['personal', 'insurance']],

        // ── Local & Last Mile ─────────────────────────────────────────────
        'same_day_courier' => ['required' => ['auto_policy_number'], 'recommended' => ['background_check_status'], 'tabs' => ['personal', 'insurance']],
        'last_mile'        => ['required' => ['auto_policy_number'], 'recommended' => ['background_check_status'], 'tabs' => ['personal', 'insurance']],
        'parcel_delivery'  => ['required' => ['auto_policy_number'], 'recommended' => [], 'tabs' => ['personal', 'insurance']],
        'b2b_local'        => ['required' => ['auto_policy_number'], 'recommended' => [], 'tabs' => ['personal', 'insurance']],
    ];

    public static function requiredFields(array $keys): array
    {
        $fields = [];
        foreach ($keys as $key) $fields = array_merge($fields, self::RULES[$key]['required'] ?? []);
        return array_values(array_unique($fields));
    }

    public static function recommendedFields(array $keys): array
    {
        $fields = [];
        foreach ($keys as $key) $fields = array_merge($fields, self::RULES[$key]['recommended'] ?? []);
        return array_values(array_unique($fields));
    }

    public static function relevantTabs(array $keys): array
    {
        $tabs = ['personal'];
        foreach ($keys as $key) $tabs = array_merge($tabs, self::RULES[$key]['tabs'] ?? []);
        if (count($keys) > 0) { $tabs[] = 'financial'; $tabs[] = 'background'; }
        return array_values(array_unique($tabs));
    }

    public static function requiresDot(array $keys): bool
    {
        foreach ($keys as $key) {
            if (in_array('dot_number', self::RULES[$key]['required'] ?? [])) return true;
        }
        return false;
    }
}
