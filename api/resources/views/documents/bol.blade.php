@extends('documents.layout')

@section('doc-type', 'Delivery Receipt')
@section('doc-ref', 'BOL Ref: ' . ($job->reference_number ?? 'JOB-' . $job->id) . '  ·  ' . $generated)

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
      @if($carrier)
        <div class="party-name">{{ $carrier['name'] }}</div>
        <div class="party-detail">
          @if($carrier['phone']) {{ $carrier['phone'] }}<br>@endif
          {{ $carrier['email'] }}
        </div>
      @else
        <div class="party-detail" style="color:#94a3b8;font-style:italic">Not yet assigned</div>
      @endif
    </div>
  </div>

  {{-- Shipment info --}}
  <div class="section-heading">Shipment Information</div>
  <div class="kv-grid">
    <div class="kv-row">
      <div class="kv-key">BOL Reference</div>
      <div class="kv-val text-bold">{{ $job->reference_number ?? 'JOB-' . $job->id }}</div>
    </div>
    <div class="kv-row">
      <div class="kv-key">Description</div>
      <div class="kv-val">{{ $job->title ?? '—' }}</div>
    </div>
    @if($job->total_weight_lbs)
    <div class="kv-row">
      <div class="kv-key">Total Weight</div>
      <div class="kv-val">{{ number_format($job->total_weight_lbs) }} lbs</div>
    </div>
    @endif
    @if($job->route_distance_miles)
    <div class="kv-row">
      <div class="kv-key">Route Distance</div>
      <div class="kv-val">{{ number_format($job->route_distance_miles, 0) }} miles</div>
    </div>
    @endif
    <div class="kv-row">
      <div class="kv-key">Status</div>
      <div class="kv-val"><span class="badge">{{ ucfirst(str_replace('_',' ',$job->status)) }}</span></div>
    </div>
    @if($job->special_instructions)
    <div class="kv-row">
      <div class="kv-key">Special Instructions</div>
      <div class="kv-val">{{ $job->special_instructions }}</div>
    </div>
    @endif
  </div>

  {{-- Stops --}}
  @php $pickups = $stops->where('stop_type', 'pickup'); $dropoffs = $stops->where('stop_type', 'dropoff'); @endphp

  {{-- Pickup stops --}}
  @if($pickups->count())
  <div class="section-heading">Pickup Location(s)</div>
  @foreach($pickups as $stop)
  <div style="margin-bottom:10px; padding:10px 12px; border:1px solid #e2e8f0; border-radius:4px;">
    <div style="display:table;width:100%">
      <div style="display:table-cell;width:65%;vertical-align:top">
        @if($stop->name)<strong>{{ $stop->name }}</strong><br>@endif
        {{ $stop->address }}, {{ $stop->city }}, {{ $stop->state }} {{ $stop->zip }}
        @if($stop->contact_name)<br><span style="color:#64748b">Contact: {{ $stop->contact_name }}@if($stop->contact_phone) · {{ $stop->contact_phone }}@endif</span>@endif
        @if($stop->special_instructions)<br><em style="color:#64748b">{{ $stop->special_instructions }}</em>@endif
      </div>
      <div style="display:table-cell;width:35%;text-align:right;vertical-align:top;font-size:8.5pt;color:#64748b">
        @if($stop->scheduled_date) Scheduled: {{ $stop->scheduled_date->format('M j, Y') }}<br>@endif
        @if($stop->weight_lbs) Weight: {{ number_format($stop->weight_lbs) }} lbs<br>@endif
        <span class="badge" style="margin-top:4px">{{ ucfirst($stop->status) }}</span>
        @if($stop->completed_at)<br>Completed: {{ $stop->completed_at->format('M j, Y g:i A') }}@endif
      </div>
    </div>
  </div>
  @endforeach
  @endif

  {{-- Delivery stops --}}
  @if($dropoffs->count())
  <div class="section-heading">Delivery Location(s)</div>
  @foreach($dropoffs as $stop)
  <div style="margin-bottom:10px; padding:10px 12px; border:1px solid #e2e8f0; border-radius:4px;">
    <div style="display:table;width:100%">
      <div style="display:table-cell;width:65%;vertical-align:top">
        @if($stop->name)<strong>{{ $stop->name }}</strong><br>@endif
        {{ $stop->address }}, {{ $stop->city }}, {{ $stop->state }} {{ $stop->zip }}
        @if($stop->contact_name)<br><span style="color:#64748b">Contact: {{ $stop->contact_name }}@if($stop->contact_phone) · {{ $stop->contact_phone }}@endif</span>@endif
        @if($stop->special_instructions)<br><em style="color:#64748b">{{ $stop->special_instructions }}</em>@endif
      </div>
      <div style="display:table-cell;width:35%;text-align:right;vertical-align:top;font-size:8.5pt;color:#64748b">
        @if($stop->scheduled_date) Scheduled: {{ $stop->scheduled_date->format('M j, Y') }}<br>@endif
        @if($stop->weight_lbs) Weight: {{ number_format($stop->weight_lbs) }} lbs<br>@endif
        <span class="badge" style="margin-top:4px">{{ ucfirst($stop->status) }}</span>
        @if($stop->completed_at)<br>Completed: {{ $stop->completed_at->format('M j, Y g:i A') }}@endif
        @if($stop->pod_pdf_url)<br><span style="color:#16a34a">✓ POD generated</span>@endif
      </div>
    </div>
  </div>
  @endforeach
  @endif

  {{-- Terms --}}
  <div class="section-heading">Received in Good Order</div>
  <div style="font-size:8.5pt;color:#475569;line-height:1.7">
    <p>The courier acknowledges receipt of the above-described items in apparent good order and condition (unless otherwise noted) and agrees to deliver them to the destination listed, subject to the terms of the applicable courier agreement.</p>
    <br>
    <p>The courier is responsible for inspecting items at pickup and noting any exceptions. Absence of exceptions constitutes acceptance of the items in good condition. Courier liability is limited per the terms of the Courier Agreement.</p>
  </div>

  {{-- Signatures --}}
  <div class="sig-grid">
    <div class="sig-col">
      <div class="sig-line"></div>
      <div class="sig-label">Sender Representative / Date</div>
      <div style="font-size:8pt;color:#94a3b8;margin-top:4px">{{ $broker['name'] }}</div>
    </div>
    <div class="sig-col">
      <div class="sig-line"></div>
      <div class="sig-label">Courier Signature / Date</div>
      <div style="font-size:8pt;color:#94a3b8;margin-top:4px">{{ $carrier['name'] ?? 'Carrier' }}</div>
    </div>
  </div>

@endsection

@section('footer-text')
  Delivery Receipt — {{ $broker['name'] }} · Ref: {{ $job->reference_number ?? 'JOB-'.$job->id }}
@endsection
