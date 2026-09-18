/**
 * THE TABLETOP CLUB — Painting & Studio Supplies Engine
 */

const PAINTING_SUPPLIES = [
  // PAINT
  {
    id: 'paint-1',
    category: 'paint',
    name: 'Obsidian Velvet Acrylic Pigment Set (12 Colors)',
    price: 48.00,
    badge: 'COLLECTOR ESSENTIAL',
    image: 'image/hero_miniature.jpg',
    specs: 'High opacity, matte finish, 18ml dropper bottles with agitator beads',
    description: 'Specially formulated pigment density designed for smooth glazes, zero chalkiness, and seamless layer transitions.'
  },
  {
    id: 'paint-2',
    category: 'paint',
    name: 'Burnished Copper & Ancient Gold Metallic Alchemy',
    price: 18.50,
    badge: 'SIGNATURE METALLIC',
    image: 'image/boardgame_dune.jpg',
    specs: 'True mica flake suspension, ultra-smooth brushflow',
    description: 'Achieve lustrous metallic highlights on miniature armor, filigree shields, and eldritch relics without flaking.'
  },
  {
    id: 'paint-3',
    category: 'paint',
    name: 'Grimdark Sepia & Abyssal Black Wash Duo',
    price: 14.00,
    badge: 'SHADOW ENHANCER',
    image: 'image/boardgame_frosthaven.jpg',
    specs: 'Flow improver blend, 24ml wide-mouth bottles',
    description: 'Flows effortlessly into miniature recesses to provide instant natural shading and weathered battle grime.'
  },
  // BRUSH
  {
    id: 'brush-1',
    category: 'brush',
    name: 'Master Siberian Kolinsky Sable Trio (#00, #0, #1)',
    price: 44.00,
    badge: 'ARTISAN GRADE',
    image: 'image/hero_miniature.jpg',
    specs: '100% natural Kolinsky hair, needle-sharp snap tip',
    description: 'The gold standard for miniature edge highlighting, eyes, facial expressions, and fine lettering.'
  },
  {
    id: 'brush-2',
    category: 'brush',
    name: 'Titanium Drybrush Mastery Set (Round & Chisel)',
    price: 22.00,
    badge: 'TEXTURE SPECIALIST',
    image: 'image/boardgame_dune.jpg',
    specs: 'Dense synthetic dome bristles, ergonomic wooden handles',
    description: 'Perfect for velvet-smooth drybrushing armor, stone ruins, creature scales, and organic textures.'
  },
  // TOOLS
  {
    id: 'tools-1',
    category: 'tools',
    name: 'Hydro-Seal Studio Wet Palette V2',
    price: 36.00,
    badge: 'STUDIO ESSENTIAL',
    image: 'image/boardgame_frosthaven.jpg',
    specs: 'Anti-microbial hydro foam, 50 sheets permeable membrane',
    description: 'Keeps your acrylic blends and custom glazes workable for days without drying out on the desk.'
  },
  {
    id: 'tools-2',
    category: 'tools',
    name: 'Precision Flush-Cutter Sprue Nippers & Hobby Chisel',
    price: 26.00,
    badge: 'CLEAN CUT',
    image: 'image/hero_miniature.jpg',
    specs: 'Tempered carbon steel, single-blade surgical cut',
    description: 'Cuts delicate plastic and resin miniature parts cleanly from the sprue with zero stress-whitening.'
  },
  // BASING
  {
    id: 'basing-1',
    category: 'basing',
    name: 'Highland Moss & Volcanic Ash Basing Collection',
    price: 28.00,
    badge: 'TERRAIN TEXTURE',
    image: 'image/boardgame_dune.jpg',
    specs: '4 textured gravel tubs, static grass tufts, cork rubble',
    description: 'Everything required to turn plain miniature bases into cinematic rocky cliffs, scorched battlefields, and lush forests.'
  },
  {
    id: 'basing-2',
    category: 'basing',
    name: 'Crystalline Water & Toxic Ooze Resin FX',
    price: 19.50,
    badge: 'ENVIRONMENTAL FX',
    image: 'image/boardgame_frosthaven.jpg',
    specs: 'UV curing liquid, crystal clear / toxic glow tint',
    description: 'Creates hyper-realistic miniature puddles, swamp pools, and glowing magic pools in seconds under UV light.'
  },
  // STARTER KITS
  {
    id: 'starter-1',
    category: 'starter',
    name: 'The Novice Vanguard Tabletop Painting Starter Box',
    price: 65.00,
    badge: 'COMPLETE STARTER',
    image: 'image/hero_miniature.jpg',
    specs: '16 acrylic paints, 3 brushes, 2 knight miniatures, wet palette, tutorial guidebook',
    description: 'The definitive all-in-one gateway into the miniature painting hobby. Engineered specifically for beginners.'
  }
];

const PaintingStudio = {
  currentCategory: 'paint',

  init() {
    this.initBeforeAfterSlider();
    this.bindPipelineNavigation();
    this.renderSupplies();
  },

  initBeforeAfterSlider() {
    const container = document.getElementById('beforeAfterSlider');
    const afterLayer = document.getElementById('baAfterLayer');
    const handle = document.getElementById('baSliderHandle');
    if (!container || !afterLayer || !handle) return;

    let isSliding = false;

    function setSliderPosition(x) {
      const rect = container.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      if (pos < 0) pos = 0;
      if (pos > 1) pos = 1;

      const percentage = pos * 100;
      afterLayer.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    // Mouse events
    handle.addEventListener('mousedown', () => isSliding = true);
    window.addEventListener('mouseup', () => isSliding = false);
    window.addEventListener('mousemove', (e) => {
      if (!isSliding) return;
      setSliderPosition(e.clientX);
    });

    // Touch events
    handle.addEventListener('touchstart', () => isSliding = true);
    window.addEventListener('touchend', () => isSliding = false);
    window.addEventListener('touchmove', (e) => {
      if (!isSliding || e.touches.length === 0) return;
      setSliderPosition(e.touches[0].clientX);
    });

    // Container click to jump
    container.addEventListener('click', (e) => {
      if (e.target.closest('#baSliderHandle')) return;
      setSliderPosition(e.clientX);
    });
  },

  bindPipelineNavigation() {
    const stepBtns = document.querySelectorAll('.pipeline-step-btn');
    stepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        stepBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.step;
        this.renderSupplies();
      });
    });
  },

  renderSupplies() {
    const grid = document.getElementById('suppliesGrid');
    if (!grid) return;

    const filtered = this.currentCategory === 'all'
      ? PAINTING_SUPPLIES
      : PAINTING_SUPPLIES.filter(s => s.category === this.currentCategory);

    grid.innerHTML = filtered.map(item => `
      <div class="col-lg-4 col-md-6 col-12 mb-4 d-flex">
        <div class="product-card-editorial w-100">
          <div class="product-image-frame">
            <img src="${item.image}" alt="${item.name}" class="product-img-primary" loading="lazy">
            <div class="product-card-badges">
              <span class="badge-editorial">${item.badge}</span>
            </div>
          </div>
          <div class="product-card-body">
            <div class="product-meta-category">${item.category.toUpperCase()} STUDIO SUPPLY</div>
            <h3 class="product-title" style="font-size:1.05rem;">${item.name}</h3>
            <p style="font-size:0.8rem;color:var(--accent-copper-light);margin-bottom:8px;font-weight:600;">
              <i data-lucide="info" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:4px;"></i>${item.specs}
            </p>
            <p style="font-size:0.84rem;color:var(--text-parchment-muted);margin-bottom:16px;">${item.description}</p>
            <div class="product-card-footer">
              <div class="product-price">$${item.price.toFixed(2)}</div>
              <button class="btn-add-cart-card" onclick="CartManager.addItem({id:'${item.id}', name:'${item.name.replace(/'/g, "\\'")}', price:${item.price}, image:'${item.image}'})">
                <i data-lucide="plus" style="width:14px;height:14px;"></i> Add To Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('beforeAfterSlider') || document.getElementById('suppliesGrid')) {
    PaintingStudio.init();
  }
});
