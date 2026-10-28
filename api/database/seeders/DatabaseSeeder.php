<?php

namespace Database\Seeders;

use App\Models\CarrierProfile;
use App\Models\Contract;
use App\Models\ShipperProfile;
use App\Models\GpsPing;
use App\Models\PaymentMethod;
use App\Models\PreferredCarrier;
use App\Models\Shipment;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Demo users ────────────────────────────────────────────────────

        // Plain 'password' — User model casts password as 'hashed' (do not Hash::make here).
        $shipper = User::updateOrCreate(
            ['email' => 'alex@demo.com'],
            ['name' => 'Alex Morgan', 'password' => 'password', 'role' => 'shipper']
        );

        $carrier1 = User::updateOrCreate(
            ['email' => 'jordan@demo.com'],
            ['name' => 'Jordan Reyes', 'password' => 'password', 'role' => 'carrier']
        );

        $carrier2 = User::updateOrCreate(
            ['email' => 'casey@demo.com'],
            ['name' => 'Casey Rivera', 'password' => 'password', 'role' => 'carrier']
        );

        $carrier3 = User::updateOrCreate(
            ['email' => 'marcus@demo.com'],
            ['name' => 'Marcus Webb', 'password' => 'password', 'role' => 'carrier']
        );

        $receiver = User::updateOrCreate(
            ['email' => 'sam@demo.com'],
            ['name' => 'Sam Chen', 'password' => 'password', 'role' => 'receiver']
        );

        User::updateOrCreate(
            ['email' => 'admin@demo.com'],
            ['name' => 'Admin User', 'password' => 'password', 'role' => 'admin']
        );

        // ── Carrier profiles ──────────────────────────────────────────────

        CarrierProfile::firstOrCreate(
            ['user_id' => $carrier1->id],
            [
                'company_name'            => 'Reyes Courier',
                'phone'                   => '+1 (555) 010-2030',
                'insurance_verified'      => true,
                'background_check_status' => 'approved',
                'rating'                  => 4.90,
                'total_deliveries'        => 284,
            ]
        );

        CarrierProfile::firstOrCreate(
            ['user_id' => $carrier2->id],
            [
                'company_name'            => 'Rivera Deliveries',
                'phone'                   => '+1 (555) 874-3310',
                'insurance_verified'      => true,
                'background_check_status' => 'approved',
                'rating'                  => 4.70,
                'total_deliveries'        => 156,
            ]
        );

        CarrierProfile::firstOrCreate(
            ['user_id' => $carrier3->id],
            [
                'company_name'            => 'Webb Same-Day',
                'phone'                   => '+1 (214) 555-0777',
                'insurance_verified'      => false,
                'background_check_status' => 'pending',
                'rating'                  => 4.50,
                'total_deliveries'        => 44,
            ]
        );

        // ── Shipper profile for Alex Morgan ──────────────────────────────────

        ShipperProfile::updateOrCreate(
            ['user_id' => $shipper->id],
            [
                'phone'         => '+1 (555) 248-3910',
                'street'        => '3600 Brighton Blvd',
                'city'          => 'Denver',
                'state'         => 'CO',
                'zip'           => '80216',
                'country'       => 'United States',
                'company_name'  => 'Morgan Supply Co.',
                'business_type' => 'Limited Liability Company (LLC)',
                'ein'           => '82-4910372',
                'industry'      => 'Manufacturing',
                'website'       => 'https://morgansupply.com',
                'biz_street'    => '3600 Brighton Blvd',
                'biz_city'      => 'Denver',
                'biz_state'     => 'CO',
                'biz_zip'       => '80216',
                'verification_status' => 'incomplete',
                'email_verified_at'   => null,
                'phone_verified_at'   => null,
                'ein_verified_at'     => null,
                'notif_email'   => [
                    'carrier_assigned' => true,
                    'pickup_confirmed'  => true,
                    'in_transit'        => true,
                    'delivered'         => true,
                    'disputed'          => true,
                    'weekly_summary'    => false,
                    'marketing'         => false,
                ],
                'notif_sms' => [
                    'carrier_assigned' => false,
                    'pickup_confirmed'  => true,
                    'in_transit'        => false,
                    'delivered'         => true,
                    'disputed'          => true,
                ],
            ]
        );

        // ── Helper ────────────────────────────────────────────────────────
        // Adds a single GPS ping to a shipment if it has none yet

        $ping = function (Shipment $s, float $lat, float $lng, float $speed, string $eta) {
            if (GpsPing::where('shipment_id', $s->id)->doesntExist()) {
                GpsPing::create([
                    'shipment_id' => $s->id,
                    'lat'         => $lat,
                    'lng'         => $lng,
                    'speed'       => $speed,
                    'eta'         => $eta,
                    'pinged_at'   => now()->subMinutes(rand(1, 4)),
                ]);
            }
        };

        // ══════════════════════════════════════════════════════════════════
        // DEMO0001 — Local Denver: Denver Health → Rose Medical Center  (in_transit)
        // ══════════════════════════════════════════════════════════════════

        $s1 = Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0001'],
            [
                'shipper_id'              => $shipper->id,
                'carrier_id'              => $carrier1->id,
                'receiver_id'             => $receiver->id,
                'status'                  => 'in_transit',
                'item_description'        => 'Surgical instrument kit — STAT',
                'item_category'           => 'Medical / Healthcare',
                'weight_lbs'              => 18.00,
                'handling_requirements'   => ['Fragile', 'Temperature Controlled'],
                'special_notes'           => 'Handle with care — medical equipment',
                'pickup_address'          => '777 Bannock St, Denver, CO 80204',
                'pickup_city'             => 'Denver',
                'pickup_state'            => 'CO',
                'pickup_lat'              => 39.72750,
                'pickup_lng'              => -104.99100,
                'pickup_date'             => '2026-06-10',
                'pickup_time_window'      => '8am – 11am',
                'delivery_address'        => '4567 E 9th Ave, Denver, CO 80220',
                'delivery_city'           => 'Denver',
                'delivery_state'          => 'CO',
                'delivery_lat'            => 39.73100,
                'delivery_lng'            => -104.93400,
                'delivery_date'           => '2026-06-10',
                'delivery_time_window'    => '9am – 10am',
                'distance_miles'          => 4.20,
                'estimated_duration_mins' => 15,
                'agreed_cost'             => 48.00,
            ]
        );
        // Crossing Cheesman Park — about halfway
        $ping($s1, 39.72950, -104.96000, 24.0, '6 min');

        // ══════════════════════════════════════════════════════════════════
        // DEMO0002 — Local Denver: NAPA Brighton Blvd → Aurora repair shop  (in_transit)
        // ══════════════════════════════════════════════════════════════════

        $s2 = Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0002'],
            [
                'shipper_id'              => $shipper->id,
                'carrier_id'              => $carrier2->id,
                'receiver_id'             => $receiver->id,
                'status'                  => 'in_transit',
                'item_description'        => 'Auto parts — brake kit & alternator',
                'item_category'           => 'Automotive',
                'weight_lbs'              => 42.00,
                'handling_requirements'   => ['Heavy Load', 'Strapped'],
                'special_notes'           => 'Two engine blocks on skids',
                'pickup_address'          => '3600 Brighton Blvd, Denver, CO 80216',
                'pickup_city'             => 'Denver',
                'pickup_state'            => 'CO',
                'pickup_lat'              => 39.76800,
                'pickup_lng'              => -104.97200,
                'pickup_date'             => '2026-06-10',
                'pickup_time_window'      => '6am – 9am',
                'delivery_address'        => '15400 E Colfax Ave, Aurora, CO 80011',
                'delivery_city'           => 'Aurora',
                'delivery_state'          => 'CO',
                'delivery_lat'            => 39.74000,
                'delivery_lng'            => -104.81000,
                'delivery_date'           => '2026-06-10',
                'delivery_time_window'    => '11am – 1pm',
                'distance_miles'          => 10.50,
                'estimated_duration_mins' => 25,
                'agreed_cost'             => 42.00,
            ]
        );
        // On I-70 near Stapleton
        $ping($s2, 39.75200, -104.88000, 31.0, '11 min');

        // ══════════════════════════════════════════════════════════════════
        // DEMO0003 — Local Denver: restaurant supply → LoHi restaurant  (in_transit)
        // ══════════════════════════════════════════════════════════════════

        $s3 = Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0003'],
            [
                'shipper_id'              => $shipper->id,
                'carrier_id'              => $carrier1->id,
                'receiver_id'             => $receiver->id,
                'status'                  => 'in_transit',
                'item_description'        => 'Restaurant supplies — produce & dry goods',
                'item_category'           => 'Food & Beverage',
                'weight_lbs'              => 160.00,
                'handling_requirements'   => ['Keep Upright', 'No Stack'],
                'pickup_address'          => '4655 Holly St, Denver, CO 80216',
                'pickup_city'             => 'Denver',
                'pickup_state'            => 'CO',
                'pickup_lat'              => 39.77900,
                'pickup_lng'              => -104.92200,
                'pickup_date'             => '2026-06-09',
                'pickup_time_window'      => 'All day',
                'delivery_address'        => '2400 15th St, Denver, CO 80202',
                'delivery_city'           => 'Denver',
                'delivery_state'          => 'CO',
                'delivery_lat'            => 39.75700,
                'delivery_lng'            => -105.00800,
                'delivery_date'           => '2026-06-10',
                'delivery_time_window'    => '2pm – 3pm',
                'distance_miles'          => 5.60,
                'estimated_duration_mins' => 18,
                'agreed_cost'             => 36.00,
            ]
        );
        // Passing through RiNo
        $ping($s3, 39.77000, -104.97000, 22.0, '9 min');

        // ══════════════════════════════════════════════════════════════════
        // DEMO0004 — Local Dallas: Deep Ellum → Medical District  (in_transit)
        // ══════════════════════════════════════════════════════════════════

        $s4 = Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0004'],
            [
                'shipper_id'              => $shipper->id,
                'carrier_id'              => $carrier2->id,
                'status'                  => 'in_transit',
                'item_description'        => 'Lab specimen cooler — urgent',
                'item_category'           => 'Medical / Healthcare',
                'weight_lbs'              => 48.00,
                'handling_requirements'   => ['Fragile', 'Temperature Controlled', 'Priority'],
                'special_notes'           => 'Time-sensitive biological samples. Must arrive within 2 hours.',
                'pickup_address'          => '2548 Elm St, Dallas, TX 75226',
                'pickup_city'             => 'Dallas',
                'pickup_state'            => 'TX',
                'pickup_lat'              => 32.78420,
                'pickup_lng'              => -96.78800,
                'pickup_date'             => '2026-06-11',
                'pickup_time_window'      => 'Immediate',
                'delivery_address'        => '5323 Harry Hines Blvd, Dallas, TX 75235',
                'delivery_city'           => 'Dallas',
                'delivery_state'          => 'TX',
                'delivery_lat'            => 32.81260,
                'delivery_lng'            => -96.84350,
                'delivery_date'           => '2026-06-11',
                'delivery_time_window'    => 'ASAP',
                'distance_miles'          => 5.20,
                'estimated_duration_mins' => 18,
                'agreed_cost'             => 95.00,
            ]
        );
        // Midway through Dallas — near Uptown
        $ping($s4, 32.79800, -96.81200, 27.0, '14 min');

        // ══════════════════════════════════════════════════════════════════
        // DEMO0005 — Local NYC: Penn Station → JFK Airport  (in_transit)
        // ══════════════════════════════════════════════════════════════════

        $s5 = Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0005'],
            [
                'shipper_id'              => $shipper->id,
                'carrier_id'              => $carrier1->id,
                'status'                  => 'in_transit',
                'item_description'        => 'Film production equipment',
                'item_category'           => 'Entertainment / AV',
                'weight_lbs'              => 620.00,
                'handling_requirements'   => ['Fragile', 'Delicate Electronics'],
                'pickup_address'          => '355 W 34th St, New York, NY 10001',
                'pickup_city'             => 'New York',
                'pickup_state'            => 'NY',
                'pickup_lat'              => 40.75070,
                'pickup_lng'              => -73.99350,
                'pickup_date'             => '2026-06-11',
                'pickup_time_window'      => '6am – 8am',
                'delivery_address'        => 'JFK Airport, Terminal 4, Jamaica, NY 11430',
                'delivery_city'           => 'New York',
                'delivery_state'          => 'NY',
                'delivery_lat'            => 40.64130,
                'delivery_lng'            => -73.77810,
                'delivery_date'           => '2026-06-11',
                'delivery_time_window'    => 'Before 10am',
                'distance_miles'          => 19.70,
                'estimated_duration_mins' => 55,
                'agreed_cost'             => 280.00,
            ]
        );
        // Jamaica, Queens — almost at JFK
        $ping($s5, 40.70110, -73.81800, 34.0, '22 min');

        // ══════════════════════════════════════════════════════════════════
        // DEMO0006 — Local Dallas zigzag: Warehouse loop  (in_transit)
        //   Multiple stops through industrial Dallas — good route-planner fuel
        // ══════════════════════════════════════════════════════════════════

        $s6 = Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0006'],
            [
                'shipper_id'              => $shipper->id,
                'carrier_id'              => $carrier2->id,
                'status'                  => 'in_transit',
                'item_description'        => 'HVAC units — multi-site install',
                'item_category'           => 'Construction / HVAC',
                'weight_lbs'              => 3100.00,
                'handling_requirements'   => ['Heavy Load', 'Crane Required at Delivery'],
                'special_notes'           => 'First drop: West Commerce St. Second drop: Stemmons Fwy site.',
                'pickup_address'          => '101 Singleton Blvd, Dallas, TX 75212',
                'pickup_city'             => 'Dallas',
                'pickup_state'            => 'TX',
                'pickup_lat'              => 32.77760,
                'pickup_lng'              => -96.87580,
                'pickup_date'             => '2026-06-11',
                'pickup_time_window'      => '7am – 9am',
                'delivery_address'        => '2626 Stemmons Fwy, Dallas, TX 75207',
                'delivery_city'           => 'Dallas',
                'delivery_state'          => 'TX',
                'delivery_lat'            => 32.80120,
                'delivery_lng'            => -96.86400,
                'delivery_date'           => '2026-06-11',
                'delivery_time_window'    => 'Before noon',
                'distance_miles'          => 3.80,
                'estimated_duration_mins' => 22,
                'agreed_cost'             => 210.00,
            ]
        );
        // Mid-route on Commerce St
        $ping($s6, 32.78990, -96.87000, 18.0, '8 min');

        // ══════════════════════════════════════════════════════════════════
        // DEMO0007 — Local LA zigzag: Studio City → Santa Monica  (assigned)
        // ══════════════════════════════════════════════════════════════════

        Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0007'],
            [
                'shipper_id'         => $shipper->id,
                'carrier_id'         => $carrier1->id,
                'status'             => 'assigned',
                'item_description'   => 'Film set props — breakables',
                'item_category'      => 'Entertainment / Props',
                'weight_lbs'         => 190.00,
                'handling_requirements' => ['Fragile', 'No Stack'],
                'pickup_address'     => '11040 Ventura Blvd, Studio City, CA 91604',
                'pickup_city'        => 'Studio City',
                'pickup_state'       => 'CA',
                'pickup_lat'         => 34.13920,
                'pickup_lng'         => -118.39750,
                'pickup_date'        => '2026-06-12',
                'pickup_time_window' => '8am – 10am',
                'delivery_address'   => '1333 Ocean Ave, Santa Monica, CA 90401',
                'delivery_city'      => 'Santa Monica',
                'delivery_state'     => 'CA',
                'delivery_lat'       => 34.01950,
                'delivery_lng'       => -118.49120,
                'delivery_date'      => '2026-06-12',
                'delivery_time_window' => 'Before 1pm',
                'distance_miles'     => 20.30,
                'estimated_duration_mins' => 48,
                'agreed_cost'        => 175.00,
            ]
        );

        // ══════════════════════════════════════════════════════════════════
        // DEMO0008 — Local Denver: IKEA Centennial → Platt Park  (assigned)
        // ══════════════════════════════════════════════════════════════════

        Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0008'],
            [
                'shipper_id'         => $shipper->id,
                'carrier_id'         => $carrier2->id,
                'status'             => 'assigned',
                'item_description'   => 'Furniture — sofa & dresser (2 helpers)',
                'item_category'      => 'Household Goods',
                'weight_lbs'         => 310.00,
                'handling_requirements' => ['Wrap Items', 'No Tipping'],
                'pickup_address'     => '9800 E IKEA Way, Centennial, CO 80112',
                'pickup_city'        => 'Centennial',
                'pickup_state'       => 'CO',
                'pickup_lat'         => 39.57700,
                'pickup_lng'         => -104.87400,
                'pickup_date'        => '2026-06-13',
                'pickup_time_window' => '9am – 12pm',
                'delivery_address'   => '1550 S Pearl St, Denver, CO 80210',
                'delivery_city'      => 'Denver',
                'delivery_state'     => 'CO',
                'delivery_lat'       => 39.68900,
                'delivery_lng'       => -104.98000,
                'delivery_date'      => '2026-06-13',
                'delivery_time_window' => '1pm – 3pm',
                'distance_miles'     => 11.80,
                'estimated_duration_mins' => 30,
                'agreed_cost'        => 165.00,
            ]
        );

        // ══════════════════════════════════════════════════════════════════
        // DEMO0009 — Local Denver: pharmacy → Lakewood patient  (pending, no courier yet)
        // ══════════════════════════════════════════════════════════════════

        Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0009'],
            [
                'shipper_id'         => $shipper->id,
                'status'             => 'pending',
                'item_description'   => 'Pharmacy refills — cold chain',
                'item_category'      => 'Medical / Pharmaceutical',
                'weight_lbs'         => 6.00,
                'handling_requirements' => ['Refrigerated', 'Temperature Controlled', 'Time-Sensitive'],
                'special_notes'      => 'Must maintain 2–8°C at all times. Courier must have a refrigerated van or medical cooler.',
                'pickup_address'     => '2000 E Colfax Ave, Denver, CO 80206',
                'pickup_city'        => 'Denver',
                'pickup_state'       => 'CO',
                'pickup_lat'         => 39.74000,
                'pickup_lng'         => -104.96400,
                'pickup_date'        => '2026-06-14',
                'pickup_time_window' => '7am – 9am',
                'delivery_address'   => '7550 W Alameda Ave, Lakewood, CO 80226',
                'delivery_city'      => 'Lakewood',
                'delivery_state'     => 'CO',
                'delivery_lat'       => 39.71100,
                'delivery_lng'       => -105.08200,
                'delivery_date'      => '2026-06-14',
                'delivery_time_window' => '10am – 12pm',
                'distance_miles'     => 7.90,
                'estimated_duration_mins' => 22,
                'agreed_cost'        => 58.00,
            ]
        );

        // ══════════════════════════════════════════════════════════════════
        // DEMO0010 — Local Houston zigzag: IAH Airport → Texas Medical Center
        //   (pending — carrier shopping)
        // ══════════════════════════════════════════════════════════════════

        Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0010'],
            [
                'shipper_id'         => $shipper->id,
                'status'             => 'pending',
                'item_description'   => 'MRI machine components',
                'item_category'      => 'Medical Equipment',
                'weight_lbs'         => 5600.00,
                'handling_requirements' => ['Oversize Load', 'Fragile', 'Crane Required'],
                'special_notes'      => 'Oversized load — permit required. Magnetic shielding in crates.',
                'pickup_address'     => '2800 N Terminal Rd, Houston, TX 77032',
                'pickup_city'        => 'Houston',
                'pickup_state'       => 'TX',
                'pickup_lat'         => 29.99020,
                'pickup_lng'         => -95.33680,
                'pickup_date'        => '2026-06-15',
                'pickup_time_window' => '5am – 7am (off-peak)',
                'delivery_address'   => '6431 Fannin St, Houston, TX 77030',
                'delivery_city'      => 'Houston',
                'delivery_state'     => 'TX',
                'delivery_lat'       => 29.70980,
                'delivery_lng'       => -95.39830,
                'delivery_date'      => '2026-06-15',
                'delivery_time_window' => '8am – 10am',
                'distance_miles'     => 23.60,
                'estimated_duration_mins' => 55,
                'agreed_cost'        => 950.00,
            ]
        );

        // ══════════════════════════════════════════════════════════════════
        // DEMO0011 — Local: Denver Art Museum → Boulder gallery  (delivered ✓)
        // ══════════════════════════════════════════════════════════════════

        Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0011'],
            [
                'shipper_id'         => $shipper->id,
                'carrier_id'         => $carrier1->id,
                'receiver_id'        => $receiver->id,
                'status'             => 'delivered',
                'item_description'   => 'Framed artwork — gallery delivery',
                'item_category'      => 'Fine Art',
                'weight_lbs'         => 85.00,
                'handling_requirements' => ['White Glove', 'Climate Controlled', 'Fragile'],
                'special_notes'      => 'Museum-quality crating required.',
                'pickup_address'     => '100 W 14th Ave Pkwy, Denver, CO 80204',
                'pickup_city'        => 'Denver',
                'pickup_state'       => 'CO',
                'pickup_lat'         => 39.73720,
                'pickup_lng'         => -104.98930,
                'pickup_date'        => '2026-06-08',
                'pickup_time_window' => '10am – 12pm',
                'delivery_address'   => '1600 Pearl St, Boulder, CO 80302',
                'delivery_city'      => 'Boulder',
                'delivery_state'     => 'CO',
                'delivery_lat'       => 40.01900,
                'delivery_lng'       => -105.27470,
                'delivery_date'      => '2026-06-08',
                'delivery_time_window' => '1pm – 3pm',
                'distance_miles'     => 27.50,
                'estimated_duration_mins' => 45,
                'agreed_cost'        => 145.00,
                'delivered_at'       => '2026-06-08 13:48:00',
            ]
        );

        // ══════════════════════════════════════════════════════════════════
        // DEMO0012 — Local Chicago zigzag: O'Hare → Navy Pier  (assigned)
        //   Cuts through the city — ideal route-planner test
        // ══════════════════════════════════════════════════════════════════

        Shipment::firstOrCreate(
            ['tracking_token' => 'DEMO0012'],
            [
                'shipper_id'         => $shipper->id,
                'carrier_id'         => $carrier2->id,
                'status'             => 'assigned',
                'item_description'   => 'Trade show booth materials',
                'item_category'      => 'Events / Exhibitions',
                'weight_lbs'         => 920.00,
                'handling_requirements' => ['No Stack', 'Upright Only'],
                'pickup_address'     => "10000 W O'Hare Ave, Chicago, IL 60666",
                'pickup_city'        => 'Chicago',
                'pickup_state'       => 'IL',
                'pickup_lat'         => 41.97400,
                'pickup_lng'         => -87.90700,
                'pickup_date'        => '2026-06-12',
                'pickup_time_window' => '5am – 7am',
                'delivery_address'   => '600 E Grand Ave, Chicago, IL 60611',
                'delivery_city'      => 'Chicago',
                'delivery_state'     => 'IL',
                'delivery_lat'       => 41.89180,
                'delivery_lng'       => -87.60820,
                'delivery_date'      => '2026-06-12',
                'delivery_time_window' => '10am – noon',
                'distance_miles'     => 18.40,
                'estimated_duration_mins' => 52,
                'agreed_cost'        => 340.00,
            ]
        );

        // ══════════════════════════════════════════════════════════════════
        // Report
        // ══════════════════════════════════════════════════════════════════

        // ── Transactions ──────────────────────────────────────────────────────
        $pm = PaymentMethod::where('user_id', $shipper->id)->orderBy('id')->get();
        $visa = $pm->firstWhere('last4', '4242');
        $mc   = $pm->firstWhere('last4', '5100');
        $ach  = $pm->firstWhere('last4', '4821');

        if (! Transaction::where('shipper_id', $shipper->id)->exists()) {
            $txns = [
                ['INV-2026-0042', $carrier1->id, $visa?->id,  'Lab Specimens — STAT',            'Medical / Pharma',  'Denver Health, Denver, CO',  'Quest Lab, Aurora, CO',    68.50,  'paid',       '2026-05-28', '2026-06-07', null,                                                         '2026-05-28 10:00:00'],
                ['INV-2026-0041', $carrier2->id, $mc?->id,    'Retail Order — 3 Drops',          'Retail Goods',      'Pearl St, Boulder, CO',      'Boulder, CO',              54.00,  'paid',       '2026-05-22', '2026-06-01', null,                                                         '2026-05-22 09:00:00'],
                ['INV-2026-0043', $carrier2->id, $ach?->id,   'Pharmacy Refills — Cold Chain',   'Medical / Pharma',  'Walgreens, Denver, CO',      'Lakewood, CO',             92.00,  'pending',    '2026-06-01', '2026-06-11', 'Cold chain required. Payment due upon delivery confirmation.', null],
                ['INV-2026-0040', $carrier3->id, $visa?->id,  'Sofa + Armchair (2 helpers)',     'Furniture',         'Furniture Row, Denver, CO',  'Englewood, CO',            185.00, 'paid',       '2026-05-15', '2026-05-25', null,                                                         '2026-05-15 08:00:00'],
                ['INV-2026-0044', $carrier1->id, $visa?->id,  'Laptop Repair Return — Fragile',  'Electronics',       'LoDo, Denver, CO',           'Littleton, CO',            38.75,  'processing', '2026-06-01', '2026-06-15', 'Payment processing via bank transfer.',                       null],
                ['INV-2026-0038', $carrier3->id, $mc?->id,    'Auto Parts Run',                  'Automotive',        'NAPA, Aurora, CO',           'Centennial, CO',           42.00,  'failed',     '2026-05-10', '2026-05-20', 'Card declined. Please update payment method and retry.',      null],
                ['INV-2026-0035', $carrier2->id, $visa?->id,  'Catering Trays',                  'Food & Beverage',   'Highlands, Denver, CO',      'Cherry Creek, Denver, CO', 60.00,  'refunded',   '2026-04-28', '2026-05-08', 'Job cancelled by courier. Full refund issued.',               null],
                ['INV-2026-0045', $carrier1->id, $ach?->id,   'Weekly Clinic Route — 6 Stops',   'Medical / Pharma',  'Denver, CO',                 'Denver metro',             310.00, 'pending',    '2026-06-01', '2026-06-20', 'Net-15 terms per standing courier contract.',                 null],
            ];

            foreach ($txns as [$inv, $cid, $pmid, $desc, $cat, $pickup, $delivery, $amount, $status, $date, $due, $notes, $paidAt]) {
                Transaction::create([
                    'shipper_id'        => $shipper->id,
                    'carrier_id'        => $cid,
                    'payment_method_id' => $pmid,
                    'invoice_no'        => $inv,
                    'description'       => $desc,
                    'category'          => $cat,
                    'pickup'            => $pickup,
                    'delivery'          => $delivery,
                    'amount'            => $amount,
                    'status'            => $status,
                    'due_date'          => $due,
                    'notes'             => $notes,
                    'paid_at'           => $paidAt,
                    'created_at'        => $date,
                    'updated_at'        => $date,
                ]);
            }
        }

        // ── Contracts ──────────────────────────────────────────────────────────
        if (! Contract::where('shipper_id', $shipper->id)->exists()) {
            $contracts = [
                [$carrier1->id, 'Flat rate',  45.00, null, 20.00, 0, 'Car',              50,   'Denver metro',        'Net 15',   'First Call', true,  '2026-01-01', '2026-12-31', 'active',  'Medical courier — STAT lab runs. Priority response within 30 minutes.', 8],
                [$carrier2->id, 'Per mile',   1.75,  null, 15.00, 0, 'Cargo Van',        800,  'Boulder & Longmont',  'Net 15',   'Preferred',  false, '2026-03-01', '2026-08-31', 'active',  'Retail multi-drop route, weekdays.', 3],
                [$carrier3->id, 'Hourly',     65.00, null, 25.00, 1, 'Box Truck',        3000, 'Denver metro',        'Net 30',   'Standard',   false, '2026-06-01', '2026-11-30', 'pending', 'Furniture deliveries with helper. Awaiting courier signature.', 0],
                [$carrier1->id, 'Flat rate',  30.00, null, 15.00, 0, 'Refrigerated Van', 500,  'Denver metro',        'Quick Pay','Preferred',  false, '2025-01-01', '2025-12-31', 'expired', 'Pharmacy cold-chain route — expired. Renew for 2026.', 12],
            ];

            foreach ($contracts as [$cid, $rtype, $rate, $fuel, $det, $free, $equip, $wt, $cov, $terms, $pri, $ar, $from, $to, $status, $notes, $ships]) {
                Contract::create([
                    'shipper_id'      => $shipper->id,
                    'carrier_id'      => $cid,
                    'rate_type'       => $rtype,
                    'rate'            => $rate,
                    'fuel_surcharge'  => $fuel,
                    'detention_rate'  => $det,
                    'free_time_hrs'   => $free,
                    'equipment_type'  => $equip,
                    'max_weight_lbs'  => $wt,
                    'coverage'        => $cov,
                    'payment_terms'   => $terms,
                    'priority'        => $pri,
                    'auto_renew'      => $ar,
                    'valid_from'      => $from,
                    'valid_to'        => $to,
                    'status'          => $status,
                    'notes'           => $notes,
                    'shipments_under' => $ships,
                ]);
            }
        }

        $this->command->info('');
        $this->command->info('✓ Demo users and shipments seeded successfully.');
        $this->command->info('');
        $this->command->table(
            ['Role', 'Email', 'Password'],
            [
                ['Shipper',    'alex@demo.com',   'password'],
                ['Carrier 1',  'jordan@demo.com', 'password'],
                ['Carrier 2',  'casey@demo.com',  'password'],
                ['Receiver',   'sam@demo.com',    'password'],
                ['Admin',      'admin@demo.com',  'password'],
            ]
        );
        $this->command->info('');
        $this->command->table(
            ['Token', 'Route', 'Status'],
            [
                ['DEMO0001', 'Denver: Denver Health → Rose Medical', 'in_transit 🚗 (GPS ping near Cheesman Park)'],
                ['DEMO0002', 'Denver → Aurora (10.5 mi)',          'in_transit 🚗 (GPS ping near Stapleton)'],
                ['DEMO0003', 'Denver: Holly St → LoHi (5.6 mi)',   'in_transit 🚗 (GPS ping in RiNo)'],
                ['DEMO0004', 'Dallas local: Deep Ellum → Medical','in_transit 🚚 (GPS ping mid-city)'],
                ['DEMO0005', 'NYC local: Penn Station → JFK',     'in_transit 🚚 (GPS ping in Queens)'],
                ['DEMO0006', 'Dallas zigzag: Singleton → Stemmons','in_transit 🚚 (GPS ping on Commerce)'],
                ['DEMO0007', 'LA: Studio City → Santa Monica',    'assigned'],
                ['DEMO0008', 'Centennial → Denver (11.8 mi)',      'assigned'],
                ['DEMO0009', 'Denver → Lakewood (7.9 mi)',         'pending'],
                ['DEMO0010', 'Houston local: IAH → Medical Center','pending'],
                ['DEMO0011', 'Denver → Boulder (27.5 mi)',         'delivered ✓'],
                ['DEMO0012', "Chicago: O'Hare → Navy Pier",        'assigned'],
            ]
        );

        // ── Preferred carriers for Alex ───────────────────────────────────────
        foreach ([
            [$carrier1->id, 'active'],
            [$carrier2->id, 'active'],
            [$carrier3->id, 'pending'],
        ] as [$cid, $status]) {
            PreferredCarrier::firstOrCreate(
                ['shipper_id' => $shipper->id, 'carrier_id' => $cid],
                ['status' => $status]
            );
        }

        // ── Payment methods for Alex Morgan (shipper demo account) ────────
        if (! PaymentMethod::where('user_id', $shipper->id)->exists()) {
            PaymentMethod::insert([
                [
                    'user_id'      => $shipper->id,
                    'type'         => 'card',
                    'brand'        => 'Visa',
                    'last4'        => '4242',
                    'exp_month'    => '08',
                    'exp_year'     => '27',
                    'bank_name'    => null,
                    'account_type' => null,
                    'is_default'   => true,
                    'stripe_pm_id' => null,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
                [
                    'user_id'      => $shipper->id,
                    'type'         => 'card',
                    'brand'        => 'Mastercard',
                    'last4'        => '5100',
                    'exp_month'    => '02',
                    'exp_year'     => '26',
                    'bank_name'    => null,
                    'account_type' => null,
                    'is_default'   => false,
                    'stripe_pm_id' => null,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
                [
                    'user_id'      => $shipper->id,
                    'type'         => 'bank',
                    'brand'        => null,
                    'last4'        => '4821',
                    'exp_month'    => null,
                    'exp_year'     => null,
                    'bank_name'    => 'Chase Bank',
                    'account_type' => 'checking',
                    'is_default'   => false,
                    'stripe_pm_id' => null,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        $this->call(LocationSeeder::class);
    }
}
