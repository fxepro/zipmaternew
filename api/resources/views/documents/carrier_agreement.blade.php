@extends('documents.layout')

@section('doc-type', 'Courier Agreement')
@section('doc-ref', 'Agreement #' . $contract->id . '  ·  ' . $generated)

@section('content')

  {{-- Parties --}}
  <div class="parties">
    <div class="party">
      <div class="party-label">Client</div>
      <div class="party-name">{{ $broker['name'] }}</div>
      <div class="party-detail">
        @if($broker['address']) {{ $broker['address'] }}<br>@endif
        @if($broker['phone']) {{ $broker['phone'] }}<br>@endif
        {{ $broker['email'] }}
      </div>
    </div>
    <div class="party">
      <div class="party-label">Courier</div>
      <div class="party-name">{{ $carrier['name'] }}</div>
      <div class="party-detail">
        @if($carrier['address']) {{ $carrier['address'] }}<br>@endif
        @if($carrier['phone']) {{ $carrier['phone'] }}<br>@endif
        {{ $carrier['email'] }}
      </div>
    </div>
  </div>

  {{-- Agreement terms --}}
  <div class="section-heading">Agreement Terms</div>
  <div class="kv-grid">
    <div class="kv-row">
      <div class="kv-key">Agreement ID</div>
      <div class="kv-val text-bold">#{{ $contract->id }}</div>
    </div>
    <div class="kv-row">
      <div class="kv-key">Rate Type</div>
      <div class="kv-val">{{ $contract->rate_type }}</div>
    </div>
    <div class="kv-row">
      <div class="kv-key">Base Rate</div>
      <div class="kv-val text-bold">${{ number_format($contract->rate, 2) }}
        @if($contract->rate_type === 'Per mile') <span style="color:#64748b;font-weight:normal">per mile</span>
        @elseif($contract->rate_type === 'Hourly') <span style="color:#64748b;font-weight:normal">per hour</span>
        @endif
      </div>
    </div>
    @if($contract->fuel_surcharge)
    <div class="kv-row">
      <div class="kv-key">Fuel Surcharge</div>
      <div class="kv-val">${{ number_format($contract->fuel_surcharge, 2) }}</div>
    </div>
    @endif
    @if($contract->detention_rate)
    <div class="kv-row">
      <div class="kv-key">Detention Rate</div>
      <div class="kv-val">${{ number_format($contract->detention_rate, 2) }}/hr after {{ $contract->free_time_hrs }}hr free time</div>
    </div>
    @endif
    @if($contract->equipment_type)
    <div class="kv-row">
      <div class="kv-key">Equipment Type</div>
      <div class="kv-val">{{ $contract->equipment_type }}</div>
    </div>
    @endif
    @if($contract->max_weight_lbs)
    <div class="kv-row">
      <div class="kv-key">Max Weight</div>
      <div class="kv-val">{{ number_format($contract->max_weight_lbs) }} lbs</div>
    </div>
    @endif
    <div class="kv-row">
      <div class="kv-key">Payment Terms</div>
      <div class="kv-val">{{ $contract->payment_terms }}</div>
    </div>
    <div class="kv-row">
      <div class="kv-key">Priority</div>
      <div class="kv-val">{{ $contract->priority }}</div>
    </div>
    <div class="kv-row">
      <div class="kv-key">Coverage</div>
      <div class="kv-val">{{ $contract->coverage }}</div>
    </div>
    <div class="kv-row">
      <div class="kv-key">Valid Period</div>
      <div class="kv-val">{{ $contract->valid_from->format('M j, Y') }} — {{ $contract->valid_to->format('M j, Y') }}</div>
    </div>
    <div class="kv-row">
      <div class="kv-key">Auto-Renew</div>
      <div class="kv-val">{{ $contract->auto_renew ? 'Yes' : 'No' }}</div>
    </div>
    @if($contract->notes)
    <div class="kv-row">
      <div class="kv-key">Notes</div>
      <div class="kv-val">{{ $contract->notes }}</div>
    </div>
    @endif
  </div>

  {{-- Standard clauses --}}
  <div class="section-heading">Standard Clauses</div>
  <div style="font-size:8.5pt; color:#475569; line-height:1.8">

    <p><strong>1. Scope.</strong> This Agreement governs all delivery jobs between {{ $broker['name'] }} ("Client") and {{ $carrier['name'] }} ("Courier") during the validity period above. Individual jobs are governed by Job Confirmations issued under this Agreement.</p>
    <br>
    <p><strong>2. Insurance.</strong> Courier shall maintain, at minimum, auto liability insurance meeting the requirements of the state in which jobs are performed, and cargo coverage where required for the service type (for example medical or high-value deliveries).</p>
    <br>
    <p><strong>3. Compliance.</strong> Courier represents and warrants that they hold a valid driver's license, keep their vehicle registered and roadworthy, hold any certifications required for the services they accept (for example HIPAA training for medical deliveries), and comply with all applicable traffic and safety laws.</p>
    <br>
    <p><strong>4. Payment.</strong> Client will remit payment per the payment terms above, calculated from receipt of a complete, accurate invoice accompanied by a signed Proof of Delivery. Disputed invoices will be resolved within 15 business days.</p>
    <br>
    <p><strong>5. No Reassignment.</strong> Courier shall not subcontract or hand off any job accepted under this Agreement to another person without prior written approval from Client.</p>
    <br>
    <p><strong>6. Indemnification.</strong> Each party agrees to indemnify and hold the other harmless from any claims, damages, or losses arising out of that party's own negligence or wilful misconduct in connection with this Agreement.</p>
    <br>
    <p><strong>7. Governing Law.</strong> This Agreement is governed by the laws of the jurisdiction in which Client maintains its principal place of business, without regard to conflict of law principles.</p>
  </div>

  {{-- Signatures --}}
  <div class="section-heading">Execution</div>
  <div class="sig-grid">
    <div class="sig-col">
      @if($contract->signed_at)
        <div style="font-size:9pt; color:#16a34a; border-bottom:1px solid #16a34a; height:36px; padding-top:8px">
          ✓ Signed electronically — {{ \Carbon\Carbon::parse($contract->signed_at)->format('M j, Y') }}
        </div>
      @else
        <div class="sig-line"></div>
      @endif
      <div class="sig-label">Courier Signature &amp; Date</div>
      <div style="font-size:8pt; color:#94a3b8; margin-top:4px">{{ $carrier['name'] }}</div>
    </div>
    <div class="sig-col">
      <div class="sig-line"></div>
      <div class="sig-label">Client Authorised Representative &amp; Date</div>
      <div style="font-size:8pt; color:#94a3b8; margin-top:4px">{{ $broker['name'] }}</div>
    </div>
  </div>

@endsection

@section('footer-text')
  This Courier Agreement is between {{ $broker['name'] }} and {{ $carrier['name'] }}.
  Agreement #{{ $contract->id }} · Valid {{ $contract->valid_from->format('M j, Y') }}–{{ $contract->valid_to->format('M j, Y') }}.
@endsection
