"use client";

import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState("home");

  const navStyle = {
    display: "flex",
    gap: "20px",
    padding: "20px",
    borderBottom: "1px solid #ddd",
    cursor: "pointer"
  };

  const container = {
    padding: "40px",
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "Arial"
  };

  return (
    <main>
      {/* NAVBAR */}
      <nav style={navStyle}>
        <span onClick={() => setPage("home")}>Home</span>
        <span onClick={() => setPage("about")}>About</span>
        <span onClick={() => setPage("competition")}>Competition</span>
        <span onClick={() => setPage("apply")}>Apply</span>
      </nav>

      <div style={container}>
        {/* HOME */}
        {page === "home" && (
          <>
            <h1 style={{ fontSize: "40px" }}>LaunchProof</h1>
            <p style={{ color: "gray" }}>
              Build it. Prove it. Pitch it.
            </p>

            <h2>Overview</h2>
            <p>
              LaunchProof is a 4-week business and technology competition where students
              build real solutions, create prototypes (software, hardware, or CAD),
              and validate them with real user data.
            </p>

            <h2>Details</h2>
            <ul>
              <li>Teams: 3–5 students</li>
              <li>Registration: $20 per team</li>
              <li>Duration: 4 weeks</li>
              <li>Prize Pool: $750</li>
            </ul>
          </>
        )}

        {/* ABOUT */}
        {page === "about" && (
          <>
            <h1>About LaunchProof</h1>
            <p>
              LaunchProof is a startup-style competition where high school students
              build real-world solutions and validate them with real users.
            </p>
          </>
        )}

        {/* COMPETITION */}
        {page === "competition" && (
          <>
            <h1>Competition</h1>

            <h2>Timeline</h2>
            <ul>
              <li>Week 1: Research (20+ users)</li>
              <li>Week 2: Build prototype</li>
              <li>Week 3: Testing</li>
              <li>Week 4: Final pitch</li>
            </ul>

            <h2>Prizes</h2>
            <ul>
              <li>1st: $400</li>
              <li>2nd: $250</li>
              <li>3rd: $100</li>
            </ul>
          </>
        )}

        {/* APPLY */}
        {page === "apply" && (
          <>
            <h1>Apply</h1>
            <p>Join LaunchProof as a participant or executive.</p>

            <button
              style={{
                padding: "12px 20px",
                background: "black",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
              onClick={() =>
                (window.location.href = "https://forms.google.com")
              }
            >
              Apply Now
            </button>
          </>
        )}
      </div>
    </main>
  );
}
