"use client";
import { useState } from "react";

type CSSProps = React.CSSProperties;

export default function App() {
  const [page, setPage] = useState("home");

  const nav = (p: string) => setPage(p);

  const NavBtn = ({ id, label }: { id: string; label: string }) => (
    <button
      style={{
        padding: "8px 18px",
        borderRadius: 8,
        fontSize: 14,
        background: page === id ? "#1e40af" : "transparent",
        color: page === id ? "#fff" : "#475569",
        border: "none",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        fontWeight: page === id ? 600 : 400,
      }}
      onClick={() => nav(id)}
    >
      {label}
    </button>
  );

  const Check = () => (
    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#eff6ff", border: "0.5px solid #bfdbfe", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563eb", display: "block" }} />
    </span>
  );

  const WhiteCheck = () => (
    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "block" }} />
    </span>
  );

  const Footer = () => (
    <div style={{ borderTop: "0.5px solid #e2e8f0", padding: "28px 52px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#1d4ed8" }}>LaunchProof</span>
      <span style={{ fontSize: 13, color: "#94a3b8" }}>High school innovation challenge · Burlington, ON</span>
    </div>
  );

  const heroBg: CSSProps = {
    background: "#1d4ed8",
    padding: "90px 52px 80px",
  };

  const h1Style: CSSProps = {
    fontSize: 58,
    fontWeight: 700,
    lineHeight: 1.06,
    letterSpacing: "-2.5px",
    marginBottom: 22,
    color: "#fff",
    margin: "0 0 22px 0",
  };

  const heroSub: CSSProps = {
    fontSize: 19,
    color: "#bfdbfe",
    lineHeight: 1.65,
    maxWidth: 560,
    marginBottom: 40,
  };

  const sectionTag: CSSProps = {
    fontSize: 12,
    fontWeight: 600,
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 12,
    display: "block",
  };

  const h2Style: CSSProps = {
    fontSize: 38,
    fontWeight: 700,
    letterSpacing: "-1.2px",
    marginBottom: 16,
    color: "#0f172a",
    margin: "0 0 16px 0",
  };

  const bodyText: CSSProps = {
    fontSize: 16,
    color: "#475569",
    lineHeight: 1.75,
    maxWidth: 620,
    margin: 0,
  };

  const card: CSSProps = {
    background: "#fff",
    border: "0.5px solid #e2e8f0",
    borderRadius: 14,
    padding: "28px 24px",
  };

  const blueCard: CSSProps = {
    background: "#1d4ed8",
    borderRadius: 14,
    padding: "28px 24px",
  };

  const bigBlueBtn: CSSProps = {
    background: "#1d4ed8",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
    width: "100%",
  };

  const btnWhite: CSSProps = {
    background: "#fff",
    color: "#1d4ed8",
    padding: "14px 30px",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
  };

  const btnOutlineWhite: CSSProps = {
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    padding: "14px 30px",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    border: "0.5px solid rgba(255,255,255,0.4)",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
  };

  const applyTag: CSSProps = {
    fontSize: 12,
    fontWeight: 600,
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 16,
    display: "block",
  };

  const applyH2: CSSProps = {
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: "-0.8px",
    marginBottom: 14,
    color: "#0f172a",
    margin: "0 0 14px 0",
  };

  const applyP: CSSProps = {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.7,
    marginBottom: 24,
  };

  const checkList: CSSProps = {
    listStyle: "none",
    padding: 0,
    margin: "0 0 28px 0",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  };

  const checkItem: CSSProps = {
    fontSize: 14,
    color: "#475569",
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  };

  const pts: CSSProps = {
    display: "inline-block",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontSize: 12,
    fontWeight: 600,
    padding: "3px 12px",
    borderRadius: 99,
    border: "0.5px solid #bfdbfe",
  };

  const weeks = [
    { week: "Week 1", title: "Problem & research", desc: "Identify a real-world problem and collect data from at least 20 users through surveys, interviews, or polls. Submit your problem statement and research evidence." },
    { week: "Week 2", title: "Prototype development", desc: "Build a functional prototype — a software application, hardware device, or a 3D CAD design using AutoCAD or Autodesk Inventor. Submit a progress checkpoint." },
    { week: "Week 3", title: "Testing & validation", desc: "Show your prototype to real users. Collect feedback, screenshots, and quotes. Demonstrate that you iterated your product based on what you learned." },
    { week: "Week 4", title: "Final pitch", desc: "Refine your product and business model. Prepare a 3–5 minute pitch presentation for the investor panel on Demo Day." },
  ];

  const rubricRows = [
    { cat: "Problem & research", desc: "Is the problem real? Is the data from 20+ users strong and credible?", pts: "20 pts" },
    { cat: "Prototype quality", desc: "Functionality, design, and effort — software, hardware, or CAD all count equally.", pts: "25 pts" },
    { cat: "Validation & testing", desc: "Did real users test it? Did feedback shape the final product?", pts: "20 pts" },
    { cat: "Innovation", desc: "Is the solution creative and meaningfully different from existing options?", pts: "15 pts" },
    { cat: "Business viability", desc: "Is there a realistic target market and a clear revenue model?", pts: "10 pts" },
    { cat: "Pitch & presentation", desc: "Clarity, confidence, and quality of the final Demo Day pitch.", pts: "10 pts" },
  ];

  const members = [
    { initials: "YN", name: "Your Name", role: "Founder & Director", desc: "Leads the overall vision and operations of LaunchProof. DECA competitor and programmer passionate about bridging business and technology.", bg: "#1d4ed8" },
    { initials: "TM", name: "Team Member", role: "Operations Lead", desc: "Manages event logistics, team communications, and weekly checkpoint coordination across all participating teams.", bg: "#2563eb" },
    { initials: "TM", name: "Team Member", role: "Marketing Lead", desc: "Runs LaunchProof's Instagram, outreach campaigns, and school partnerships to grow awareness and participation.", bg: "#3b82f6" },
    { initials: "TM", name: "Team Member", role: "Partnerships Lead", desc: "Leads sponsor outreach and manages relationships with industry partners, judges, and community organizations.", bg: "#1e40af" },
    { initials: "TM", name: "Team Member", role: "Tech Lead", desc: "Oversees the technical side of submissions, judging coordination, and platform setup for Demo Day.", bg: "#1d4ed8" },
  ];

  const execRoles = ["Operations", "Marketing & Socials", "Partnerships & Sponsorship", "Tech & Submissions", "Design & Branding", "Judge Coordination"];

  const prizes: [string, string, boolean][] = [
    ["1st place", "$400", true],
    ["2nd place", "$250", false],
    ["3rd place", "$100", false],
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#fff", color: "#0f172a", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 52px", background: "#fff", borderBottom: "0.5px solid #e2e8f0" }}>
        <span style={{ fontSize: 18, fontWeight: 700, cursor: "pointer", color: "#1e40af", letterSpacing: "-0.5px" }} onClick={() => nav("home")}>
          LaunchProof
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          <NavBtn id="home" label="Home" />
          <NavBtn id="competition" label="Competition" />
          <NavBtn id="about" label="About us" />
          <NavBtn id="register" label="Register" />
          <NavBtn id="exec" label="Join exec" />
        </div>
      </nav>

      {/* ───── HOME ───── */}
      {page === "home" && (
        <div>
          <div style={heroBg}>
            <div style={{ maxWidth: 760 }}>
              <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, padding: "6px 16px", borderRadius: 99, marginBottom: 28, fontWeight: 500, border: "0.5px solid rgba(255,255,255,0.3)" }}>
                Applications open — Spring 2025
              </span>
              <h1 style={h1Style}>
                Build it.<br />
                <span style={{ color: "#93c5fd" }}>Prove</span> it.<br />
                Pitch it.
              </h1>
              <p style={heroSub}>
                A 4-week startup challenge where high school students design real solutions, build prototypes, and validate their ideas with real users.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button style={btnWhite} onClick={() => nav("register")}>Register your team</button>
                <button style={btnOutlineWhite} onClick={() => nav("competition")}>Learn more</button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: "0.5px solid #e2e8f0" }}>
            {[["$750", "Prize pool"], ["4 wks", "Competition length"], ["5", "Students per team"], ["20+", "User data required"]].map(([val, label], i) => (
              <div key={i} style={{ padding: "32px 52px", borderRight: i < 3 ? "0.5px solid #e2e8f0" : "none" }}>
                <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-1.5px", color: "#1d4ed8", marginBottom: 4 }}>{val}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* What is it */}
          <div style={{ padding: "72px 52px", maxWidth: 1000 }}>
            <span style={sectionTag}>What is LaunchProof?</span>
            <h2 style={h2Style}>Not just a hackathon.</h2>
            <p style={bodyText}>
              LaunchProof is a business and technology competition for high school students. Teams solve real-world problems by building a prototype or design — software, hardware, or CAD — and proving people actually want it with real user data.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 36 }}>
              {[
                { num: "01", title: "Identify a problem", desc: "Research a real-world issue and collect data from 20+ people to prove it matters.", blue: false },
                { num: "02", title: "Build a prototype", desc: "Create a software app, hardware device, or CAD design using AutoCAD or Autodesk Inventor.", blue: true },
                { num: "03", title: "Prove the demand", desc: "Test with real users, collect feedback, iterate — then pitch to a panel of industry judges.", blue: false },
              ].map(c => (
                <div key={c.num} style={c.blue ? blueCard : card}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.blue ? "#93c5fd" : "#2563eb", marginBottom: 10 }}>{c.num}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: c.blue ? "#fff" : "#0f172a" }}>{c.title}</div>
                  <p style={{ fontSize: 14, color: c.blue ? "#bfdbfe" : "#64748b", lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why section */}
          <div style={{ background: "#f8faff", borderTop: "0.5px solid #e2e8f0", borderBottom: "0.5px solid #e2e8f0", padding: "64px 52px" }}>
            <span style={sectionTag}>Why LaunchProof?</span>
            <h2 style={h2Style}>Built different.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 28 }}>
              {[
                { title: "Real validation required", desc: "No idea-only projects. Teams must prove at least 20 people care about their solution." },
                { title: "Prototype or it didn't happen", desc: "Software, hardware, or CAD — every team ships something real before pitching." },
                { title: "4 weeks, not 24 hours", desc: "Depth over speed. Teams have a full month to build, test, and refine their products." },
              ].map(c => (
                <div key={c.title} style={card}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#0f172a" }}>{c.title}</div>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding: "72px 52px", textAlign: "center", background: "#1d4ed8" }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-1px", color: "#fff", marginBottom: 16 }}>Ready to build something real?</h2>
            <p style={{ fontSize: 16, color: "#bfdbfe", marginBottom: 36, lineHeight: 1.65 }}>$20 per team. $750 in prizes. 4 weeks to prove your idea works.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button style={btnWhite} onClick={() => nav("register")}>Register your team</button>
              <button style={btnOutlineWhite} onClick={() => nav("exec")}>Join the exec team</button>
            </div>
          </div>

          <Footer />
        </div>
      )}

      {/* ───── COMPETITION ───── */}
      {page === "competition" && (
        <div>
          <div style={heroBg}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 12 }}>The competition</span>
            <h1 style={{ ...h1Style, fontSize: 46 }}>4 weeks. Real products.<br />Real validation.</h1>
            <p style={{ ...heroSub, marginBottom: 0 }}>Teams of up to 5 students go from idea to prototype to pitch in one month. Every team must prove genuine user demand.</p>
          </div>

          <div style={{ padding: "64px 52px 0" }}>
            <span style={sectionTag}>Timeline</span>
            <h2 style={h2Style}>How it works</h2>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "0.5px solid #e2e8f0", marginTop: 32 }}>
              {weeks.map((w, i) => (
                <div key={i} style={{ display: "flex", borderBottom: i < weeks.length - 1 ? "0.5px solid #e2e8f0" : "none" }}>
                  <div style={{ padding: "22px 28px", width: 140, flexShrink: 0, borderRight: "0.5px solid #e2e8f0", fontSize: 13, fontWeight: 600, color: "#2563eb", background: "#f8faff" }}>{w.week}</div>
                  <div style={{ padding: "22px 28px" }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 5, color: "#0f172a" }}>{w.title}</div>
                    <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, margin: 0 }}>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "64px 52px 0" }}>
            <span style={sectionTag}>Prototype</span>
            <h2 style={h2Style}>What you need to build</h2>
            <p style={{ ...bodyText, marginBottom: 28 }}>Every team must submit a functional prototype. You choose the medium — all are judged equally.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { title: "Software", desc: "A working web app, mobile app, or digital tool. Doesn't need to be perfect — just functional and testable." },
                { title: "Hardware", desc: "A physical prototype or device that solves your chosen problem. Built and demonstrated on Demo Day." },
                { title: "CAD design", desc: "A detailed 3D model built in AutoCAD or Autodesk Inventor, paired with a clear implementation plan." },
              ].map(c => (
                <div key={c.title} style={card}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#0f172a" }}>{c.title}</div>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "64px 52px 0" }}>
            <span style={sectionTag}>Prizes</span>
            <h2 style={h2Style}>$750 prize pool</h2>
            <p style={{ ...bodyText, marginBottom: 32 }}>Top three teams win cash prizes, awarded on Demo Day by our investor panel.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {prizes.map(([place, amt, gold]) => (
                <div key={place} style={{ borderRadius: 14, padding: "36px 28px", textAlign: "center", background: gold ? "#1d4ed8" : "#f8faff", border: gold ? "none" : "0.5px solid #e2e8f0" }}>
                  <div style={{ fontSize: 13, color: gold ? "#bfdbfe" : "#64748b", marginBottom: 8 }}>{place}</div>
                  <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-2px", color: gold ? "#fff" : "#1d4ed8" }}>{amt}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "64px 52px" }}>
            <span style={sectionTag}>Judging rubric</span>
            <h2 style={h2Style}>How teams are scored</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 24, fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "12px 18px", fontWeight: 600, fontSize: 13, color: "#64748b", borderBottom: "0.5px solid #e2e8f0" }}>Category</th>
                  <th style={{ textAlign: "left", padding: "12px 18px", fontWeight: 600, fontSize: 13, color: "#64748b", borderBottom: "0.5px solid #e2e8f0" }}>What judges look for</th>
                  <th style={{ textAlign: "left", padding: "12px 18px", fontWeight: 600, fontSize: 13, color: "#64748b", borderBottom: "0.5px solid #e2e8f0" }}>Points</th>
                </tr>
              </thead>
              <tbody>
                {rubricRows.map(r => (
                  <tr key={r.cat}>
                    <td style={{ padding: "16px 18px", borderBottom: "0.5px solid #e2e8f0", fontWeight: 600, color: "#0f172a", verticalAlign: "top" }}>{r.cat}</td>
                    <td style={{ padding: "16px 18px", borderBottom: "0.5px solid #e2e8f0", color: "#475569", lineHeight: 1.6, verticalAlign: "top" }}>{r.desc}</td>
                    <td style={{ padding: "16px 18px", borderBottom: "0.5px solid #e2e8f0", verticalAlign: "top" }}><span style={pts}>{r.pts}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: "#1d4ed8", padding: "64px 52px", textAlign: "center" }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Ready to compete?</h2>
            <p style={{ color: "#bfdbfe", fontSize: 16, marginBottom: 32 }}>$20 per team. Applications open now.</p>
            <button style={btnWhite} onClick={() => nav("register")}>Register your team</button>
          </div>

          <Footer />
        </div>
      )}

      {/* ───── ABOUT ───── */}
      {page === "about" && (
        <div>
          <div style={heroBg}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 12 }}>About us</span>
            <h1 style={{ ...h1Style, fontSize: 46 }}>Meet the team behind LaunchProof.</h1>
            <p style={{ ...heroSub, marginBottom: 0 }}>Founded by students who wanted a competition that rewards real building, real data, and real impact — not just the best presenter.</p>
          </div>

          <div style={{ padding: "64px 52px 40px" }}>
            <span style={sectionTag}>Our mission</span>
            <h2 style={h2Style}>Why we built this.</h2>
            <p style={bodyText}>Most student competitions reward the best presenter, not the best builder. LaunchProof was created to change that — to give high school students a platform where ideas are only valid if they are proven.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, padding: "0 52px 72px" }}>
            {members.map((m, i) => (
              <div key={i} style={{ border: "0.5px solid #e2e8f0", borderRadius: 14, padding: "28px 24px", background: "#fff" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 16 }}>{m.initials}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: "#0f172a" }}>{m.name}</div>
                <div style={{ fontSize: 13, color: "#2563eb", fontWeight: 500, marginBottom: 10 }}>{m.role}</div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
            <div style={{ border: "1.5px dashed #bfdbfe", borderRadius: 14, padding: "28px 24px", background: "#f8faff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 200, gap: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#64748b" }}>Your spot on the team</div>
              <button style={{ ...bigBlueBtn, width: "auto", padding: "12px 24px", fontSize: 14 }} onClick={() => nav("exec")}>Apply to join exec</button>
            </div>
          </div>

          <Footer />
        </div>
      )}

      {/* ───── REGISTER ───── */}
      {page === "register" && (
        <div>
          <div style={heroBg}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 12 }}>Register</span>
            <h1 style={{ ...h1Style, fontSize: 46 }}>Enter your team.</h1>
            <p style={{ ...heroSub, marginBottom: 0 }}>Teams of 3–5 high school students. $20 entry fee. 4 weeks to prove your idea.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, padding: "52px 52px 72px" }}>
            <div style={{ border: "1.5px solid #2563eb", borderRadius: 14, padding: "40px 36px", background: "#fff" }}>
              <span style={applyTag}>Compete</span>
              <h2 style={applyH2}>Team registration</h2>
              <p style={applyP}>Register your team to compete in LaunchProof's 4-week startup challenge. All skill levels welcome — you need builders, designers, and strategists.</p>
              <ul style={checkList}>
                {["Teams of 3–5 students", "$20 registration fee per team", "Must submit weekly checkpoints", "Prototype required (software, hardware, or CAD)", "20+ user data points required", "Final Demo Day pitch to industry judges"].map(item => (
                  <li key={item} style={checkItem}><Check /><span>{item}</span></li>
                ))}
              </ul>
              <button style={bigBlueBtn}>Register your team — $20</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "#f8faff", border: "0.5px solid #e2e8f0", borderRadius: 14, padding: "28px 28px" }}>
                <span style={applyTag}>Prizes</span>
                <h2 style={{ ...applyH2, fontSize: 20 }}>What you are competing for</h2>
                {prizes.map(([place, amt, blue]) => (
                  <div key={place} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "#fff", borderRadius: 8, border: "0.5px solid #e2e8f0", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: "#475569" }}>{place}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: blue ? "#1d4ed8" : "#0f172a" }}>{amt}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "#1d4ed8", borderRadius: 14, padding: "28px 28px" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, display: "block" }}>Key rules</span>
                <ul style={{ ...checkList, marginBottom: 0 }}>
                  {["Minimum 20 users surveyed or interviewed", "Prototype is mandatory — no idea-only projects", "Validation evidence required to win", "All members must be high school students"].map(item => (
                    <li key={item} style={{ ...checkItem, color: "#bfdbfe" }}><WhiteCheck /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}

      {/* ───── EXEC ───── */}
      {page === "exec" && (
        <div>
          <div style={heroBg}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 12 }}>Join exec</span>
            <h1 style={{ ...h1Style, fontSize: 46 }}>Help run LaunchProof.</h1>
            <p style={{ ...heroSub, marginBottom: 0 }}>We're looking for driven high school students to join the executive team. No experience needed — just initiative and a passion for innovation.</p>
          </div>

          <div style={{ padding: "64px 52px 32px" }}>
            <span style={sectionTag}>Open roles</span>
            <h2 style={h2Style}>What we're hiring for</h2>
            <p style={{ ...bodyText, marginBottom: 28 }}>Every exec member takes ownership of a real function of the organization. These are not passive roles — you will have real responsibilities.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 28 }}>
              {execRoles.map(r => (
                <div key={r} style={{ background: "#eff6ff", border: "0.5px solid #bfdbfe", borderRadius: 8, padding: "12px 16px", fontSize: 13, fontWeight: 500, color: "#1d4ed8", textAlign: "center" }}>{r}</div>
              ))}
            </div>
          </div>

          <div style={{ padding: "0 52px 72px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
              <div style={{ border: "1.5px solid #2563eb", borderRadius: 14, padding: "40px 36px", background: "#fff" }}>
                <span style={applyTag}>Executive application</span>
                <h2 style={applyH2}>Apply to join the team</h2>
                <p style={applyP}>Exec members help plan, run, and grow LaunchProof. This is a real leadership role that looks strong on university applications — especially for programs like Waterloo.</p>
                <ul style={checkList}>
                  {["Open to all high school students", "No prior experience required", "Gain real leadership and org experience", "Listed on the LaunchProof website", "Certificate of participation provided", "Strong addition to university applications"].map(item => (
                    <li key={item} style={checkItem}><Check /><span>{item}</span></li>
                  ))}
                </ul>
                <button style={bigBlueBtn}>Apply to join exec</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: "#f8faff", border: "0.5px solid #e2e8f0", borderRadius: 14, padding: "28px 28px" }}>
                  <span style={applyTag}>Why join?</span>
                  <h2 style={{ ...applyH2, fontSize: 20 }}>What you get</h2>
                  {["Real leadership experience", "Listed on official website", "University application boost", "Network with industry judges", "Run a real organization"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: "0.5px solid #e2e8f0" }}>
                      <Check /><span style={{ fontSize: 14, color: "#475569" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#1d4ed8", borderRadius: 14, padding: "28px 28px" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Especially great for Waterloo applicants</div>
                  <p style={{ fontSize: 14, color: "#bfdbfe", lineHeight: 1.65, margin: 0 }}>Founding or leading a real student organization is exactly the kind of initiative that top engineering and business programs want to see.</p>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
}
