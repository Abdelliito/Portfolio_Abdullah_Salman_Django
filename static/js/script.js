/* ============================================================
   ABDULLAH SALMAN — PORTFOLIO
   script.js  |  Vanilla JS, no dependencies
   ============================================================ */

'use strict';

/* ─── TYPING ANIMATION ───────────────────────────────────── */
const typingEl = document.getElementById('typingText');
const typingRolesData = document.getElementById('typingRolesData');
const defaultRoles = [
  'MERN Stack Developer',
  'React.js Engineer',
  'Full-Stack Developer',
  'CS Student @ UMT',
  'Frontend Developer',
];
const parsedRoles = typingRolesData ? JSON.parse(typingRolesData.textContent) : [];
const roles = parsedRoles.length ? parsedRoles : defaultRoles;
let roleIdx = 0, charIdx = 0, isDeleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  typingEl.textContent = isDeleting
    ? current.slice(0, charIdx--)
    : current.slice(0, charIdx++);

  let delay = isDeleting ? 50 : 85;
  if (!isDeleting && charIdx > current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx < 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

/* ─── NAVBAR ─────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navLinkEls = navLinks.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateBackToTop();
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

navLinkEls.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* active section highlight */
const sections = document.querySelectorAll('section[id]');
function activateNavLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', activateNavLink, { passive: true });
activateNavLink();

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.reveal-up, .reveal-fade, .reveal-left, .reveal-right'
);
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => revealObserver.observe(el));

/* ─── SKILL BARS ─────────────────────────────────────────── */
const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
          fill.style.width = fill.dataset.width + '%';
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-category').forEach(cat => barObserver.observe(cat));

/* ─── COUNTER ANIMATION ──────────────────────────────────── */
function animateCounter(el, target) {
  const duration = 1400;
  const start    = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}
const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(num => {
          animateCounter(num, parseInt(num.dataset.target));
        });
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.hero-stats').forEach(s => counterObserver.observe(s));

/* ─── PROJECT FILTER ─────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden-card');
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
      } else {
        card.classList.add('hidden-card');
      }
    });
  });
});

/* ─── PROJECT MODAL ──────────────────────────────────────── */
const fallbackProjects = [];

const renderedProjects = Array.from(projectCards).map(card => {
  const githubLink = card.querySelector('.project-footer a .fa-github')?.closest('a');
  const liveLink = card.querySelector('.project-footer a .fa-external-link-alt')?.closest('a');
  return {
    title: card.querySelector('.project-title')?.textContent.trim() || '',
    cat: card.querySelector('.project-category-tag')?.textContent.trim() || '',
    icon: 'fas fa-code',
    desc: card.querySelector('.project-desc')?.textContent.trim() || '',
    features: [],
    tech: Array.from(card.querySelectorAll('.project-tech span')).map(tech => tech.textContent.trim()),
    github: githubLink?.href || '#',
    live: liveLink?.href || null,
  };
});
const projects = renderedProjects.length ? renderedProjects : fallbackProjects;

const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');

window.openModal = function (idx) {
  const p = projects[idx];
  document.getElementById('modalIcon').innerHTML    = `<i class="${p.icon}"></i>`;
  document.getElementById('modalCat').textContent   = p.cat;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent  = p.desc;

  const ul = document.getElementById('modalFeatures');
  ul.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');

  const techEl = document.getElementById('modalTech');
  techEl.innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');

  const actions = document.getElementById('modalActions');
  let btns = `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fab fa-github"></i> View Code</a>`;
  if (p.live) btns += `<a href="${p.live}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
  actions.innerHTML = btns;

  modalOverlay.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
};

function closeModal() {
  modalOverlay.setAttribute('hidden', '');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ─── CONTACT FORM ───────────────────────────────────────── */
const form        = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

function showError(field, msg) {
  const input = document.getElementById('contact' + field);
  const err   = document.getElementById(field.toLowerCase() + 'Error');
  if (!input || !err) return;
  input.classList.add('error');
  err.textContent = msg;
}
function clearErrors() {
  form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));
  form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

function validateForm() {
  clearErrors();
  let valid = true;
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (name.length < 2)   { showError('Name',    'Please enter your full name.'); valid = false; }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { showError('Email', 'Enter a valid email address.'); valid = false; }
  if (subject.length < 3) { showError('Subject', 'Please add a subject.'); valid = false; }
  if (message.length < 10){ showError('Message', 'Message should be at least 10 characters.'); valid = false; }
  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  submitBtn.disabled = true;
  btnText.classList.add('hidden');
  btnLoading.classList.remove('hidden');

  // Simulate async send (replace with a real service like EmailJS or Formspree)
  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
    formSuccess.classList.remove('hidden');
    form.reset();
    setTimeout(() => formSuccess.classList.add('hidden'), 5000);
  }, 1800);
});

/* clear error state on input */
form.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const errId = el.id.replace('contact', '').toLowerCase() + 'Error';
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = '';
  });
});

/* ─── BACK TO TOP ────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');
function updateBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── FOOTER YEAR ────────────────────────────────────────── */
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ─── SMOOTH SCROLL POLYFILL ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ─── INIT ───────────────────────────────────────────────── */
document.getElementById('footerYear').textContent = new Date().getFullYear();
console.log('%c👋 Hey! Built by Abdullah Salman.', 'color: #00ADB5; font-size: 14px; font-weight: bold;');
