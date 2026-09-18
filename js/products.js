/**
 * THE TABLETOP CLUB — Game Discovery Engine & Catalog
 */

const PRODUCTS_DATABASE = [
  {
    id: 'prod-1',
    name: 'Aethelred: Chronicles of the High Realm',
    category: 'Strategy',
    categoryTag: 'strategy',
    players: '3-4',
    playerCategory: '3-4',
    duration: 90,
    durationCategory: '60plus',
    difficulty: 4,
    price: 84.00,
    table: 'TABLE 04',
    badge: 'STAFF PICK',
    imagePrimary: 'image/boardgame_dune.jpg',
    imageSecondary: 'image/boardgame_frosthaven.jpg',
    description: 'An asymmetrical kingdom governance strategy masterpiece featuring modular parchment territory maps, wax-sealed decree decks, and weighted metal royal tokens.',
    details: 'Draft laws, wage tactical seasonal campaigns, and manage feudal loyalty across 5 dynamic eras. Includes 4 double-layered player dashboards and custom copper resource cubes.'
  },
  {
    id: 'prod-2',
    name: 'Abyssal Descent: Catacombs of Mor-Drak',
    category: 'RPG',
    categoryTag: 'rpg',
    players: '1-4',
    playerCategory: '3-4',
    duration: 120,
    durationCategory: '60plus',
    difficulty: 5,
    price: 135.00,
    table: 'TABLE 07',
    badge: 'NEW RELEASE',
    imagePrimary: 'image/boardgame_frosthaven.jpg',
    imageSecondary: 'image/hero_miniature.jpg',
    description: 'A grimdark cooperative campaign dungeon crawler with 64 resin miniatures, branching narrative campaign log, and persistent world map.',
    details: 'Features over 200 hours of tactical combat encounters, atmospheric dungeon hex tiles, AI-driven monster behavior decks, and master sculpt miniatures.'
  },
  {
    id: 'prod-3',
    name: 'The Obsidian Citadel Knight (28mm Scale)',
    category: 'Miniatures',
    categoryTag: 'miniatures',
    players: '2',
    playerCategory: '2',
    duration: 45,
    durationCategory: '30-60',
    difficulty: 4,
    price: 42.00,
    table: 'STUDIO 01',
    badge: 'PAINTING SPOTLIGHT',
    imagePrimary: 'image/hero_miniature.jpg',
    imageSecondary: 'image/boardgame_frosthaven.jpg',
    description: 'Masterclass multi-part resin miniature sculpted for fantasy wargaming and display competitions. Unpainted collector edition.',
    details: 'Includes sculpted ruined stone fortress plinth base, alternate heraldry shield heads, and fine 28mm high-density resin casting.'
  },
  {
    id: 'prod-4',
    name: 'Sovereign of the Dunes: Spice Wars',
    category: 'Strategy',
    categoryTag: 'strategy',
    players: '4-6',
    playerCategory: '5plus',
    duration: 75,
    durationCategory: '60plus',
    difficulty: 4,
    price: 68.00,
    table: 'TABLE 02',
    badge: 'COMMUNITY FAVORITE',
    imagePrimary: 'image/boardgame_dune.jpg',
    imageSecondary: 'image/boardgame_frosthaven.jpg',
    description: 'High-stakes planetary control, political bribery, and desert warfare. Every alliance is temporary and betrayal is rewarded.',
    details: 'Complete with silk-touch faction leader mats, 120 linen-finish intrigue cards, and sculpted miniature spice harvesters.'
  },
  {
    id: 'prod-5',
    name: 'Grimwarden: Duel of the Blades',
    category: 'Card Games',
    categoryTag: 'card',
    players: '2',
    playerCategory: '2',
    duration: 25,
    durationCategory: 'under30',
    difficulty: 2,
    price: 28.00,
    table: 'TABLE 09',
    badge: 'STAFF PICK',
    imagePrimary: 'image/boardgame_frosthaven.jpg',
    imageSecondary: 'image/hero_miniature.jpg',
    description: 'Lightning-fast competitive tactical card duel where positioning, stamina management, and combo bluffing decide the victor.',
    details: 'Pocket-sized leatherette travel box containing 110 foil-etched combat stance cards and custom wooden blood tokens.'
  },
  {
    id: 'prod-6',
    name: 'Valeria: Whispers in the Guildhall',
    category: 'Family',
    categoryTag: 'family',
    players: '2-5',
    playerCategory: '3-4',
    duration: 40,
    durationCategory: '30-60',
    difficulty: 2,
    price: 49.00,
    table: 'TABLE 06',
    badge: 'FAMILY FAVORITE',
    imagePrimary: 'image/boardgame_dune.jpg',
    imageSecondary: 'image/boardgame_frosthaven.jpg',
    description: 'Accessible yet deeply satisfying drafting and engine-building game set in a bustling medieval artisan capital.',
    details: 'Beautiful illustrated citizen cards, tactile wooden resource barrels, and effortless rules setup in under 5 minutes.'
  },
  {
    id: 'prod-7',
    name: 'Warzone Sector 40: Iron Vanguard Cohort',
    category: 'Miniatures',
    categoryTag: 'miniatures',
    players: '2',
    playerCategory: '2',
    duration: 120,
    durationCategory: '60plus',
    difficulty: 5,
    price: 110.00,
    table: 'STUDIO 03',
    badge: 'NEW RELEASE',
    imagePrimary: 'image/hero_miniature.jpg',
    imageSecondary: 'image/boardgame_dune.jpg',
    description: 'Heavy armor armored infantry squad with dynamic posing, plasma weapons, and industrial ruins basing sprues.',
    details: 'Box set of 10 multi-part miniatures with 40+ weapon customization options and full squad datacards.'
  },
  {
    id: 'prod-8',
    name: 'Eldritch Oaths: The Forgotten Keep',
    category: 'RPG',
    categoryTag: 'rpg',
    players: '3-6',
    playerCategory: '5plus',
    duration: 180,
    durationCategory: '60plus',
    difficulty: 4,
    price: 55.00,
    table: 'TABLE 11',
    badge: 'THIS WEEKEND',
    imagePrimary: 'image/boardgame_frosthaven.jpg',
    imageSecondary: 'image/boardgame_dune.jpg',
    description: 'A dark fantasy tabletop roleplaying book with hand-drawn campaign cartography, 24 pre-generated classes, and original lore.',
    details: 'Hardbound gold-foil embossed 320-page grimoire with ribbon bookmarks, full color art, and GM battle screen.'
  },
  {
    id: 'prod-9',
    name: 'Aether Fleet: Void Skirmish',
    category: 'Strategy',
    categoryTag: 'strategy',
    players: '2',
    playerCategory: '2',
    duration: 50,
    durationCategory: '30-60',
    difficulty: 3,
    price: 64.00,
    table: 'TABLE 03',
    badge: 'COMMUNITY FAVORITE',
    imagePrimary: 'image/boardgame_dune.jpg',
    imageSecondary: 'image/hero_miniature.jpg',
    description: 'Tactical ship-to-ship naval combat in the upper stratospheres of gas giants. Pre-painted fleet miniatures included.',
    details: 'Features 8 capital airship models with magnetic hull damage tokens and directional flight maneuver templates.'
  },
  {
    id: 'prod-10',
    name: 'Tavern Keep: Brew & Brawl',
    category: 'Card Games',
    categoryTag: 'card',
    players: '2-8',
    playerCategory: '5plus',
    duration: 20,
    durationCategory: 'under30',
    difficulty: 1,
    price: 24.00,
    table: 'TABLE 08',
    badge: 'FAMILY FAVORITE',
    imagePrimary: 'image/boardgame_frosthaven.jpg',
    imageSecondary: 'image/boardgame_dune.jpg',
    description: 'Hilarious, fast-paced party card game of running an eccentric fantasy tavern while keeping drunken ogres at bay.',
    details: '140 linen-coated cards, copper ale tokens, and rules explained in 60 seconds. Perfect club starter.'
  },
  {
    id: 'prod-11',
    name: 'Archon of the Sunken Spire',
    category: 'Miniatures',
    categoryTag: 'miniatures',
    players: '2',
    playerCategory: '2',
    duration: 60,
    durationCategory: '30-60',
    difficulty: 5,
    price: 58.00,
    table: 'STUDIO 02',
    badge: 'PAINTING SPOTLIGHT',
    imagePrimary: 'image/hero_miniature.jpg',
    imageSecondary: 'image/boardgame_frosthaven.jpg',
    description: 'Intricate 75mm display centerpiece featuring an abyssal aquatic deity adorned in coral armor and leviathan trident.',
    details: 'Cast in high-purity grey resin with seamless interlocking joinery and scenic coral reef plinth.'
  },
  {
    id: 'prod-12',
    name: 'Castles of the High River',
    category: 'Board Games',
    categoryTag: 'board games',
    players: '2-4',
    playerCategory: '3-4',
    duration: 45,
    durationCategory: '30-60',
    difficulty: 2,
    price: 52.00,
    table: 'TABLE 05',
    badge: 'STAFF PICK',
    imagePrimary: 'image/boardgame_dune.jpg',
    imageSecondary: 'image/boardgame_frosthaven.jpg',
    description: 'Relaxing yet tactical tile placement game where players construct scenic waterways, vineyards, and medieval estates.',
    details: 'Includes 120 thick wooden terrain tiles, 3D castle towers, and embroidered velvet draw satchels.'
  }
];

// Product Explorer Engine
const ProductExplorer = {
  currentCategory: 'all',
  currentPlayer: 'all',
  currentDuration: 'all',
  searchQuery: '',
  sortBy: 'featured',

  init() {
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    // Filter chips click
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const type = chip.dataset.filterType;
        const val = chip.dataset.filterVal;
        
        // Deactivate siblings in same group
        const groupChips = document.querySelectorAll(`.filter-chip[data-filter-type="${type}"]`);
        groupChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        if (type === 'category') this.currentCategory = val;
        if (type === 'players') this.currentPlayer = val;
        if (type === 'duration') this.currentDuration = val;

        this.render();
      });
    });

    // Search input
    const searchInput = document.getElementById('productSearchInput');
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.render();
    });

    // Sort select
    const sortSelect = document.getElementById('productSortSelect');
    sortSelect?.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.render();
    });
  },

  getFiltered() {
    return PRODUCTS_DATABASE.filter(p => {
      // Category match
      if (this.currentCategory !== 'all') {
        if (this.currentCategory === 'board games' && p.category !== 'Board Games' && p.category !== 'Strategy' && p.category !== 'Family') return false;
        if (this.currentCategory === 'miniatures' && p.category !== 'Miniatures') return false;
        if (this.currentCategory === 'rpg' && p.category !== 'RPG') return false;
        if (this.currentCategory === 'card' && p.category !== 'Card Games') return false;
        if (this.currentCategory === 'strategy' && p.category !== 'Strategy') return false;
        if (this.currentCategory === 'family' && p.category !== 'Family') return false;
      }

      // Player Count match
      if (this.currentPlayer !== 'all') {
        if (this.currentPlayer === '2' && !p.players.includes('2')) return false;
        if (this.currentPlayer === '3-4' && !p.players.includes('3') && !p.players.includes('4')) return false;
        if (this.currentPlayer === '5plus' && !p.players.includes('5') && !p.players.includes('6') && !p.players.includes('8')) return false;
      }

      // Duration match
      if (this.currentDuration !== 'all') {
        if (this.currentDuration === 'under30' && p.duration > 30) return false;
        if (this.currentDuration === '30-60' && (p.duration < 30 || p.duration > 60)) return false;
        if (this.currentDuration === '60plus' && p.duration <= 60) return false;
      }

      // Search match
      if (this.searchQuery) {
        const combined = `${p.name} ${p.category} ${p.description} ${p.badge}`.toLowerCase();
        if (!combined.includes(this.searchQuery)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.sortBy === 'price-asc') return a.price - b.price;
      if (this.sortBy === 'price-desc') return b.price - a.price;
      if (this.sortBy === 'difficulty') return b.difficulty - a.difficulty;
      return 0; // featured default
    });
  },

  render() {
    const grid = document.getElementById('productsGrid');
    const countEl = document.getElementById('productsCount');
    if (!grid) return;

    const filtered = this.getFiltered();
    if (countEl) countEl.textContent = `${filtered.length} TITLES DISCOVERED`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div style="background:var(--bg-surface-1);border:1px solid var(--border-copper);padding:40px;border-radius:var(--radius-md);max-width:500px;margin:0 auto;">
            <i data-lucide="compass" style="width:48px;height:48px;color:var(--accent-copper-light);margin-bottom:16px;"></i>
            <h3 style="font-family:var(--font-display);font-size:1.3rem;margin-bottom:8px;">No Tabletop Artifacts Found</h3>
            <p style="font-size:0.9rem;color:var(--text-parchment-muted);margin-bottom:20px;">Try adjusting your player count, category, or duration filters.</p>
            <button class="btn-secondary-club" onclick="ProductExplorer.resetFilters()">Reset All Filters</button>
          </div>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    grid.innerHTML = filtered.map(p => {
      const starRating = '★'.repeat(p.difficulty) + '☆'.repeat(5 - p.difficulty);
      return `
        <div class="col-lg-4 col-md-6 col-12 mb-4 d-flex">
          <div class="product-card-editorial w-100">
            <div class="product-image-frame">
              <img src="${p.imagePrimary}" alt="${p.name}" class="product-img-primary" loading="lazy">
              <img src="${p.imageSecondary}" alt="${p.name} detail view" class="product-img-secondary" loading="lazy">
              <div class="product-card-badges">
                <span class="badge-editorial">${p.badge}</span>
                <span class="badge-table">${p.table}</span>
              </div>
              <button class="quick-view-overlay-btn" onclick="ProductExplorer.openQuickView('${p.id}')">
                <i data-lucide="eye" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i> Quick View
              </button>
            </div>
            <div class="product-card-body">
              <div class="product-meta-category">${p.category}</div>
              <h3 class="product-title">${p.name}</h3>
              
              <div class="product-specs-grid">
                <div class="spec-cell">
                  <span class="spec-icon-label"><i data-lucide="users" style="width:12px;height:12px;"></i> Players</span>
                  <span class="spec-val">${p.players}</span>
                </div>
                <div class="spec-cell">
                  <span class="spec-icon-label"><i data-lucide="clock" style="width:12px;height:12px;"></i> Duration</span>
                  <span class="spec-val">${p.duration} MIN</span>
                </div>
                <div class="spec-cell">
                  <span class="spec-icon-label"><i data-lucide="shield" style="width:12px;height:12px;"></i> Difficulty</span>
                  <span class="spec-val" style="color:var(--accent-copper-light);letter-spacing:1px;">${starRating}</span>
                </div>
              </div>

              <p style="font-size:0.85rem;color:var(--text-parchment-muted);margin-bottom:16px;line-height:1.5;">${p.description.substring(0, 85)}...</p>

              <div class="product-card-footer">
                <div class="product-price">$${p.price.toFixed(2)}</div>
                <button class="btn-add-cart-card" onclick="CartManager.addItem({id:'${p.id}', name:'${p.name.replace(/'/g, "\\'")}', price:${p.price}, image:'${p.imagePrimary}'})">
                  <i data-lucide="plus" style="width:14px;height:14px;display:inline-block;vertical-align:middle;"></i> Collect
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  resetFilters() {
    this.currentCategory = 'all';
    this.currentPlayer = 'all';
    this.currentDuration = 'all';
    this.searchQuery = '';
    
    document.querySelectorAll('.filter-chip').forEach(c => {
      if (c.dataset.filterVal === 'all') c.classList.add('active');
      else c.classList.remove('active');
    });

    const searchInput = document.getElementById('productSearchInput');
    if (searchInput) searchInput.value = '';

    this.render();
  },

  openQuickView(id) {
    const p = PRODUCTS_DATABASE.find(item => item.id === id);
    if (!p) return;

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    if (!modal || !content) return;

    const starRating = '★'.repeat(p.difficulty) + '☆'.repeat(5 - p.difficulty);

    content.innerHTML = `
      <div class="row g-4 align-items-center">
        <div class="col-md-6">
          <div style="border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--border-copper);position:relative;">
            <img src="${p.imagePrimary}" alt="${p.name}" style="width:100%;height:340px;object-fit:cover;">
            <span class="badge-editorial" style="position:absolute;top:12px;left:12px;">${p.badge}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="badge-editorial mb-2">${p.category}</div>
          <h2 style="font-family:var(--font-display);font-size:1.6rem;color:var(--text-parchment-light);margin-bottom:8px;">${p.name}</h2>
          <div style="color:var(--accent-copper-light);font-size:1.4rem;font-weight:800;font-family:var(--font-display);margin-bottom:14px;">$${p.price.toFixed(2)}</div>
          
          <div style="background:var(--bg-surface-2);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:12px 16px;margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:6px;">
              <span style="color:var(--text-dim);">Recommended Players:</span>
              <strong style="color:var(--text-parchment);">${p.players} Players</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:6px;">
              <span style="color:var(--text-dim);">Estimated Play Time:</span>
              <strong style="color:var(--text-parchment);">${p.duration} Minutes</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:6px;">
              <span style="color:var(--text-dim);">Complexity Rating:</span>
              <strong style="color:var(--accent-copper-light);letter-spacing:1px;">${starRating}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;">
              <span style="color:var(--text-dim);">Clubhouse Location:</span>
              <strong style="color:var(--accent-copper);">${p.table}</strong>
            </div>
          </div>

          <p style="font-size:0.88rem;color:var(--text-parchment-muted);margin-bottom:16px;">${p.description}</p>
          <p style="font-size:0.82rem;color:var(--text-dim);margin-bottom:24px;border-left:2px solid var(--accent-copper);padding-left:10px;">${p.details}</p>

          <div style="display:flex;gap:12px;">
            <button class="btn-primary-club flex-grow-1" onclick="CartManager.addItem({id:'${p.id}', name:'${p.name.replace(/'/g, "\\'")}', price:${p.price}, image:'${p.imagePrimary}'}); document.getElementById('quickViewModal').classList.remove('show');">
              <i data-lucide="shopping-bag" style="width:16px;height:16px;"></i> Add To Cart
            </button>
            <button class="btn-secondary-club" onclick="document.getElementById('quickViewModal').classList.remove('show'); document.getElementById('reserveTableModal')?.classList.add('show');">
              <i data-lucide="calendar" style="width:16px;height:16px;"></i> Reserve Table
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productsGrid')) {
    ProductExplorer.init();
  }

  // Quick view close
  const qvModal = document.getElementById('quickViewModal');
  const qvClose = document.getElementById('quickViewClose');
  qvClose?.addEventListener('click', () => {
    qvModal?.classList.remove('show');
    document.body.style.overflow = '';
  });
  qvModal?.addEventListener('click', (e) => {
    if (e.target === qvModal) {
      qvModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
});
