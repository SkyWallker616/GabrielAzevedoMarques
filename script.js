// ===== NAVBAR RESPONSIVA =====
const menuBtn = document.getElementById("menuToggle");
const navList = document.querySelector(".nav-links");
const body = document.body;

if (menuBtn && navList) {
  // inicializa aria
  menuBtn.setAttribute('aria-expanded', 'false');

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = navList.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    body.style.overflow = open ? 'hidden' : '';
  });

  // fechar ao clicar em item (navegação interna)
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      menuBtn.classList.remove("open");
      menuBtn.setAttribute('aria-expanded', 'false');
      body.style.overflow = "";
    });
  });

  // fechar ao clicar fora
  document.addEventListener("click", (e) => {
    if (!navList.contains(e.target) && !menuBtn.contains(e.target)) {
      navList.classList.remove("open");
      menuBtn.classList.remove("open");
      menuBtn.setAttribute('aria-expanded', 'false');
      body.style.overflow = "";
    }
  });
}


// ===== SMOOTH SCROLL + NAV FADE =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;

    // close mobile nav if open
    if (navList && navList.classList.contains('open')) {
      navList.classList.remove('open');
      if (menuBtn) {
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
      body.style.overflow = '';
    }

    const fadeClass = 'nav-fade-temp';
    const fadeShow = 'nav-fade-show';

    // apply temporary start state for fade
    el.classList.add(fadeClass);
    // force reflow so transition will run
    void el.offsetWidth;

    // scroll smoothly to target
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // after scroll begins, trigger the fade-in
    setTimeout(() => {
      el.classList.add(fadeShow);
      // cleanup classes after animation completes
      setTimeout(() => {
        el.classList.remove(fadeClass, fadeShow);
      }, 600);
    }, 180);
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
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
    localStorage.setItem('gabriel_dark', '1');
  }
}

if (toggle) {
  toggle.addEventListener('click', () => {
    const active = body.classList.toggle('dark-mode');
    localStorage.setItem('gabriel_dark', active ? '1' : '0');
    applyTheme();
  });
}

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

// ===== COUNTERS =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target') || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target + (target > 0 ? '+' : '');
        clearInterval(id);
      } else {
        counter.textContent = current;
      }
    }, 12);
  });
}

// Observe hero-stats to trigger counters once
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  statsObserver.observe(statsEl);
}

// ===== BUTTON RIPPLE =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height) * 0.6;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

// ===== FLOATING COMPONENT TREES ANIMATION =====
function createFloatingComponents() {
  const container = document.body;
  const colors = ['#3b82f6', '#1f4ed8', '#60a5fa', '#0ea5e9'];
  for (let i = 0; i < 8; i++) {
    const comp = document.createElement('div');
    comp.className = 'floating-component';
    comp.style.left = Math.random() * 100 + '%';
    comp.style.top = Math.random() * 100 + '%';
    comp.style.color = colors[Math.floor(Math.random() * colors.length)];
    comp.style.animationDelay = Math.random() * 6 + 's';
    comp.innerHTML = '<i class="bi bi-diagram-3"></i>';
    container.appendChild(comp);
  }
}
createFloatingComponents();

// ===== MOTHERBOARD BACKGROUND GRID =====
function createMotherboardGrid() {
  const container = document.body;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'motherboard-grid');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('viewBox', '0 0 1000 1000');
  
  // vertical lines
  for (let i = 0; i <= 20; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', i * 50);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', i * 50);
    line.setAttribute('y2', 1000);
    line.setAttribute('stroke', '#1f4ed8');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('opacity', '0.08');
    svg.appendChild(line);
  }
  
  // horizontal lines
  for (let i = 0; i <= 20; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0);
    line.setAttribute('y1', i * 50);
    line.setAttribute('x2', 1000);
    line.setAttribute('y2', i * 50);
    line.setAttribute('stroke', '#1f4ed8');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('opacity', '0.08');
    svg.appendChild(line);
  }
  
  container.appendChild(svg);
}
createMotherboardGrid();

// ===== ANIMATED CIRCUIT SVG BACKGROUND (enhanced) =====
function createCircuitElements() {
  const container = document.body;
  for (let i = 0; i < 5; i++) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'circuit-svg');
    svg.setAttribute('viewBox', '0 0 400 300');
    svg.setAttribute('width', '400');
    svg.setAttribute('height', '300');
    svg.style.left = Math.random() * 70 + '%';
    svg.style.top = Math.random() * 70 + '%';
    svg.style.animationDelay = Math.random() * 4 + 's';
    
    // multiple circuit paths
    const paths = [
      'M 30 80 L 150 80 L 150 150 L 280 150 L 280 200',
      'M 50 40 L 120 40 L 120 120 L 250 120',
      'M 80 180 L 200 180 L 200 100 L 320 100'
    ];
    
    paths.forEach((pathD, idx) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathD);
      path.setAttribute('stroke', '#3b82f6');
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('fill', 'none');
      path.setAttribute('opacity', '0.7');
      svg.appendChild(path);
    });
    
    // connection nodes along paths
    const nodePositions = [
      [30,80], [150,80], [150,150], [280,150], [280,200],
      [50,40], [120,40], [120,120], [250,120],
      [80,180], [200,180], [200,100], [320,100]
    ];
    
    nodePositions.forEach((pos, idx) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos[0]);
      circle.setAttribute('cy', pos[1]);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', '#0ea5e9');
      circle.setAttribute('class', 'circuit-node');
      circle.style.animationDelay = (idx * 0.15) + 's';
      svg.appendChild(circle);
    });
    
    container.appendChild(svg);
  }
}
createCircuitElements();

// ===== FLOATING IC CHIPS FROM HERO IMAGE =====
function createFloatingChips() {
  const heroImg = document.querySelector('.hero-img');
  if (!heroImg) return;
  
  for (let i = 0; i < 6; i++) {
    const chip = document.createElement('div');
    chip.className = 'floating-chip';
    chip.style.left = Math.random() * 60 + 20 + '%';
    chip.style.top = Math.random() * 40 + 25 + '%';
    chip.style.animationDelay = Math.random() * 8 + 's';
    
    const chipSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chipSvg.setAttribute('viewBox', '0 0 60 60');
    chipSvg.setAttribute('width', '60');
    chipSvg.setAttribute('height', '60');
    
    // ic chip body
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '10');
    rect.setAttribute('y', '10');
    rect.setAttribute('width', '40');
    rect.setAttribute('height', '40');
    rect.setAttribute('fill', '#1f4ed8');
    rect.setAttribute('stroke', '#0ea5e9');
    rect.setAttribute('stroke-width', '1');
    chipSvg.appendChild(rect);
    
    // inner pin details
    for (let j = 0; j < 8; j++) {
      const pin = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      pin.setAttribute('x', j < 4 ? 8 : 44);
      pin.setAttribute('y', 15 + (j % 4) * 8);
      pin.setAttribute('width', '2');
      pin.setAttribute('height', '4');
      pin.setAttribute('fill', '#3b82f6');
      chipSvg.appendChild(pin);
    }
    
    chip.appendChild(chipSvg);
    document.body.appendChild(chip);
  }
}
createFloatingChips();

// ===== FLOATING CIRCUITS FROM HERO IMAGE =====
function createFloatingCircuits() {
  for (let i = 0; i < 8; i++) {
    const circuitWrap = document.createElement('div');
    circuitWrap.className = 'floating-circuit-from-image';
    circuitWrap.style.left = Math.random() * 50 + 25 + '%';
    circuitWrap.style.top = Math.random() * 35 + 30 + '%';
    circuitWrap.style.animationDelay = Math.random() * 10 + 's';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 150');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '150');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    
    // circuit paths
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 20 50 L 80 50 L 80 100 L 150 100 L 150 130');
    path.setAttribute('stroke', '#0ea5e9');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
    
    // connection nodes
    const nodePositions = [[20, 50], [80, 50], [80, 100], [150, 100], [150, 130]];
    nodePositions.forEach((pos, idx) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos[0]);
      circle.setAttribute('cy', pos[1]);
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', '#3b82f6');
      circle.setAttribute('class', 'floating-circuit-node');
      circle.style.animationDelay = (idx * 0.2) + 's';
      svg.appendChild(circle);
    });
    
    circuitWrap.appendChild(svg);
    document.body.appendChild(circuitWrap);
  }
}
createFloatingCircuits();
 

