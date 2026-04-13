"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "home" | "competition" | "faq" | "team" | "contact";

interface TeamMember {
  name: string;
  email: string;
  school: string;
}

interface RegistrationData {
  leaderName: string;
  leaderEmail: string;
  leaderSchool: string;
  teamName: string;
  members: TeamMember[];
}

// ─── Constants ───────────────────────────────────────────────────────────────
const STRIPE_LINK = "https://YOUR-STRIPE-LINK-HERE";
const APPLY_FORM_LINK = "https://YOUR-GOOGLE-FORM-LINK-HERE";

// ─── Styles (injected once) ───────────────────────────────────────────────────
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

  body {
    background: var(--bg);
    color: var(--white);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  ::selection { background: rgba(59,130,246,0.35); }

  /* scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 99px; }

  /* noise overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
  }

  /* animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes glow {
    0%,100% { box-shadow: 0 0 20px rgba(59,130,246,0.3); }
    50%      { box-shadow: 0 0 40px rgba(59,130,246,0.6); }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-8px); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 14px rgba(59,130,246,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59,130,246,0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .fade-up { animation: fadeUp 0.6s ease both; }
  .fade-up-2 { animation: fadeUp 0.6s 0.12s ease both; }
  .fade-up-3 { animation: fadeUp 0.6s 0.24s ease both; }
  .fade-up-4 { animation: fadeUp 0.6s 0.36s ease both; }

  /* nav */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: var(--nav-h);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 clamp(20px,5vw,60px);
    background: rgba(8,8,8,0.85);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
    transition: var(--transition);
  }

  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--white);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .nav-logo span { color: var(--blue); }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
  }

  .nav-link {
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--grey);
    cursor: pointer;
    transition: color var(--transition), background var(--transition);
  }
  .nav-link:hover, .nav-link.active { color: var(--white); background: rgba(255,255,255,0.06); }

  .btn-register-nav {
    padding: 8px 20px;
    background: var(--blue);
    color: #fff;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
  }
  .btn-register-nav:hover {
    background: var(--blue-light);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(59,130,246,0.4);
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 4px;
  }
  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--white);
    border-radius: 2px;
    transition: var(--transition);
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .mobile-menu {
      position: fixed;
      top: var(--nav-h);
      left: 0; right: 0;
      background: rgba(10,10,10,0.97);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: 16px 20px 24px;
      z-index: 99;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .mobile-link {
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      color: var(--grey);
      cursor: pointer;
      transition: color var(--transition), background var(--transition);
    }
    .mobile-link:hover, .mobile-link.active { color: var(--white); background: rgba(255,255,255,0.06); }
    .mobile-register {
      margin-top: 8px;
      padding: 13px 20px;
      background: var(--blue);
      color: #fff;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      text-align: center;
    }
  }

  /* page wrapper */
  .page { padding-top: var(--nav-h); min-height: 100vh; overflow-x: hidden; }

  /* container */
  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 clamp(16px,4vw,48px);
    width: 100%;
    box-sizing: border-box;
  }

  /* responsive two-col grid */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
    width: 100%;
  }
  .two-col-left-wide {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 48px;
    align-items: start;
    width: 100%;
  }

  @media (max-width: 900px) {
    .two-col, .two-col-left-wide {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  /* hero */
  .hero {
    min-height: calc(100vh - var(--nav-h));
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
    padding: 80px 20px;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(96,165,250,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: var(--blue-dim);
    border: 1px solid rgba(59,130,246,0.3);
    border-radius: 99px;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--blue-light);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 10vw, 7rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.04em;
    margin-bottom: 20px;
  }

  .hero h1 .accent {
    background: linear-gradient(135deg, var(--blue) 0%, var(--blue-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-tagline {
    font-family: var(--font-display);
    font-size: clamp(1rem, 3vw, 1.5rem);
    font-weight: 600;
    color: var(--grey);
    margin-bottom: 12px;
    letter-spacing: 0.02em;
  }

  .hero-sub {
    font-size: clamp(0.9rem, 2vw, 1.05rem);
    color: var(--grey-dim);
    max-width: 460px;
    margin: 0 auto 36px;
    line-height: 1.6;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    background: var(--blue);
    color: #fff;
    border-radius: var(--radius);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
    text-decoration: none;
    animation: pulse-ring 2.5s ease infinite;
  }
  .btn-primary:hover {
    background: var(--blue-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(59,130,246,0.5);
    animation: none;
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: transparent;
    color: var(--white);
    border-radius: var(--radius);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--border);
    transition: all var(--transition);
    text-decoration: none;
  }
  .btn-outline:hover {
    border-color: rgba(59,130,246,0.5);
    background: var(--blue-dim);
    transform: translateY(-1px);
  }

  /* section */
  .section { padding: 80px 0; }
  .section-sm { padding: 56px 0; }

  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 12px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: var(--blue);
    border-radius: 99px;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 16px;
  }

  .section-desc {
    font-size: 1rem;
    color: var(--grey);
    max-width: 580px;
    line-height: 1.7;
  }

  /* cards */
  .card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px;
    transition: border-color var(--transition), transform var(--transition);
    width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }
  .card:hover {
    border-color: rgba(59,130,246,0.3);
    transform: translateY(-2px);
  }

  .card-icon {
    width: 44px;
    height: 44px;
    background: var(--blue-dim);
    border: 1px solid rgba(59,130,246,0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-size: 1.2rem;
  }

  .card-title {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .card-desc {
    font-size: 0.9rem;
    color: var(--grey);
    line-height: 1.6;
  }

  /* grid */
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
  .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }

  /* highlight strip */
  .highlight-strip {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin: 48px 0;
  }
  .highlight-item {
    background: var(--bg2);
    padding: 28px 24px;
    text-align: center;
  }
  .highlight-num {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 800;
    color: var(--blue-light);
    letter-spacing: -0.03em;
    margin-bottom: 4px;
  }
  .highlight-label {
    font-size: 0.82rem;
    color: var(--grey);
    font-weight: 500;
  }

  /* divider */
  .divider { height: 1px; background: var(--border); margin: 0; }

  /* prize */
  .prize-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: var(--transition);
  }
  .prize-card:hover { transform: translateY(-3px); border-color: rgba(59,130,246,0.3); }
  .prize-card.first {
    border-color: rgba(59,130,246,0.4);
    background: linear-gradient(145deg, rgba(59,130,246,0.08) 0%, var(--bg2) 100%);
  }
  .prize-rank {
    font-size: 2rem;
    margin-bottom: 8px;
  }
  .prize-amount {
    font-family: var(--font-display);
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--blue-light);
    letter-spacing: -0.03em;
  }
  .prize-place {
    font-size: 0.85rem;
    color: var(--grey);
    margin-top: 4px;
    font-weight: 500;
  }

  /* timeline */
  .timeline { position: relative; padding-left: 28px; }
  .timeline::before {
    content: '';
    position: absolute;
    left: 8px; top: 8px; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--blue), transparent);
  }
  .timeline-item { position: relative; margin-bottom: 32px; }
  .timeline-dot {
    position: absolute;
    left: -24px; top: 4px;
    width: 14px; height: 14px;
    background: var(--blue);
    border-radius: 50%;
    border: 2px solid var(--bg);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.3);
  }
  .timeline-date {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--blue);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .timeline-title {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .timeline-desc { font-size: 0.875rem; color: var(--grey); line-height: 1.5; }

  /* faq */
  .faq-item {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 10px;
    transition: border-color var(--transition);
  }
  .faq-item:hover { border-color: rgba(59,130,246,0.2); }
  .faq-question {
    padding: 18px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background var(--transition);
  }
  .faq-question:hover { background: rgba(255,255,255,0.03); }
  .faq-arrow { transition: transform var(--transition); color: var(--blue); font-size: 1.1rem; }
  .faq-arrow.open { transform: rotate(180deg); }
  .faq-answer {
    padding: 0 20px;
    font-size: 0.9rem;
    color: var(--grey);
    line-height: 1.7;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }
  .faq-answer.open { max-height: 300px; padding: 0 20px 18px; }

  /* team card */
  .team-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 24px;
    text-align: center;
    transition: var(--transition);
  }
  .team-card:hover { transform: translateY(-3px); border-color: rgba(59,130,246,0.3); }
  .team-avatar {
    width: 64px; height: 64px;
    background: linear-gradient(135deg, var(--blue), var(--blue-light));
    border-radius: 50%;
    margin: 0 auto 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 800;
    color: #fff;
    animation: float 4s ease infinite;
  }
  .team-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
  .team-role { font-size: 0.82rem; color: var(--blue-light); font-weight: 500; }

  /* form */
  .form-group { margin-bottom: 18px; }
  .form-label {
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--grey);
    margin-bottom: 6px;
    letter-spacing: 0.02em;
  }
  .form-input {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 11px 14px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--white);
    font-size: 0.9rem;
    font-family: var(--font-body);
    outline: none;
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .form-input::placeholder { color: var(--grey-dim); }
  .form-input:focus {
    border-color: rgba(59,130,246,0.5);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
  }
  textarea.form-input { resize: vertical; min-height: 110px; }

  /* step indicator */
  .steps {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 32px;
    width: 100%;
    overflow: hidden;
  }
  .step-item {
    display: flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
    flex-shrink: 1;
  }
  .step-num {
    width: 26px; height: 26px;
    border-radius: 50%;
    background: var(--bg3);
    border: 2px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--grey);
    flex-shrink: 0;
    transition: var(--transition);
  }
  .step-num.active { background: var(--blue); border-color: var(--blue); color: #fff; }
  .step-num.done { background: rgba(59,130,246,0.2); border-color: var(--blue); color: var(--blue-light); }
  .step-label {
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--grey-dim);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60px;
  }
  .step-label.active { color: var(--white); font-weight: 600; max-width: 80px; }
  .step-connector { width: 14px; min-width: 8px; height: 2px; background: var(--border); flex-shrink: 1; margin: 0 3px; }
  .step-connector.done { background: var(--blue); }

  @media (max-width: 480px) {
    .step-label { display: none; }
    .step-label.active { display: block; max-width: 70px; }
    .step-connector { width: 10px; min-width: 6px; }
  }

  /* info box */
  .info-box {
    background: var(--blue-dim);
    border: 1px solid rgba(59,130,246,0.2);
    border-radius: var(--radius);
    padding: 14px 16px;
    font-size: 0.875rem;
    color: var(--blue-light);
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  .info-box-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

  .warn-box {
    background: rgba(245,158,11,0.1);
    border: 1px solid rgba(245,158,11,0.25);
    border-radius: var(--radius);
    padding: 14px 16px;
    font-size: 0.875rem;
    color: #FCD34D;
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin: 20px 0;
    box-sizing: border-box;
    width: 100%;
  }

  /* member block */
  .member-block {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    margin-bottom: 12px;
    position: relative;
  }
  .member-block-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--blue-light);
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn-remove {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.2);
    color: #f87171;
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
  }
  .btn-remove:hover { background: rgba(239,68,68,0.2); }

  .btn-add {
    display: flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px dashed rgba(59,130,246,0.4);
    color: var(--blue-light);
    border-radius: var(--radius);
    padding: 11px 16px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    justify-content: center;
    transition: var(--transition);
    font-family: var(--font-body);
    margin-top: 8px;
  }
  .btn-add:hover { background: var(--blue-dim); border-color: var(--blue); }

  /* review box */
  .review-section {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    margin-bottom: 14px;
  }
  .review-title {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 12px;
  }
  .review-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 0;
    border-bottom: 1px solid var(--border);
    font-size: 0.875rem;
  }
  .review-row:last-child { border-bottom: none; }
  .review-key { color: var(--grey); }
  .review-val { color: var(--white); font-weight: 500; text-align: right; }

  /* contact */
  .contact-method {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    transition: var(--transition);
  }
  .contact-method:hover { border-color: rgba(59,130,246,0.3); transform: translateX(4px); }
  .contact-icon {
    width: 44px; height: 44px;
    background: var(--blue-dim);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  /* footer */
  footer {
    background: var(--bg2);
    border-top: 1px solid var(--border);
    padding: 40px clamp(20px,5vw,60px);
  }
  .footer-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  .footer-logo {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .footer-logo span { color: var(--blue); }
  .footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
  .footer-link {
    font-size: 0.85rem;
    color: var(--grey);
    cursor: pointer;
    transition: color var(--transition);
  }
  .footer-link:hover { color: var(--white); }
  .footer-copy { font-size: 0.8rem; color: var(--grey-dim); width: 100%; text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border); }

  /* criteria */
  .criteria-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
  }
  .criteria-row:last-child { border-bottom: none; }
  .criteria-bar-wrap {
    flex: 1;
    height: 4px;
    background: var(--bg3);
    border-radius: 99px;
    overflow: hidden;
  }
  .criteria-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--blue), var(--blue-light));
    border-radius: 99px;
    transition: width 1s ease;
  }
  .criteria-pct {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--blue-light);
    width: 38px;
    text-align: right;
  }

  /* success */
  .success-box {
    text-align: center;
    padding: 48px 24px;
  }
  .success-icon {
    width: 72px; height: 72px;
    background: rgba(34,197,94,0.15);
    border: 2px solid rgba(34,197,94,0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 20px;
  }

  /* tags */
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    background: var(--blue-dim);
    border: 1px solid rgba(59,130,246,0.2);
    border-radius: 99px;
    font-size: 0.76rem;
    font-weight: 600;
    color: var(--blue-light);
    letter-spacing: 0.02em;
  }

  .principle-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 99px;
    font-size: 0.875rem;
    font-weight: 600;
    transition: var(--transition);
  }
  .principle-chip:hover { border-color: rgba(59,130,246,0.3); background: var(--blue-dim); }
`;

// ─── Component: NavBar ────────────────────────────────────────────────────────
function NavBar({
  activePage,
  setPage,
  scrollToReg,
}: {
  activePage: Page;
  setPage: (p: Page) => void;
  scrollToReg: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Competition", page: "competition" },
    { label: "FAQ & Timeline", page: "faq" },
    { label: "Team & Organizers", page: "team" },
    { label: "Contact & Info", page: "contact" },
  ];

  const nav = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav>
        <div className="nav-logo" onClick={() => nav("home")}>
          Launch<span>Proof</span>
        </div>

        <ul className="nav-links">
          {links.map((l) => (
            <li
              key={l.page}
              className={`nav-link${activePage === l.page ? " active" : ""}`}
              onClick={() => nav(l.page)}
            >
              {l.label}
            </li>
          ))}
          <li>
            <button
              className="btn-register-nav"
              onClick={() => {
                setPage("competition");
                setTimeout(scrollToReg, 80);
              }}
            >
              Register →
            </button>
          </li>
        </ul>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
          <span />
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <div
              key={l.page}
              className={`mobile-link${activePage === l.page ? " active" : ""}`}
              onClick={() => nav(l.page)}
            >
              {l.label}
            </div>
          ))}
          <button
            className="mobile-register"
            onClick={() => {
              setPage("competition");
              setMenuOpen(false);
              setTimeout(scrollToReg, 80);
            }}
          >
            Register Now →
          </button>
        </div>
      )}
    </>
  );
}

// ─── Component: Footer ────────────────────────────────────────────────────────
function Footer({
  setPage,
  scrollToReg,
}: {
  setPage: (p: Page) => void;
  scrollToReg: () => void;
}) {
  const nav = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="footer-logo">
            Launch<span>Proof</span>
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--grey)", marginTop: 6 }}>
            Build it. Prove it. Pitch it.
          </div>
        </div>

        <div className="footer-links">
          {(["home","competition","faq","team","contact"] as Page[]).map((p) => (
            <div key={p} className="footer-link" onClick={() => nav(p)}>
              {p === "home" ? "Home" : p === "competition" ? "Competition" : p === "faq" ? "FAQ & Timeline" : p === "team" ? "Team" : "Contact"}
            </div>
          ))}
        </div>

        <button
          className="btn-primary"
          style={{ padding: "10px 22px", fontSize: "0.875rem" }}
          onClick={() => {
            setPage("competition");
            setTimeout(scrollToReg, 80);
          }}
        >
          Register Now →
        </button>
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} LaunchProof. All rights reserved. · contact@launchproof.ca
      </div>
    </footer>
  );
}

// ─── Page: Home ───────────────────────────────────────────────────────────────
function HomePage({
  setPage,
  scrollToReg,
}: {
  setPage: (p: Page) => void;
  scrollToReg: () => void;
}) {
  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-badge fade-up">⚡ High School Startup Competition</div>
          <h1 className="fade-up-2">
            Launch<span className="accent">Proof</span>
          </h1>
          <p className="hero-tagline fade-up-3">"Build it. Prove it. Pitch it."</p>
          <p className="hero-sub fade-up-3">
            Prototype-based startup competition for high school students
          </p>
          <div className="fade-up-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="btn-primary"
              onClick={() => {
                setPage("competition");
                setTimeout(scrollToReg, 80);
              }}
            >
              Register Now →
            </button>
            <button
              className="btn-outline"
              onClick={() => {
                setPage("competition");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* About */}
      <section className="section">
        <div className="container">
          <div className="two-col" style={{ alignItems: "center" }}>
            <div>
              <div className="section-label">About LaunchProof</div>
              <h2 className="section-title">More than an idea.<br />Build something real.</h2>
              <p className="section-desc" style={{ marginBottom: 16 }}>
                LaunchProof is a prototype-based business and technology competition designed for high school students to develop, build, and present innovative ideas in a structured and professional format.
              </p>
              <p className="section-desc">
                The competition focuses on execution, demonstration, and clear communication. Students are encouraged to move beyond simple concepts and create ideas that are functional, realistic, and well-presented.
              </p>
              <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div className="principle-chip">🔥 Execution over ideas</div>
                <div className="principle-chip">📽 Demonstration over explanation</div>
                <div className="principle-chip">✅ Clarity over complexity</div>
              </div>
            </div>

            <div className="card" style={{ background: "var(--bg2)", padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "28px 28px 0" }}>
                <div className="section-label" style={{ marginBottom: 20 }}>Competition Highlights</div>
              </div>
              {[
                { icon: "👥", title: "Teams of 3–5", sub: "Collaborate with your peers" },
                { icon: "💰", title: "$750 Prize Pool", sub: "1st: $400 · 2nd: $250 · 3rd: $100" },
                { icon: "🔧", title: "Prototype Required", sub: "Software, hardware, or CAD" },
                { icon: "🎥", title: "6-Min Video", sub: "Max 6:20 presentation" },
                { icon: "📣", title: "Real User Feedback", sub: "QR-linked user validation clip" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 28px",
                    borderTop: i === 0 ? "1px solid var(--border)" : "none",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.title}</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--grey)" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "20px 28px" }}>
                <button
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => { setPage("competition"); setTimeout(scrollToReg, 80); }}
                >
                  Register Now →
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="highlight-strip">
            {[
              { num: "3–5", label: "Students per Team" },
              { num: "$750", label: "Total Prize Pool" },
              { num: "6 min", label: "Presentation Limit" },
              { num: "$20", label: "Registration Fee" },
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

      {/* CTA */}
      <section style={{ padding: "60px 0", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Ready to prove your idea?</h2>
          <p className="section-desc" style={{ margin: "0 auto 32px" }}>
            Join LaunchProof and show the world what you can build.
          </p>
          <button
            className="btn-primary"
            style={{ fontSize: "1.05rem", padding: "15px 40px" }}
            onClick={() => { setPage("competition"); setTimeout(scrollToReg, 80); }}
          >
            Register Your Team →
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── EmailJS config ───────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS (5 min, free):
// 1. Sign up at https://www.emailjs.com
// 2. Add Service: Gmail → connect eshwarsg2000@gmail.com → copy Service ID below
// 3. Create THREE email templates (see bodies below), copy each Template ID below
// 4. Account page → copy Public Key below
//
// Template 1 – CONTACT (EMAILJS_TMPL_CONTACT):
//   To: eshwarsg2000@gmail.com
//   Subject: LaunchProof Contact from {{from_name}}
//   Body:
//     Name: {{from_name}}
//     Email: {{from_email}}
//     Message: {{message}}
//
// Template 2 – REGISTRATION (EMAILJS_TMPL_REG):
//   To: eshwarsg2000@gmail.com
//   Subject: 🚀 New Registration – {{team_name}}
//   Body:
//     TEAM: {{team_name}} ({{total_members}} members)
//     LEADER: {{leader_name}} | {{leader_email}} | {{leader_school}}
//     MEMBERS:
//     {{members}}
//     STATUS: Awaiting payment
//
// Template 3 – PAYMENT CONFIRMED (EMAILJS_TMPL_PAID):
//   To: eshwarsg2000@gmail.com
//   Subject: ✅ PAID & REGISTERED – {{team_name}}
//   Body:
//     PAYMENT CONFIRMED!
//     TEAM: {{team_name}} ({{total_members}} members)
//     LEADER: {{leader_name}} | {{leader_email}} | {{leader_school}}
//     MEMBERS:
//     {{members}}
//     STATUS: Paid $20 CAD via Stripe ✅

const EMAILJS_PUBLIC_KEY    = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID    = "YOUR_SERVICE_ID";
const EMAILJS_TMPL_CONTACT  = "YOUR_CONTACT_TEMPLATE_ID";
const EMAILJS_TMPL_REG      = "YOUR_REGISTRATION_TEMPLATE_ID";
const EMAILJS_TMPL_PAID     = "YOUR_PAYMENT_TEMPLATE_ID";

function loadEmailJS(): Promise<void> {
  return new Promise((resolve) => {
    if ((window as any).emailjs) { resolve(); return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = () => {
      (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
      resolve();
    };
    document.head.appendChild(s);
  });
}

function buildMembersText(data: RegistrationData): string {
  if (data.members.length === 0) return "No additional members";
  return data.members.map((m, i) =>
    `Member ${i + 1}: ${m.name || "—"} | ${m.email || "—"} | ${m.school || "—"}`
  ).join("\n");
}

// ─── Contact form → Formspree (no setup needed beyond account) ───────────────
// 1. Go to https://formspree.io → sign up free → New Form → copy your endpoint
// 2. Replace the URL below with yours: https://formspree.io/f/YOUR_CODE
const FORMSPREE_CONTACT = "https://formspree.io/f/mqewkbdd";

async function sendContactEmail(name: string, email: string, message: string) {
  try {
    await fetch(FORMSPREE_CONTACT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
  } catch (err) { console.error("Formspree error:", err); }
}

// Email 2 – new registration (sent when they click "Proceed to Payment")
async function sendRegistrationEmail(data: RegistrationData) {
  try {
    await loadEmailJS();
    await (window as any).emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TMPL_REG, {
      team_name:     data.teamName,
      leader_name:   data.leaderName,
      leader_email:  data.leaderEmail,
      leader_school: data.leaderSchool,
      members:       buildMembersText(data),
      total_members: String(1 + data.members.length),
    });
  } catch (err) { console.error("EmailJS reg error:", err); }
}

// Email 3 – payment confirmed (sent when Stripe redirects back with ?payment=success)
async function sendPaymentConfirmedEmail(data: RegistrationData) {
  try {
    await loadEmailJS();
    await (window as any).emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TMPL_PAID, {
      team_name:     data.teamName,
      leader_name:   data.leaderName,
      leader_email:  data.leaderEmail,
      leader_school: data.leaderSchool,
      members:       buildMembersText(data),
      total_members: String(1 + data.members.length),
    });
  } catch (err) { console.error("EmailJS payment error:", err); }
}

// Persist registration data in sessionStorage so it survives the Stripe redirect
const REG_STORAGE_KEY = "lp_pending_reg";
function saveRegToSession(data: RegistrationData) {
  try { sessionStorage.setItem(REG_STORAGE_KEY, JSON.stringify(data)); } catch {}
}
function loadRegFromSession(): RegistrationData | null {
  try {
    const raw = sessionStorage.getItem(REG_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function clearRegFromSession() {
  try { sessionStorage.removeItem(REG_STORAGE_KEY); } catch {}
}

// ─── Component: Registration ──────────────────────────────────────────────────
function RegistrationFlow() {
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [data, setData] = useState<RegistrationData>({
    leaderName: "",
    leaderEmail: "",
    leaderSchool: "",
    teamName: "",
    members: [],
  });

  const updateData = (k: keyof RegistrationData, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  const addMember = () => {
    if (data.members.length < 4)
      setData((d) => ({
        ...d,
        members: [...d.members, { name: "", email: "", school: "" }],
      }));
  };

  const updateMember = (i: number, k: keyof TeamMember, v: string) => {
    const m = [...data.members];
    m[i] = { ...m[i], [k]: v };
    setData((d) => ({ ...d, members: m }));
  };

  const removeMember = (i: number) =>
    setData((d) => ({ ...d, members: d.members.filter((_, idx) => idx !== i) }));

  // Step 4 → save data, send "new registration" email, then go to step 5
  const handleProceedToPayment = async () => {
    setSending(true);
    saveRegToSession(data);          // persist so we have it after Stripe redirect
    await sendRegistrationEmail(data); // Email 2: new registration notification
    setSending(false);
    setStep(5);
  };

  // Build Stripe link with ?success_url pointing back here with payment=success
  // Stripe Payment Links support a {CHECKOUT_SESSION_ID} param but for simplicity
  // we append payment=success&team=<encoded> to the return URL via Stripe dashboard:
  //   In Stripe dashboard → Payment Link → After payment → Redirect to custom URL:
  //   https://YOUR-SITE.com/?payment=success
  // The team data is recovered from sessionStorage on that redirect.
  const stripeLink = STRIPE_LINK;

  const STEPS = ["Leader Info", "Team Info", "Members", "Review", "Payment"];

  return (
    <div>
      {/* Step Indicator */}
      <div className="steps">
        {STEPS.map((s, i) => {
          const n = i + 1;
          return (
            <div className="step-item" key={n}>
              <div className={`step-num${n === step ? " active" : n < step ? " done" : ""}`}>
                {n < step ? "✓" : n}
              </div>
              <div className={`step-label${n === step ? " active" : ""}`}>{s}</div>
              {i < STEPS.length - 1 && <div className={`step-connector${n < step ? " done" : ""}`} />}
            </div>
          );
        })}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>
            Team Leader Information
          </h3>
          <div className="info-box">
            <span className="info-box-icon">ℹ️</span>
            The person completing this form will be the Team Leader.
          </div>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className="form-input" placeholder="John Doe" value={data.leaderName} onChange={(e) => updateData("leaderName", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input className="form-input" type="email" placeholder="you@school.ca" value={data.leaderEmail} onChange={(e) => updateData("leaderEmail", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">School Name *</label>
            <input className="form-input" placeholder="Oakridge Secondary School" value={data.leaderSchool} onChange={(e) => updateData("leaderSchool", e.target.value)} />
          </div>
          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            disabled={!data.leaderName || !data.leaderEmail || !data.leaderSchool}
            onClick={() => setStep(2)}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>
            Team Information
          </h3>
          <div className="form-group">
            <label className="form-label">Team Name *</label>
            <input className="form-input" placeholder="Team Innovate" value={data.teamName} onChange={(e) => updateData("teamName", e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-outline" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: "center" }}>← Back</button>
            <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} disabled={!data.teamName} onClick={() => setStep(3)}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 6 }}>
            Team Members
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--grey)", marginBottom: 20 }}>
            Add up to 4 additional team members (you're already included as leader).
          </p>

          {data.members.map((m, i) => (
            <div className="member-block" key={i}>
              <div className="member-block-title">
                Member {i + 1}
                <button className="btn-remove" onClick={() => removeMember(i)}>Remove</button>
              </div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" placeholder="Jane Smith" value={m.name} onChange={(e) => updateMember(i, "name", e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="jane@school.ca" value={m.email} onChange={(e) => updateMember(i, "email", e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">School Name</label>
                <input className="form-input" placeholder="School Name" value={m.school} onChange={(e) => updateMember(i, "school", e.target.value)} />
              </div>
            </div>
          ))}

          {data.members.length < 4 && (
            <button className="btn-add" onClick={addMember}>
              + Add Team Member ({data.members.length}/4)
            </button>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button className="btn-outline" onClick={() => setStep(2)} style={{ flex: 1, justifyContent: "center" }}>← Back</button>
            <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(4)}>Review →</button>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>
            Review Your Registration
          </h3>

          <div className="review-section">
            <div className="review-title">Team Leader</div>
            <div className="review-row"><span className="review-key">Name</span><span className="review-val">{data.leaderName}</span></div>
            <div className="review-row"><span className="review-key">Email</span><span className="review-val">{data.leaderEmail}</span></div>
            <div className="review-row"><span className="review-key">School</span><span className="review-val">{data.leaderSchool}</span></div>
          </div>

          <div className="review-section">
            <div className="review-title">Team</div>
            <div className="review-row"><span className="review-key">Team Name</span><span className="review-val">{data.teamName}</span></div>
            <div className="review-row"><span className="review-key">Total Members</span><span className="review-val">{1 + data.members.length}</span></div>
          </div>

          {data.members.length > 0 && (
            <div className="review-section">
              <div className="review-title">Additional Members</div>
              {data.members.map((m, i) => (
                <div key={i} className="review-row">
                  <span className="review-key">Member {i + 1}</span>
                  <span className="review-val">{m.name || "—"} · {m.school || "—"}</span>
                </div>
              ))}
            </div>
          )}

          <div className="warn-box">
            <span>⚠️</span>
            <span>Registration is only confirmed after payment is successfully completed.</span>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-outline" onClick={() => setStep(3)} style={{ flex: 1, justifyContent: "center" }}>← Back</button>
            <button
              className="btn-primary"
              style={{ flex: 1, justifyContent: "center", opacity: sending ? 0.7 : 1 }}
              onClick={handleProceedToPayment}
              disabled={sending}
            >
              {sending ? "Sending…" : "Proceed to Payment →"}
            </button>
          </div>
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div className="success-box">
          <div className="success-icon">🚀</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, marginBottom: 10 }}>
            Almost There!
          </h3>
          <p style={{ color: "var(--grey)", fontSize: "0.95rem", marginBottom: 8, maxWidth: 380, margin: "0 auto 20px" }}>
            You'll now be redirected to our secure Stripe payment page to complete your <strong style={{ color: "var(--white)" }}>$20 CAD</strong> registration fee.
          </p>
          <div className="warn-box" style={{ textAlign: "left" }}>
            <span>⚠️</span>
            <span>Registration is only confirmed after payment is successfully completed.</span>
          </div>
          <a
            href={stripeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "14px 36px", display: "inline-flex" }}
          >
            Pay $20 CAD & Confirm →
          </a>
          <div style={{ marginTop: 16, fontSize: "0.8rem", color: "var(--grey-dim)" }}>
            Secured by Stripe · SSL encrypted
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page: Competition ────────────────────────────────────────────────────────
function CompetitionPage({ regRef }: { regRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="page">
      {/* Header */}
      <section style={{ padding: "60px 0 0" }}>
        <div className="container">
          <div className="section-label">The Competition</div>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            How LaunchProof Works
          </h1>
          <p className="section-desc" style={{ marginBottom: 48 }}>
            LaunchProof is a startup-style competition where students build a business idea, create a prototype, and present it through a structured video submission.
          </p>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-sm">
        <div className="container">
          <div className="grid-3">
            {[
              { icon: "💡", title: "Develop Your Idea", desc: "Build a business concept with a clear purpose, target audience, and real-world use case." },
              { icon: "🔧", title: "Build a Prototype", desc: "Create a working prototype — software, hardware, or a detailed CAD design." },
              { icon: "🎥", title: "Record & Submit", desc: "Film a 6-minute (max 6:20) video presenting and demonstrating your prototype." },
            ].map((c, i) => (
              <div className="card" key={i}>
                <div className="card-icon">{c.icon}</div>
                <div className="card-title">{c.title}</div>
                <div className="card-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Required Questions */}
      <section className="section">
        <div className="container">
          <div className="two-col">
            <div>
              <div className="section-label">Presentation</div>
              <h2 className="section-title">6 Required Questions</h2>
              <p className="section-desc" style={{ marginBottom: 28 }}>
                Your presentation must clearly address all of the following in a logical, structured way.
              </p>
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
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 3 }}>{q.q}</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--grey)" }}>{q.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="section-label">Evaluation</div>
              <h2 className="section-title">Judging Criteria</h2>
              <p className="section-desc" style={{ marginBottom: 28 }}>
                Submissions are evaluated across six categories by the LaunchProof executive team.
              </p>
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
                    <div className="criteria-bar-wrap">
                      <div className="criteria-bar" style={{ width: `${c.pct * 4}%` }} />
                    </div>
                    <div className="criteria-pct">{c.pct}%</div>
                  </div>
                ))}
              </div>

              {/* Additional Proof */}
              <div className="card" style={{ marginTop: 20 }}>
                <div className="card-icon">📱</div>
                <div className="card-title">User Feedback Requirement</div>
                <div className="card-desc" style={{ marginBottom: 10 }}>
                  Include a 1-minute video of someone explaining why your idea is useful. Link it via a QR code in your presentation slides.
                </div>
                <div className="tag">Real-world validation required</div>
              </div>

              {/* Submission */}
              <div className="card" style={{ marginTop: 20 }}>
                <div className="card-icon">📤</div>
                <div className="card-title">Submission Guidelines</div>
                <div className="card-desc">
                  Upload your final presentation to YouTube (Unlisted or Public), then submit the video link via the official Google Form.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Prizes */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Prizes</div>
            <h2 className="section-title">$750 Prize Pool</h2>
          </div>
          <div className="grid-4" style={{ maxWidth: 760, margin: "0 auto 24px" }}>
            {[
              { rank: "🥇", amount: "$400", place: "1st Place" },
              { rank: "🥈", amount: "$250", place: "2nd Place" },
              { rank: "🥉", amount: "$100", place: "3rd Place" },
              { rank: "🏆", amount: "Award", place: "Best Prototype" },
            ].map((p, i) => (
              <div className={`prize-card${i === 0 ? " first" : ""}`} key={i}>
                <div className="prize-rank">{p.rank}</div>
                <div className="prize-amount">{p.amount}</div>
                <div className="prize-place">{p.place}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--grey)", fontStyle: "italic" }}>
              Winning teams also receive certificates. Idea recognition certificates may be awarded to top teams. Select projects may be considered for funding based on their potential. Funding is not guaranteed, including for winning teams.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Registration */}
      <section className="section" ref={regRef} id="register">
        <div className="container">
          {/* Header row */}
          <div style={{ marginBottom: 32 }}>
            <div className="section-label">Registration</div>
            <h2 className="section-title">Join the Competition</h2>
            <p className="section-desc">
              Registration fee is <strong style={{ color: "var(--white)" }}>$20 CAD per team</strong>. Complete the form and pay to secure your spot.
            </p>
          </div>

          {/* Info chips row */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 40,
          }}>
            {[
              { icon: "✅", t: "Teams of 3–5 students" },
              { icon: "🎓", t: "Open to all high school students" },
              { icon: "💳", t: "$20 CAD per team" },
              { icon: "🔒", t: "Confirmed after payment" },
            ].map((item, idx) => (
              <div key={idx} style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: 99,
                fontSize: "0.875rem",
                fontWeight: 500,
              }}>
                <span>{item.icon}</span>
                <span>{item.t}</span>
              </div>
            ))}
          </div>

          {/* Full-width form card */}
          <div className="card" style={{ padding: "36px clamp(16px, 4vw, 40px)", maxWidth: 620, margin: "0 auto", boxSizing: "border-box" }}>
            <RegistrationFlow />
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Page: FAQ ────────────────────────────────────────────────────────────────
function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "Who can participate in LaunchProof?",
      a: "LaunchProof is open to all high school students. Teams must have 3–5 members. There are no restrictions on school, grade, or location.",
    },
    {
      q: "Do I need coding or technical experience?",
      a: "No coding experience is required. Prototypes can be software-based, hardware-based, or CAD designs. The focus is on demonstrating a clear, functional idea — not complex engineering.",
    },
    {
      q: "Can I participate alone?",
      a: "No. LaunchProof is a team competition requiring 3–5 students per team. This reflects the real startup experience of building with a team.",
    },
    {
      q: "What can my team build?",
      a: "Your prototype can be a software application or website, a physical hardware prototype, or a detailed CAD design (AutoCAD, Inventor, etc.). The prototype must be demonstrated in your video.",
    },
    {
      q: "How are winners selected?",
      a: "Submissions are evaluated by the LaunchProof executive team across six criteria: Idea Clarity (20%), Prototype Quality (25%), Creativity (15%), Practicality (15%), Presentation Quality (15%), and Critical Thinking (10%).",
    },
    {
      q: "What is the user feedback requirement?",
      a: "Each team must include a short video (max 1 minute) of at least one real person explaining why the idea is useful. This video must be accessible via a QR code in your presentation slides.",
    },
    {
      q: "How do I submit my presentation?",
      a: "Upload your 6-minute video to YouTube (Unlisted or Public), then submit the link through the official LaunchProof Google Form before the submission deadline.",
    },
    {
      q: "Is the registration fee refundable?",
      a: "The $20 CAD registration fee is non-refundable. Registration is only confirmed once payment is successfully completed via Stripe.",
    },
  ];

  return (
    <div className="page">
      <section style={{ padding: "60px 0 40px" }}>
        <div className="container">
          <div className="section-label">FAQ & Timeline</div>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: 8 }}>
            Frequently Asked Questions
          </h1>
          <p className="section-desc" style={{ marginBottom: 48 }}>
            Everything you need to know about LaunchProof.
          </p>

          <div style={{ maxWidth: 760 }}>
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}
                  <span className={`faq-arrow${open === i ? " open" : ""}`}>▾</span>
                </div>
                <div className={`faq-answer${open === i ? " open" : ""}`}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="two-col">
            <div>
              <div className="section-label">Timeline</div>
              <h2 className="section-title">Key Dates</h2>
              <p className="section-desc" style={{ marginBottom: 36 }}>
                Mark your calendar and plan accordingly.
              </p>
              <div className="timeline">
                {[
                  { date: "Coming Soon", title: "Registration Opens", desc: "Teams can register and pay the $20 CAD entry fee." },
                  { date: "Coming Soon", title: "Submission Deadline", desc: "All video presentations must be submitted via the Google Form by 11:59 PM." },
                  { date: "Coming Soon", title: "Judging Period", desc: "The LaunchProof executive team reviews all submissions." },
                  { date: "Coming Soon", title: "Results Announcement", desc: "Winners are announced and prizes are distributed." },
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
              <div className="card" style={{ padding: "0", overflow: "hidden" }}>
                {[
                  { k: "Team Size", v: "3–5 students" },
                  { k: "Registration Fee", v: "$20 CAD per team" },
                  { k: "Prototype Formats", v: "Software / Hardware / CAD" },
                  { k: "Video Duration", v: "Max 6:20 (6 min + 20s grace)" },
                  { k: "Video Platform", v: "YouTube (Unlisted or Public)" },
                  { k: "User Feedback Clip", v: "Max 1 minute, via QR code" },
                  { k: "Eligibility", v: "All high school students" },
                  { k: "1st Place Prize", v: "$400 CAD" },
                  { k: "2nd Place Prize", v: "$250 CAD" },
                  { k: "3rd Place Prize", v: "$100 CAD" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "13px 20px", borderBottom: i < 9 ? "1px solid var(--border)" : "none", fontSize: "0.875rem" }}>
                    <span style={{ color: "var(--grey)" }}>{r.k}</span>
                    <span style={{ fontWeight: 600 }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Page: Team ────────────────────────────────────────────────────────────────
function TeamPage() {
  const executives = [
    { initials: "LP", name: "Placeholder Name", role: "Co-Founder & Director", tag: "Founder" },
    { initials: "LP", name: "Placeholder Name", role: "Co-Founder & Operations", tag: "Founder" },
    { initials: "EX", name: "Placeholder Name", role: "Head Judge · Technology", tag: "Executive" },
    { initials: "EX", name: "Placeholder Name", role: "Judge · Business Strategy", tag: "Executive" },
    { initials: "EX", name: "Placeholder Name", role: "Judge · Product Design", tag: "Executive" },
  ];

  return (
    <div className="page">
      <section style={{ padding: "60px 0 40px" }}>
        <div className="container">
          <div className="section-label">Our Team</div>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: 8 }}>
            Executive Team
          </h1>
          <p className="section-desc" style={{ marginBottom: 12 }}>
            LaunchProof is organized and run by students, for students.
          </p>
          <div className="info-box" style={{ maxWidth: 560, marginBottom: 48 }}>
            <span className="info-box-icon">ℹ️</span>
            The executive team also serves as judges for the competition.
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 20,
            width: "100%",
          }}>
            {executives.map((p, i) => (
              <div className="team-card" key={i}>
                <div
                  className="team-avatar"
                  style={{
                    animationDelay: `${i * 0.35}s`,
                    background: p.tag === "Founder"
                      ? "linear-gradient(135deg, #1e3a8a, #3B82F6)"
                      : "linear-gradient(135deg, #1e3a6e, #60A5FA)",
                  }}
                >
                  {p.initials}
                </div>
                <div className="team-name">{p.name}</div>
                <div className="team-role">{p.role}</div>
                <div style={{ marginTop: 10 }}>
                  <span className="tag" style={{
                    fontSize: "0.7rem",
                    background: p.tag === "Founder" ? "rgba(59,130,246,0.18)" : "rgba(96,165,250,0.12)",
                    color: p.tag === "Founder" ? "var(--blue-light)" : "rgba(150,200,255,0.85)",
                  }}>
                    {p.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Join Team */}
      <section style={{ padding: "80px 0", background: "var(--bg2)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Get Involved</div>
          <h2 className="section-title">Want to Join Our Team?</h2>
          <p className="section-desc" style={{ margin: "0 auto 32px" }}>
            We are always looking for motivated students to help organize and grow LaunchProof. Join the executive team and shape the future of the competition.
          </p>
          <a
            href={APPLY_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "14px 36px", display: "inline-flex" }}
          >
            Apply for Executive Team →
          </a>
        </div>
      </section>
    </div>
  );
}

// ─── Page: Contact ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await sendContactEmail(form.name, form.email, form.message);
    setSending(false);
    setSent(true);
  };

  return (
    <div className="page">
      <section style={{ padding: "60px 0 40px" }}>
        <div className="container">
          <div className="section-label">Get in Touch</div>
          <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: 8 }}>
            Contact & Info
          </h1>
          <p className="section-desc" style={{ marginBottom: 56 }}>
            Have questions? We're here to help. Reach out anytime.
          </p>

          <div className="two-col-left-wide">
            {/* Left */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
                <div className="contact-method">
                  <div className="contact-icon">📧</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>Email Us</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--blue-light)" }}>contact@launchproof.ca</div>
                  </div>
                </div>
              </div>

              {/* Sponsors */}
              <div className="card">
                <div className="card-icon">🤝</div>
                <div className="card-title">Sponsors</div>
                <div className="card-desc" style={{ marginBottom: 14 }}>
                  We are currently seeking sponsors to help grow LaunchProof and increase our prize pool. Interested in supporting student innovation?
                </div>
                <div className="tag">Sponsorship Opportunities Available</div>
              </div>

              {/* Winners */}
              <div className="card" style={{ marginTop: 16 }}>
                <div className="card-icon">🏆</div>
                <div className="card-title">Competition Winners</div>
                <div className="card-desc">
                  Results will be posted here after the competition concludes.
                </div>
                <div style={{ marginTop: 14, padding: "12px 16px", background: "var(--bg3)", borderRadius: 8, fontSize: "0.875rem", color: "var(--grey)", textAlign: "center", fontWeight: 600 }}>
                  Coming Soon
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card" style={{ padding: 32 }}>
              {sent ? (
                <div className="success-box" style={{ padding: "32px 16px" }}>
                  <div className="success-icon">✅</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: "var(--grey)", fontSize: "0.9rem" }}>Thanks for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>Send a Message</h3>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input className="form-input" placeholder="John Doe" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-input" placeholder="Your message..." value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
                  </div>
                  <button
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", opacity: sending ? 0.7 : 1 }}
                    disabled={!form.name || !form.email || !form.message || sending}
                    onClick={submit}
                  >
                    {sending ? "Sending…" : "Send Message →"}
                  </button>
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
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const regRef = useRef<HTMLDivElement>(null);

  // Inject CSS once
  useEffect(() => {
    const id = "lp-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);

  // Detect Stripe redirect back with ?payment=success
  // In your Stripe dashboard → Payment Link → After payment → set redirect URL to:
  // https://YOUR-SITE.com/?payment=success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      setPaymentSuccess(true);
      setActivePage("competition");

      // Recover registration data saved before Stripe redirect
      const savedData = loadRegFromSession();
      if (savedData) {
        sendPaymentConfirmedEmail(savedData); // Email 3: PAID & CONFIRMED
        clearRegFromSession();
      }

      // Clean the URL so refreshing doesn't re-trigger
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const scrollToReg = () => {
    regRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setPage = (p: Page) => {
    setActivePage(p);
  };

  return (
    <>
      <NavBar activePage={activePage} setPage={setPage} scrollToReg={scrollToReg} />

      {/* Payment success banner */}
      {paymentSuccess && (
        <div style={{
          position: "fixed",
          top: "var(--nav-h)",
          left: 0, right: 0,
          zIndex: 200,
          background: "rgba(22,163,74,0.95)",
          backdropFilter: "blur(8px)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "#fff",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}>
          <span style={{ fontSize: "1.2rem" }}>✅</span>
          Payment confirmed! Your team is registered for LaunchProof. Check your email for details.
          <button
            onClick={() => setPaymentSuccess(false)}
            style={{ marginLeft: 16, background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}
          >✕</button>
        </div>
      )}

      {activePage === "home" && <HomePage setPage={setPage} scrollToReg={scrollToReg} />}
      {activePage === "competition" && <CompetitionPage regRef={regRef as React.RefObject<HTMLDivElement>} />}
      {activePage === "faq" && <FAQPage />}
      {activePage === "team" && <TeamPage />}
      {activePage === "contact" && <ContactPage />}

      <Footer setPage={setPage} scrollToReg={scrollToReg} />
    </>
  );
}
