// ===== NAVBAR RESPONSIVA =====
const menuBtn = document.getElementById("menuToggle");
const navList = document.querySelector(".nav-links");
const body = document.body;

// abrir/fechar menu
menuBtn.addEventListener("click", () => {
  navList.classList.toggle("open");
  menuBtn.classList.toggle("open");

  // trava background quando menu está aberto
  if (navList.classList.contains("open")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
  }
});

// fechar ao clicar em item
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
    menuBtn.classList.remove("open");
    body.style.overflow = "";
  });
});

// fechar ao clicar fora
document.addEventListener("click", (e) => {
  if (!navList.contains(e.target) && !menuBtn.contains(e.target)) {
    navList.classList.remove("open");
    menuBtn.classList.remove("open");
    body.style.overflow = "";
  }
});


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ===== DARK MODE (AUTO + TOGGLE) =====
const toggle = document.getElementById('darkModeToggle');
const root = document.documentElement;

const saved = localStorage.getItem('gabriel_dark');

if (saved === '1') {
  body.classList.add('dark-mode');
} else if (saved === '0') {
  body.classList.remove('dark-mode');
} else {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
    localStorage.setItem('gabriel_dark', '1');
  }
}

toggle.addEventListener('click', () => {
  const active = body.classList.toggle('dark-mode');
  localStorage.setItem('gabriel_dark', active ? '1' : '0');
  applyTheme();
});

function applyTheme() {
  if (body.classList.contains('dark-mode')) {
    root.style.setProperty('--bg', '#0b0f14');
    root.style.setProperty('--text', '#eaeaea');
    root.style.setProperty('--card', '#0f1620');
    root.style.setProperty('--border', '#18202a');
  } else {
    root.style.setProperty('--bg', '#ffffff');
    root.style.setProperty('--text', '#0e1730');
    root.style.setProperty('--card', '#ffffff');
    root.style.setProperty('--border', '#e6eef8');
  }
}
applyTheme();


// ===== FADE-IN ANIMATIONS =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
document.querySelectorAll('.card, .education-item, .project-item, .award-item, .hero-title')
  .forEach(el => {
    if (!el.classList.contains('fade-in')) {
      el.classList.add('fade-in');
      io.observe(el);
    }
  });
