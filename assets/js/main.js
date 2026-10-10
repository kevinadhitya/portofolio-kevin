/**
 * Kevin Adhitya - Executive Portfolio
 * Apple-Style Navigation & Interactive Dynamics
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashIntro();
  initAppleNavbar();
  initPhotoSwitcher();
  initPhotoUploader();
  initThemeToggle();
  initPortfolioFilters();
  initModals();
  initSmoothScroll();
  initContactForm();
});

/* ==========================================================================
   1. Apple Navigation & Hover Mega-Menu System
   ========================================================================== */
function initAppleNavbar() {
  const navItems = document.querySelectorAll('.nav-item[data-tray-target]');
  const dropdownTray = document.getElementById('appleDropdownTray');
  const trayPanels = document.querySelectorAll('.tray-panel');
  const navBackdrop = document.getElementById('navBackdrop');
  const navWrapper = document.querySelector('.apple-nav-wrapper');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  let closeTimeout = null;
  let activePanel = null;

  function openTray(targetId) {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }

    trayPanels.forEach(panel => {
      if (panel.id === targetId) {
        panel.classList.add('active');
        activePanel = panel;
      } else {
        panel.classList.remove('active');
      }
    });

    dropdownTray.classList.add('open');
    navBackdrop.classList.add('active');
  }

  function scheduleClose() {
    closeTimeout = setTimeout(() => {
      dropdownTray.classList.remove('open');
      navBackdrop.classList.remove('active');
      trayPanels.forEach(panel => panel.classList.remove('active'));
      navItems.forEach(item => item.classList.remove('active'));
      activePanel = null;
    }, 200);
  }

  // Hover on navigation items
  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const targetId = item.getAttribute('data-tray-target');
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      openTray(targetId);
    });
  });

  // Keep open when mouse enters tray
  if (dropdownTray) {
    dropdownTray.addEventListener('mouseenter', () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
    });
    dropdownTray.addEventListener('mouseleave', scheduleClose);
  }

  // Mouseleave on overall navbar wrapper
  if (navWrapper) {
    navWrapper.addEventListener('mouseleave', scheduleClose);
  }

  // Close when backdrop is clicked
  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => {
      dropdownTray.classList.remove('open');
      navBackdrop.classList.remove('active');
      trayPanels.forEach(panel => panel.classList.remove('active'));
      navItems.forEach(item => item.classList.remove('active'));
    });
  }

  // Mobile drawer toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        mobileDrawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   2. Profile Photo Switcher (Formal vs Casual)
   ========================================================================== */
function initPhotoSwitcher() {
  const formalBtn = document.getElementById('btnPhotoFormal');
  const casualBtn = document.getElementById('btnPhotoCasual');
  const profileImg = document.getElementById('profileHeroImg');
  const profileBadgeName = document.getElementById('profileBadgeName');
  const profileBadgeRole = document.getElementById('profileBadgeRole');

  if (!formalBtn || !casualBtn || !profileImg) return;

  // Retrieve saved custom photos from localStorage if present
  const storedFormal = localStorage.getItem('kevin_photo_formal');
  const storedCasual = localStorage.getItem('kevin_photo_casual');

  const formalSrc = storedFormal || 'assets/images/kevin-formal.jpg';
  const casualSrc = storedCasual || 'assets/images/kevin-casual.jpg';

  function switchMode(mode) {
    profileImg.style.opacity = '0';
    profileImg.style.transform = 'scale(0.97)';

    setTimeout(() => {
      if (mode === 'formal') {
        formalBtn.classList.add('active');
        casualBtn.classList.remove('active');
        profileImg.src = formalSrc;
        profileImg.alt = 'Kevin Adhitya - Executive Formal Profile';
        if (profileBadgeName) profileBadgeName.textContent = 'Kevin Adhitya, S.Kom';
        if (profileBadgeRole) profileBadgeRole.textContent = 'Computer Science Graduate • AI & Systems';
      } else {
        casualBtn.classList.add('active');
        formalBtn.classList.remove('active');
        profileImg.src = casualSrc;
        profileImg.alt = 'Kevin Adhitya - Creative Profile';
        if (profileBadgeName) profileBadgeName.textContent = 'Kevin Adhitya';
        if (profileBadgeRole) profileBadgeRole.textContent = 'Web Developer & AI Implementation Engineer';
      }

      profileImg.style.opacity = '1';
      profileImg.style.transform = 'scale(1)';
    }, 180);
  }

  formalBtn.addEventListener('click', () => switchMode('formal'));
  casualBtn.addEventListener('click', () => switchMode('casual'));
}

/* ==========================================================================
   3. Interactive Photo Uploader & Live Preview Modal
   ========================================================================== */
function initPhotoUploader() {
  const triggerBtn = document.getElementById('openPhotoModalBtn');
  const modal = document.getElementById('photoUploadModal');
  const closeBtn = document.getElementById('closePhotoModalBtn');
  const fileInput = document.getElementById('photoFileInput');
  const dropzone = document.getElementById('photoDropzone');
  const uploadTargetRadios = document.querySelectorAll('input[name="uploadTarget"]');
  const profileImg = document.getElementById('profileHeroImg');

  if (!triggerBtn || !modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFile(fileInput.files[0]);
      }
    });
  }

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const targetMode = document.querySelector('input[name="uploadTarget"]:checked')?.value || 'formal';

      if (targetMode === 'formal') {
        localStorage.setItem('kevin_photo_formal', dataUrl);
        const formalBtn = document.getElementById('btnPhotoFormal');
        if (formalBtn && formalBtn.classList.contains('active')) {
          profileImg.src = dataUrl;
        }
      } else {
        localStorage.setItem('kevin_photo_casual', dataUrl);
        const casualBtn = document.getElementById('btnPhotoCasual');
        if (casualBtn && casualBtn.classList.contains('active')) {
          profileImg.src = dataUrl;
        }
      }

      alert(`Photo applied successfully to ${targetMode.toUpperCase()} slot! You can also save your file directly into assets/images/kevin-${targetMode}.jpg.`);
      closeModal();
    };
    reader.readAsDataURL(file);
  }
}

/* ==========================================================================
   4. Apple Light / Dark Theme Switcher
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggleBtn');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  const savedTheme = localStorage.getItem('kevin_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('kevin_theme', next);
      updateThemeIcons(next);
    });
  }

  function updateThemeIcons(theme) {
    if (!sunIcon || !moonIcon) return;
    if (theme === 'light') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }
}

/* ==========================================================================
   5. Portfolio Category Filter
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  function applyFilter(category) {
    // Sync filter buttons active state
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-filter') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Filter project cards with smooth fade
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        setTimeout(() => { card.style.opacity = '1'; }, 30);
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Handle direct filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterCategory = btn.getAttribute('data-filter');
      applyFilter(filterCategory);
    });
  });

  // Handle navbar dropdown / tray category links
  const trayFilterLinks = document.querySelectorAll('[data-portfolio-filter]');
  const dropdownTray = document.getElementById('appleDropdownTray');
  const navBackdrop = document.getElementById('navBackdrop');
  const trayPanels = document.querySelectorAll('.tray-panel');
  const navItems = document.querySelectorAll('.nav-item');

  trayFilterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetCategory = link.getAttribute('data-portfolio-filter');
      if (!targetCategory) return;

      // Close dropdown tray immediately
      if (dropdownTray) dropdownTray.classList.remove('open');
      if (navBackdrop) navBackdrop.classList.remove('active');
      trayPanels.forEach(p => p.classList.remove('active'));
      navItems.forEach(n => n.classList.remove('active'));

      // Apply the filter
      applyFilter(targetCategory);

      // Smooth scroll to portfolio section
      const portfolioSec = document.getElementById('portfolio');
      if (portfolioSec) {
        e.preventDefault();
        const navHeight = 60;
        const targetPos = portfolioSec.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // Also support hash changes like #portfolio?filter=design if navigated externally
  window.addEventListener('hashchange', () => {
    if (window.location.hash.includes('filter=')) {
      const match = window.location.hash.match(/filter=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        applyFilter(match[1]);
      }
    }
  });
}

/* ==========================================================================
   6. Project & Experience Modals
   ========================================================================== */
function initModals() {
  const infoModal = document.getElementById('detailInfoModal');
  const modalWindow = document.getElementById('detailModalWindow');
  const modalClose = document.getElementById('closeDetailModalBtn');
  const modalTitle = document.getElementById('detailModalTitle');
  const modalSub = document.getElementById('detailModalSub');
  const modalBody = document.getElementById('detailModalBody');

  if (!infoModal) return;

  function openDetailModal(title, subtitle, htmlContent, isLarge = false) {
    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = subtitle;
    if (modalBody) modalBody.innerHTML = htmlContent;

    if (modalWindow) {
      if (isLarge) {
        modalWindow.classList.add('modal-window-large');
      } else {
        modalWindow.classList.remove('modal-window-large');
      }
    }

    infoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDetailModal() {
    infoModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeDetailModal);
  infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) closeDetailModal();
  });

  // Certificate Preview click listener
  const certButtons = document.querySelectorAll('.btn-cert-preview');
  certButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent parent card triggers
      const certSrc = btn.getAttribute('data-cert-src');
      const certTitle = btn.getAttribute('data-cert-title') || 'Certificate Preview';
      const certSub = btn.getAttribute('data-cert-sub') || 'Official Document';

      const certHtml = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); overflow:hidden; display:flex; justify-content:center; align-items:center; max-height:68vh; padding:12px;">
            <img src="${certSrc}" alt="${certTitle}" style="max-width:100%; max-height:62vh; object-fit:contain; border-radius:var(--radius-sm); box-shadow:0 10px 30px rgba(0,0,0,0.5);">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <a href="${certSrc}" download target="_blank" rel="noopener" class="btn-apple-primary" style="padding:10px 22px; font-size:0.85rem; display:inline-flex; align-items:center; gap:8px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download File</span>
            </a>
            <button onclick="document.getElementById('detailInfoModal').classList.remove('active'); document.body.style.overflow='';" class="btn-apple-secondary" style="padding:10px 20px; font-size:0.85rem;">
              Close Preview
            </button>
          </div>
        </div>
      `;

      openDetailModal(certTitle, certSub, certHtml, false);
    });
  });

  // Project cards click listener
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');

      // Specialized Rich Modal for Snapchat AR Lens Studio & Insights
      if (projectId === 'snapchat-ar') {
        renderSnapchatModal();
        return;
      }

      // Specialized Rich Modal for Lokerja Job Application Tracker (lokerja project)
      if (projectId === 'lokerja-tracker') {
        renderLokerjaModal();
        return;
      }

      // Specialized Rich Modal for ChronoMap Scheduler (test1 project)
      if (projectId === 'chronomap-scheduler') {
        renderChronoMapModal();
        return;
      }

      // Specialized Rich Modal for Lion Air APB Mobile App Design System
      if (projectId === 'apb-lionair') {
        renderApbLionAirModal();
        return;
      }

      const title = card.querySelector('.project-title')?.textContent || 'Project Details';
      const tagline = card.querySelector('.project-tagline')?.textContent || 'System Architecture';
      const desc = card.querySelector('.project-desc')?.textContent || '';
      const tags = Array.from(card.querySelectorAll('.tech-tag')).map(t => t.textContent).join(', ');

      const modalHtml = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.6;">${desc}</p>
          <div style="background:var(--bg-tertiary); padding:18px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:6px;">Technology Stack</div>
            <div style="font-size:0.875rem; font-family:var(--font-mono); color:var(--text-primary);">${tags}</div>
          </div>
          <div style="display:flex; gap:12px; margin-top:8px;">
            <a href="https://github.com" target="_blank" rel="noopener" class="btn-apple-primary" style="padding:10px 20px; font-size:0.85rem;">View Repository</a>
            <button onclick="document.getElementById('detailInfoModal').classList.remove('active'); document.body.style.overflow='';" class="btn-apple-secondary" style="padding:10px 20px; font-size:0.85rem;">Close Preview</button>
          </div>
        </div>
      `;

      openDetailModal(title, tagline, modalHtml, false);
    });
  });

  // Dedicated Rich Case Study Renderer for Lion Air APB Mobile App
  function renderApbLionAirModal() {
    const title = 'APB Mobile App Design System';
    const subtitle = 'Commercial Aviation Product Design • PT Lion Air Mentari';

    const apbHtml = `
      <div class="apb-modal-wrapper">
        <!-- Hero Header -->
        <div class="apb-modal-hero">
          <div class="apb-modal-hero-left">
            <div class="apb-badge-row">
              <span class="apb-badge-tag brand">Lion Group</span>
              <span class="apb-badge-tag figma">Tools: Figma</span>
              <span class="apb-badge-tag role">UI/UX & Data Analyst Intern</span>
              <span class="apb-badge-tag role">Feb 2023 – May 2024</span>
            </div>
            <h2 class="apb-modal-hero-title">APB (Actual Passenger on Board) Mobile System</h2>
            <p class="apb-modal-hero-subtitle">
              A specialized mobile interface crafted in <strong>Figma</strong> to modernize legacy manual manifest calculations into an agile digital workflow. Engineered to empower <strong>flight attendants (cabin crew)</strong> and <strong>gatekeepers (ground staff)</strong> in conducting rapid, synchronized headcount reconciliations before aircraft pushback.
            </p>
          </div>
          <div class="apb-modal-hero-logo">
            <img src="assets/images/Lion_Air-Logo.wine.png" alt="Lion Air Logo">
          </div>
        </div>

        <!-- High-Fidelity UI Screens Preview Showcase -->
        <div class="apb-preview-showcase">
          <div class="apb-preview-header">
            <div class="apb-preview-label">
              <span class="apb-preview-label-dot"></span>
              <span>High-Fidelity Interface Prototype (Figma Component System)</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">
              Screen Flow: Splash Screen &bull; Crew Authentication &bull; APB Operations Hub
            </div>
          </div>

          <div class="apb-image-container">
            <img src="assets/images/lionair-apb-mockup.png" alt="Lion Air APB Mobile Prototype - Splash, Login, and Main Dashboard">
          </div>
          <div class="apb-image-caption">
            &uarr; Live mobile prototype screens designed in Figma (Branded Splash Screen, secure biometric/ID login for Crew User 517423, and the main APB dispatch hub featuring History APB, Print APB, and Voided APB modules).
          </div>
        </div>

        <!-- Problem Statement & Core Value -->
        <div class="apb-grid-two">
          <div class="apb-feature-box">
            <div class="apb-feature-icon red">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="apb-feature-title">The Operational Challenge</div>
            <div class="apb-feature-desc">
              Prior to digital transformation, manual passenger tally sheets posed significant risks of headcount discrepancies between boarding gates and cabin aisles. Even minor miscalculations caused critical pre-departure delays (pushback delays) and burdensome paperwork loops under strict flight departure windows.
            </div>
          </div>

          <div class="apb-feature-box">
            <div class="apb-feature-icon purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div class="apb-feature-title">The Figma Design Solution</div>
            <div class="apb-feature-desc">
              Leveraging <strong>Figma</strong>'s design token architecture and auto-layout system, we engineered an ergonomic, one-handed mobile interface. Featuring Lion Group's signature high-contrast red & white palette, the UI ensures crystal-clear readability for flight attendants in cabin aisles and ground staff at busy boarding gates under varying ambient lighting.
            </div>
          </div>
        </div>

        <!-- Dual Role User Workflow: Flight Attendants vs Gatekeepers -->
        <div>
          <div style="font-size:0.875rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-secondary); margin-bottom:12px;">
            Target Personas & Field Workflow Architecture
          </div>
          <div class="apb-roles-container">
            <!-- Flight Attendant Card -->
            <div class="apb-role-card">
              <div class="apb-role-header">
                <div class="apb-role-avatar-badge" style="background:rgba(226,25,34,0.15); color:#ff4d4f; border-color:rgba(226,25,34,0.3);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                </div>
                <div>
                  <div class="apb-role-name">Flight Attendants (Cabin Crew)</div>
                  <div class="apb-role-subtitle">In-Flight Passenger Verification & Balancing</div>
                </div>
              </div>
              <ul class="apb-role-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Headcount Reconciliation:</strong> Input and verify physical onboard passenger counts categorized by Adults, Children, and Infants with high ergonomics.</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Digital Sign & Print APB:</strong> Finalize and sign legal APB flight clearance documents digitally, eliminating clumsy paper forms.</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Voided & Special Seat Exceptions:</strong> Instantly record no-show passengers, standby changes, or last-minute offloads.</span>
                </li>
              </ul>
            </div>

            <!-- Gatekeeper Card -->
            <div class="apb-role-card">
              <div class="apb-role-header">
                <div class="apb-role-avatar-badge" style="background:rgba(59,130,246,0.15); color:#60a5fa; border-color:rgba(59,130,246,0.3);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div>
                  <div class="apb-role-name">Gatekeepers (Ground Operations)</div>
                  <div class="apb-role-subtitle">Boarding Gate Gatekeeping & Flight Dispatch</div>
                </div>
              </div>
              <ul class="apb-role-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Gate Scanner Validation:</strong> Monitor scanned boarding passes and validate real-time throughput from the terminal.</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Zero-Discrepancy Cabin Sync:</strong> Ensure gate scan numbers and actual cabin seat numbers achieve a 100% match before door closure.</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Audit Trail & Flight History:</strong> Query historical flight manifest archives and export certified operational reports.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Specifications & Technology Stack -->
        <div class="apb-specs-bar">
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:6px;">
              Design Tools & Technical Foundation
            </div>
            <div class="apb-specs-items">
              <span class="apb-spec-pill" style="border-color:#a259ff; color:#c084fc;">Figma (Auto Layout & Design Tokens)</span>
              <span class="apb-spec-pill">Mobile UI Design System</span>
              <span class="apb-spec-pill">Human-Centered Design (HCD)</span>
              <span class="apb-spec-pill">Data Cleansing (MySQL / Excel)</span>
              <span class="apb-spec-pill">Commercial Aviation Operations</span>
            </div>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="apb-modal-actions">
          <button type="button" class="btn-cert-preview" data-cert-src="assets/images/Certificate_Lion_Air_Intern.jpg" data-cert-title="PT Lion Air Mentari Internship Certificate" data-cert-sub="Official Employment Reference &bull; Data Analyst Intern" style="display:inline-flex; align-items:center; gap:8px; background:var(--badge-bg); color:var(--text-primary); border:1px solid var(--border-strong); border-radius:var(--radius-full); padding:10px 20px; font-size:0.85rem; font-weight:600; cursor:pointer;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span>View Internship Certificate</span>
          </button>
          <button onclick="document.getElementById('detailInfoModal').classList.remove('active'); document.body.style.overflow='';" class="btn-apple-primary" style="padding:10px 24px; font-size:0.85rem;">
            Close Case Study
          </button>
        </div>
      </div>
    `;

    openDetailModal(title, subtitle, apbHtml, true);

    // Re-attach listener for inner certificate button if present
    const innerCertBtn = document.querySelector('.apb-modal-actions .btn-cert-preview');
    if (innerCertBtn) {
      innerCertBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const certSrc = innerCertBtn.getAttribute('data-cert-src');
        const certTitle = innerCertBtn.getAttribute('data-cert-title');
        const certSub = innerCertBtn.getAttribute('data-cert-sub');
        const certHtml = `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); overflow:hidden; display:flex; justify-content:center; align-items:center; max-height:68vh; padding:12px;">
              <img src="${certSrc}" alt="${certTitle}" style="max-width:100%; max-height:62vh; object-fit:contain; border-radius:var(--radius-sm); box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <a href="${certSrc}" download target="_blank" rel="noopener" class="btn-apple-primary" style="padding:10px 22px; font-size:0.85rem; display:inline-flex; align-items:center; gap:8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Download File</span>
              </a>
              <button onclick="document.getElementById('detailInfoModal').classList.remove('active'); document.body.style.overflow='';" class="btn-apple-secondary" style="padding:10px 20px; font-size:0.85rem;">
                Close Preview
              </button>
            </div>
          </div>
        `;
        openDetailModal(certTitle, certSub, certHtml, false);
      });
    }
  }

  // Dedicated Rich Case Study Renderer for ChronoMap Multi-Timezone Scheduler
  function renderChronoMapModal() {
    const title = 'ChronoMap — Multi-Timezone Scheduler';
    const subtitle = 'Full-Stack Web Engineering • Laravel 11, Inertia.js & Vue 3';

    const chronoHtml = `
      <div class="chronomap-modal-wrapper">
        <!-- Hero Header -->
        <div class="chronomap-modal-hero">
          <div class="apb-modal-hero-left">
            <div class="apb-badge-row">
              <span class="chronomap-badge-tag primary">Full-Stack Architecture</span>
              <span class="chronomap-badge-tag tech">Laravel 11 &bull; Vue 3 &bull; Inertia.js</span>
              <span class="apb-badge-tag role">Personal Project &bull; Herd Localhost</span>
              <span class="apb-badge-tag role">appointment_app</span>
            </div>
            <h2 class="apb-modal-hero-title">ChronoMap — Seamless Global Appointment Engine</h2>
            <p class="apb-modal-hero-subtitle">
              A high-precision scheduling and calendar application engineered from the ground up using <strong>Laravel 11</strong>, <strong>Inertia.js</strong>, and <strong>Vue 3</strong>. Solves the ubiquitous friction of cross-border collaboration by automatically synchronizing meeting slots across diverse timezones with millisecond-grade accuracy and enforcing cross-timezone business hour compliance.
            </p>
          </div>
          <div class="chronomap-hero-icon">
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
        </div>

        <!-- Live Localhost Architecture Status Banner -->
        <div class="chronomap-live-banner">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="apb-preview-label-dot" style="background:#22c55e; box-shadow:0 0 8px #22c55e;"></span>
            <span style="font-size:0.85rem; font-weight:600; color:var(--text-primary);">Active Localhost Instance:</span>
            <span class="chronomap-url-code">http://test1.test/dashboard</span>
          </div>
          <div style="font-size:0.775rem; color:var(--text-muted); font-family:var(--font-mono);">
            Powered by Laravel Herd &bull; PHP 8.4 &bull; Inertia Monolith
          </div>
        </div>

        <!-- Multi-Screen Screenshot Interactive Gallery Showcase -->
        <div class="apb-preview-showcase">
          <div class="apb-preview-header">
            <div class="apb-preview-label">
              <span class="apb-preview-label-dot" style="background:#6366f1; box-shadow:0 0 8px #6366f1;"></span>
              <span>Interactive Interface Walkthrough (Click Tabs to Inspect Each Page)</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">
              Screens captured directly from local deployment
            </div>
          </div>

          <!-- Navigation Tabs -->
          <div class="chronomap-tabs-bar">
            <button type="button" class="chronomap-tab-btn active" data-tab="tab-dashboard">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              <span>1. Main Dashboard (/dashboard)</span>
            </button>
            <button type="button" class="chronomap-tab-btn" data-tab="tab-appointments">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>2. Appointments List (/appointments)</span>
            </button>
            <button type="button" class="chronomap-tab-btn" data-tab="tab-create">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              <span>3. Create Appointment (/appointments/create)</span>
            </button>
          </div>

          <!-- Screen 1: Dashboard -->
          <div id="tab-dashboard" class="chronomap-screen-view active">
            <div class="apb-image-container">
              <img src="assets/images/chronomap-dashboard.png" alt="ChronoMap Dashboard - http://test1.test/dashboard">
            </div>
            <div class="chronomap-screen-meta">
              <span><strong>Route:</strong> <code>http://test1.test/dashboard</code> (Authenticated Entry Point)</span>
              <span><strong>Live Header:</strong> Real-time user timezone badge &bull; <code>ASIA/JAKARTA 13.27.48</code></span>
            </div>
            <div class="apb-image-caption" style="text-align:left; line-height:1.6; padding-top:4px;">
              <strong>Feature Breakdown:</strong> The central launchpad presents two large interactive cards. Clicking the left card <em>"Appointment List Page"</em> smoothly transitions through Inertia client-side routing to <code>/appointments</code>. Clicking the right card <em>"Appointment Creation Form"</em> directs to <code>/appointments/create</code>. Notice the centered real-time ticker displaying the authenticated user's active timezone (e.g., <code>ASIA/JAKARTA</code>) with millisecond-exact local time.
            </div>
          </div>

          <!-- Screen 2: Appointments List -->
          <div id="tab-appointments" class="chronomap-screen-view">
            <div class="apb-image-container">
              <img src="assets/images/chronomap-appointments.png" alt="ChronoMap Appointments List - http://test1.test/appointments">
            </div>
            <div class="chronomap-screen-meta">
              <span><strong>Route:</strong> <code>http://test1.test/appointments</code> (Operations & Response Center)</span>
              <span><strong>Action:</strong> Click "+ New Appointment" button on top right &rarr; navigates to <code>/appointments/create</code></span>
            </div>
            <div class="apb-image-caption" style="text-align:left; line-height:1.6; padding-top:4px;">
              <strong>Feature Breakdown:</strong> Displays incoming and organized meetings with automated localized time conversion banner <em>("Waktu ditampilkan dalam zona waktu Anda: Asia/Jakarta")</em>. Columns include Title, Creator, Start (Local), End (Local), and reactive Status/Actions pills (<em>Pending</em>, <em>Accepted</em>, or <em>Rejected</em> with audit reasons, such as "macet jam segitu"). Eager-loaded in Laravel to eliminate N+1 query bottlenecks.
            </div>
          </div>

          <!-- Screen 3: Create Appointment -->
          <div id="tab-create" class="chronomap-screen-view">
            <div class="apb-image-container">
              <img src="assets/images/chronomap-create.png" alt="ChronoMap Create Appointment - http://test1.test/appointments/create">
            </div>
            <div class="chronomap-screen-meta">
              <span><strong>Route:</strong> <code>http://test1.test/appointments/create</code> (Multi-Timezone Booking Engine)</span>
              <span><strong>Return Action:</strong> "← Back to List" returns to <code>/appointments</code></span>
            </div>
            <div class="apb-image-caption" style="text-align:left; line-height:1.6; padding-top:4px;">
              <strong>Feature Breakdown:</strong> Allows scheduling meetings while enforcing cross-border compliance. Meeting organizers can select participants across disparate timezones: <strong>John</strong> (<em>America/New_York</em>), <strong>Sarah</strong> (<em>Europe/London</em>), <strong>Mike</strong> (<em>Asia/Tokyo</em>), <strong>Budi</strong> (<em>Asia/Jakarta</em>), and <strong>UTC</strong> users. Features multi-selection via <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> and automatic form validation.
            </div>
          </div>
        </div>

        <!-- In-Depth Rule & Technical Architecture Alert -->
        <div class="chronomap-rule-alert">
          <div class="chronomap-rule-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span>Core Business Rules: Cross-Timezone Division & Session Security</span>
          </div>
          <div class="chronomap-rule-desc">
            <ul style="padding-left:18px; display:flex; flex-direction:column; gap:8px;">
              <li>
                <strong>Automated Multi-Country Timezone Division:</strong> Every appointment is stored in standard UTC within PostgreSQL/MySQL. Before finalizing, the backend validator converts UTC timestamps into each participant's native local timezone (e.g. <em>Asia/Jakarta</em> [UTC+7], <em>Asia/Tokyo</em> [UTC+9], <em>Europe/London</em> [UTC+0/+1], <em>America/New_York</em> [UTC-5/-4]).
              </li>
              <li>
                <strong>Strict Global Working Hours Boundary (08:00 – 17:00):</strong> The backend rule enforces that a meeting can only be booked if the start and finish times fall squarely between <strong>08:00 AM and 05:00 PM in the local working hours of ALL invited participants</strong> and finishes within the same calendar day for everyone. If a 14:00 Jakarta meeting translates to midnight in New York, the validation engine rejects the submission with a clear explanatory error.
              </li>
              <li>
                <strong>Session Timeout & Inactivity Protection (&gt; 1 Hour):</strong> Configured with high enterprise security standards. User authentication sessions automatically expire when inactive for over 1 hour (60+ minutes), automatically terminating stale browser cookies, protecting sensitive corporate scheduling calendars, and redirecting users to the secure login gate.
              </li>
            </ul>
          </div>
        </div>

        <!-- Problem Statement & Core Value -->
        <div class="apb-grid-two">
          <div class="apb-feature-box">
            <div class="apb-feature-icon red">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div class="apb-feature-title">The Remote Scheduling Dilemma</div>
            <div class="apb-feature-desc">
              Distributed global teams face constant appointment friction due to mental math errors during timezone conversions, unexpected daylight saving transitions, and booking colleagues during their sleeping hours or outside office boundaries.
            </div>
          </div>

          <div class="apb-feature-box">
            <div class="apb-feature-icon purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div class="apb-feature-title">The Reactive Inertia.js Solution</div>
            <div class="apb-feature-desc">
              By leveraging <strong>Inertia.js + Vue 3</strong>, page changes feel like a single-page desktop application without complex standalone API token management. Backend validations in Laravel immediately stream back as reactive inline error states in the frontend form.
            </div>
          </div>
        </div>

        <!-- Specifications & Technology Stack -->
        <div class="apb-specs-bar">
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:6px;">
              Technical Architecture & Stack Specifications
            </div>
            <div class="apb-specs-items">
              <span class="apb-spec-pill" style="border-color:#6366f1; color:#a5b4fc;">Laravel 11 (PHP 8.4)</span>
              <span class="apb-spec-pill">Inertia.js Monolith</span>
              <span class="apb-spec-pill">Vue 3 Composition API</span>
              <span class="apb-spec-pill">Intl.DateTimeFormat API</span>
              <span class="apb-spec-pill">Carbon Timezone Transformers</span>
              <span class="apb-spec-pill">Tailwind CSS</span>
              <span class="apb-spec-pill">1-Hour Session Security</span>
            </div>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="apb-modal-actions">
          <button onclick="window.open('http://test1.test/dashboard', '_blank')" class="btn-apple-primary" style="display:inline-flex; align-items:center; gap:8px; padding:10px 22px; font-size:0.85rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <span>Launch Local App (test1.test/dashboard)</span>
          </button>
          <button onclick="document.getElementById('detailInfoModal').classList.remove('active'); document.body.style.overflow='';" class="btn-apple-secondary" style="padding:10px 24px; font-size:0.85rem;">
            Close Case Study
          </button>
        </div>
      </div>
    `;

    openDetailModal(title, subtitle, chronoHtml, true);

    // Attach Interactive Tab Switcher Listeners
    setTimeout(() => {
      const tabBtns = document.querySelectorAll('.chronomap-tab-btn');
      const tabViews = document.querySelectorAll('.chronomap-screen-view');

      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-tab');

          tabBtns.forEach(b => b.classList.remove('active'));
          tabViews.forEach(v => v.classList.remove('active'));

          btn.classList.add('active');
          const targetView = document.getElementById(targetId);
          if (targetView) targetView.classList.add('active');
        });
      });
    }, 50);
  }

  // Dedicated Rich Case Study Renderer for Lokerja AI Job Application Tracker
  function renderLokerjaModal() {
    const title = 'Lokerja — Smart Job Tracker & AI CV Parser';
    const subtitle = 'Full-Stack & Applied AI Architecture • Laravel, Google OAuth & NLP CV Parser';

    const lokerjaHtml = `
      <div class="lokerja-modal-wrapper">
        <!-- Hero Header -->
        <div class="lokerja-modal-hero">
          <div class="apb-modal-hero-left">
            <div class="apb-badge-row">
              <span class="lokerja-badge-tag primary">Active Production Architecture</span>
              <span class="lokerja-badge-tag tech">Google OAuth API &bull; AI CV Parser</span>
              <span class="apb-badge-tag role">Personal Project &bull; Herd Localhost</span>
              <span class="apb-badge-tag role">lokerja.test</span>
            </div>
            <h2 class="apb-modal-hero-title">Lokerja — Intelligent Career Command Center</h2>
            <p class="apb-modal-hero-subtitle">
              A high-productivity job search tracker designed to eliminate chaotic spreadsheets and fragmented bookmarks. Powered by <strong>Google OAuth API</strong> single sign-on, automated <strong>AI CV extraction</strong> for frictionless profile onboarding, and an interactive 12-month recruitment activity heatmap tracking every interview milestone.
            </p>
          </div>
          <div class="lokerja-hero-icon">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
        </div>

        <!-- Live Localhost Instance Status Banner -->
        <div class="chronomap-live-banner">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="apb-preview-label-dot" style="background:#0d9488; box-shadow:0 0 8px #0d9488;"></span>
            <span style="font-size:0.85rem; font-weight:600; color:var(--text-primary);">Active Localhost Instance:</span>
            <span class="chronomap-url-code" style="color:#2dd4bf;">http://lokerja.test/dashboard</span>
          </div>
          <div style="font-size:0.775rem; color:var(--text-muted); font-family:var(--font-mono);">
            Powered by Laravel Herd &bull; PostgreSQL &bull; Tailwind CSS
          </div>
        </div>

        <!-- Multi-Screen Screenshot Interactive Gallery Showcase -->
        <div class="apb-preview-showcase">
          <div class="apb-preview-header">
            <div class="apb-preview-label">
              <span class="apb-preview-label-dot" style="background:#0d9488; box-shadow:0 0 8px #0d9488;"></span>
              <span>Interactive Interface Walkthrough (Click Tabs to Inspect Each Lifecycle Page)</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">
              Screens captured directly from local deployment
            </div>
          </div>

          <!-- Navigation Tabs -->
          <div class="chronomap-tabs-bar">
            <button type="button" class="chronomap-tab-btn lokerja-tab-btn active" data-tab="tab-lokerja-login">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
              <span>1. Authentication (/login)</span>
            </button>
            <button type="button" class="chronomap-tab-btn lokerja-tab-btn" data-tab="tab-lokerja-onboarding">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              <span>2. AI CV Onboarding (/onboarding)</span>
            </button>
            <button type="button" class="chronomap-tab-btn lokerja-tab-btn" data-tab="tab-lokerja-dashboard">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              <span>3. Main Dashboard (/dashboard)</span>
            </button>
          </div>

          <!-- Screen 1: Login & Google OAuth -->
          <div id="tab-lokerja-login" class="chronomap-screen-view active">
            <div class="apb-image-container">
              <img src="assets/images/lokerja-login.png" alt="Lokerja Login Screen - http://lokerja.test/login">
            </div>
            <div class="chronomap-screen-meta">
              <span><strong>Route:</strong> <code>http://lokerja.test/login</code> (Single Sign-On & Guest Entry)</span>
              <span><strong>API Feature:</strong> One-Click Google OAuth API (<code>/auth/google</code>)</span>
            </div>
            <div class="apb-image-caption" style="text-align:left; line-height:1.6; padding-top:4px;">
              <strong>Feature Breakdown:</strong> The entry portal incorporates high-contrast typography and value propositions <em>("Lamar kerja. Lacak progres. Jangan sampai kelewat.")</em>. Users can authenticate seamlessly using the integrated <strong>Google OAuth API</strong> button <em>("Lanjut dengan Google")</em> via Laravel Socialite, or utilize secure encrypted email/password credentials with session persistence ("Ingat saya").
            </div>
          </div>

          <!-- Screen 2: AI CV Parsing Onboarding -->
          <div id="tab-lokerja-onboarding" class="chronomap-screen-view">
            <div class="apb-image-container">
              <img src="assets/images/lokerja-onboarding.png" alt="Lokerja Onboarding Screen - http://lokerja.test/onboarding">
            </div>
            <div class="chronomap-screen-meta">
              <span><strong>Route:</strong> <code>http://lokerja.test/onboarding</code> (Automated Profile Setup)</span>
              <span><strong>AI Feature:</strong> Intelligent CV Extraction (<code>/onboarding/cv</code>)</span>
            </div>
            <div class="apb-image-caption" style="text-align:left; line-height:1.6; padding-top:4px;">
              <strong>Feature Breakdown:</strong> Immediately following account registration, users encounter an automated setup wizard. Instead of typing dozens of fields manually, job seekers can drag-and-drop their PDF/DOCX resume into <em>"Mulai lebih cepat dengan CV"</em>. The built-in <strong>AI CV Parser API</strong> automatically extracts Education, Work Experience, Skills, and Phone Number, auto-populating steps 1 through 5 for rapid confirmation.
            </div>
          </div>

          <!-- Screen 3: Clean White Analytics Dashboard -->
          <div id="tab-lokerja-dashboard" class="chronomap-screen-view">
            <div class="apb-image-container" style="background:#ffffff; border-color:#e2e8f0;">
              <img src="assets/images/lokerja-dashboard.png" alt="Lokerja Main Dashboard - http://lokerja.test/dashboard">
            </div>
            <div class="chronomap-screen-meta">
              <span><strong>Route:</strong> <code>http://lokerja.test/dashboard</code> (Career Command Center)</span>
              <span><strong>User Context:</strong> Authenticated Profile &bull; Kevin Adhitya (kevinadhitya61@...)</span>
            </div>
            <div class="apb-image-caption" style="text-align:left; line-height:1.6; padding-top:4px;">
              <strong>Feature Breakdown:</strong> A clean, minimalist white dashboard engineered for clarity. Features 4 real-time pipeline status cards: <strong>Berjalan</strong> (Active Applications), <strong>Interview</strong> (Scheduled Rounds), <strong>Berhasil</strong> (Job Offers Accepted), and <strong>Ditolak</strong> (Archived/Rejected). Below sits a GitHub-inspired <strong>12-Month Application Activity Heatmap</strong> and an <em>Upcoming Interviews</em> calendar tracker.
            </div>
          </div>
        </div>

        <!-- In-Depth Technical Architecture & Business Value -->
        <div class="chronomap-rule-alert" style="background:linear-gradient(135deg, rgba(13, 148, 136, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%); border-color:rgba(45, 212, 191, 0.35);">
          <div class="chronomap-rule-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" stroke-width="2.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>Core Technical Pillars: Google OAuth API, AI Resume Parsing & Pipeline Metrics</span>
          </div>
          <div class="chronomap-rule-desc">
            <ul style="padding-left:18px; display:flex; flex-direction:column; gap:8px;">
              <li>
                <strong>Google OAuth API Integration:</strong> Built with Laravel Socialite to provide frictionless, enterprise-grade authentication. Synchronizes Google profile avatars and verified emails directly into PostgreSQL while maintaining secure token refresh lifecycles.
              </li>
              <li>
                <strong>Automated AI CV Extraction Pipeline:</strong> Solves the high friction of onboarding by parsing uploaded PDF/DOCX resumes. Using intelligent pattern-matching algorithms, it decomposes complex multi-page resumes into structured JSON containing degrees, employment tenure, and categorized skill tags—saving job seekers 15+ minutes of manual input.
              </li>
              <li>
                <strong>12-Month Activity Heatmap & Interview Reminders:</strong> Visualizes job application volume over time with color-coded density cells. Allows users to schedule follow-up reminders and track stage conversions from initial application to signed offer letter.
              </li>
            </ul>
          </div>
        </div>

        <!-- Problem Statement & Core Value Bento -->
        <div class="apb-grid-two">
          <div class="apb-feature-box">
            <div class="apb-feature-icon teal">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div class="apb-feature-title">The Job Hunting Chaos</div>
            <div class="apb-feature-desc">
              Job seekers regularly submit dozens of applications across LinkedIn, JobStreet, and company portals, resulting in forgotten follow-ups, lost interview dates, and confusion over which resume version was submitted.
            </div>
          </div>

          <div class="apb-feature-box">
            <div class="apb-feature-icon cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div class="apb-feature-title">The Lokerja Platform Solution</div>
            <div class="apb-feature-desc">
              Lokerja centralizes the entire job search pipeline into an intuitive, high-taste personal workspace. Automated status updates, automated reminder triggers, and visual analytics empower applicants to treat their job hunt like a well-managed project.
            </div>
          </div>
        </div>

        <!-- Specifications & Technology Stack -->
        <div class="apb-specs-bar">
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:6px;">
              Technical Architecture & Stack Specifications
            </div>
            <div class="apb-specs-items">
              <span class="apb-spec-pill" style="border-color:#0d9488; color:#2dd4bf;">Laravel 11 &bull; Herd Localhost</span>
              <span class="apb-spec-pill">Google OAuth API (Socialite)</span>
              <span class="apb-spec-pill">AI CV Document Extraction (PdfParser)</span>
              <span class="apb-spec-pill">PostgreSQL Relational DB</span>
              <span class="apb-spec-pill">Tailwind CSS (Taste Skill UI)</span>
              <span class="apb-spec-pill">Activity Heatmap Engine</span>
            </div>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="apb-modal-actions">
          <button onclick="window.open('http://lokerja.test/dashboard', '_blank')" class="btn-apple-primary" style="display:inline-flex; align-items:center; gap:8px; padding:10px 22px; font-size:0.85rem; background:#0d9488;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <span>Launch Local App (lokerja.test)</span>
          </button>
          <button onclick="document.getElementById('detailInfoModal').classList.remove('active'); document.body.style.overflow='';" class="btn-apple-secondary" style="padding:10px 24px; font-size:0.85rem;">
            Close Case Study
          </button>
        </div>
      </div>
    `;

    openDetailModal(title, subtitle, lokerjaHtml, true);

    // Attach Interactive Tab Switcher Listeners
    setTimeout(() => {
      const tabBtns = document.querySelectorAll('.lokerja-tab-btn');
      const tabViews = [
        document.getElementById('tab-lokerja-login'),
        document.getElementById('tab-lokerja-onboarding'),
        document.getElementById('tab-lokerja-dashboard')
      ];

      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-tab');

          tabBtns.forEach(b => b.classList.remove('active'));
          tabViews.forEach(v => {
            if (v) v.classList.remove('active');
          });

          btn.classList.add('active');
          const targetView = document.getElementById(targetId);
          if (targetView) targetView.classList.add('active');
        });
      });
    }, 50);
  }

  // Dedicated Rich Case Study Renderer for Snapchat AR Lens Studio & Insights
  function renderSnapchatModal() {
    const title = 'Snapchat AR Lens Studio & Audience Insights';
    const subtitle = 'Augmented Reality Engineering & Creator Analytics • BUBU Snapchat Inc.';

    const snapchatHtml = `
      <div class="snapchat-modal-wrapper">
        <!-- Hero Header -->
        <div class="snapchat-modal-hero">
          <div class="apb-modal-hero-left">
            <div class="apb-badge-row">
              <span class="snapchat-badge-tag primary">Official Creator Track</span>
              <span class="snapchat-badge-tag tech">Snap Lens Studio &bull; AR Face Mesh</span>
              <span class="apb-badge-tag role">Campus Ambassador & AR Creator</span>
              <span class="apb-badge-tag role">740k+ Total Reach</span>
            </div>
            <h2 class="apb-modal-hero-title">Snapchat AR Lens Studio & Audience Analytics</h2>
            <p class="apb-modal-hero-subtitle">
              End-to-end Augmented Reality engineering developed using <strong>Snap Inc. Lens Studio</strong>. Conceptualized interactive 3D face tracking and facial mesh deformations (such as the viral <em>"Avocado Face"</em> filter), published live to global Snapchat public profiles, and monitored via <strong>Lens Insights</strong> with over <strong>740,000+ total plays and views</strong>.
            </p>
          </div>
          <div class="snapchat-hero-icon">
            <img src="assets/images/Snapchat-Logo.png" alt="Snapchat Inc">
          </div>
        </div>

        <!-- Metric Performance Bar -->
        <div class="chronomap-live-banner" style="background:var(--bg-card); border-color:rgba(250, 204, 21, 0.3);">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; width:100%;">
            <div class="snapchat-metric-box">
              <span class="snapchat-metric-lbl">Total Reach (Plays & Views)</span>
              <span class="snapchat-metric-val" style="color:#eab308;">740,000+</span>
            </div>
            <div class="snapchat-metric-box">
              <span class="snapchat-metric-lbl">Plays Only</span>
              <span class="snapchat-metric-val" style="color:#22c55e;">501,600+</span>
            </div>
            <div class="snapchat-metric-box">
              <span class="snapchat-metric-lbl">Creator Subscribers</span>
              <span class="snapchat-metric-val" style="color:#60a5fa;">416+</span>
            </div>
            <div class="snapchat-metric-box">
              <span class="snapchat-metric-lbl">Production Status</span>
              <span class="snapchat-metric-val" style="color:#22c55e; font-size:1.3rem;">Published &bull; Live</span>
            </div>
          </div>
        </div>

        <!-- Multi-Screen Screenshot Interactive Gallery Showcase -->
        <div class="apb-preview-showcase">
          <div class="apb-preview-header">
            <div class="apb-preview-label">
              <span class="apb-preview-label-dot" style="background:#eab308; box-shadow:0 0 8px #eab308;"></span>
              <span>Interactive AR Lifecycle Walkthrough (Click Tabs to Inspect Each Phase)</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">
              Development &bull; Publishing Metadata &bull; Live Insights
            </div>
          </div>

          <!-- Navigation Tabs -->
          <div class="chronomap-tabs-bar">
            <button type="button" class="chronomap-tab-btn snapchat-tab-btn active" data-tab="tab-snap-studio">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              <span>1. Lens Studio 3D Canvas</span>
            </button>
            <button type="button" class="chronomap-tab-btn snapchat-tab-btn" data-tab="tab-snap-publish">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>2. Lens Details & Published Status</span>
            </button>
            <button type="button" class="chronomap-tab-btn snapchat-tab-btn" data-tab="tab-snap-insights">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              <span>3. Lens Insights (740k Reach)</span>
            </button>
          </div>

          <!-- Screen 1: Lens Studio 3D Workspace -->
          <div id="tab-snap-studio" class="chronomap-screen-view active">
            <div class="apb-image-container">
              <img src="assets/images/snapchat-lens-studio.png" alt="Snapchat Lens Studio 3D Editor and Live Preview">
            </div>
            <div class="chronomap-screen-meta">
              <span><strong>Development Suite:</strong> Snap Inc. Lens Studio (Desktop IDE)</span>
              <span><strong>Live Viewport:</strong> Real-time Face Mesh & Smoothing Simulation</span>
            </div>
            <div class="apb-image-caption" style="text-align:left; line-height:1.6; padding-top:4px;">
              <strong>Feature Breakdown:</strong> The primary AR authoring suite inside <strong>Lens Studio</strong>. Incorporates a 3D perspective viewport with lighting rigs, camera position vectors, smoothing shaders, and a live smartphone device preview simulator tracking real-time facial landmark movements.
            </div>
          </div>

          <!-- Screen 2: Published Metadata & Avocado Face -->
          <div id="tab-snap-publish" class="chronomap-screen-view">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div class="apb-image-container">
                <img src="assets/images/snapchat-avocado-face.png" alt="Avocado Face Lens Metadata">
              </div>
              <div class="apb-image-container" style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
                <img src="assets/images/snapchat-published-status.png" alt="Lens Published Status" style="max-height:220px;">
              </div>
            </div>
            <div class="chronomap-screen-meta">
              <span><strong>Lens Identity:</strong> "Avocado face" &bull; <code>Lens ID: fc258664-1075-4652-96f3-967772</code></span>
              <span><strong>Distribution:</strong> Verified "Published to a Public Profile"</span>
            </div>
            <div class="apb-image-caption" style="text-align:left; line-height:1.6; padding-top:4px;">
              <strong>Feature Breakdown:</strong> The public deployment phase on the Snap Creator Portal. Features custom illustrative avocado avatar mapping with synchronized mouth & eye cutout tracking. Verified with green badge <em>"Published — To a Public Profile"</em>, making it searchable and unlockable by millions of Snapchatters globally via Snapcode or search.
            </div>
          </div>

          <!-- Screen 3: Lens Insights Analytics -->
          <div id="tab-snap-insights" class="chronomap-screen-view">
            <div class="apb-image-container" style="background:#ffffff; border-color:#e2e8f0;">
              <img src="assets/images/snapchat-lens-insights.png" alt="Snapchat Lens Insights 740k Reach Analytics">
            </div>
            <div class="chronomap-screen-meta">
              <span><strong>Analytics Suite:</strong> Snapchat Creator Portal &bull; Lens Insights (UTC Timeline)</span>
              <span><strong>Audience Engagement:</strong> 740,000+ Total Reach &bull; 501,600+ Plays Only</span>
            </div>
            <div class="apb-image-caption" style="text-align:left; line-height:1.6; padding-top:4px;">
              <strong>Feature Breakdown:</strong> Real-time quantitative performance monitored via <strong>Lens Insights</strong>. Tracks daily organic reach trajectories over a 28-day window, measuring viral engagement spikes exceeding 50,000+ plays in a single day, retention curves, and direct audience conversions generating 416+ creator subscribers.
            </div>
          </div>
        </div>

        <!-- In-Depth Technical Architecture & Business Value -->
        <div class="chronomap-rule-alert" style="background:linear-gradient(135deg, rgba(250, 204, 21, 0.08) 0%, rgba(234, 179, 8, 0.08) 100%); border-color:rgba(250, 204, 21, 0.35);">
          <div class="chronomap-rule-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>Core AR Pillars: 3D Spatial Tracking, Lens Studio Shaders & Real-Time Data Insights</span>
          </div>
          <div class="chronomap-rule-desc">
            <ul style="padding-left:18px; display:flex; flex-direction:column; gap:8px;">
              <li>
                <strong>3D Facial Landmark Tracking:</strong> Utilized Lens Studio's computer vision face mesh algorithms to anchor 3D textures precisely over user facial features, mapping expressions (smiling, blinking, opening mouth) in real time without latency.
              </li>
              <li>
                <strong>Global Distribution & Profile Syndication:</strong> Managed the release lifecycle through Snap's Creator Portal, configuring metadata tags, category classification, and generating scannable Snapcodes for campus activation campaigns.
              </li>
              <li>
                <strong>Lens Insights Quantitative Auditing:</strong> Monitored engagement metrics (Impressions, Camera Plays, Shares, Saves, and Demographics) to evaluate virality drivers and present data-backed monthly performance reports to BUBU Snapchat stakeholders.
              </li>
            </ul>
          </div>
        </div>

        <!-- Problem Statement & Core Value Bento -->
        <div class="apb-grid-two">
          <div class="apb-feature-box">
            <div class="apb-feature-icon yellow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <div class="apb-feature-title">The Creative Engagement Goal</div>
            <div class="apb-feature-desc">
              During the campus ambassador residency, the challenge was creating highly engaging, shareable augmented reality experiences that resonated organically with university student culture and drove recurring camera opens.
            </div>
          </div>

          <div class="apb-feature-box">
            <div class="apb-feature-icon purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
            </div>
            <div class="apb-feature-title">Data-Backed Iteration</div>
            <div class="apb-feature-desc">
              By monitoring Lens Insights analytics daily, filter dynamics were iteratively adjusted to maximize user play time and snap shares, ultimately reaching a massive milestone of 740,000+ views across international user communities.
            </div>
          </div>
        </div>

        <!-- Specifications & Technology Stack -->
        <div class="apb-specs-bar">
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:6px;">
              AR Creative Stack & Tooling Specifications
            </div>
            <div class="apb-specs-items">
              <span class="apb-spec-pill" style="border-color:#eab308; color:#facc15;">Snap Inc. Lens Studio</span>
              <span class="apb-spec-pill">Augmented Reality (AR)</span>
              <span class="apb-spec-pill">Face Mesh & 3D Shaders</span>
              <span class="apb-spec-pill">Snapchat Lens Insights</span>
              <span class="apb-spec-pill">Audience Growth & Analytics</span>
              <span class="apb-spec-pill">BUBU Snapchat Campus Program</span>
            </div>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="apb-modal-actions">
          <button type="button" class="btn-cert-preview" data-cert-src="assets/images/Certificate_Snapchat_Bubu.jpg" data-cert-title="Certificate of Appreciation — BUBU Snapchat Inc." data-cert-sub="Campus Icon & AR Lens Creator" style="display:inline-flex; align-items:center; gap:8px; background:var(--badge-bg); color:var(--text-primary); border:1px solid var(--border-strong); border-radius:var(--radius-full); padding:10px 20px; font-size:0.85rem; font-weight:600; cursor:pointer;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span>View Snapchat Certificate</span>
          </button>
          <button onclick="document.getElementById('detailInfoModal').classList.remove('active'); document.body.style.overflow='';" class="btn-apple-secondary" style="padding:10px 24px; font-size:0.85rem;">
            Close Case Study
          </button>
        </div>
      </div>
    `;

    openDetailModal(title, subtitle, snapchatHtml, true);

    // Attach Interactive Tab Switcher Listeners
    setTimeout(() => {
      const tabBtns = document.querySelectorAll('.snapchat-tab-btn');
      const tabViews = [
        document.getElementById('tab-snap-studio'),
        document.getElementById('tab-snap-publish'),
        document.getElementById('tab-snap-insights')
      ];

      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-tab');

          tabBtns.forEach(b => b.classList.remove('active'));
          tabViews.forEach(v => {
            if (v) v.classList.remove('active');
          });

          btn.classList.add('active');
          const targetView = document.getElementById(targetId);
          if (targetView) targetView.classList.add('active');
        });
      });

      // Attach certificate preview listener inside modal
      const certBtn = document.querySelector('.snapchat-modal-actions .btn-cert-preview');
      if (certBtn) {
        certBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const certSrc = certBtn.getAttribute('data-cert-src');
          const certTitle = certBtn.getAttribute('data-cert-title');
          const certSub = certBtn.getAttribute('data-cert-sub');
          const certHtml = `
            <div style="display:flex; flex-direction:column; gap:16px;">
              <div style="background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); overflow:hidden; display:flex; justify-content:center; align-items:center; max-height:68vh; padding:12px;">
                <img src="${certSrc}" alt="${certTitle}" style="max-width:100%; max-height:62vh; object-fit:contain; border-radius:var(--radius-sm); box-shadow:0 10px 30px rgba(0,0,0,0.5);">
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                <a href="${certSrc}" download target="_blank" rel="noopener" class="btn-apple-primary" style="padding:10px 22px; font-size:0.85rem; display:inline-flex; align-items:center; gap:8px;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  <span>Download File</span>
                </a>
                <button onclick="document.getElementById('detailInfoModal').classList.remove('active'); document.body.style.overflow='';" class="btn-apple-secondary" style="padding:10px 20px; font-size:0.85rem;">
                  Close Preview
                </button>
              </div>
            </div>
          `;
          openDetailModal(certTitle, certSub, certHtml, false);
        });
      }
    }, 50);
  }
}

/* ==========================================================================
   7. Smooth Anchor Scrolling with Apple Fixed Navbar Offset
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = 60;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

        // Close dropdown if open
        const dropdownTray = document.getElementById('appleDropdownTray');
        const navBackdrop = document.getElementById('navBackdrop');
        if (dropdownTray) dropdownTray.classList.remove('open');
        if (navBackdrop) navBackdrop.classList.remove('active');

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   8. Direct Email Contact Form Dispatcher
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('directContactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const subjectInput = document.getElementById('contactSubject');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');

    const subject = subjectInput ? subjectInput.value.trim() : '';
    const senderEmail = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!subject || !senderEmail || !message) {
      alert('Please fill out all fields before sending.');
      return;
    }

    const recipient = 'kevinadhitya6@gmail.com';
    const emailBody = `${message}\n\n---\nSent by: ${senderEmail}\nVia Kevin Adhitya Portfolio Connect`;

    // Try opening Gmail Web Compose directly first (most users use Gmail on desktop)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open Gmail composer in a new tab; fallback to standard system mail client (mailto)
    const openedTab = window.open(gmailUrl, '_blank');
    if (!openedTab || openedTab.closed || typeof openedTab.closed === 'undefined') {
      window.location.href = mailtoUrl;
    }

    form.reset();
  });

  // Dedicated "Order a website instead" trigger
  const orderWebsiteBtn = document.getElementById('btnOrderWebsite');
  if (orderWebsiteBtn) {
    orderWebsiteBtn.addEventListener('click', () => {
      const subjectInput = document.getElementById('contactSubject');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');

      const defaultSubject = 'Website Development & Design Order Inquiry';
      const defaultMessage = `Hi Kevin,\n\nI came across your portfolio and I am interested in ordering / building a custom website for my business or project.\n\nProject details:\n- Type of website (e.g. Landing page, Company profile, Web app, E-commerce):\n- Target timeline:\n- Additional requirements:\n\nLooking forward to your response!`;

      if (subjectInput) subjectInput.value = defaultSubject;
      if (messageInput) messageInput.value = defaultMessage;

      const userEmail = emailInput ? emailInput.value.trim() : '';

      // If user has already filled their email, ask if they want to send immediately or review
      if (userEmail) {
        const recipient = 'kevinadhitya6@gmail.com';
        const emailBody = `${messageInput.value}\n\n---\nSent by: ${userEmail}\nVia Kevin Adhitya Portfolio Website Order`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(emailBody)}`;
        const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(emailBody)}`;

        const openedTab = window.open(gmailUrl, '_blank');
        if (!openedTab || openedTab.closed || typeof openedTab.closed === 'undefined') {
          window.location.href = mailtoUrl;
        }
      } else {
        // Focus user on the email input so they can enter their email
        if (emailInput) {
          emailInput.focus();
          emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }
}

/* ==========================================================================
   9. Splash Intro Gate (Googlebook Inspired Landing Gate)
   ========================================================================== */
function initSplashIntro() {
  const splashScreen = document.getElementById('splashIntroScreen');
  const deepDiveBtn = document.getElementById('btnDeepDive');

  if (!splashScreen || !deepDiveBtn) return;

  // Prevent scroll while splash is active
  document.body.style.overflow = 'hidden';

  deepDiveBtn.addEventListener('click', () => {
    // 1. Trigger kinetic slide-to-left exit animation for the title texts
    splashScreen.classList.add('splash-exiting');

    // 2. Smoothly fade out screen after text slides left
    setTimeout(() => {
      splashScreen.classList.add('splash-hidden');
      document.body.style.overflow = '';

      // Smooth entrance to hero section
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 450);
  });
}
