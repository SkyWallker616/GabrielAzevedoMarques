// smooth scroll for anchors (redundant safe)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// DARK MODE: auto + toggle
const body = document.body;
const toggle = document.getElementById('darkModeToggle');

// apply saved preference
const saved = localStorage.getItem('gabriel_dark');
if(saved === '1'){
  body.classList.add('dark-mode');
  document.documentElement.style.setProperty('--bg','#0b0f14');
} else if (saved === '0'){
  body.classList.remove('dark-mode');
}

// respect system preference on first load
if(saved === null){
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(prefersDark){
    body.classList.add('dark-mode');
    localStorage.setItem('gabriel_dark','1');
  }
}

// toggle button
toggle.addEventListener('click', ()=>{
  const isDark = body.classList.toggle('dark-mode');
  localStorage.setItem('gabriel_dark', isDark ? '1' : '0');
});

// reflect dark-mode by toggling CSS variables (simple)
function applyDarkClass(){
  if(body.classList.contains('dark-mode')){
    document.documentElement.style.setProperty('--bg','#0b0f14');
    document.documentElement.style.setProperty('--text','#eaeaea');
    document.documentElement.style.setProperty('--card','#0f1620');
    document.documentElement.style.setProperty('--border','#18202a');
  } else {
    document.documentElement.style.setProperty('--bg','#ffffff');
    document.documentElement.style.setProperty('--text','#0e1730');
    document.documentElement.style.setProperty('--card','#ffffff');
    document.documentElement.style.setProperty('--border','#e6eef8');
  }
}
applyDarkClass();
toggle.addEventListener('click', applyDarkClass);

// IntersectionObserver for fade-in
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.12});

document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));
document.querySelectorAll('.card, .education-item, .project-item, .award-item, .hero-title').forEach(el=>{
  if(!el.classList.contains('fade-in')) el.classList.add('fade-in'), io.observe(el);
});
