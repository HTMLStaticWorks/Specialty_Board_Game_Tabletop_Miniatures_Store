/**
 * THE TABLETOP CLUB — Clubhouse Events & Tournament Engine
 */

const CLUB_EVENTS = [
  {
    id: 'evt-1',
    dayCode: 'FRI 19',
    time: '7:00 PM – 11:30 PM',
    title: 'Friday Night RPG: The Sunken Vault of Xal-Khor',
    type: 'rpg',
    typeLabel: 'RPG NIGHT',
    badge: 'COMMUNITY NIGHT',
    gm: 'Dungeon Master Kaelen Vance',
    tables: 'Tables 01 – 04',
    fee: '$15 / Player (Includes Draft Beverage)',
    seatsTotal: 16,
    seatsRemaining: 4,
    description: 'A treacherous tier-2 campaign delve into ancient subterranean crypts. Pre-generated sheets and custom dice trays provided for all players.'
  },
  {
    id: 'evt-2',
    dayCode: 'SAT 20',
    time: '1:00 PM – 8:00 PM',
    title: 'Saturday Invitational: Warhammer 2,000pt Championship',
    type: 'tournament',
    typeLabel: 'TOURNAMENT',
    badge: 'LEADERBOARD EVENT',
    gm: 'Head Judge Matthew Thorne',
    tables: 'Tables 05 – 12 (Battle Mats)',
    fee: '$25 Entry (Prize Pool + Trophies)',
    seatsTotal: 24,
    seatsRemaining: 3,
    description: 'Competitive 3-round Swiss tournament on high-density terrain boards. Full tournament pack, clock timing, and custom etched acrylic tokens.'
  },
  {
    id: 'evt-3',
    dayCode: 'SUN 21',
    time: '5:00 PM – 9:00 PM',
    title: 'Sunday Paint & Sip: Mastering Non-Metallic Metals',
    type: 'paint',
    typeLabel: 'PAINT NIGHT',
    badge: 'WORKSHOP SPOTLIGHT',
    gm: 'Lead Artisan Soraya Chen',
    tables: 'Hobby Studio A & B',
    fee: '$30 (Includes Miniature, Brushes & Paints)',
    seatsTotal: 12,
    seatsRemaining: 2,
    description: 'Comprehensive guided clinic on achieving photorealistic chrome and copper reflections using acrylic glaze transitions. You keep your painted model!'
  },
  {
    id: 'evt-4',
    dayCode: 'TUE 23',
    time: '6:30 PM – 10:30 PM',
    title: 'Board Game Open Meetup: Heavy Strategy & Euro Delights',
    type: 'casual',
    typeLabel: 'OPEN TABLE',
    badge: 'FREE ADMISSION',
    gm: 'Club Host Julian Drake',
    tables: 'Main Lounge',
    fee: 'Free for Members ($5 Walk-in)',
    seatsTotal: 30,
    seatsRemaining: 11,
    description: 'Whether you come solo or with a crew, match up with fellow tacticians for Scythe, Terraforming Mars, Dune Imperium, and Brass Birmingham.'
  },
  {
    id: 'evt-5',
    dayCode: 'THU 25',
    time: '6:00 PM – 9:30 PM',
    title: 'Beginner Tabletop Academy: Learn to Play D&D 5E',
    type: 'rpg',
    typeLabel: 'BEGINNER SESSION',
    badge: 'NEW PLAYER FRIENDLY',
    gm: 'Storyteller Elena Rostova',
    tables: 'Alcove 02',
    fee: '$10 (Includes Starter Dice Set)',
    seatsTotal: 8,
    seatsRemaining: 2,
    description: 'Zero experience required! Learn character creation, combat flow, skill checks, and roleplay mechanics in an inviting, stress-free setting.'
  },
  {
    id: 'evt-6',
    dayCode: 'SAT 27',
    time: '11:00 AM – 4:00 PM',
    title: 'Miniature Terrain & Basing Masterclass',
    type: 'paint',
    typeLabel: 'HOBBY WORKSHOP',
    badge: 'HANDS-ON CLINIC',
    gm: 'Scenic Artist Marcus Vale',
    tables: 'Studio C (Ventilated)',
    fee: '$35 (Full Terrain Kit Included)',
    seatsTotal: 10,
    seatsRemaining: 5,
    description: 'Craft lifelike volcanic magma bases, alpine snowfields, and mossy gothic stone ruins using static grass, resin water, and pigments.'
  }
];

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Lord Commander Raymond V.', faction: 'Iron Vanguard', wins: 28, losses: 3, points: 1450, badge: 'Gold Crown' },
  { rank: 2, name: 'Sable Archon Vivienne M.', faction: 'Abyssal Covens', wins: 25, losses: 5, points: 1320, badge: 'Silver Laurel' },
  { rank: 3, name: 'General Timothy Cruz', faction: 'Solar Stratagem', wins: 23, losses: 6, points: 1210, badge: 'Bronze Chalice' },
  { rank: 4, name: 'Kaelen "DiceRoller" Ward', faction: 'Dune Nomad Raiders', wins: 20, losses: 8, points: 1080, badge: 'Club Veteran' },
  { rank: 5, name: 'Helena Blackwood', faction: 'Gothic Knights', wins: 19, losses: 9, points: 990, badge: 'Rising Tactician' }
];

const EventsEngine = {
  currentTab: 'all',

  init() {
    this.renderEvents();
    this.renderLeaderboard();
    this.bindFilters();
  },

  bindFilters() {
    const tabs = document.querySelectorAll('.event-filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentTab = tab.dataset.eventType;
        this.renderEvents();
      });
    });
  },

  renderEvents() {
    const list = document.getElementById('eventsGrid');
    if (!list) return;

    const filtered = this.currentTab === 'all' 
      ? CLUB_EVENTS 
      : CLUB_EVENTS.filter(e => e.type === this.currentTab);

    list.innerHTML = filtered.map(evt => `
      <div class="col-lg-6 col-12 mb-4 d-flex">
        <div class="calendar-editorial-card w-100">
          <div class="event-date-block">
            <div class="event-day-badge">${evt.dayCode}</div>
            <div class="event-time-badge">
              <i data-lucide="clock" style="width:14px;height:14px;color:var(--accent-copper-light);"></i>
              ${evt.time}
            </div>
          </div>
          <div class="event-card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge-editorial">${evt.typeLabel}</span>
              <span class="badge-table">${evt.badge}</span>
            </div>
            <h3 class="event-title">${evt.title}</h3>
            <p class="event-description">${evt.description}</p>
            
            <div style="background:var(--bg-surface-2);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:10px 14px;margin-bottom:16px;font-size:0.8rem;">
              <div class="d-flex justify-content-between mb-1">
                <span style="color:var(--text-dim);"><i data-lucide="user" style="width:12px;height:12px;margin-right:4px;"></i> Host:</span>
                <strong style="color:var(--text-parchment);">${evt.gm}</strong>
              </div>
              <div class="d-flex justify-content-between mb-1">
                <span style="color:var(--text-dim);"><i data-lucide="map-pin" style="width:12px;height:12px;margin-right:4px;"></i> Assigned:</span>
                <strong style="color:var(--accent-copper);">${evt.tables}</strong>
              </div>
              <div class="d-flex justify-content-between">
                <span style="color:var(--text-dim);"><i data-lucide="tag" style="width:12px;height:12px;margin-right:4px;"></i> Entry Fee:</span>
                <strong style="color:var(--accent-copper-light);">${evt.fee}</strong>
              </div>
            </div>

            <div class="event-meta-footer">
              <div class="event-seats-status">
                <span class="pulse-dot"></span>
                <span>${evt.seatsRemaining} of ${evt.seatsTotal} Seats Available</span>
              </div>
              <button class="btn-reserve-header" onclick="EventsEngine.openRSVP('${evt.id}')">
                <i data-lucide="ticket" style="width:14px;height:14px;"></i> RSVP Seat
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  renderLeaderboard() {
    const tableBody = document.getElementById('leaderboardBody');
    if (!tableBody) return;

    tableBody.innerHTML = LEADERBOARD_DATA.map(p => `
      <tr>
        <td>
          <span class="rank-badge rank-${p.rank}">${p.rank}</span>
        </td>
        <td>
          <strong style="color:var(--text-parchment-light);font-family:var(--font-display);">${p.name}</strong>
          <div style="font-size:0.75rem;color:var(--accent-copper);">${p.badge}</div>
        </td>
        <td style="color:var(--text-parchment-muted);">${p.faction}</td>
        <td><strong style="color:#4ade80;">${p.wins}W</strong> – <span style="color:#f87171;">${p.losses}L</span></td>
        <td><strong style="color:var(--accent-copper-light);font-family:var(--font-display);font-size:1.05rem;">${p.points} PTS</strong></td>
      </tr>
    `).join('');
  },

  openRSVP(eventId) {
    const evt = CLUB_EVENTS.find(e => e.id === eventId);
    if (!evt) return;

    const modal = document.getElementById('rsvpModal');
    const titleEl = document.getElementById('rsvpEventTitle');
    const metaEl = document.getElementById('rsvpEventMeta');

    if (titleEl) titleEl.textContent = evt.title;
    if (metaEl) metaEl.textContent = `${evt.dayCode} • ${evt.time} • ${evt.fee}`;

    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('eventsGrid')) {
    EventsEngine.init();
  }

  // RSVP Form submission
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpModal = document.getElementById('rsvpModal');
  const rsvpClose = document.getElementById('rsvpModalClose');

  rsvpClose?.addEventListener('click', () => {
    rsvpModal?.classList.remove('show');
    document.body.style.overflow = '';
  });

  rsvpModal?.addEventListener('click', (e) => {
    if (e.target === rsvpModal) {
      rsvpModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  rsvpForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    rsvpModal?.classList.remove('show');
    document.body.style.overflow = '';
    showToast('Seat Confirmed! Your Tabletop Club Pass has been issued to your email.', 'success');
  });
});
