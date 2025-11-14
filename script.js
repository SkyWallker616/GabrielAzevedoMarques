/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

/* ============================================================
   DARK MODE (Auto + Toggle + Persistência)
   ============================================================ */
const body = document.body;
const toggleBtn = document.getElementById("darkModeToggle");

// aplica estado salvo
const savedMode = localStorage.getItem("dark-mode");

if (savedMode === "dark") {
    body.classList.add("dark-mode");
} else if (savedMode === "light") {
    body.classList.remove("dark-mode");
} else {
    // primeira visita → seguir sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) body.classList.add("dark-mode");
}

// alterna modo
toggleBtn.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", isDark ? "dark" : "light");
    updateCSSVariables(isDark);
});

// atualiza variáveis CSS
function updateCSSVariables(isDark) {
    const root = document.documentElement;

    if (isDark) {
        root.style.setProperty("--bg", "#0b0f14");
        root.style.setProperty("--text", "#eaeaea");
        root.style.setProperty("--card", "#0f1620");
        root.style.setProperty("--border", "#18202a");
    } else {
        root.style.setProperty("--bg", "#ffffff");
        root.style.setProperty("--text", "#0e1730");
        root.style.setProperty("--card", "#ffffff");
        root.style.setProperty("--border", "#e6eef8");
    }
}

// aplica no carregamento
updateCSSVariables(body.classList.contains("dark-mode"));

/* ============================================================
   ANIMAÇÕES SUAVES (FADE-IN)
   ============================================================ */
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

// aplica animação a tudo que precisa
document.querySelectorAll(
    ".fade-in, .card, .education-item, .project-item, .award-item, .hero-title"
).forEach(el => {
    if (!el.classList.contains("fade-in")) {
        el.classList.add("fade-in");
    }
    observer.observe(el);
});

/* ============================================================
   HEADER FIXO (SUAVE)
   ============================================================ */
let lastScroll = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
    const current = window.pageYOffset;

    if (current > lastScroll && current > 80) {
        header.classList.add("hide-header");
    } else {
        header.classList.remove("hide-header");
    }

    lastScroll = current;
});
