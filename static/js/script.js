/* ============================================================
   ABDULLAH SALMAN — PORTFOLIO
   script.js  |  Vanilla JS, no dependencies
   ============================================================ */

'use strict';

/* ─── TYPING ANIMATION ───────────────────────────────────── */
const typingEl = document.getElementById('typingText');
const roles = [
  'MERN Stack Developer',
  'React.js Engineer',
  'Full-Stack Developer',
  'CS Student @ UMT',
  'Frontend Developer',
];
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
const projects = [
  {
    title: 'Vendora',
    cat: 'Full Stack · MERN',
    icon: 'fas fa-shopping-cart',
    desc: 'A full-stack multi-vendor e-commerce platform enabling multiple vendors to sell products in a unified marketplace. Built end-to-end with the MERN stack, featuring a complete role-based ecosystem for Admin, Vendor, and Customer users.',
    features: [
      'Role-based access control (Admin, Vendor, Customer)',
      'JWT authentication with secure login / logout',
      'Vendor dashboard: product management, inventory, orders',
      'Customer dashboard: browsing, cart, and purchases',
      'Admin panel: vendor oversight and platform monitoring',
      'Cloudinary integration for image storage',
      'Frontend on Vercel, backend on Render',
    ],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Cloudinary', 'Vercel', 'Render'],
    github: 'https://github.com/Abdelliito/Vendora_Frontend.git',
    live: 'https://vendora-frontend-six.vercel.app/',
  },
  {
    title: 'TheXI — World Cup 2026 Tracker',
    cat: 'Frontend · API Integration',
    icon: 'fas fa-futbol',
    desc: 'A modern web application for tracking World Cup 2026 matches, teams, standings, and brackets in real time. Built with React.js and Vite, it offers a responsive and performant experience deployed on Vercel.',
    features: [
      'Live match fixtures and schedules',
      'Team details and group standings',
      'Knockout stage bracket visualization',
      'Real-time data fetching via Axios',
      'Optimized state management with TanStack React Query',
      'Responsive UI deployed on Vercel',
    ],
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Axios', 'TanStack Query', 'Vercel'],
    github: 'https://github.com/Abdelliito/TheXi.git',
    live: 'https://the-xi-jade.vercel.app/',
  },
  {
    title: 'Hate Speech Detection Model',
    cat: 'Machine Learning · NLP',
    icon: 'fas fa-brain',
    desc: 'A machine learning model trained on real Twitter/X data to classify offensive vs non-offensive content. Developed as part of an AI course, it applies NLP concepts to a real-world social media problem.',
    features: [
      'Twitter (X) API for data collection',
      'Lexicon-based feature engineering',
      'Data preprocessing and feature extraction',
      'Binary classification: offensive vs non-offensive',
      'NLP pipeline built in Python',
    ],
    tech: ['Python', 'Machine Learning', 'NLP', 'Twitter API', 'scikit-learn'],
    github: '#',
    live: null,
  },
  {
    title: 'Portfolio Website',
    cat: 'Frontend',
    icon: 'fas fa-user-circle',
    desc: 'A responsive personal portfolio website showcasing projects and technical skills. Built with React.js and Tailwind CSS, it features smooth animations and clean design aesthetics across all screen sizes.',
    features: [
      'Responsive across mobile, tablet, and desktop',
      'Smooth animations and hover interactions',
      'React.js component architecture',
      'Tailwind CSS for utility-first styling',
      'Cross-browser compatible',
      'Deployed and optimized for production',
    ],
    tech: ['React.js', 'Tailwind CSS', 'JavaScript'],
    github: '#',
    live: '#',
  },
  {
    title: 'Horror Game',
    cat: 'Game Development',
    icon: 'fas fa-ghost',
    desc: 'A horror-themed game built in Unity with C# scripting, featuring enemy AI, atmospheric lighting, and immersive sound design. The architecture uses modular OOP principles for reusable, maintainable game components.',
    features: [
      'Player movement and game mechanics',
      'Enemy AI with behavioral scripting',
      'Atmospheric lighting and sound effects',
      'Multiple designed game levels',
      'Modular OOP architecture in C#',
      'Immersive environmental storytelling',
    ],
    tech: ['Unity', 'C#', 'OOP', 'Game Design', 'AI Scripting'],
    github: '#',
    live: null,
  },
];

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
