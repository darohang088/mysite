import { useState, useEffect, useRef } from "react";

// ── STYLES ──────────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Manrope:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'Manrope', sans-serif;
    color: #111111;
    background: #ffffff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    font-feature-settings: "kern" 1, "liga" 1;
  }

  h1,h2,h3,h4 { font-family: 'Bricolage Grotesque', sans-serif; }

  /* Nav underline animation */
  .nav-link {
    text-decoration: none;
    color: #111111;
    font-size: .875rem;
    font-weight: 600;
    letter-spacing: .01em;
    position: relative;
    transition: color .2s;
    cursor: pointer;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 2px;
    background: #18C566;
    border-radius: 2px;
    transition: width .3s;
  }
  .nav-link:hover { color: #18C566; }
  .nav-link:hover::after { width: 100%; }

  /* Mobile menu link */
  .mobile-link {
    text-decoration: none;
    color: #111111;
    font-size: 1rem;
    font-weight: 600;
    padding: 10px 0;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
    transition: color .2s;
  }
  .mobile-link:last-child { border-bottom: none; }
  .mobile-link:hover { color: #18C566; }

  /* Portfolio overlay */
  .port-card { position: relative; overflow: hidden; }
  .port-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,.52);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .25s;
    color: white;
    font-size: .88rem;
    font-weight: 700;
    letter-spacing: .04em;
    gap: 6px;
  }
  .port-card:hover .port-overlay { opacity: 1; }
  .port-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,.13) !important; }

  /* Skill card hover */
  .skill-card { transition: all .25s; }
  .skill-card:hover {
    border-color: #18C566 !important;
    box-shadow: 0 8px 24px rgba(24,197,102,.12);
    transform: translateY(-3px);
  }

  /* Review card hover */
  .review-card { transition: all .25s; }
  .review-card:hover {
    border-color: #18C566 !important;
    box-shadow: 0 8px 24px rgba(24,197,102,.09);
  }

  /* Social icon */
  .social-icon { transition: transform .2s, background .2s; }
  .social-icon:hover { transform: scale(1.12); background: #0ea855 !important; }

  /* Btn primary hover */
  .btn-primary { transition: all .25s; }
  .btn-primary:hover {
    background: #0ea855 !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(24,197,102,.32);
  }

  /* Btn ghost hover */
  .btn-ghost:hover { color: #18C566 !important; }

  /* Btn CV hover */
  .btn-cv:hover { background: #111111 !important; color: white !important; }

  /* Hamburger lines open state */
  .ham-line { transition: all .3s; }

  /* Fade-in */
  .fade-el {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .65s ease, transform .65s ease;
  }
  .fade-el.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Input focus */
  .contact-input:focus { border-color: #18C566 !important; outline: none; }

  /* Footer social */
  .footer-social { transition: transform .2s, background .2s; }
  .footer-social:hover { transform: scale(1.1); background: #0ea855 !important; }

  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr !important; }
    .skills-grid-outer { grid-template-columns: 1fr !important; gap: 40px !important; }
    .portfolio-grid { grid-template-columns: 1fr 1fr !important; }
    .reviews-grid { grid-template-columns: 1fr 1fr !important; }
    .contact-body { grid-template-columns: 1fr !important; gap: 40px !important; }
    .stats-grid { grid-template-columns: repeat(3,1fr) !important; }
    .social-sidebar { display: none !important; }
    .nav-links-wrap { display: none !important; }
    .btn-cv-wrap { display: none !important; }
    .hamburger-wrap { display: flex !important; }
  }

  @media (max-width: 640px) {
    .portfolio-grid { grid-template-columns: 1fr !important; }
    .reviews-grid { grid-template-columns: 1fr !important; }
    .skills-inner-grid { grid-template-columns: 1fr !important; }
    .stats-grid { grid-template-columns: 1fr !important; }
    .stat-item { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; padding: 16px 0 !important; }
    .stat-item:last-child { border-bottom: none !important; }
    .contact-form-grid { grid-template-columns: 1fr !important; }
    .portfolio-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
    .footer-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; }
  }
`;

// ── SVG ICONS ────────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

// ── FADE-IN HOOK ─────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── COUNTER HOOK ─────────────────────────────────────────────────────────────
function useCounter(target) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(current);
            if (current >= target) clearInterval(timer);
          }, 35);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return { ref, count };
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Testimonial", id: "testimonial" },
];

const SKILLS = [
  {
    icon: "📱",
    title: "Flutter Development",
    desc: "Cross-platform apps with beautiful UI, animations, and native performance on iOS & Android.",
  },
  {
    icon: "🤖",
    title: "Android (Kotlin)",
    desc: "Native Android with Jetpack Compose, MVVM, Hilt DI, Room, and modern build variants.",
  },
  {
    icon: "🏗️",
    title: "Clean Architecture",
    desc: "Scalable codebases with layered architecture, dependency injection, and testable code.",
  },
  {
    icon: "⚙️",
    title: "CI/CD & DevOps",
    desc: "GitHub Actions pipelines, automated testing, app flavors (SIT/UAT/PRE/PRO environments).",
  },
];

const PROJECTS = [
  {
    emoji: "💳",
    title: "SplitEase",
    desc: "Bill-splitting app with multi-step UI, contacts & debt simplification",
    tag: "React · Finance",
    bg: "linear-gradient(135deg,#667eea,#764ba2)",
    delay: 0,
  },
  {
    emoji: "🧺",
    title: "WashGoKH",
    desc: "Laundry booking app for Phnom Penh with map-based shop discovery",
    tag: "React · O2O",
    bg: "linear-gradient(135deg,#11998e,#38ef7d)",
    delay: 0.1,
  },
  {
    emoji: "🏠",
    title: "KhnaetRoom",
    desc: "TikTok-style room rental app for Cambodia with Firebase integration",
    tag: "React · PropTech",
    bg: "linear-gradient(135deg,#f093fb,#f5576c)",
    delay: 0.2,
  },
  {
    emoji: "🏦",
    title: "Prince Bank App",
    desc: "Flutter banking application with multi-flavor builds & CI/CD pipeline",
    tag: "Flutter · FinTech",
    bg: "linear-gradient(135deg,#4facfe,#00f2fe)",
    delay: 0.05,
  },
  {
    emoji: "💌",
    title: "Bong/P'oun",
    desc: "Dating app prototype with swipe mechanics & Khmer UI elements",
    tag: "React · Social",
    bg: "linear-gradient(135deg,#fa709a,#fee140)",
    delay: 0.15,
  },
  {
    emoji: "🏢",
    title: "StayEase Pro",
    desc: "Building management system with ABA/Wing payments & Khmer support",
    tag: "React · PropTech",
    bg: "linear-gradient(135deg,#a8edea,#fed6e3)",
    delay: 0.25,
  },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Daro delivered our Flutter app on time with outstanding UI quality. His knowledge of clean architecture made the codebase maintainable and easy to extend.",
    name: "Sopheak Meng",
    role: "Product Manager · Prince Bank",
    avatar: "S",
    delay: 0.1,
  },
  {
    stars: 5,
    text: "Working with Daro was excellent. He understood our requirements quickly and created an app experience perfectly tailored to Cambodian users. Highly recommended!",
    name: "Ratanak Pich",
    role: "CTO · Startup Phnom Penh",
    avatar: "R",
    delay: 0.15,
  },
  {
    stars: 4,
    text: "Daro's mobile expertise saved our team months. His CI/CD setup and multi-flavor Android build system worked flawlessly from day one. Great communicator too.",
    name: "Visal Chan",
    role: "Tech Lead · DGC",
    avatar: "V",
    delay: 0.2,
  },
];

const STATS = [
  { target: 15, label: "Apps delivered" },
  { target: 3, label: "Years experience" },
  { target: 10, label: "Happy clients" },
];

// ── REUSABLE COMPONENTS ───────────────────────────────────────────────────────
function FadeEl({ children, style, className = "" }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-el ${className}`} style={style}>
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1.5px solid #18C566",
        color: "#18C566",
        borderRadius: 999,
        padding: "4px 14px",
        fontSize: ".72rem",
        fontWeight: 700,
        marginBottom: 18,
        letterSpacing: ".08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function SectionBadge({ children }) {
  return (
    <div
      style={{
        display: "inline-flex",
        border: "1.5px solid #18C566",
        color: "#18C566",
        borderRadius: 999,
        padding: "4px 14px",
        fontSize: ".72rem",
        fontWeight: 700,
        marginBottom: 16,
        letterSpacing: ".08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function BtnPrimary({ children, onClick }) {
  return (
    <button
      className="btn-primary"
      onClick={onClick}
      style={{
        background: "#18C566",
        color: "#fff",
        border: "none",
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
        fontSize: ".875rem",
        letterSpacing: ".02em",
        padding: "13px 28px",
        borderRadius: 10,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

// ── STAT ITEM ─────────────────────────────────────────────────────────────────
function StatItem({ target, label, isLast }) {
  const { ref, count } = useCounter(target);
  return (
    <div
      ref={ref}
      className="stat-item"
      style={{
        padding: "0 32px",
        textAlign: "center",
        borderRight: isLast ? "none" : "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "3rem",
          fontWeight: 800,
          color: "#18C566",
          lineHeight: 1,
          letterSpacing: "-.04em",
          marginBottom: 8,
        }}
      >
        {count}+
      </div>
      <div
        style={{
          color: "#6b7280",
          fontSize: ".875rem",
          fontWeight: 500,
          letterSpacing: ".02em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", budget: "", message: "" });
  };

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{globalStyles}</style>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.93)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 5%",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "box-shadow .3s",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.06)" : "none",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: "1.25rem",
            color: "#111111",
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "-.01em",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "#18C566",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: ".9rem",
              fontWeight: 800,
            }}
          >
            HD
          </div>
          Daro
        </button>

        {/* Desktop links */}
        <ul
          className="nav-links-wrap"
          style={{ display: "flex", gap: 36, listStyle: "none" }}
        >
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <span className="nav-link" onClick={() => handleNav(l.id)}>
                {l.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Download CV */}
        <a
          className="btn-cv btn-cv-wrap"
          href="#"
          style={{
            background: "transparent",
            border: "1.5px solid #111111",
            color: "#111111",
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: ".83rem",
            letterSpacing: ".02em",
            padding: "9px 20px",
            borderRadius: 8,
            cursor: "pointer",
            textDecoration: "none",
            transition: "all .25s",
          }}
        >
          Download CV
        </a>

        {/* Hamburger */}
        <button
          className="hamburger-wrap"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            cursor: "pointer",
            padding: 6,
            background: "none",
            border: "none",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="ham-line"
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "#111111",
                borderRadius: 2,
                transform: menuOpen
                  ? i === 0
                    ? "translateY(7px) rotate(45deg)"
                    : i === 1
                    ? "scaleX(0)"
                    : "translateY(-7px) rotate(-45deg)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            background: "white",
            borderBottom: "1px solid #e5e7eb",
            padding: "20px 5%",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            boxShadow: "0 8px 24px rgba(0,0,0,.08)",
          }}
        >
          {[...NAV_LINKS, { label: "Contact", id: "contact" }].map((l) => (
            <span
              key={l.id}
              className="mobile-link"
              onClick={() => handleNav(l.id)}
            >
              {l.label}
            </span>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── HERO ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="home"
        style={{
          paddingTop: 140,
          paddingBottom: 100,
          padding: "140px 5% 100px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating dots */}
        {[
          { s: 10, c: "#3b82f6", t: "18%", l: "8%", o: 0.7 },
          { s: 7, c: "#ef4444", t: "30%", l: "14%", o: 0.6 },
          { s: 8, c: "#18C566", t: "24%", l: "24%", o: 0.5 },
          { s: 6, c: "#f59e0b", t: "14%", l: "38%", o: 0.6 },
          { s: 9, c: "#3b82f6", t: "10%", l: "46%", o: 0.5 },
          { s: 6, c: "#ef4444", t: "65%", l: "6%", o: 0.5 },
          { s: 8, c: "#18C566", t: "72%", l: "20%", o: 0.4 },
          { s: 5, c: "#3b82f6", t: "68%", l: "16%", o: 0.5 },
        ].map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              pointerEvents: "none",
              width: d.s,
              height: d.s,
              background: d.c,
              top: d.t,
              left: d.l,
              opacity: d.o,
            }}
          />
        ))}

        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: 60,
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Left */}
          <FadeEl>
            <Badge>Welcome 👋</Badge>
            <h1
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-.03em",
                marginBottom: 20,
              }}
            >
              I have <span style={{ color: "#18C566" }}>Flutter</span>
              <br />& <span style={{ color: "#18C566" }}>Android</span>{" "}
              Experience
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "1.025rem",
                lineHeight: 1.75,
                maxWidth: 440,
                marginBottom: 32,
                fontWeight: 400,
                letterSpacing: ".005em",
              }}
            >
              I'm Hang Daro, a passionate Mobile Developer specializing in
              Flutter and Android. I build beautiful, performant apps with clean
              architecture — from fintech to everyday consumer products.
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <BtnPrimary onClick={() => handleNav("contact")}>
                Contact Me
              </BtnPrimary>
              <span
                className="btn-ghost"
                onClick={() => handleNav("portfolio")}
                style={{
                  color: "#111111",
                  fontWeight: 700,
                  fontSize: ".875rem",
                  letterSpacing: ".01em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                View Portfolio{" "}
                <span style={{ transition: "transform .2s" }}>↗</span>
              </span>
            </div>
          </FadeEl>

          {/* Right — photo frame */}
          <FadeEl
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              transitionDelay: ".15s",
            }}
          >
            <div style={{ position: "relative", width: 340, height: 380 }}>
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  right: 0,
                  width: 290,
                  height: 320,
                  background: "#18C566",
                  borderRadius: 16,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 290,
                  height: 330,
                  border: "2.5px solid #111111",
                  borderRadius: 16,
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  width: 270,
                  height: 310,
                  borderRadius: 12,
                  background: "linear-gradient(135deg,#e8faf0,#c8f2db)",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* Replace with: <img src="your-photo.jpg" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:12}} /> */}
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  style={{ opacity: 0.4 }}
                >
                  <circle cx="40" cy="28" r="18" fill="#18C566" />
                  <path
                    d="M10 72c0-16.569 13.431-30 30-30s30 13.431 30 30"
                    fill="#18C566"
                  />
                </svg>
              </div>
            </div>

            {/* Social sidebar */}
            <div
              className="social-sidebar"
              style={{
                position: "absolute",
                right: -40,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  writingMode: "vertical-rl",
                  fontSize: ".7rem",
                  color: "#6b7280",
                  letterSpacing: ".12em",
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                Follow me on:
              </span>
              <div style={{ width: 1, height: 40, background: "#e5e7eb" }} />
              {[GithubIcon, LinkedInIcon, InstagramIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="social-icon"
                  style={{
                    width: 32,
                    height: 32,
                    background: "#18C566",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </FadeEl>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── STATS BAR ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          background: "white",
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
          padding: "48px 5%",
        }}
      >
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          {STATS.map((s, i) => (
            <StatItem
              key={i}
              target={s.target}
              label={s.label}
              isLast={i === STATS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── SKILLS ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="skills"
        style={{
          padding: "100px 5%",
          background: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid decoration */}
        <div
          style={{
            position: "absolute",
            right: "2%",
            top: "10%",
            display: "grid",
            gridTemplateColumns: "repeat(5,8px)",
            gap: 6,
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                display: "block",
                background: i % 2 === 0 ? "#18C566" : "#ef4444",
                opacity: 0.35,
              }}
            />
          ))}
        </div>

        <div
          className="skills-grid-outer"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <FadeEl>
            <SectionBadge>My Skills</SectionBadge>
            <h2
              style={{
                fontSize: "clamp(1.9rem,3vw,2.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-.03em",
                marginBottom: 16,
              }}
            >
              Why Hire Me For Your
              <br />
              Next <span style={{ color: "#18C566" }}>Project?</span>
            </h2>
            <p
              style={{
                color: "#6b7280",
                lineHeight: 1.75,
                marginBottom: 28,
                fontSize: "1rem",
                fontWeight: 400,
                letterSpacing: ".005em",
              }}
            >
              I'm a specialist in Flutter & Android development with a passion
              for clean architecture, pixel-perfect UI, and solving real user
              problems through mobile experiences.
            </p>
            <BtnPrimary onClick={() => handleNav("contact")}>
              Hire Me
            </BtnPrimary>
          </FadeEl>

          <div
            className="skills-inner-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            {SKILLS.map((s, i) => (
              <FadeEl key={i} style={{ transitionDelay: `${0.1 + i * 0.05}s` }}>
                <div
                  className="skill-card"
                  style={{
                    padding: 24,
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 16,
                    background: "white",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "#e8faf0",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                      fontSize: "1.2rem",
                    }}
                  >
                    {s.icon}
                  </div>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      letterSpacing: "-.01em",
                      marginBottom: 6,
                    }}
                  >
                    {s.title}
                  </h4>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: ".85rem",
                      lineHeight: 1.65,
                      fontWeight: 400,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </FadeEl>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── PORTFOLIO ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="portfolio"
        style={{
          padding: "100px 5%",
          background: "#f9fafb",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeEl>
            <div
              className="portfolio-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 48,
              }}
            >
              <div>
                <SectionBadge>Portfolio</SectionBadge>
                <h2
                  style={{
                    fontSize: "clamp(1.9rem,3vw,2.5rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-.03em",
                  }}
                >
                  My Creative Works
                  <br />
                  Latest <span style={{ color: "#18C566" }}>Projects</span>
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: ".95rem",
                    marginTop: 8,
                    maxWidth: 340,
                  }}
                >
                  Selected projects built with love for Cambodian users and
                  beyond.
                </p>
              </div>
              <BtnPrimary onClick={() => handleNav("contact")}>
                Show More
              </BtnPrimary>
            </div>
          </FadeEl>

          <div
            className="portfolio-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {PROJECTS.map((p, i) => (
              <FadeEl key={i} style={{ transitionDelay: `${p.delay}s` }}>
                <div
                  className="port-card"
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    background: "white",
                    boxShadow: "0 2px 12px rgba(0,0,0,.06)",
                    transition: "transform .25s, box-shadow .25s",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      height: 200,
                      background: p.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                      position: "relative",
                    }}
                  >
                    {p.emoji}
                    <div className="port-overlay">↗ View Project</div>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <h4
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: ".975rem",
                        fontWeight: 700,
                        letterSpacing: "-.01em",
                        marginBottom: 5,
                      }}
                    >
                      {p.title}
                    </h4>
                    <p
                      style={{
                        fontSize: ".82rem",
                        color: "#6b7280",
                        lineHeight: 1.6,
                      }}
                    >
                      {p.desc}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#e8faf0",
                        color: "#18C566",
                        fontSize: ".72rem",
                        fontWeight: 600,
                        padding: "2px 10px",
                        borderRadius: 999,
                        marginTop: 8,
                      }}
                    >
                      {p.tag}
                    </span>
                  </div>
                </div>
              </FadeEl>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── TESTIMONIALS ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="testimonial"
        style={{
          padding: "100px 5%",
          background: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeEl>
            <SectionBadge>Reviews</SectionBadge>
            <h2
              style={{
                fontSize: "clamp(1.9rem,3vw,2.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-.03em",
              }}
            >
              What Clients Say{" "}
              <span style={{ color: "#18C566" }}>About Me</span>
            </h2>
          </FadeEl>

          <div
            className="reviews-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
              marginTop: 48,
            }}
          >
            {REVIEWS.map((r, i) => (
              <FadeEl key={i} style={{ transitionDelay: `${r.delay}s` }}>
                <div
                  className="review-card"
                  style={{
                    padding: 28,
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 16,
                  }}
                >
                  <div
                    style={{
                      color: "#f59e0b",
                      fontSize: "1rem",
                      marginBottom: 14,
                      letterSpacing: 2,
                    }}
                  >
                    {"★".repeat(r.stars)}
                    {"☆".repeat(5 - r.stars)}
                  </div>
                  <p
                    style={{
                      fontSize: ".9rem",
                      color: "#6b7280",
                      lineHeight: 1.78,
                      marginBottom: 20,
                      fontWeight: 400,
                      letterSpacing: ".005em",
                    }}
                  >
                    {r.text}
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "#e8faf0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#18C566",
                        flexShrink: 0,
                      }}
                    >
                      {r.avatar}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontWeight: 700,
                          fontSize: ".925rem",
                          letterSpacing: "-.01em",
                        }}
                      >
                        {r.name}
                      </div>
                      <div
                        style={{
                          fontSize: ".78rem",
                          color: "#6b7280",
                          fontWeight: 500,
                          letterSpacing: ".02em",
                          marginTop: 2,
                        }}
                      >
                        {r.role}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeEl>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── CONTACT ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        style={{
          padding: "100px 5%",
          background: "#f9fafb",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <FadeEl>
            <SectionBadge>Contact</SectionBadge>
          </FadeEl>
          <FadeEl>
            <h2
              style={{
                fontSize: "clamp(1.9rem,3vw,2.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-.03em",
                marginBottom: 12,
              }}
            >
              Let's Discuss Your{" "}
              <span style={{ color: "#18C566" }}>Project</span>
            </h2>
          </FadeEl>
          <FadeEl>
            <p
              style={{
                color: "#6b7280",
                fontSize: "1rem",
                lineHeight: 1.75,
                marginBottom: 60,
                maxWidth: 500,
                margin: "0 auto 60px",
                fontWeight: 400,
                letterSpacing: ".005em",
              }}
            >
              Let's build something new, different and meaningful — a mobile
              experience your users will love.
            </p>
          </FadeEl>

          <div
            className="contact-body"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap: 60,
              textAlign: "left",
            }}
          >
            {/* Info */}
            <FadeEl
              style={{ display: "flex", flexDirection: "column", gap: 28 }}
            >
              {[
                { icon: "📞", label: "Call me", value: "+855 XX XXX XXXX" },
                { icon: "✉️", label: "Email me", value: "hangdaro@email.com" },
                { icon: "📍", label: "Address", value: "Phnom Penh, Cambodia" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 16 }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "#18C566",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "1.2rem",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: ".7rem",
                        color: "#6b7280",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: ".925rem",
                        letterSpacing: "-.005em",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </FadeEl>

            {/* Form */}
            <FadeEl style={{ transitionDelay: ".1s" }}>
              <div
                className="contact-form-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                {[
                  {
                    key: "name",
                    placeholder: "Full name",
                    type: "text",
                    col: false,
                  },
                  {
                    key: "email",
                    placeholder: "Your email",
                    type: "email",
                    col: false,
                  },
                  {
                    key: "phone",
                    placeholder: "Phone number",
                    type: "tel",
                    col: false,
                  },
                  {
                    key: "budget",
                    placeholder: "Budget",
                    type: "text",
                    col: false,
                  },
                ].map((f) => (
                  <input
                    key={f.key}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                    className="contact-input"
                    style={{
                      padding: "13px 16px",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: 10,
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: ".9rem",
                      fontWeight: 500,
                      color: "#111111",
                      background: "white",
                      width: "100%",
                      letterSpacing: ".01em",
                      transition: "border-color .2s",
                    }}
                  />
                ))}
                <textarea
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="contact-input"
                  style={{
                    gridColumn: "1 / -1",
                    padding: "13px 16px",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 10,
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: ".9rem",
                    fontWeight: 500,
                    color: "#111111",
                    background: "white",
                    width: "100%",
                    height: 120,
                    resize: "none",
                    letterSpacing: ".01em",
                    transition: "border-color .2s",
                  }}
                />
                <div
                  style={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {submitted ? (
                    <div
                      style={{
                        background: "#e8faf0",
                        color: "#18C566",
                        border: "1.5px solid #18C566",
                        borderRadius: 10,
                        padding: "13px 28px",
                        fontWeight: 700,
                        fontSize: ".875rem",
                      }}
                    >
                      Thanks! I'll get back to you soon 🚀
                    </div>
                  ) : (
                    <BtnPrimary onClick={handleSubmit}>
                      Submit Message
                    </BtnPrimary>
                  )}
                </div>
              </div>
            </FadeEl>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── FOOTER ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <footer
        style={{
          background: "white",
          borderTop: "1px solid #e5e7eb",
          padding: "24px 5%",
        }}
      >
        <div
          className="footer-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: ".82rem",
              color: "#6b7280",
              fontWeight: 500,
              letterSpacing: ".01em",
            }}
          >
            © 2025. All Rights Reserved
          </span>
          <span
            style={{
              fontSize: ".82rem",
              color: "#6b7280",
              fontWeight: 500,
              letterSpacing: ".01em",
            }}
          >
            Designed by Hang Daro
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            {[GithubIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="footer-social"
                  style={{
                    width: 36,
                    height: 36,
                    background: "#18C566",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
