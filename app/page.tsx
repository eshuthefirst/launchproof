"use client";
import { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "home" | "competition" | "faq" | "team" | "contact" | "submission";

// ─── Constants ───────────────────────────────────────────────────────────────
const REGISTER_FORM_LINK = "https://forms.gle/4Lfgx5eu3jpr5Kuy8";
const APPLY_FORM_LINK = "https://forms.gle/Kiu1e5sYChzGToEw5";
const SUBMISSION_FORM_LINK = "https://forms.gle/X5U4EWSTYmmhgxpYA";
const PARTICIPANT_PACKAGE_LINK = "https://docs.google.com/document/d/14oQyERVVNQ22v42mYhibEvQ4vSVvQoZVNB5JAP8MoGU/edit?usp=sharing";

// ─── Styles ──────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #080808;
  --bg2: #0f0f0f;
  --bg3: #141414;
  --border: rgba(255,255,255,0.07);
  --blue: #3B82F6;
  --blue-light: #60A5FA;
  --blue-dim: rgba(59,130,246,0.12);
  --white: #FFFFFF;
  --grey: rgba(255,255,255,0.55);
  --grey-dim: rgba(255,255,255,0.3);
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --radius: 10px;
  --radius-lg: 16px;
  --nav-h: 68px;
  --transition: 0.22s cubic-bezier(.4,0,.2,1);
}

html { scroll-behavior: smooth; overflow-x: hidden; }
body { background: var(--bg); color: var(--white); font-family: var(--font-body); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
::selection { background: rgba(59,130,246,0.35); }

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 99px; }

body::before {
  content: '';
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none; z-index: 9999; opacity: 0.4;
}

@keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
  70% { transform: scale(1); box-shadow: 0 0 0 14px rgba(59,130,246,0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59,130,246,0); }
}
@keyframes pkg-pulse {
  0%,100% { box-shadow: 0 4px 24px rgba(59,130,246,0.2); }
  50% { box-shadow: 0 4px 36px rgba(59,130,246,0.45); }
}

.fade-up { animation: fadeUp 0.6s ease both; }
.fade-up-2 { animation: fadeUp 0.6s 0.12s ease both; }
.fade-up-3 { animation: fadeUp 0.6s 0.24s ease both; }
.fade-up-4 { animation: fadeUp 0.6s 0.36s ease both; }

/* NAV */
nav {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--nav-h); z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(20px,5vw,60px);
  background: rgba(8,8,8,0.88); backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
  transition: var(--transition);
}
.nav-logo { font-family: var(--font-display); font-size: 1.35rem; font-weight: 800; letter-spacing: -0.02em; color: var(--white); cursor: pointer; display: flex; align-items: center; gap: 8px; }
.nav-logo span { color: var(--blue); }
.nav-links { display: flex; align-items: center; gap: 3px; list-style: none; }
.nav-link { padding: 7px 11px; border-radius: 8px; font-size: 0.82rem; font-weight: 500; color: var(--grey); cursor: pointer; transition: color var(--transition), background var(--transition); white-space: nowrap; }
.nav-link:hover, .nav-link.active { color: var(--white); background: rgba(255,255,255,0.06); }
.nav-pkg { padding: 7px 12px; border-radius: 8px; font-size: 0.82rem; font-weight: 700; color: var(--blue-light); cursor: pointer; border: 1px solid rgba(59,130,246,0.4); background: rgba(59,130,246,0.1); white-space: nowrap; transition: all var(--transition); text-decoration: none; display: inline-flex; align-items: center; gap: 5px; }
.nav-pkg:hover { background: rgba(59,130,246,0.2); border-color: rgba(59,130,246,0.7); color: #fff; transform: translateY(-1px); }
.btn-register-nav { padding: 8px 18px; background: var(--blue); color: #fff; border-radius: 8px; font-size: 0.84rem; font-weight: 600; cursor: pointer; border: none; transition: background var(--transition), transform var(--transition), box-shadow var(--transition); text-decoration: none; display: inline-block; }
.btn-register-nav:hover { background: var(--blue-light); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(59,130,246,0.4); }
.hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
.hamburger span { display: block; width: 22px; height: 2px; background: var(--white); border-radius: 2px; transition: var(--transition); }

@media (max-width: 900px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
  .mobile-menu { position: fixed; top: var(--nav-h); left: 0; right: 0; background: rgba(10,10,10,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 16px 20px 24px; z-index: 99; display: flex; flex-direction: column; gap: 4px; }
  .mobile-link { padding: 12px 16px; border-radius: 8px; font-size: 1rem; font-weight: 500; color: var(--grey); cursor: pointer; transition: color var(--transition), background var(--transition); }
  .mobile-link:hover, .mobile-link.active { color: var(--white); background: rgba(255,255,255,0.06); }
  .mobile-pkg { margin-top: 4px; padding: 13px 16px; border-radius: 8px; font-size: 1rem; font-weight: 700; color: var(--blue-light); background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); text-decoration: none; display: block; }
  .mobile-register { margin-top: 8px; padding: 13px 20px; background: var(--blue); color: #fff; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; border: none; text-align: center; }
}

/* LAYOUT */
.page { padding-top: var(--nav-h); min-height: 100vh; overflow-x: hidden; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 clamp(16px,4vw,48px); width: 100%; box-sizing: border-box; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; width: 100%; }
.two-col-left-wide { display: grid; grid-template-columns: 1fr 1.3fr; gap: 48px; align-items: start; width: 100%; }
@media (max-width: 900px) { .two-col, .two-col-left-wide { grid-template-columns: 1fr; gap: 32px; } }

/* HERO */
.hero { min-height: calc(100vh - var(--nav-h)); display: flex; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; padding: 80px clamp(16px,4vw,48px); }
.hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(96,165,250,0.08) 0%, transparent 60%); pointer-events: none; }
.hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%); pointer-events: none; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: var(--blue-dim); border: 1px solid rgba(59,130,246,0.3); border-radius: 99px; font-size: 0.78rem; font-weight: 600; color: var(--blue-light); letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px; }
.hero h1 { font-family: var(--font-display); font-size: clamp(2.4rem, 6vw, 5rem); font-weight: 800; line-height: 1; letter-spacing: -0.04em; margin-bottom: 20px; white-space: nowrap; overflow: hidden; }
.hero h1 .accent { background: linear-gradient(135deg, var(--blue) 0%, var(--blue-light) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-tagline { font-family: var(--font-display); font-size: clamp(1rem, 3vw, 1.5rem); font-weight: 600; color: var(--grey); margin-bottom: 12px; letter-spacing: 0.02em; }
.hero-sub { font-size: clamp(0.9rem, 2vw, 1.05rem); color: var(--grey-dim); max-width: 460px; margin: 0 auto 36px; line-height: 1.6; }

/* PARTICIPANT PACKAGE BANNER */
.pkg-banner {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
  padding: 22px 28px; text-align: center;
  background: linear-gradient(135deg, rgba(59,130,246,0.13) 0%, rgba(96,165,250,0.06) 100%);
  border: 1px solid rgba(59,130,246,0.42); border-radius: var(--radius-lg);
  text-decoration: none; animation: pkg-pulse 3s ease infinite;
  transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
}
.pkg-banner:hover { border-color: rgba(59,130,246,0.75); transform: translateY(-2px); box-shadow: 0 8px 36px rgba(59,130,246,0.3); animation: none; }
.pkg-banner-left { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.pkg-banner-title { font-family: var(--font-display); font-size: 1rem; font-weight: 800; color: var(--white); }
.pkg-banner-sub { font-size: 0.82rem; color: var(--grey); }
.pkg-banner-cta { padding: 9px 28px; background: var(--blue); color: #fff; border-radius: 8px; font-size: 0.875rem; font-weight: 700; transition: background var(--transition); }
.pkg-banner:hover .pkg-banner-cta { background: var(--blue-light); }

/* BUTTONS */
.btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: var(--blue); color: #fff; border-radius: var(--radius); font-size: 1rem; font-weight: 600; cursor: pointer; border: none; transition: background var(--transition), transform var(--transition), box-shadow var(--transition); text-decoration: none; animation: pulse-ring 2.5s ease infinite; }
.btn-primary:hover { background: var(--blue-light); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(59,130,246,0.5); animation: none; }
.btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; background: transparent; color: var(--white); border-radius: var(--radius); font-size: 0.95rem; font-weight: 600; cursor: pointer; border: 1px solid var(--border); transition: all var(--transition); text-decoration: none; }
.btn-outline:hover { border-color: rgba(59,130,246,0.5); background: var(--blue-dim); transform: translateY(-1px); }

/* SECTIONS */
.section { padding: 80px 0; }
.section-sm { padding: 56px 0; }
.section-label { display: inline-flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue); margin-bottom: 12px; }
.section-label::before { content: ''; display: block; width: 20px; height: 2px; background: var(--blue); border-radius: 99px; }
.section-title { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 16px; }
.section-desc { font-size: 1rem; color: var(--grey); max-width: 580px; line-height: 1.7; }

/* CARDS */
.card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px; transition: border-color var(--transition), transform var(--transition); width: 100%; box-sizing: border-box; min-width: 0; }
.card:hover { border-color: rgba(59,130,246,0.3); transform: translateY(-2px); }
.card-title { font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; margin-bottom: 8px; }
.card-desc { font-size: 0.9rem; color: var(--grey); line-height: 1.6; }
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
.grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }

.highlight-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; margin: 48px 0; }
.highlight-item { background: var(--bg2); padding: 28px 24px; text-align: center; }
.highlight-num { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--blue-light); letter-spacing: -0.03em; margin-bottom: 4px; }
.highlight-label { font-size: 0.82rem; color: var(--grey); font-weight: 500; }

.divider { height: 1px; background: var(--border); margin: 0; }

/* PRIZES */
.prize-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 28px 24px; text-align: center; position: relative; overflow: hidden; transition: var(--transition); }
.prize-card:hover { transform: translateY(-3px); border-color: rgba(59,130,246,0.3); }
.prize-card.first { border-color: rgba(59,130,246,0.4); background: linear-gradient(145deg, rgba(59,130,246,0.08) 0%, var(--bg2) 100%); }
.prize-amount { font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--blue-light); letter-spacing: -0.03em; }

/* TIMELINE */
.timeline { position: relative; padding-left: 28px; }
.timeline::before { content: ''; position: absolute; left: 8px; top: 8px; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--blue), transparent); }
.timeline-item { position: relative; margin-bottom: 32px; }
.timeline-dot { position: absolute; left: -24px; top: 4px; width: 14px; height: 14px; background: var(--blue); border-radius: 50%; border: 2px solid var(--bg); box-shadow: 0 0 0 3px rgba(59,130,246,0.3); }
.timeline-date { font-size: 0.78rem; font-weight: 600; color: var(--blue); letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 4px; }
.timeline-title { font-family: var(--font-display); font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
.timeline-desc { font-size: 0.875rem; color: var(--grey); line-height: 1.5; }

/* FAQ */
.faq-item { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 10px; transition: border-color var(--transition); }
.faq-item:hover { border-color: rgba(59,130,246,0.2); }
.faq-question { padding: 18px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: background var(--transition); }
.faq-question:hover { background: rgba(255,255,255,0.03); }
.faq-arrow { transition: transform var(--transition); color: var(--blue); font-size: 1.1rem; }
.faq-arrow.open { transform: rotate(180deg); }
.faq-answer { padding: 0 20px; font-size: 0.9rem; color: var(--grey); line-height: 1.7; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; }
.faq-answer.open { max-height: 300px; padding: 0 20px 18px; }

/* TEAM */
.team-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; text-align: center; transition: var(--transition); }
.team-card:hover { transform: translateY(-3px); border-color: rgba(59,130,246,0.3); }
.team-avatar { width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: #fff; animation: float 4s ease infinite; }
.team-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
.team-role { font-size: 0.82rem; color: var(--blue-light); font-weight: 500; }

/* MISC */
.info-box { background: var(--blue-dim); border: 1px solid rgba(59,130,246,0.2); border-radius: var(--radius); padding: 14px 16px; font-size: 0.875rem; color: var(--blue-light); display: flex; gap: 10px; align-items: flex-start; margin-bottom: 20px; }
.contact-method { display: flex; align-items: center; gap: 14px; padding: 20px; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-lg); transition: var(--transition); }
.contact-method:hover { border-color: rgba(59,130,246,0.3); transform: translateX(4px); }
.contact-icon { width: 44px; height: 44px; background: var(--blue-dim); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
.criteria-row { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); }
.criteria-row:last-child { border-bottom: none; }
.criteria-bar-wrap { flex: 1; height: 4px; background: var(--bg3); border-radius: 99px; overflow: hidden; }
.criteria-bar { height: 100%; background: linear-gradient(90deg, var(--blue), var(--blue-light)); border-radius: 99px; }
.criteria-pct { font-size: 0.8rem; font-weight: 700; color: var(--blue-light); width: 38px; text-align: right; }
.tag { display: inline-flex; align-items: center; padding: 4px 10px; background: var(--blue-dim); border: 1px solid rgba(59,130,246,0.2); border-radius: 99px; font-size: 0.76rem; font-weight: 600; color: var(--blue-light); }
.principle-chip { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; background: var(--bg3); border: 1px solid var(--border); border-radius: 99px; font-size: 0.875rem; font-weight: 600; transition: var(--transition); }
.principle-chip:hover { border-color: rgba(59,130,246,0.3); background: var(--blue-dim); }
.form-group { margin-bottom: 18px; }
.form-label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--grey); margin-bottom: 6px; }
.form-input { width: 100%; max-width: 100%; box-sizing: border-box; padding: 11px 14px; background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius); color: var(--white); font-size: 0.9rem; font-family: var(--font-body); outline: none; transition: border-color var(--transition), box-shadow var(--transition); }
.form-input::placeholder { color: var(--grey-dim); }
.form-input:focus { border-color: rgba(59,130,246,0.5); box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
textarea.form-input { resize: vertical; min-height: 110px; }
.success-icon { width: 72px; height: 72px; background: rgba(34,197,94,0.15); border: 2px solid rgba(34,197,94,0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 20px; }

/* FOOTER */
footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 40px clamp(20px,5vw,60px); }
.footer-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
.footer-logo { font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; }
.footer-logo span { color: var(--blue); }
.footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
.footer-link { font-size: 0.85rem; color: var(--grey); cursor: pointer; transition: color var(--transition); text-decoration: none; }
.footer-link:hover { color: var(--white); }
.footer-copy { font-size: 0.8rem; color: var(--grey-dim); width: 100%; text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border); }
`;

// ─── Participant Package Banner ───────────────────────────────────────────────
function PkgBanner() {
  return (
    <a href={PARTICIPANT_PACKAGE_LINK} target="_blank" rel="noopener noreferrer" className="pkg-banner">
      <div className="pkg-banner-left">
        <div className="pkg-banner-title">Participant Package</div>
        <div className="pkg-banner-sub">Full rules, requirements, judging criteria &amp; submission guide — read before you start</div>
      </div>
      <div className="pkg-banner-cta">Read Now →</div>
    </a>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ activePage, setPage }: { activePage: Page; setPage: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Competition", page: "competition" },
    { label: "FAQ & Timeline", page: "faq" },
    { label: "Team", page: "team" },
    { label: "Submission", page: "submission" },
    { label: "Contact", page: "contact" },
  ];
  const nav = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <>
      <nav>
        <div className="nav-logo" onClick={() => nav("home")}>Launch<span>Proof</span></div>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.page} className={`nav-link${activePage === l.page ? " active" : ""}`} onClick={() => nav(l.page)}>{l.label}</li>
          ))}
          <li><a className="nav-pkg" href={PARTICIPANT_PACKAGE_LINK} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>Package</a></li>
          <li style={{ marginLeft: 4 }}><a className="btn-register-nav" href={REGISTER_FORM_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Register</a></li>
        </ul>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <div key={l.page} className={`mobile-link${activePage === l.page ? " active" : ""}`} onClick={() => nav(l.page)}>{l.label}</div>
          ))}
          <a className="mobile-pkg" href={PARTICIPANT_PACKAGE_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Participant Package</a>
          <a className="mobile-register" href={REGISTER_FORM_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }} onClick={() => setMenuOpen(false)}>Register Now</a>
        </div>
      )}
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const nav = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="footer-logo">Launch<span>Proof</span></div>
          <div style={{ fontSize: "0.82rem", color: "var(--grey)", marginTop: 6 }}>Build it. Prove it. Pitch it.</div>
        </div>
        <div className="footer-links">
          {(["home","competition","faq","team","submission","contact"] as Page[]).map((p) => (
            <div key={p} className="footer-link" onClick={() => nav(p)}>{p === "home" ? "Home" : p === "competition" ? "Competition" : p === "faq" ? "FAQ & Timeline" : p === "team" ? "Team" : p === "submission" ? "Submission" : "Contact"}</div>
          ))}
          <a href={PARTICIPANT_PACKAGE_LINK} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: "var(--blue-light)" }}>Participant Package</a>
        </div>
        <a href={REGISTER_FORM_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.875rem" }}>Register Now</a>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} LaunchProof. All rights reserved. · eshwarsg2000@gmail.com</div>
    </footer>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 640, marginLeft: "auto", marginRight: "auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="hero-badge fade-up">High School Startup Competition</div>
          <h1 className="fade-up-2">Launch<span className="accent">Proof</span></h1>
          <p className="hero-tagline fade-up-3">"Build it. Prove it. Pitch it."</p>
          <p className="hero-sub fade-up-3">Prototype-based startup competition for high school students</p>
          {/* Theme display */}
          <div className="fade-up-3" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 28 }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--grey-dim)", marginBottom: 2 }}>2026 Themes</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 16px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 99, fontSize: "0.82rem", fontWeight: 700, color: "var(--blue-light)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue-light)", flexShrink: 0, display: "inline-block" }} />
                Technology That Solves Real Problems
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 16px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 99, fontSize: "0.82rem", fontWeight: 700, color: "var(--blue-light)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue-light)", flexShrink: 0, display: "inline-block" }} />
                Future Cities &amp; Smart Systems
              </div>
            </div>
          </div>
          <div className="fade-up-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            <a href={REGISTER_FORM_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">Register Now</a>
            <button className="btn-outline" onClick={() => { setPage("competition"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Learn More</button>
          </div>
          <div className="fade-up-4"><PkgBanner /></div>
        </div>
      </section>

      <div className="divider" />

      {/* ── THEMES STRIP ── */}
      <section style={{ padding: "48px 0", background: "var(--bg2)", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--grey-dim)", marginBottom: 16 }}>2026 Competition Themes</div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Technology That Solves Real Problems", desc: "Build something that addresses a genuine challenge people face today." },
              { label: "Future Cities & Smart Systems", desc: "Design solutions that shape how communities, infrastructure, and cities evolve." },
            ].map((theme, i) => (
              <div key={i} style={{ flex: "1 1 280px", maxWidth: 440, padding: "24px 28px", background: "var(--bg3)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "var(--radius-lg)", textAlign: "left", transition: "border-color var(--transition), transform var(--transition)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.55)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.25)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blue)", flexShrink: 0 }} />
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 800, color: "var(--white)" }}>{theme.label}</div>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--grey)", lineHeight: 1.6, paddingLeft: 18 }}>{theme.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="two-col" style={{ alignItems: "center" }}>
            <div>
              <div className="section-label">About LaunchProof</div>
              <h2 className="section-title">More than an idea.<br />Build something real.</h2>
              <p className="section-desc" style={{ marginBottom: 16 }}>LaunchProof is a prototype-based business and technology competition designed for high school students to develop, build, and present innovative ideas in a structured and professional format.</p>
              <p className="section-desc">The competition focuses on execution, demonstration, and clear communication. Students are encouraged to move beyond simple concepts and create ideas that are functional, realistic, and well-presented.</p>
              <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div className="principle-chip">Execution over ideas</div>
                <div className="principle-chip">Demonstration over explanation</div>
                <div className="principle-chip">Clarity over complexity</div>
              </div>
            </div>
            <div className="card" style={{ background: "var(--bg2)", padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "28px 28px 0" }}>
                <div className="section-label" style={{ marginBottom: 20 }}>Competition Highlights</div>
              </div>
              {[
                { title: "Teams of 3–5", sub: "Collaborate with your peers" },
                { title: "Certificates & Rewards", sub: "1st Place $200 Gift Card · Certificates for All Winners" },
                { title: "Prototype Required", sub: "Software, hardware, or CAD" },
                { title: "6-Min Video", sub: "Max 6:20 presentation" },
                { title: "Real User Feedback", sub: "QR-linked user validation clip" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 28px", borderTop: i === 0 ? "1px solid var(--border)" : "none", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.title}</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--grey)" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "20px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={REGISTER_FORM_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: "100%", justifyContent: "center", display: "flex" }}>Register Now</a>
                <a href={PARTICIPANT_PACKAGE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 20px", border: "1px solid rgba(59,130,246,0.35)", borderRadius: "var(--radius)", color: "var(--blue-light)", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", background: "transparent", transition: "all var(--transition)" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                  View Participant Package
                </a>
              </div>
            </div>
          </div>

          <div className="highlight-strip">
            {[
              { num: "3–5", label: "Students per Team" },
              { num: "$200", label: "1st Place Gift Card" },
              { num: "6 min", label: "Presentation Limit" },
              { num: "Free", label: "Registration" },
              { num: "100%", label: "Execution Focused" },
            ].map((s, i) => (
              <div className="highlight-item" key={i}>
                <div className="highlight-num">{s.num}</div>
                <div className="highlight-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Ready to prove your idea?</h2>
          <p className="section-desc" style={{ margin: "0 auto 32px" }}>Join LaunchProof and show the world what you can build.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={REGISTER_FORM_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "1.05rem", padding: "15px 40px" }}>Register Your Team</a>
            <a href={PARTICIPANT_PACKAGE_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline">Participant Package</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Competition Page ─────────────────────────────────────────────────────────
function CompetitionPage() {
  return (
    <div className="page">
      <section style={{ padding: "60px 0 0" }}>
        <div className="container">
          <div className="section-label">The Competition</div>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>How LaunchProof Works</h1>
          <p className="section-desc" style={{ marginBottom: 32 }}>LaunchProof is a startup-style competition where students build a business idea, create a prototype, and present it through a structured video submission.</p>
          <div style={{ maxWidth: 700, marginBottom: 48 }}><PkgBanner /></div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="grid-3">
            {[
              { title: "Develop Your Idea", desc: "Build a business concept with a clear purpose, target audience, and real-world use case." },
              { title: "Build a Prototype", desc: "Create a working prototype — software, hardware, or a detailed CAD design." },
              { title: "Record & Submit", desc: "Film a 6-minute (max 6:20) video presenting and demonstrating your prototype." },
            ].map((c, i) => (<div className="card" key={i}><div className="card-title">{c.title}</div><div className="card-desc">{c.desc}</div></div>))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="container">
          <div className="two-col">
            <div>
              <div className="section-label">Presentation</div>
              <h2 className="section-title">6 Required Questions</h2>
              <p className="section-desc" style={{ marginBottom: 28 }}>Your presentation must clearly address all of the following in a logical, structured way.</p>
              {[
                { n: "01", q: "What is your business concept?", d: "Clear overview of your idea and its core purpose." },
                { n: "02", q: "Who is your target audience?", d: "Who is your product for, and why are they the right users?" },
                { n: "03", q: "How does your solution function?", d: "Explain how it works, supported by your prototype demo." },
                { n: "04", q: "What differentiates your idea?", d: "What makes your idea unique compared to other solutions?" },
                { n: "05", q: "What value does your idea provide?", d: "Why would people use your product or service?" },
                { n: "06", q: "What is a limitation of your idea?", d: "Identify one weakness and how it could be improved." },
              ].map((q, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: i < 5 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--blue)", fontSize: "0.8rem", minWidth: 28, paddingTop: 2 }}>{q.n}</span>
                  <div><div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 3 }}>{q.q}</div><div style={{ fontSize: "0.82rem", color: "var(--grey)" }}>{q.d}</div></div>
                </div>
              ))}
            </div>
            <div>
              <div className="section-label">Evaluation</div>
              <h2 className="section-title">Judging Criteria</h2>
              <p className="section-desc" style={{ marginBottom: 28 }}>Submissions are evaluated across six categories by the LaunchProof executive team.</p>
              <div className="card" style={{ padding: "20px 24px" }}>
                {[
                  { label: "Prototype Quality & Demo", pct: 25 },
                  { label: "Idea Clarity & Concept", pct: 20 },
                  { label: "Creativity & Innovation", pct: 15 },
                  { label: "Practicality & Potential", pct: 15 },
                  { label: "Presentation Quality", pct: 15 },
                  { label: "Critical Thinking", pct: 10 },
                ].map((c, i) => (
                  <div className="criteria-row" key={i}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, width: 200, flexShrink: 0 }}>{c.label}</div>
                    <div className="criteria-bar-wrap"><div className="criteria-bar" style={{ width: `${c.pct * 4}%` }} /></div>
                    <div className="criteria-pct">{c.pct}%</div>
                  </div>
                ))}
              </div>
              <div className="card" style={{ marginTop: 20 }}>
                <div className="card-title">User Feedback Requirement</div>
                <div className="card-desc" style={{ marginBottom: 10 }}>Include a 1-minute video of someone explaining why your idea is useful. Link it via a QR code in your presentation slides.</div>
                <div className="tag">Real-world validation required</div>
              </div>
              <div className="card" style={{ marginTop: 20 }}>
                <div className="card-title">Submission Guidelines</div>
                <div className="card-desc">Upload your final presentation to YouTube (Unlisted or Public), then submit the video link via the official Google Form.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Recognition & Rewards</div>
            <h2 className="section-title">What You Can Win</h2>
            <p className="section-desc" style={{ margin: "0 auto 12px" }}>Top teams are recognized for their hard work, creativity, and execution.</p>
          </div>
          <div style={{ maxWidth: 480, margin: "0 auto 24px" }}>
            <div className="prize-card first" style={{ padding: "36px 32px", background: "linear-gradient(145deg, rgba(59,130,246,0.12) 0%, var(--bg2) 100%)", borderColor: "rgba(59,130,246,0.5)", boxShadow: "0 0 40px rgba(59,130,246,0.1)" }}>
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>🏆</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 800, marginBottom: 6 }}>1st Place</div>
              <div className="prize-amount" style={{ fontSize: "2.6rem", marginBottom: 8 }}>$200 Gift Card</div>
              <div style={{ fontSize: "0.875rem", color: "var(--grey)", lineHeight: 1.6 }}>The top team takes home a $100 gift card along with an official 1st Place Certificate of Achievement.</div>
            </div>
          </div>
          <div className="grid-3" style={{ maxWidth: 760, margin: "0 auto 32px" }}>
            {[
              { emoji: "🥈", place: "2nd Place", reward: "Certificate", desc: "Official 2nd Place Certificate of Achievement awarded to the runner-up team." },
              { emoji: "🥉", place: "3rd Place", reward: "Certificate", desc: "Official 3rd Place Certificate of Achievement for the third-place finishers." },
              { emoji: "⭐", place: "People's Choice", reward: "Certificate", desc: "A special certificate recognizing the team that stood out to voters and the community." },
            ].map((p, i) => (
              <div className="prize-card" key={i} style={{ padding: "28px 20px" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{p.emoji}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 800, marginBottom: 6 }}>{p.place}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, color: "var(--blue-light)", marginBottom: 10 }}>{p.reward}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--grey)", lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 480, margin: "0 auto 32px" }}>
            <div className="prize-card" style={{ padding: "24px 28px", display: "flex", alignItems: "center", gap: 20, textAlign: "left" }}>
              <div style={{ fontSize: "2rem", flexShrink: 0 }}>🔧</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 800, marginBottom: 4 }}>Best Prototype Award</div>
                <div style={{ fontSize: "0.85rem", color: "var(--grey)", lineHeight: 1.6 }}>Awarded to the team with the most impressive, well-built prototype — regardless of overall placement.</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--grey)", fontStyle: "italic" }}>All winning teams receive official certificates. Select projects may be considered for funding — not guaranteed.</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Registration</div>
          <h2 className="section-title">Join the Competition</h2>
          <p className="section-desc" style={{ margin: "0 auto 32px" }}>Registration is free. Complete the form to secure your spot.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 40 }}>
            {["Teams of 3–5 students", "Open to all high school students", "Free to register"].map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 99, fontSize: "0.875rem", fontWeight: 500 }}>{item}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={REGISTER_FORM_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "1.05rem", padding: "15px 40px" }}>Register Your Team</a>
            <a href={PARTICIPANT_PACKAGE_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline">Participant Package</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FAQ Page ─────────────────────────────────────────────────────────────────
function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Who can participate in LaunchProof?", a: "LaunchProof is open to all high school students. Teams must have 3–5 members. There are no restrictions on school, grade, or location." },
    { q: "Do I need coding or technical experience?", a: "No coding experience is required. Prototypes can be software-based, hardware-based, or CAD designs. The focus is on demonstrating a clear, functional idea — not complex engineering." },
    { q: "Can I participate alone?", a: "No. LaunchProof is a team competition requiring 3–5 students per team. This reflects the real startup experience of building with a team." },
    { q: "What can my team build?", a: "Your prototype can be a software application or website, a physical hardware prototype, or a detailed CAD design (AutoCAD, Inventor, etc.). The prototype must be demonstrated in your video." },
    { q: "How are winners selected?", a: "Submissions are evaluated by the LaunchProof executive team across six criteria: Idea Clarity (20%), Prototype Quality (25%), Creativity (15%), Practicality (15%), Presentation Quality (15%), and Critical Thinking (10%)." },
    { q: "What is the user feedback requirement?", a: "Each team must include a short video (max 1 minute) of at least one real person explaining why the idea is useful. This video must be accessible via a QR code in your presentation slides." },
    { q: "How do I submit my presentation?", a: "Upload your 6-minute video to YouTube (Unlisted or Public), then submit the link through the official LaunchProof Google Form before the submission deadline." },
    { q: "Is registration free?", a: "Yes. Registration for LaunchProof is completely free." },
  ];
  return (
    <div className="page">
      <section style={{ padding: "60px 0 40px" }}>
        <div className="container">
          <div className="section-label">FAQ & Timeline</div>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: 8 }}>Frequently Asked Questions</h1>
          <p className="section-desc" style={{ marginBottom: 32 }}>Everything you need to know about LaunchProof.</p>
          <div style={{ maxWidth: 700, marginBottom: 48 }}><PkgBanner /></div>
          <div style={{ maxWidth: 760 }}>
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-question" onClick={() => setOpen(open === i ? null : i)}>{f.q}<span className={`faq-arrow${open === i ? " open" : ""}`}>▾</span></div>
                <div className={`faq-answer${open === i ? " open" : ""}`}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="container">
          <div className="two-col">
            <div>
              <div className="section-label">Timeline</div>
              <h2 className="section-title">Key Dates</h2>
              <p className="section-desc" style={{ marginBottom: 36 }}>Mark your calendar and plan accordingly.</p>
              <div className="timeline">
                {[
                  { date: "May 13, 2026", title: "Registration Opens", desc: "Teams can register via the Google Form." },
                  { date: "May 23, 2026", title: "Registration Closes", desc: "Final day to register your team. Make sure your team is locked in." },
                  { date: "June 20, 2026", title: "Submission Deadline", desc: "All video presentations must be submitted via the Google Form by 11:59 PM." },
                  { date: "June 20 – July 5, 2026", title: "Judging Period", desc: "The LaunchProof executive team reviews all submissions. Note: judging may be delayed due to exam season." },
                  { date: "Unknown", title: "Results Announced", desc: "Winners announced and certificates distributed following the conclusion of the judging period." },
                ].map((t, i) => (
                  <div className="timeline-item" key={i}>
                    <div className="timeline-dot" />
                    <div className="timeline-date">{t.date}</div>
                    <div className="timeline-title">{t.title}</div>
                    <div className="timeline-desc">{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label">Quick Reference</div>
              <h2 className="section-title">At a Glance</h2>
              <div className="card" style={{ padding: "0", overflow: "hidden", marginBottom: 20 }}>
                {[
                  { k: "Registration Opens", v: "May 13, 2026" },
                  { k: "Registration Closes", v: "May 23, 2026" },
                  { k: "Submission Deadline", v: "June 20, 2026" },
                  { k: "Judging Period", v: "June 20 – July 5, 2026" },
                  { k: "Results", v: "After judging period" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "13px 20px", borderBottom: i < 4 ? "1px solid var(--border)" : "none", fontSize: "0.875rem" }}>
                    <span style={{ color: "var(--grey)" }}>{r.k}</span>
                    <span style={{ fontWeight: 600 }}>{r.v}</span>
                  </div>
                ))}
              </div>
              <a href={PARTICIPANT_PACKAGE_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(96,165,250,0.06) 100%)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: "var(--radius-lg)", padding: "24px", transition: "all var(--transition)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.65)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, var(--blue), var(--blue-light))", borderRadius: 99, marginBottom: 16 }} />
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", marginBottom: 6 }}>Participant Package</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--grey)", lineHeight: 1.6, marginBottom: 14 }}>The complete guide — rules, requirements, judging criteria, and how to submit. Read this before you start.</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--blue-light)" }}>Open Package →</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Team Page ────────────────────────────────────────────────────────────────
function TeamPage() {
  const executives = [
    { initials: "ES", name: "Eshwar Sai Ganipineni", role: "Director", tag: "Director" },
    { initials: "HV", name: "Hari Vemuri", role: "Co-Director", tag: "Co-Director" },
    { initials: "EX", name: "TBD", role: "General Executive", tag: "Executive" },
    { initials: "EX", name: "TBD", role: "Marketing Lead", tag: "Executive" },
    { initials: "EX", name: "TBD", role: "Tech Lead", tag: "Executive" },
    { initials: "EX", name: "TBD", role: "Marketing", tag: "Executive" },
  ];
  return (
    <div className="page">
      <section style={{ padding: "60px 0 40px" }}>
        <div className="container">
          <div className="section-label">Our Team</div>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: 8 }}>Executive Team</h1>
          <p className="section-desc" style={{ marginBottom: 12 }}>LaunchProof is organized and run by students, for students.</p>
          <div className="info-box" style={{ maxWidth: 560, marginBottom: 48 }}><span style={{ fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>i</span>The executive team also serves as judges for the competition.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20, width: "100%" }}>
            {executives.map((p, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar" style={{ animationDelay: `${i * 0.35}s`, background: p.tag === "Director" || p.tag === "Co-Director" ? "linear-gradient(135deg, #1e3a8a, #3B82F6)" : "linear-gradient(135deg, #1e3a6e, #60A5FA)", opacity: p.name === "TBA" ? 0.5 : 1 }}>{p.initials}</div>
                <div className="team-name" style={{ color: p.name === "TBA" ? "var(--grey)" : "var(--white)" }}>{p.name}</div>
                <div className="team-role">{p.role}</div>
                <div style={{ marginTop: 10 }}><span className="tag" style={{ fontSize: "0.7rem", background: p.tag === "Director" || p.tag === "Co-Director" ? "rgba(59,130,246,0.18)" : "rgba(96,165,250,0.12)", color: p.tag === "Director" || p.tag === "Co-Director" ? "var(--blue-light)" : "rgba(150,200,255,0.85)" }}>{p.tag}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section style={{ padding: "100px 0", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.13) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 99, fontSize: "0.78rem", fontWeight: 700, color: "var(--blue-light)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>Now Recruiting</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            Want to Join the<br /><span style={{ background: "linear-gradient(135deg, var(--blue) 0%, var(--blue-light) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Executive Team?</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--grey)", maxWidth: 520, margin: "0 auto 20px", lineHeight: 1.7 }}>We're looking for motivated, ambitious high school students to help organize and grow LaunchProof. Shape the future of student entrepreneurship.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 40 }}>
            {["Real Organizing Experience", "Leadership Role", "Network with Students", "Certificate & Recognition"].map((perk, i) => (
              <div key={i} style={{ padding: "8px 16px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 99, fontSize: "0.85rem", fontWeight: 500, color: "var(--grey)" }}>{perk}</div>
            ))}
          </div>
          <a href={APPLY_FORM_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 48px", background: "var(--blue)", color: "#fff", borderRadius: 12, fontSize: "1.1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 40px rgba(59,130,246,0.4)", transition: "all 0.22s cubic-bezier(.4,0,.2,1)", animation: "pulse-ring 2.5s ease infinite" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 50px rgba(59,130,246,0.6)"; (e.currentTarget as HTMLElement).style.animation = "none"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(59,130,246,0.4)"; (e.currentTarget as HTMLElement).style.animation = "pulse-ring 2.5s ease infinite"; }}>
            Apply for Executive Team
          </a>
          <div style={{ marginTop: 14, fontSize: "0.82rem", color: "var(--grey-dim)" }}>Applications reviewed on a rolling basis · Takes 15–20 minutes</div>
        </div>
      </section>
    </div>
  );
}

// ─── Submission Page ──────────────────────────────────────────────────────────
function SubmissionPage() {
  return (
    <div className="page">
      <section style={{ padding: "60px 0 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label">Submit Your Work</div>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: 8 }}>Final Submission</h1>
          <p className="section-desc" style={{ marginBottom: 32 }}>Ready to submit? Make sure everything is in order before you hit that button.</p>
          <div style={{ maxWidth: 700, marginBottom: 48 }}><PkgBanner /></div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="two-col" style={{ alignItems: "start" }}>
            <div>
              <div className="section-label">Before You Submit</div>
              <h2 className="section-title" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", marginBottom: 20 }}>Submission Checklist</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Video uploaded to YouTube", sub: "Set to Unlisted or Public. Max 6 minutes (6:20 with grace period)." },
                  { label: "YouTube link ready to paste", sub: "Copy the full video URL from YouTube." },
                  { label: "All 6 required questions addressed", sub: "Concept, audience, function, differentiation, value, and limitation." },
                  { label: "Prototype clearly demonstrated", sub: "Your prototype must be visible and explained in the video." },
                  { label: "User feedback video included", sub: "QR code in your slides linking to a max 1-minute feedback clip." },
                  { label: "Team details on hand", sub: "You'll need team member names and contact info for the form." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 20px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", transition: "border-color var(--transition)" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blue)", flexShrink: 0, marginTop: 7 }} />
                    <div><div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 3 }}>{item.label}</div><div style={{ fontSize: "0.82rem", color: "var(--grey)", lineHeight: 1.5 }}>{item.sub}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "linear-gradient(145deg, rgba(59,130,246,0.1) 0%, var(--bg2) 100%)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: "var(--radius-lg)", padding: "40px 32px", textAlign: "center", boxShadow: "0 0 60px rgba(59,130,246,0.08)", position: "sticky", top: "calc(var(--nav-h) + 24px)" }}>
                <div style={{ width: 56, height: 4, background: "linear-gradient(90deg, var(--blue), var(--blue-light))", borderRadius: 99, margin: "0 auto 20px" }} />
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>Ready to Submit?</h2>
                <p style={{ fontSize: "0.9rem", color: "var(--grey)", lineHeight: 1.7, marginBottom: 28 }}>Click the button below to open the official LaunchProof submission form. Make sure your YouTube link is ready before you start.</p>
                <a href={SUBMISSION_FORM_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 32px", background: "var(--blue)", color: "#fff", borderRadius: "var(--radius)", fontSize: "1.05rem", fontWeight: 700, textDecoration: "none", width: "100%", boxSizing: "border-box", boxShadow: "0 4px 30px rgba(59,130,246,0.4)", transition: "all var(--transition)", animation: "pulse-ring 2.5s ease infinite" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--blue-light)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.animation = "none"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--blue)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.animation = "pulse-ring 2.5s ease infinite"; }}>
                  Submit Your Work →
                </a>
                <div style={{ marginTop: 16, fontSize: "0.8rem", color: "var(--grey-dim)" }}>Submission deadline: <strong style={{ color: "var(--grey)" }}>June 20, 2026 · 11:59 PM</strong></div>
                <div style={{ height: 1, background: "var(--border)", margin: "28px 0" }} />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 12 }}>Key Reminders</div>
                  {["Video must be on YouTube (Unlisted or Public)", "Max 6 minutes — 6:20 with grace period", "Include QR code linking to user feedback clip", "All 6 questions must be answered"].map((note, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, fontSize: "0.82rem", color: "var(--grey)" }}>
                      <span style={{ color: "var(--blue)", fontWeight: 800, flexShrink: 0, marginTop: 1 }}>·</span>{note}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const FORMSPREE_CONTACT = "https://formspree.io/f/mqewkbdd";
  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    try { await fetch(FORMSPREE_CONTACT, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(form) }); }
    catch (err) { console.error(err); }
    setSending(false); setSent(true);
  };
  return (
    <div className="page">
      <section style={{ padding: "60px 0 40px" }}>
        <div className="container">
          <div className="section-label">Get in Touch</div>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: 8 }}>Contact & Info</h1>
          <p className="section-desc" style={{ marginBottom: 56 }}>Have questions? We're here to help. Reach out anytime.</p>
          <div className="two-col-left-wide">
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                <div className="contact-method">
                  <div className="contact-icon" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--blue-light)" }}>@</div>
                  <div><div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>Email Us</div><div style={{ fontSize: "0.875rem", color: "var(--blue-light)" }}>eshwarsg2000@gmail.com</div></div>
                </div>
                <a href={PARTICIPANT_PACKAGE_LINK} target="_blank" rel="noopener noreferrer" className="contact-method" style={{ textDecoration: "none" }}>
                  <div className="contact-icon" style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--blue-light)", letterSpacing: "-0.03em" }}>DOC</div>
                  <div><div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>Participant Package</div><div style={{ fontSize: "0.875rem", color: "var(--blue-light)" }}>Full rules, requirements &amp; submission guide →</div></div>
                </a>
              </div>
              <div className="card">
                <div className="card-title">Sponsors</div>
                <div className="card-desc" style={{ marginBottom: 14 }}>We are currently seeking sponsors to help grow LaunchProof and increase our prize pool. Interested in supporting student innovation?</div>
                <div className="tag">Sponsorship Opportunities Available</div>
              </div>
              <div className="card" style={{ marginTop: 16 }}>
                <div className="card-title">Competition Winners</div>
                <div className="card-desc">Results will be posted here after the competition concludes.</div>
                <div style={{ marginTop: 14, padding: "12px 16px", background: "var(--bg3)", borderRadius: 8, fontSize: "0.875rem", color: "var(--grey)", textAlign: "center", fontWeight: 600 }}>Coming Soon</div>
              </div>
            </div>
            <div className="card" style={{ padding: 32 }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "32px 16px" }}>
                  <div className="success-icon">✓</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: "var(--grey)", fontSize: "0.9rem" }}>Thanks for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>Send a Message</h3>
                  <div className="form-group"><label className="form-label">Your Name</label><input className="form-input" placeholder="John Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                  <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                  <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" placeholder="Your message..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} /></div>
                  <button className="btn-primary" style={{ width: "100%", justifyContent: "center", opacity: sending ? 0.7 : 1 }} disabled={!form.name || !form.email || !form.message || sending} onClick={submit}>{sending ? "Sending..." : "Send Message"}</button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const [activePage, setActivePage] = useState<Page>("home");
  useEffect(() => {
    const id = "lp-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id; style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);
  const setPage = (p: Page) => setActivePage(p);
  return (
    <>
      <NavBar activePage={activePage} setPage={setPage} />
      {activePage === "home" && <HomePage setPage={setPage} />}
      {activePage === "competition" && <CompetitionPage />}
      {activePage === "faq" && <FAQPage />}
      {activePage === "team" && <TeamPage />}
      {activePage === "submission" && <SubmissionPage />}
      {activePage === "contact" && <ContactPage />}
      <Footer setPage={setPage} />
    </>
  );
}
