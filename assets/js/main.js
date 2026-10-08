/**
 * Kevin Adhitya - Executive Portfolio
 * Apple-Style Navigation & Interactive Dynamics
 */

document.addEventListener('DOMContentLoaded', () => {
  initAppleNavbar();
  initPhotoSwitcher();
  initPhotoUploader();
  initThemeToggle();
  initPortfolioFilters();
  initModals();
  initSmoothScroll();
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
        if (profileBadgeRole) profileBadgeRole.textContent = 'Computer Science Graduate • Binus University';
      } else {
        casualBtn.classList.add('active');
        formalBtn.classList.remove('active');
        profileImg.src = casualSrc;
        profileImg.alt = 'Kevin Adhitya - Creative Profile';
        if (profileBadgeName) profileBadgeName.textContent = 'Kevin Adhitya';
        if (profileBadgeRole) profileBadgeRole.textContent = 'UI/UX Designer & IT Support Specialist';
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

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Project & Experience Modals
   ========================================================================== */
function initModals() {
  const infoModal = document.getElementById('detailInfoModal');
  const modalClose = document.getElementById('closeDetailModalBtn');
  const modalTitle = document.getElementById('detailModalTitle');
  const modalSub = document.getElementById('detailModalSub');
  const modalBody = document.getElementById('detailModalBody');

  if (!infoModal) return;

  function openDetailModal(title, subtitle, htmlContent) {
    if (modalTitle) modalTitle.textContent = title;
    if (modalSub) modalSub.textContent = subtitle;
    if (modalBody) modalBody.innerHTML = htmlContent;
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

      openDetailModal(certTitle, certSub, certHtml);
    });
  });

  // Project cards click listener
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
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

      openDetailModal(title, tagline, modalHtml);
    });
  });
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
