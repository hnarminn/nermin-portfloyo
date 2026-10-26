/**
 * NƏRMİN HƏMİDZADƏ - PORTFOLIO INTERACTIVE CORE
 * Features: LocalStorage Persistence, Dynamic Typing, Filter Tabs, Lightbox, CV Modal, Live Edit
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initScrollSpy();
  initStatsCounter();
  initAboutTabs();
  initProjectFilters();
  initMediaGallery();
  initModals();
  initContactForm();
  initLiveEditor();
});

/* ==========================================================================
   1. NAVBAR & SCROLL PROGRESS
   ========================================================================== */
function initNavbar() {
  const nav = document.querySelector('.site-nav');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const backToTop = document.querySelector('.back-to-top');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
    
    if (progressBar) progressBar.style.width = `${progress}%`;
    
    if (scrollTop > 60) {
      nav.classList.add('scrolled');
      if (backToTop) backToTop.classList.add('visible');
    } else {
      nav.classList.remove('scrolled');
      if (backToTop) backToTop.classList.remove('visible');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   2. DYNAMIC TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingEl = document.querySelector('.dynamic-subtitle');
  if (!typingEl) return;

  const phrases = [
    "Robototexnika və Mexatronika Mühəndisi",
    "Data Analitik & BI Mütəxəssisi",
    "Süni İntellekt & Computer Vision Tədqiqatçısı",
    "Omnitrix Komanda Rəhbəri (İnkubasiya Proqramı)",
    "WRC Bots Combat 1/4 Finalisti"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 2000;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => isDeleting = true, pauseEnd);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const currentDelay = isDeleting ? deleteSpeed : (charIndex === currentPhrase.length ? pauseEnd : typeSpeed);
    setTimeout(type, currentDelay);
  }

  type();
}

/* ==========================================================================
   3. SCROLL SPY & ACTIVE NAV
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let started = false;
  const statsSection = document.querySelector('.stats-strip');

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      statNumbers.forEach(el => {
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        let count = 0;
        const duration = 1800;
        const stepTime = 25;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          el.textContent = prefix + (isDecimal ? count.toFixed(1) : Math.round(count)) + suffix;
        }, stepTime);
      });
    }
  }, { threshold: 0.3 });

  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   5. ABOUT TABS
   ========================================================================== */
function initAboutTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/* ==========================================================================
   6. PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-wrap');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE MEDIA GALLERY (WITH LOCAL PERSISTENCE)
   ========================================================================== */
function initMediaGallery() {
  const slots = document.querySelectorAll('.media-slot');

  // Attach lightbox listener to all initial images & videos
  document.querySelectorAll('.media-slot img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      const caption = img.alt || img.closest('.media-slot')?.querySelector('.media-card-title')?.textContent || '';
      openLightbox('img', img.src, caption);
    });
  });

  document.querySelectorAll('.media-slot video').forEach(vid => {
    vid.addEventListener('click', (e) => {
      e.stopPropagation();
      const caption = vid.closest('.media-slot')?.querySelector('.media-card-title')?.textContent || '';
      openLightbox('video', vid.src, caption);
    });
  });

  // Load persisted media from LocalStorage if available
  slots.forEach(slot => {
    const slotId = slot.getAttribute('data-slot-id');
    const savedData = localStorage.getItem(`media_slot_${slotId}`);

    if (savedData) {
      applyMediaToSlot(slot, savedData.type, savedData.src, savedData.name);
    }

    const fileInput = slot.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(evt) {
          const src = evt.target.result;
          const type = file.type.startsWith('video') ? 'video' : 'img';
          applyMediaToSlot(slot, type, src, file.name);

          // Store in LocalStorage (handles standard images, notifies if oversized)
          try {
            localStorage.setItem(`media_slot_${slotId}`, JSON.stringify({
              type: type,
              src: src,
              name: file.name
            }));
            showToast("Fayl brauzerinizdə daimi yadda saxlanıldı!");
          } catch(err) {
            console.warn("Storage quota exceeded, media stored in memory:", err);
            showToast("Fayl yükləndi (Böyük həcmli fayllar üçün LocalStorage limiti aşıldı)");
          }
        };
        reader.readAsDataURL(file);
      });
    }
  });
}

function applyMediaToSlot(slot, type, src, name) {
  // Clear placeholder & existing media
  const placeholder = slot.querySelector('.media-placeholder');
  if (placeholder) placeholder.style.display = 'none';

  slot.querySelectorAll('img, video, .media-overlay-actions').forEach(el => el.remove());

  let mediaEl;
  if (type === 'video') {
    mediaEl = document.createElement('video');
    mediaEl.src = src;
    mediaEl.autoplay = true;
    mediaEl.muted = true;
    mediaEl.loop = true;
    mediaEl.playsInline = true;
  } else {
    mediaEl = document.createElement('img');
    mediaEl.src = src;
    mediaEl.alt = name || "Qalereya şəkli";
  }

  mediaEl.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(type, src, name);
  });

  // Action Buttons Overlay
  const actions = document.createElement('div');
  actions.className = 'media-overlay-actions';
  actions.innerHTML = `
    <button class="media-btn-mini remove-btn" title="Sil">✕</button>
  `;

  actions.querySelector('.remove-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const slotId = slot.getAttribute('data-slot-id');
    localStorage.removeItem(`media_slot_${slotId}`);
    slot.querySelectorAll('img, video, .media-overlay-actions').forEach(el => el.remove());
    if (placeholder) placeholder.style.display = 'flex';
    const input = slot.querySelector('input[type="file"]');
    if (input) input.value = '';
    showToast("Fayl qalereyadan silindi.");
  });

  slot.appendChild(mediaEl);
  slot.appendChild(actions);
}

/* ==========================================================================
   8. MODALS (LIGHTBOX & CV VIEWER)
   ========================================================================== */
function initModals() {
  const lightboxModal = document.getElementById('lightboxModal');
  const cvModal = document.getElementById('cvModal');

  // Trigger CV Modal
  document.querySelectorAll('.trigger-cv-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cvModal) cvModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modals
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-close-btn') || e.target.closest('.modal-close-btn')) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // CV Print Action
  const printBtn = document.getElementById('printCvBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function openLightbox(type, src, caption) {
  const modal = document.getElementById('lightboxModal');
  const container = document.getElementById('lightboxMediaContainer');
  const captionEl = document.getElementById('lightboxCaption');
  if (!modal || !container) return;

  container.innerHTML = '';
  if (type === 'video') {
    const v = document.createElement('video');
    v.src = src;
    v.controls = true;
    v.autoplay = true;
    v.style.maxWidth = '100%';
    v.style.maxHeight = '75vh';
    v.style.borderRadius = '12px';
    container.appendChild(v);
  } else {
    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '75vh';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '12px';
    container.appendChild(img);
  }

  if (captionEl) captionEl.textContent = caption || '';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

/* ==========================================================================
   9. CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('senderSubject').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      showToast("Zəhmət olmasa tələb olunan sahələri doldurun!");
      return;
    }

    // Direct mailto bridge
    const mailtoLink = `mailto:hemidzadenernin@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Əlaqə Mesajı - ' + name)}&body=${encodeURIComponent("Ad: " + name + "\nEmail: " + email + "\n\nMesaj:\n" + message)}`;
    
    showToast("Təşəkkürlər! Mesajınız qəbul edildi. Email müştəriniz açılır...");
    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
    }, 1000);
  });
}

/* ==========================================================================
   10. LIVE IN-BROWSER EDITOR
   ========================================================================== */
function initLiveEditor() {
  const toggleBtn = document.getElementById('liveEditToggle');
  const drawer = document.getElementById('editDrawer');
  const closeBtn = document.getElementById('drawerClose');
  const saveBtn = document.getElementById('saveEditsBtn');
  const resetBtn = document.getElementById('resetEditsBtn');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    populateEditorFields();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  }

  // Load custom edits from localStorage on page startup
  applySavedEdits();

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const edits = {
        name: document.getElementById('editName').value,
        status: document.getElementById('editStatus').value,
        bio: document.getElementById('editBio').value,
        about: document.getElementById('editAbout').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        linkedin: document.getElementById('editLinkedin').value
      };

      localStorage.setItem('nermin_portfolio_custom_data', JSON.stringify(edits));
      applySavedEdits();
      drawer.classList.remove('open');
      showToast("Bütün dəyişikliklər uğurla yadda saxlanıldı!");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm("Bütün fərdi dəyişiklikləri sıfırlayıb orijinal vəziyyətə qaytarmaq istəyirsiniz?")) {
        localStorage.removeItem('nermin_portfolio_custom_data');
        location.reload();
      }
    });
  }
}

function populateEditorFields() {
  const currentName = document.querySelector('.hero-title')?.innerText || "Nərmin Həmidzadə";
  const currentStatus = document.querySelector('.hero-status span:last-child')?.innerText || "";
  const currentBio = document.querySelector('.hero-bio')?.innerText || "";
  const currentAbout = document.querySelector('.about-bio-text p:first-child')?.innerText || "";

  if (document.getElementById('editName')) document.getElementById('editName').value = currentName;
  if (document.getElementById('editStatus')) document.getElementById('editStatus').value = currentStatus;
  if (document.getElementById('editBio')) document.getElementById('editBio').value = currentBio;
  if (document.getElementById('editAbout')) document.getElementById('editAbout').value = currentAbout;
  if (document.getElementById('editEmail')) document.getElementById('editEmail').value = "hemidzadenernin@gmail.com";
  if (document.getElementById('editPhone')) document.getElementById('editPhone').value = "+994 50 448 93 39";
  if (document.getElementById('editLinkedin')) document.getElementById('editLinkedin').value = "linkedin.com/in/nərmin-həmidzadə";
}

function applySavedEdits() {
  const saved = localStorage.getItem('nermin_portfolio_custom_data');
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    if (data.name) {
      document.querySelectorAll('.dyn-name').forEach(el => el.textContent = data.name);
    }
    if (data.status) {
      const statusEl = document.querySelector('.hero-status span:last-child');
      if (statusEl) statusEl.textContent = data.status;
    }
    if (data.bio) {
      const bioEl = document.querySelector('.hero-bio');
      if (bioEl) bioEl.textContent = data.bio;
    }
    if (data.about) {
      const aboutEl = document.querySelector('.dyn-about-p1');
      if (aboutEl) aboutEl.textContent = data.about;
    }
    if (data.email) {
      document.querySelectorAll('.dyn-email').forEach(el => {
        el.textContent = data.email;
        if (el.tagName === 'A') el.href = `mailto:${data.email}`;
      });
    }
    if (data.phone) {
      document.querySelectorAll('.dyn-phone').forEach(el => {
        el.textContent = data.phone;
        if (el.tagName === 'A') el.href = `tel:${data.phone.replace(/\s+/g, '')}`;
      });
    }
    if (data.linkedin) {
      document.querySelectorAll('.dyn-linkedin').forEach(el => {
        el.textContent = data.linkedin;
        if (el.tagName === 'A') el.href = data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`;
      });
    }
  } catch (e) {
    console.error("Error applying saved edits:", e);
  }
}

/* ==========================================================================
   11. TOAST HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
