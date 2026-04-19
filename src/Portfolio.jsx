import { useState, useEffect, useRef } from "react";
import myPhoto from "./assets/me.jpeg";
import facebookImg from "./assets/fb.png";
import igImg from "./assets/ig.jpeg";
import linkedinImg from "./assets/linkedin.png";

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
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

  .nav-link {
    text-decoration: none; color: #111111; font-size: .875rem; font-weight: 600;
    letter-spacing: .01em; position: relative; transition: color .2s; cursor: pointer;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -3px; left: 0;
    width: 0; height: 2px; background: #18C566; border-radius: 2px; transition: width .3s;
  }
  .nav-link:hover { color: #18C566; }
  .nav-link:hover::after { width: 100%; }

  .mobile-link {
    text-decoration: none; color: #111111; font-size: 1rem; font-weight: 600;
    padding: 10px 0; border-bottom: 1px solid #e5e7eb; cursor: pointer; transition: color .2s;
  }
  .mobile-link:last-child { border-bottom: none; }
  .mobile-link:hover { color: #18C566; }

  .port-card { position: relative; overflow: hidden; }
  .port-overlay {
    position: absolute; inset: 0; background: rgba(0,0,0,.52); display: flex;
    align-items: center; justify-content: center; opacity: 0; transition: opacity .25s;
    color: white; font-size: .88rem; font-weight: 700; letter-spacing: .04em; gap: 6px;
  }
  .port-card:hover .port-overlay { opacity: 1; }
  .port-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,.13) !important; }

  .skill-card { transition: all .25s; }
  .skill-card:hover { border-color: #18C566 !important; box-shadow: 0 8px 24px rgba(24,197,102,.12); transform: translateY(-3px); }

  .review-card { transition: all .25s; }
  .review-card:hover { border-color: #18C566 !important; box-shadow: 0 8px 24px rgba(24,197,102,.09); }

  .exp-card { transition: all .25s; }
  .exp-card:hover { border-color: #18C566 !important; box-shadow: 0 8px 28px rgba(24,197,102,.1); transform: translateY(-2px); }

  .social-icon { transition: transform .2s, background .2s; }
  .social-icon:hover { transform: scale(1.12); background: #0ea855 !important; }

  .btn-primary { transition: all .25s; }
  .btn-primary:hover { background: #0ea855 !important; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(24,197,102,.32); }

  .btn-ghost:hover { color: #18C566 !important; }
  .btn-cv:hover { background: #111111 !important; color: white !important; }

  .fade-el { opacity: 0; transform: translateY(24px); transition: opacity .65s ease, transform .65s ease; }
  .fade-el.visible { opacity: 1; transform: translateY(0); }

  .contact-input:focus { border-color: #18C566 !important; outline: none; }

  .footer-social { transition: transform .2s, background .2s; }
  .footer-social:hover { transform: scale(1.1); background: #0ea855 !important; }

  .timeline-track { position: absolute; left: 19px; top: 52px; bottom: 0; width: 2px; background: #e5e7eb; }

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
    .exp-grid { grid-template-columns: 1fr !important; }
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
    .edu-grid { flex-direction: column !important; }
  }
`;

// ── ICONS ─────────────────────────────────────────────────────────────────────
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
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}s`;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function useCounter(target) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let cur = 0;
          const step = Math.ceil(target / 45);
          const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            setCount(cur);
            if (cur >= target) clearInterval(t);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return { ref, count };
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 64,
    behavior: "smooth",
  });
}

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function FadeEl({ children, style, delay = 0 }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="fade-el" style={style}>
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
        marginBottom: 14,
        letterSpacing: ".08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, style }) {
  return (
    <h2
      style={{
        fontSize: "clamp(1.9rem,3vw,2.5rem)",
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: "-.03em",
        marginBottom: 14,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function BtnPrimary({ children, onClick, style }) {
  return (
    <button
      className="btn-primary"
      onClick={onClick}
      style={{
        background: "#18C566",
        color: "#fff",
        border: "none",
        fontFamily: "'Manrope',sans-serif",
        fontWeight: 700,
        fontSize: ".875rem",
        letterSpacing: ".02em",
        padding: "13px 28px",
        borderRadius: 10,
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function StatItem({ target, suffix, label, isLast }) {
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
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: "3rem",
          fontWeight: 800,
          color: "#18C566",
          lineHeight: 1,
          letterSpacing: "-.04em",
          marginBottom: 8,
        }}
      >
        {count}
        {suffix}
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

// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About", id: "home" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Testimonial", id: "testimonial" },
];

const STATS = [
  { target: 6, suffix: "+", label: "Years experience" },
  { target: 100, suffix: "k+", label: "App users served" },
  { target: 3, suffix: "", label: "Companies worked" },
];

const EXPERIENCE = [
  {
    company: "Prince Bank Plc.",
    logo: "🏦",
    color: "#e8faf0",
    total: "3 yrs 6 mos",
    location: "Phnom Penh, Cambodia",
    roles: [
      {
        title: "Android Development Engineer",
        period: "Feb 2024 – Jan 2026",
        duration: "2 years",
        points: [
          "Led Android & Flutter app development for Prince Bank's mobile banking platform",
          "Implemented CI/CD pipelines with multi-flavor builds (SIT/UAT/PRE/PRO)",
          "Delivered pixel-perfect UI using Jetpack Compose and Flutter",
          "Collaborated closely with PMs, designers, and QA to ship new features",
        ],
      },
      {
        title: "Assistant Manager, Android Development",
        period: "Aug 2022 – Feb 2024",
        duration: "1 yr 7 mos",
        points: [
          "Managed the Android development team and mentored junior developers",
          "Drove architectural decisions: MVVM, Hilt DI, Clean Architecture",
          "Coordinated release cycles and Play Store deployments",
        ],
      },
    ],
  },
  {
    company: "UDAYA Technology Co., Ltd.",
    logo: "🚀",
    color: "#eff6ff",
    total: "3 years",
    location: "Toul Kork, Phnom Penh",
    roles: [
      {
        title: "Senior Android Developer",
        period: "Mar 2021 – Nov 2022",
        duration: "1 yr 9 mos",
        points: [
          "Launched Terminal Booking Ticket app from scratch",
          "Maintained Logistics Internal Operation App — 25k+ daily transactions",
          "Refactored codebase from monolithic to multi-module architecture",
          "Led and mentored the Android team; managed Play Store rotation releases",
        ],
      },
      {
        title: "Android Developer",
        period: "Feb 2020 – Mar 2021",
        duration: "1 yr 2 mos",
        points: [
          "Launched Logistics Public App with 100k+ users from scratch",
          "Built Vehicle Tracking App from scratch",
          "Developed new features improving UX across Logistics apps",
        ],
      },
      {
        title: "Android Developer Intern",
        period: "Dec 2019 – Feb 2020",
        duration: "3 months",
        points: [
          "Contributed to feature development and bug fixes under senior guidance",
          "Gained hands-on experience with Android SDK and team Git workflows",
        ],
      },
    ],
  },
];

const EDUCATION = [
  {
    degree: "Master's Degree — Computer Science",
    school: "University of Puthisastra",
    period: "Sep 2023",
    icon: "🎓",
    color: "#e8faf0",
  },
  {
    degree: "Bachelor — Management Information System",
    school: "University of Puthisastra",
    period: "Dec 2017 – Feb 2022",
    icon: "📚",
    color: "#eff6ff",
  },
  {
    degree: "General Education",
    school: "Beltei International School",
    period: "Jan 2012 – Feb 2016",
    icon: "🏫",
    color: "#fef3c7",
  },
];

const SKILLS = [
  {
    icon: "📱",
    title: "Flutter Development",
    desc: "Cross-platform apps with beautiful UI, smooth animations, and native performance on iOS & Android.",
  },
  {
    icon: "🤖",
    title: "Android (Kotlin/Java)",
    desc: "Native Android with Jetpack Compose, MVVM, Hilt DI, Room DB, and multi-module architecture.",
  },
  {
    icon: "🏗️",
    title: "Clean Architecture",
    desc: "Scalable, testable codebases — layered architecture, DI, and strict separation of concerns.",
  },
  {
    icon: "⚙️",
    title: "CI/CD & DevOps",
    desc: "GitHub Actions pipelines, automated testing, app flavors (SIT/UAT/PRE/PRO), Play Store releases.",
  },
  {
    icon: "👥",
    title: "Team Leadership",
    desc: "Led & mentored Android teams, coordinated with PMs, designers, and QA across full delivery cycles.",
  },
  {
    icon: "📊",
    title: "Data Analytics",
    desc: "Exploring data analytics to build smarter, data-driven mobile products and business solutions.",
  },
];

const PROJECTS = [
  {
    emoji: "🚛",
    title: "Logistics App (100k+)",
    desc: "Public logistics app built from scratch at UDAYA — scaled to over 100k users",
    tag: "Android · Logistics",
    bg: "linear-gradient(135deg,#4facfe,#00f2fe)",
    delay: 0,
  },
  {
    emoji: "🏦",
    title: "Prince Bank App",
    desc: "Flutter & Android banking app with multi-flavor CI/CD builds across SIT/UAT/PRE/PRO",
    tag: "Flutter · FinTech",
    bg: "linear-gradient(135deg,#fa709a,#fee140)",
    delay: 0.08,
  },
  {
    emoji: "🚌",
    title: "Terminal Booking Ticket",
    desc: "Full passenger booking app launched from scratch — managing tickets and routes",
    tag: "Android · Travel",
    bg: "linear-gradient(135deg,#f093fb,#f5576c)",
    delay: 0.16,
  },
  {
    emoji: "💳",
    title: "SplitEase",
    desc: "Bill-splitting React app with multi-step UI, contacts picker & debt simplification algo",
    tag: "React · Finance",
    bg: "linear-gradient(135deg,#667eea,#764ba2)",
    delay: 0.04,
  },
  {
    emoji: "🧺",
    title: "WashGoKH",
    desc: "Laundry booking app for Phnom Penh with map-based shop discovery & rider/customer roles",
    tag: "React · O2O",
    bg: "linear-gradient(135deg,#11998e,#38ef7d)",
    delay: 0.12,
  },
  {
    emoji: "🏠",
    title: "KhnaetRoom",
    desc: "TikTok-style room rental app for Cambodia with Firebase and swipe-based discovery",
    tag: "React · PropTech",
    bg: "linear-gradient(135deg,#a8edea,#fed6e3)",
    delay: 0.2,
  },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Daro delivered our Flutter app on time with outstanding UI quality. His knowledge of clean architecture made the codebase maintainable and easy to extend.",
    name: "Sopheak Meng",
    role: "Product Manager · Prince Bank",
    avatar: "S",
    delay: 0.08,
  },
  {
    stars: 5,
    text: "Working with Daro was excellent — he understood requirements quickly and created app experiences perfectly tailored to Cambodian users. Highly recommended!",
    name: "Ratanak Pich",
    role: "CTO · Startup Phnom Penh",
    avatar: "R",
    delay: 0.14,
  },
  {
    stars: 5,
    text: "Daro's 100k+ user logistics app is still running strong years later. His clean architecture decisions made maintenance a breeze. A true senior engineer.",
    name: "Visal Chan",
    role: "Tech Lead · UDAYA Technology",
    avatar: "V",
    delay: 0.2,
  },
];

// ── EXPERIENCE CARD (expandable timeline) ────────────────────────────────────
function ExperienceCard({ exp }) {
  const [expanded, setExpanded] = useState(0);
  const G = "#18C566";
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          marginBottom: 22,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: exp.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            flexShrink: 0,
          }}
        >
          {exp.logo}
        </div>
        <div>
          <h3
            style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontSize: "1.05rem",
              fontWeight: 800,
              letterSpacing: "-.02em",
              marginBottom: 3,
            }}
          >
            {exp.company}
          </h3>
          <div
            style={{ fontSize: ".78rem", color: "#6b7280", fontWeight: 500 }}
          >
            {exp.location} ·{" "}
            <span style={{ color: G, fontWeight: 700 }}>{exp.total}</span>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", paddingLeft: 38 }}>
        <div className="timeline-track" />
        {exp.roles.map((role, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              marginBottom: i < exp.roles.length - 1 ? 18 : 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -26,
                top: 5,
                width: 10,
                height: 10,
                borderRadius: "50%",
                zIndex: 1,
                background: expanded === i ? G : "#e5e7eb",
                border: `2px solid ${expanded === i ? G : "#d1d5db"}`,
                transition: "all .2s",
              }}
            />

            <div
              onClick={() => setExpanded(expanded === i ? -1 : i)}
              style={{ cursor: "pointer", marginBottom: 6 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: ".92rem",
                    letterSpacing: "-.01em",
                    color: "#111",
                  }}
                >
                  {role.title}
                </div>
                <span
                  style={{
                    fontSize: ".68rem",
                    color: expanded === i ? G : "#9ca3af",
                    fontWeight: 700,
                    flexShrink: 0,
                    transition: "color .2s",
                  }}
                >
                  {expanded === i ? "▲" : "▼"}
                </span>
              </div>
              <div
                style={{
                  fontSize: ".75rem",
                  color: "#6b7280",
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                {role.period} ·{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  {role.duration}
                </span>
              </div>
            </div>

            {expanded === i && (
              <ul
                style={{
                  paddingLeft: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  marginBottom: 4,
                }}
              >
                {role.points.map((pt, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: ".83rem",
                      color: "#6b7280",
                      lineHeight: 1.65,
                    }}
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
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

  const G = "#18C566";
  const GRAY = "#6b7280";
  const BORDER = "#e5e7eb";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
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
      <style>{globalStyles}</style>

      {/* ═══════════════════════ NAVBAR ═══════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${BORDER}`,
          padding: "0 5%",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.06)" : "none",
          transition: "box-shadow .3s",
        }}
      >
        <button
          onClick={() => handleNav("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 800,
            fontSize: "1.15rem",
            color: "#111",
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "-.02em",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: G,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: ".82rem",
              fontWeight: 800,
            }}
          >
            HD
          </div>
          Hang Daro
        </button>

        <ul
          className="nav-links-wrap"
          style={{ display: "flex", gap: 28, listStyle: "none" }}
        >
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <span className="nav-link" onClick={() => handleNav(l.id)}>
                {l.label}
              </span>
            </li>
          ))}
        </ul>

        <a
          className="btn-cv btn-cv-wrap"
          href="mailto:darohang009988@gmail.com"
          style={{
            background: "transparent",
            border: `1.5px solid #111`,
            color: "#111",
            fontFamily: "'Manrope',sans-serif",
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
          Hire Me
        </a>

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
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "#111",
                borderRadius: 2,
                transition: "all .3s",
                transform: menuOpen
                  ? i === 0
                    ? "translateY(7px) rotate(45deg)"
                    : i === 2
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            background: "white",
            borderBottom: `1px solid ${BORDER}`,
            padding: "20px 5%",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
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

      {/* ═══════════════════════ HERO ═════════════════════════════ */}
      <section
        id="home"
        style={{
          padding: "140px 5% 100px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[
          { s: 10, c: "#3b82f6", t: "18%", l: "8%", o: 0.65 },
          { s: 7, c: "#ef4444", t: "30%", l: "14%", o: 0.5 },
          { s: 8, c: G, t: "23%", l: "24%", o: 0.45 },
          { s: 6, c: "#f59e0b", t: "13%", l: "39%", o: 0.55 },
          { s: 9, c: "#3b82f6", t: "10%", l: "47%", o: 0.45 },
          { s: 6, c: "#ef4444", t: "65%", l: "6%", o: 0.45 },
          { s: 8, c: G, t: "72%", l: "21%", o: 0.35 },
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
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: `1.5px solid ${G}`,
                color: G,
                borderRadius: 999,
                padding: "4px 14px",
                fontSize: ".72rem",
                fontWeight: 700,
                marginBottom: 18,
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              Android & Flutter Engineer 🇰🇭
            </div>

            <h1
              style={{
                fontSize: "clamp(2.3rem,4.5vw,3.5rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-.03em",
                marginBottom: 18,
              }}
            >
              Hi, I'm <span style={{ color: G }}>Hang Daro</span>
              <br />
              Mobile <span style={{ color: G }}>Developer</span>
            </h1>

            <p
              style={{
                color: GRAY,
                fontSize: "1rem",
                lineHeight: 1.78,
                maxWidth: 440,
                marginBottom: 14,
                fontWeight: 400,
              }}
            >
              Android Development Engineer at{" "}
              <strong style={{ color: "#111", fontWeight: 700 }}>
                Prince Bank
              </strong>{" "}
              with{" "}
              <strong style={{ color: "#111", fontWeight: 700 }}>
                6+ years
              </strong>{" "}
              building production mobile apps. Shipped apps used by{" "}
              <strong style={{ color: "#111", fontWeight: 700 }}>
                100k+ users
              </strong>
              , led engineering teams, and specialize in Flutter, Kotlin, and
              clean architecture.
            </p>

            <div
              style={{
                display: "flex",
                gap: 7,
                flexWrap: "wrap",
                marginBottom: 28,
              }}
            >
              {[
                "Flutter",
                "Kotlin",
                "Jetpack Compose",
                "MVVM",
                "CI/CD",
                "Clean Arch",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    fontSize: ".72rem",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 6,
                    letterSpacing: ".02em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <BtnPrimary onClick={() => handleNav("contact")}>
                Contact Me
              </BtnPrimary>
              <span
                className="btn-ghost"
                onClick={() => handleNav("portfolio")}
                style={{
                  color: "#111",
                  fontWeight: 700,
                  fontSize: ".875rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                View Portfolio ↗
              </span>
            </div>
          </FadeEl>

          {/* Right — photo frame */}
          <FadeEl
            delay={0.15}
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "relative", width: 340, height: 390 }}>
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  right: 0,
                  width: 290,
                  height: 320,
                  background: G,
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
                  border: "2.5px solid #111",
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
                }}
              >
                {
                  <img
                    src={myPhoto}
                    alt="Hang Daro"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />
                }
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  style={{ opacity: 0.45 }}
                >
                  <circle cx="40" cy="28" r="18" fill={G} />
                  <path
                    d="M10 72c0-16.569 13.431-30 30-30s30 13.431 30 30"
                    fill={G}
                  />
                </svg>
              </div>

              {/* Status chip */}
              <div
                style={{
                  position: "absolute",
                  bottom: -14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "white",
                  borderRadius: 10,
                  padding: "9px 18px",
                  boxShadow: "0 8px 24px rgba(0,0,0,.1)",
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 0 3px rgba(34,197,94,.2)",
                  }}
                />
                <span
                  style={{ fontSize: ".78rem", fontWeight: 700, color: "#111" }}
                >
                  Open to opportunities
                </span>
              </div>
            </div>

            {/* Social sidebar — FIXED: destructure Icon correctly */}
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
                  color: GRAY,
                  letterSpacing: ".12em",
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                Follow me on:
              </span>
              {/* <div style={{ width: 1, height: 40, background: BORDER }} /> */}
              {[
                {
                  img: linkedinImg,
                  href: "https://www.linkedin.com/in/hangdaro-9386b01b5",
                  alt: "LinkedIn",
                },
                { img: facebookImg, href: "#", alt: "Facebook" },
                { img: igImg, href: "#", alt: "Instagram" },
              ].map(({ img, href, alt }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                  style={{
                    width: 36,
                    height: 36,
                    // background: G,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    overflow: "hidden",
                    padding: 6,
                  }}
                >
                  <img
                    src={img}
                    alt={alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      // filter: "brightness(0) invert(1)",
                    }}
                  />
                </a>
              ))}
            </div>
          </FadeEl>
        </div>
      </section>

      {/* ═══════════════════════ STATS ════════════════════════════ */}
      <div
        style={{
          background: "white",
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
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
              suffix={s.suffix}
              label={s.label}
              isLast={i === STATS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* ═══════════════════════ EXPERIENCE ══════════════════════ */}
      <section
        id="experience"
        style={{
          padding: "100px 5%",
          background: "#f9fafb",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeEl>
            <SectionBadge>Experience</SectionBadge>
            <SectionTitle>
              Where I've <span style={{ color: G }}>Worked</span>
            </SectionTitle>
            <p
              style={{
                color: GRAY,
                fontSize: "1rem",
                lineHeight: 1.75,
                maxWidth: 520,
                marginBottom: 52,
              }}
            >
              6+ years across fintech and logistics — from intern to engineering
              lead — shipping apps that serve hundreds of thousands of real
              users.
            </p>
          </FadeEl>

          <div
            className="exp-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 28,
              marginBottom: 52,
            }}
          >
            {EXPERIENCE.map((exp, i) => (
              <FadeEl key={i} delay={i * 0.1}>
                <div
                  className="exp-card"
                  style={{
                    background: "white",
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: 20,
                    padding: 28,
                  }}
                >
                  <ExperienceCard exp={exp} />
                </div>
              </FadeEl>
            ))}
          </div>

          {/* Education */}
          <FadeEl delay={0.15}>
            <SectionBadge>Education</SectionBadge>
          </FadeEl>
          <FadeEl delay={0.2}>
            <div
              className="edu-grid"
              style={{
                display: "flex",
                gap: 18,
                flexWrap: "wrap",
                marginTop: 16,
              }}
            >
              {EDUCATION.map((ed, i) => (
                <div
                  key={i}
                  style={{
                    flex: "1 1 220px",
                    background: "white",
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: 16,
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    transition: "all .25s",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      background: ed.color,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      flexShrink: 0,
                    }}
                  >
                    {ed.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: ".85rem",
                        letterSpacing: "-.01em",
                        marginBottom: 3,
                      }}
                    >
                      {ed.degree}
                    </div>
                    <div
                      style={{
                        fontSize: ".76rem",
                        color: G,
                        fontWeight: 700,
                        marginBottom: 2,
                      }}
                    >
                      {ed.school}
                    </div>
                    <div
                      style={{
                        fontSize: ".73rem",
                        color: GRAY,
                        fontWeight: 500,
                      }}
                    >
                      {ed.period}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeEl>
        </div>
      </section>

      {/* ═══════════════════════ SKILLS ══════════════════════════ */}
      <section
        id="skills"
        style={{
          padding: "100px 5%",
          background: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
                background: i % 2 === 0 ? G : "#ef4444",
                opacity: 0.28,
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
            <SectionTitle>
              Why Hire Me For Your
              <br />
              Next <span style={{ color: G }}>Project?</span>
            </SectionTitle>
            <p
              style={{
                color: GRAY,
                lineHeight: 1.78,
                marginBottom: 28,
                fontSize: "1rem",
              }}
            >
              Specialist in Flutter & Native Android with a track record of
              shipping apps at scale. I bring deep technical knowledge, team
              leadership, and a passion for beautiful, performant mobile
              products.
            </p>
            <BtnPrimary onClick={() => handleNav("contact")}>
              Hire Me
            </BtnPrimary>
          </FadeEl>

          <div
            className="skills-inner-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
          >
            {SKILLS.map((s, i) => (
              <FadeEl key={i} delay={0.06 + i * 0.05}>
                <div
                  className="skill-card"
                  style={{
                    padding: 22,
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: 16,
                    background: "white",
                    height: "100%",
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
                      fontSize: ".93rem",
                      fontWeight: 700,
                      letterSpacing: "-.01em",
                      marginBottom: 6,
                    }}
                  >
                    {s.title}
                  </h4>
                  <p
                    style={{
                      color: GRAY,
                      fontSize: ".82rem",
                      lineHeight: 1.65,
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

      {/* ═══════════════════════ PORTFOLIO ════════════════════════ */}
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
                <SectionTitle>
                  My Creative Works
                  <br />
                  Latest <span style={{ color: G }}>Projects</span>
                </SectionTitle>
                <p
                  style={{
                    color: GRAY,
                    fontSize: ".95rem",
                    maxWidth: 340,
                    marginTop: 4,
                  }}
                >
                  Production apps and side projects — built for real users.
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
              <FadeEl key={i} delay={p.delay}>
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
                      height: 190,
                      background: p.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.8rem",
                      position: "relative",
                    }}
                  >
                    {p.emoji}
                    <div className="port-overlay">↗ View Project</div>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <h4
                      style={{
                        fontFamily: "'Bricolage Grotesque',sans-serif",
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
                        color: GRAY,
                        lineHeight: 1.6,
                      }}
                    >
                      {p.desc}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#e8faf0",
                        color: G,
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

      {/* ═══════════════════════ TESTIMONIALS ═════════════════════ */}
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
            <SectionTitle>
              What Clients Say <span style={{ color: G }}>About Me</span>
            </SectionTitle>
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
              <FadeEl key={i} delay={r.delay}>
                <div
                  className="review-card"
                  style={{
                    padding: 28,
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: 16,
                    height: "100%",
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
                      color: GRAY,
                      lineHeight: 1.78,
                      marginBottom: 20,
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
                        color: G,
                        flexShrink: 0,
                      }}
                    >
                      {r.avatar}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Bricolage Grotesque',sans-serif",
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
                          color: GRAY,
                          fontWeight: 500,
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

      {/* ═══════════════════════ CONTACT ══════════════════════════ */}
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
          <FadeEl delay={0.05}>
            <h2
              style={{
                fontSize: "clamp(1.9rem,3vw,2.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-.03em",
                marginBottom: 12,
              }}
            >
              Let's Discuss Your <span style={{ color: G }}>Project</span>
            </h2>
          </FadeEl>
          <FadeEl delay={0.1}>
            <p
              style={{
                color: GRAY,
                fontSize: "1rem",
                lineHeight: 1.75,
                maxWidth: 500,
                margin: "0 auto 56px",
              }}
            >
              Have a project in mind or want to discuss opportunities?
              <br />
              I'd love to hear from you.
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
              style={{ display: "flex", flexDirection: "column", gap: 22 }}
            >
              {[
                {
                  icon: "📞",
                  label: "Call me",
                  value: "+855 XX XXX XXXX",
                  link: null,
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "darohang009988@gmail.com",
                  link: "mailto:darohang009988@gmail.com",
                },
                {
                  icon: "💼",
                  label: "LinkedIn",
                  value: "linkedin.com/in/hangdaro",
                  link: "https://www.linkedin.com/in/hangdaro-9386b01b5",
                },
                {
                  icon: "📍",
                  label: "Location",
                  value: "Tuol Kouk, Phnom Penh 🇰🇭",
                  link: null,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      background: G,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: ".7rem",
                        color: GRAY,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                        marginBottom: 3,
                      }}
                    >
                      {item.label}
                    </div>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontWeight: 600,
                          fontSize: ".87rem",
                          color: G,
                          textDecoration: "none",
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div style={{ fontWeight: 600, fontSize: ".87rem" }}>
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </FadeEl>

            {/* Form */}
            <FadeEl delay={0.1}>
              <div
                className="contact-form-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {[
                  { k: "name", ph: "Full name", t: "text" },
                  { k: "email", ph: "Your email", t: "email" },
                  { k: "phone", ph: "Phone number", t: "tel" },
                  { k: "budget", ph: "Budget", t: "text" },
                ].map((f) => (
                  <input
                    key={f.k}
                    type={f.t}
                    placeholder={f.ph}
                    value={form[f.k]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.k]: e.target.value }))
                    }
                    className="contact-input"
                    style={{
                      padding: "12px 16px",
                      border: `1.5px solid ${BORDER}`,
                      borderRadius: 10,
                      fontFamily: "'Manrope',sans-serif",
                      fontSize: ".9rem",
                      fontWeight: 500,
                      color: "#111",
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
                    padding: "12px 16px",
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: 10,
                    fontFamily: "'Manrope',sans-serif",
                    fontSize: ".9rem",
                    fontWeight: 500,
                    color: "#111",
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
                        color: G,
                        border: `1.5px solid ${G}`,
                        borderRadius: 10,
                        padding: "12px 28px",
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

      {/* ═══════════════════════ FOOTER ═══════════════════════════ */}
      <footer
        style={{
          background: "white",
          borderTop: `1px solid ${BORDER}`,
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
          <span style={{ fontSize: ".82rem", color: GRAY, fontWeight: 500 }}>
            © 2025 Hang Daro. All Rights Reserved
          </span>
          <span style={{ fontSize: ".82rem", color: GRAY, fontWeight: 500 }}>
            Phnom Penh, Cambodia 🇰🇭
          </span>
          {/* FIXED: destructure Icon correctly */}
          <div style={{ display: "flex", gap: 10 }}>
            {[
              {
                Icon: LinkedInIcon,
                href: "https://www.linkedin.com/in/hangdaro-9386b01b5",
              },
              { Icon: MailIcon, href: "mailto:darohang009988@gmail.com" },
              { Icon: GithubIcon, href: "#" },
              { Icon: InstagramIcon, href: "#" },
            ].map(({ href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="footer-social"
                style={{
                  width: 36,
                  height: 36,
                  background: G,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                {/* <Icon /> */}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
