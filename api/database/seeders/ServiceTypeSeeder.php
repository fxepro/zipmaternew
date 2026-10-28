<?php

namespace Database\Seeders;

use App\Models\ServiceType;
use Illuminate\Database\Seeder;

class ServiceTypeSeeder extends Seeder
{
    public function run(): void
    {
        // Wipe and re-seed cleanly
        \DB::statement('SET CONSTRAINTS ALL DEFERRED');
        ServiceType::query()->delete();

        $categories = [
            [
                'key'      => 'medical_pharma',
                'name'     => 'Medical & Pharmaceutical',
                'icon'     => '🏥',
                'category' => 'medical',
                'sort_order' => 2,
                'children' => [
                    ['key' => 'medical_courier',         'name' => 'Medical Courier Services'],
                    ['key' => 'pharma_courier',          'name' => 'Pharmaceutical Courier Services'],
                    ['key' => 'hospital_courier',        'name' => 'Hospital Courier Services'],
                    ['key' => 'blood_platelets',         'name' => 'Blood & Platelets Courier Services'],
                    ['key' => 'temp_controlled_courier', 'name' => 'Temperature Controlled Courier Services'],
                    ['key' => 'life_science',            'name' => 'Life Science Courier Services'],
                ],
            ],
            [
                'key'      => 'auto_vehicles',
                'name'     => 'Auto & Vehicles',
                'icon'     => '🚗',
                'category' => 'specialized',
                'sort_order' => 3,
                'children' => [
                    ['key' => 'auto_parts',              'name' => 'Auto Parts Deliveries'],
                    ['key' => 'motorcycle_transport',    'name' => 'Motorcycle Transport'],
                ],
            ],
            [
                'key'      => 'art_antiques',
                'name'     => 'Art, Antiques & Specialty',
                'icon'     => '🎨',
                'category' => 'specialized',
                'sort_order' => 4,
                'children' => [
                    ['key' => 'white_glove',       'name' => 'White Glove Delivery'],
                    ['key' => 'fine_art',          'name' => 'Fine Art Transport'],
                    ['key' => 'antiques_estate',   'name' => 'Antiques & Estate Moves'],
                    ['key' => 'fragile_highvalue', 'name' => 'Fragile / High-Value Items'],
                ],
            ],
            [
                'key'      => 'food_beverage',
                'name'     => 'Food & Beverage',
                'icon'     => '🍱',
                'category' => 'commercial',
                'sort_order' => 5,
                'children' => [
                    ['key' => 'restaurant_supply',  'name' => 'Restaurant & Bar Supply'],
                    ['key' => 'grocery_retail',     'name' => 'Grocery & Retail Distribution'],
                    ['key' => 'cold_chain_food',    'name' => 'Cold Chain / Perishables'],
                    ['key' => 'alcohol_spirits',    'name' => 'Alcohol & Spirits Distribution'],
                ],
            ],
            [
                'key'      => 'household',
                'name'     => 'Household',
                'icon'     => '🏠',
                'category' => 'local',
                'sort_order' => 7,
                'children' => [
                    ['key' => 'moving_relocation',    'name' => 'Moving & Relocation'],
                    ['key' => 'appliance_delivery',   'name' => 'Appliance Delivery & Removal'],
                    ['key' => 'furniture_delivery',   'name' => 'Furniture Delivery'],
                    ['key' => 'junk_removal',         'name' => 'Junk Removal / Trash Pickup'],
                    ['key' => 'compost_pickup',       'name' => 'Compost Pickup'],
                ],
            ],
            [
                'key'      => 'local_last_mile',
                'name'     => 'Local & Last Mile',
                'icon'     => '📦',
                'category' => 'local',
                'sort_order' => 8,
                'children' => [
                    ['key' => 'same_day_courier',  'name' => 'Same-Day Courier'],
                    ['key' => 'last_mile',         'name' => 'Last Mile Delivery'],
                    ['key' => 'parcel_delivery',   'name' => 'Parcel & Package Delivery'],
                    ['key' => 'b2b_local',         'name' => 'B2B Local Distribution'],
                ],
            ],
        ];

        foreach ($categories as $i => $cat) {
            $children = $cat['children'];
            unset($cat['children']);

            $parent = ServiceType::create(array_merge([
                'parent_id'       => null,
                'description'     => null,
                'requires_dot'    => false,
                'requires_mc'     => false,
                'requires_cdl'    => false,
                'requires_hazmat' => false,
                'active'          => true,
            ], $cat));

            foreach ($children as $j => $child) {
                ServiceType::create(array_merge([
                    'parent_id'       => $parent->id,
                    'description'     => null,
                    'icon'            => null,
                    'category'        => $cat['category'],
                    'requires_dot'    => false,
                    'requires_mc'     => false,
                    'requires_cdl'    => false,
                    'requires_hazmat' => false,
                    'active'          => true,
                    'sort_order'      => $j + 1,
                ], $child));
            }
        }
    }
}
