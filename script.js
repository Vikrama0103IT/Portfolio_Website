/* ================================
   LIGHT / DARK THEME TOGGLE
================================ */
const themeToggle = document.getElementById("themeToggle");
const rootEl = document.documentElement;

function applyTheme(theme) {
  if (theme === "dark") {
    rootEl.setAttribute("data-theme", "dark");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    rootEl.removeAttribute("data-theme");
    if (themeToggle) themeToggle.textContent = "🌙";
  }
}

// Load saved preference (defaults to light)
applyTheme(localStorage.getItem("theme") || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = rootEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

/* ================================
   SMOOTH SCROLL + CLOSE MOBILE MENU
================================ */
const navLinksContainer = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");

document.querySelectorAll("nav a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    // close mobile menu after navigating
    navLinksContainer.classList.remove("open");
    hamburger.classList.remove("open");
  });
});

/* ================================
   MOBILE HAMBURGER TOGGLE
================================ */
hamburger.addEventListener("click", () => {
  navLinksContainer.classList.toggle("open");
  hamburger.classList.toggle("open");
});

/* ================================
   NAVBAR ACTIVE LINK ON SCROLL
================================ */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.pageYOffset >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

/* ================================
   FADE-IN ANIMATION ON SCROLL
================================ */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".section").forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});

/* ================================
   ANIMATED STAT COUNTERS
================================ */
function animateCount(el) {
  const target = +el.dataset.target;
  const duration = 1500;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}


const statObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".stat-num").forEach(el => statObserver.observe(el));

/* ================================
   CONTACT FORM → OPENS EMAIL TO ME
================================ */
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const MY_EMAIL = "vikramakumar21@gmail.com";

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      formStatus.style.color = "#f87171";
      formStatus.textContent = "Please fill in all fields.";
      return;
    }

    const subject = `Portfolio contact from ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `${message}`;

    // Open the visitor's email app with a pre-filled message to me.
    window.location.href =
      `mailto:${MY_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    formStatus.style.color = "var(--cyan)";
    formStatus.textContent = "✓ Opening your email app to send the message…";
    form.reset();
    setTimeout(() => (formStatus.textContent = ""), 6000);
  });
}

/* ================================
   SCROLL TO TOP BUTTON
================================ */
const scrollBtn = document.createElement("button");
scrollBtn.innerText = "↑";
scrollBtn.setAttribute("aria-label", "Scroll to top");
Object.assign(scrollBtn.style, {
  position: "fixed",
  bottom: "30px",
  right: "30px",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  opacity: "0",
  pointerEvents: "none",
  background: "linear-gradient(90deg, #7c3aed, #6366f1)",
  color: "#fff",
  fontSize: "20px",
  zIndex: "1000",
  boxShadow: "0 8px 20px rgba(124, 58, 237, 0.4)",
  transition: "opacity 0.3s ease"
});
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  const visible = window.scrollY > 400;
  scrollBtn.style.opacity = visible ? "1" : "0";
  scrollBtn.style.pointerEvents = visible ? "auto" : "none";
});
scrollBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);
