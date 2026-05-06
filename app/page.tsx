"use client";

import { useState, useEffect } from "react";

type Page = "home" | "competition" | "faq" | "team" | "contact";

const FORM_LINK = "https://forms.gle/4Lfgx5eu3jpr5Kuy8";

// ─── NAVBAR ─────────────────────────────────────────
function NavBar({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <nav style={{ padding: 20, display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontWeight: 800, cursor: "pointer" }} onClick={() => setPage("home")}>
        LaunchProof
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <span onClick={() => setPage("home")}>Home</span>
        <span onClick={() => setPage("competition")}>Competition</span>
        <span onClick={() => setPage("faq")}>FAQ</span>
        <span onClick={() => setPage("team")}>Team</span>
        <span onClick={() => setPage("contact")}>Contact</span>
        <button onClick={() => window.open(FORM_LINK, "_blank")}>
          Register
        </button>
      </div>
    </nav>
  );
}

// ─── HOME ───────────────────────────────────────────
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>LaunchProof</h1>
      <p>Build it. Prove it. Pitch it.</p>
      <button onClick={() => window.open(FORM_LINK, "_blank")}>
        Register Now
      </button>
    </div>
  );
}

// ─── COMPETITION ────────────────────────────────────
function CompetitionPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Competition Overview</h1>
      <p>
        LaunchProof is a prototype-based business and technology competition where students
        develop ideas, build prototypes, and present them through structured video submissions.
      </p>

      <h2>Submission</h2>
      <p>
        Upload your presentation to YouTube (Unlisted or Public), then submit the video link
        through the official Google Form.
      </p>

      <h2>Registration</h2>
      <p>Registration is free for all teams.</p>

      <button onClick={() => window.open(FORM_LINK, "_blank")}>
        Register Your Team
      </button>
    </div>
  );
}

// ─── FAQ ────────────────────────────────────────────
function FAQPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>FAQ</h1>

      <p><strong>Who can participate?</strong><br />All high school students.</p>

      <p><strong>Team size?</strong><br />3–5 students per team.</p>

      <p><strong>Do I need coding experience?</strong><br />No.</p>
    </div>
  );
}

// ─── TEAM ───────────────────────────────────────────
function TeamPage() {
  const executives = [
    { name: "Your Name", role: "Founder & Director" },
    { name: "Name", role: "Co-Director" },
    { name: "Name", role: "Tech Lead" },
    { name: "Name", role: "Marketing Lead" },
    { name: "Name", role: "Marketing Associate" },
    { name: "Name", role: "General Executive" },
  ];

  return (
    <div style={{ padding: 40 }}>
      <h1>Team & Organizers</h1>
      {executives.map((e, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <strong>{e.name}</strong> — {e.role}
        </div>
      ))}

      <button onClick={() => window.open(FORM_LINK, "_blank")}>
        Apply for Executive Team
      </button>
    </div>
  );
}

// ─── CONTACT ────────────────────────────────────────
function ContactPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Contact</h1>
      <p>Email: contact@launchproof.ca</p>
    </div>
  );
}

// ─── ROOT ───────────────────────────────────────────
export default function Page() {
  const [page, setPage] = useState<Page>("home");

  return (
    <>
      <NavBar setPage={setPage} />

      {page === "home" && <HomePage setPage={setPage} />}
      {page === "competition" && <CompetitionPage />}
      {page === "faq" && <FAQPage />}
      {page === "team" && <TeamPage />}
      {page === "contact" && <ContactPage />}
    </>
  );
}
