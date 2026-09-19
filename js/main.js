/**
 * THE TABLETOP CLUB — Core Engine
 * Features: Theme Switcher (Dark/Light), RTL/LTR Switcher, Cart Satchel, Toasts & Modals
 */

// Theme Management
const ThemeManager = {
  currentTheme: localStorage.getItem('ttc_theme') || 'dark',

  init() {
    this.applyTheme(this.currentTheme);
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(btn => btn.addEventListener('click', () => this.toggle()));
  },

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ttc_theme', theme);

    const icons = document.querySelectorAll('.theme-icon-indicator');
    icons.forEach(icon => {
      if (theme === 'light') {
        icon.setAttribute('data-lucide', 'moon');
      } else {
        icon.setAttribute('data-lucide', 'sun');
      }
    });
    if (window.lucide) lucide.createIcons();
  },

  toggle() {
    const next = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    showToast(`Switched to ${next.toUpperCase()} Theme`, 'info');
  }
};

// RTL Layout Management
const RTLManager = {
  isRTL: localStorage.getItem('ttc_dir') === 'rtl',

  init() {
    this.applyDirection(this.isRTL ? 'rtl' : 'ltr');
    const btns = document.querySelectorAll('.rtl-toggle-btn');
    btns.forEach(btn => btn.addEventListener('click', () => this.toggle()));
  },

  applyDirection(dir) {
    this.isRTL = dir === 'rtl';
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('ttc_dir', dir);

    const labels = document.querySelectorAll('.rtl-label-indicator');
    labels.forEach(l => {
      l.textContent = this.isRTL ? 'LTR' : 'RTL';
    });
  },

  toggle() {
    const nextDir = this.isRTL ? 'ltr' : 'rtl';
    this.applyDirection(nextDir);
    showToast(`Layout switched to ${nextDir.toUpperCase()}`, 'info');
  }
};

// Cart Management Engine
const CartManager = {
  items: JSON.parse(localStorage.getItem('ttc_cart') || '[]'),
  
  save() {
    localStorage.setItem('ttc_cart', JSON.stringify(this.items));
    this.updateUI();
  },
  
  addItem(item) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      this.items.push({ ...item, qty: 1 });
    }
    this.save();
    showToast(`Added "${item.name}" to your collection satchel`, 'success');
  },
  
  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    showToast('Item removed from cart', 'info');
  },
  
  updateUI() {
    const badges = document.querySelectorAll('.cart-badge-count');
    const totalCount = this.items.reduce((acc, i) => acc + (i.qty || 1), 0);
    badges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    const cartList = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');
    if (cartList) {
      if (this.items.length === 0) {
        cartList.innerHTML = `
          <div class="text-center py-5" style="color:var(--text-dim);">
            <i data-lucide="shopping-bag" style="width:48px;height:48px;opacity:0.3;margin-bottom:12px;"></i>
            <p style="font-size:0.9rem;">Your collection satchel is empty.</p>
          </div>
        `;
      } else {
        let subtotal = 0;
        cartList.innerHTML = this.items.map(item => {
          const itemTotal = (item.price || 0) * (item.qty || 1);
          subtotal += itemTotal;
          return `
            <div class="food-card-item mb-2" style="background:var(--bg-surface-2);">
              <img src="${item.image || 'image/boardgame_dune.jpg'}" alt="${item.name}" class="food-card-thumb" style="width:50px;height:50px;">
              <div class="flex-grow-1">
                <div style="font-family:var(--font-display);font-size:0.85rem;font-weight:700;color:var(--text-primary);">${item.name}</div>
                <div style="font-size:0.8rem;color:var(--accent-copper);font-weight:700;">$${item.price} × ${item.qty || 1}</div>
              </div>
              <button class="cart-remove-btn" onclick="CartManager.removeItem('${item.id}')" title="Remove">
                <i data-lucide="trash-2" style="width:16px;height:16px;color:#f87171;"></i>
              </button>
            </div>
          `;
        }).join('');
        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      }
      if (window.lucide) lucide.createIcons();
    }
  }
};

// Toast Notifications System
function showToast(message, type = 'info') {
  let stack = document.getElementById('toastStack');
  if (!stack) {
    stack = document.createElement('div');
    stack.id = 'toastStack';
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle' : 'sparkles'}" style="color:var(--accent-copper);width:18px;height:18px;"></i>
    <span>${message}</span>
  `;
  stack.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Init Managers
  ThemeManager.init();
  RTLManager.init();
  CartManager.updateUI();

  if (window.lucide) {
    lucide.createIcons();
  }

  // Navbar Scroll
  const straightNav = document.querySelector('.straight-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      straightNav?.classList.add('scrolled');
    } else {
      straightNav?.classList.remove('scrolled');
    }
  });

  // Mobile Drawer Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  // Cart Drawer
  const cartToggleBtns = document.querySelectorAll('.cart-toggle-trigger');
  const cartSlideover = document.getElementById('cartSlideover');
  const cartCloseBtn = document.getElementById('cartCloseBtn');

  function openCart() {
    cartSlideover?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartSlideover?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartToggleBtns.forEach(btn => btn.addEventListener('click', openCart));
  cartCloseBtn?.addEventListener('click', closeCart);

  // Table Reservation Modal
  const reserveBtns = document.querySelectorAll('.reserve-table-trigger');
  const reserveModal = document.getElementById('reserveTableModal');
  const reserveCloseBtn = document.getElementById('reserveModalClose');
  const reserveForm = document.getElementById('tableReserveForm');

  reserveBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (reserveModal) {
        reserveModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  reserveCloseBtn?.addEventListener('click', () => {
    reserveModal?.classList.remove('show');
    document.body.style.overflow = '';
  });

  reserveModal?.addEventListener('click', (e) => {
    if (e.target === reserveModal) {
      reserveModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  reserveForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    reserveModal?.classList.remove('show');
    document.body.style.overflow = '';
    showToast('Table Reserved! Your clubhouse parchment ticket has been confirmed.', 'success');
  });

  // Home Games Category Switcher
  const homeCategoryBtns = document.querySelectorAll('.home-cat-tab-btn');
  const homeGameCards = document.querySelectorAll('.home-game-card-col');

  homeCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      homeCategoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;

      homeGameCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Ensure Background Videos Autoplay Smoothly and Stay Visible
  document.querySelectorAll('video').forEach(vid => {
    vid.muted = true;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const startVideo = () => {
          vid.play();
          document.removeEventListener('click', startVideo);
          document.removeEventListener('touchstart', startVideo);
        };
        document.addEventListener('click', startVideo, { once: true });
        document.addEventListener('touchstart', startVideo, { once: true });
      });
    }
  });

  // Active Navigation Highlighting (ScrollSpy for Hash links & Page Route matching)
  const navLinks = document.querySelectorAll('.straight-nav-links .straight-nav-item, .drawer-nav-list .drawer-nav-link');
  const hashSections = [];

  // Gather section targets on the current page
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      const targetId = href.substring(1);
      const el = document.getElementById(targetId);
      if (el && !hashSections.some(s => s.id === targetId)) {
        hashSections.push({ id: targetId, el, linkHref: href });
      }
    }
  });

  // Sort sections by their vertical DOM offset to ensure accurate scroll tracking
  hashSections.sort((a, b) => a.el.offsetTop - b.el.offsetTop);

  function updateActiveNavOnScroll() {
    if (hashSections.length === 0) return;

    const scrollPos = window.scrollY + 140; // offset for fixed straight navbar
    let currentActiveId = null;

    for (let i = 0; i < hashSections.length; i++) {
      const sec = hashSections[i];
      const top = sec.el.offsetTop;
      const height = sec.el.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActiveId = sec.id;
        break;
      }
    }

    // If reached bottom of page, activate last section (e.g. #location)
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 80) && hashSections.length > 0) {
      currentActiveId = hashSections[hashSections.length - 1].id;
    }

    // If scroll is near the top of the page, activate first section
    if (window.scrollY < 200 && hashSections.length > 0 && !currentActiveId) {
      currentActiveId = hashSections[0].id;
    }

    if (currentActiveId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentActiveId}` || href?.endsWith(`#${currentActiveId}`)) {
          link.classList.add('active');
        } else if (href && href.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    }
  }

  if (hashSections.length > 0) {
    window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
    updateActiveNavOnScroll();
  }

  // Also highlight current page path for multi-page nav links
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#')) {
      const linkPath = href.split('#')[0].split('/').pop();
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else if (linkPath && currentPath !== 'index.html' && linkPath !== '') {
        link.classList.remove('active');
      }
    }
  });
});
