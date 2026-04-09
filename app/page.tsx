export default function Home() {
  return (
    <main style={{ fontFamily: "Arial", padding: "40px", maxWidth: "900px", margin: "auto" }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>LaunchProof</h1>
        <p style={{ fontSize: "20px", color: "gray" }}>
          Build it. Prove it. Pitch it.
        </p>
      </div>

      {/* Overview */}
      <section style={{ marginBottom: "30px" }}>
        <h2>Overview</h2>
        <p>
          LaunchProof is a 4-week business and technology competition where high school
          students solve real-world problems by building a prototype or design
          (software, hardware, or CAD) and validating their ideas with real user data.
        </p>
      </section>

      {/* Details */}
      <section style={{ marginBottom: "30px" }}>
        <h2>Details</h2>
        <ul>
          <li><strong>Teams:</strong> 3–5 students</li>
          <li><strong>Registration:</strong> $20 per team</li>
          <li><strong>Duration:</strong> 4 weeks</li>
          <li><strong>Prize Pool:</strong> $750</li>
        </ul>
      </section>

      {/* Timeline */}
      <section style={{ marginBottom: "30px" }}>
        <h2>Timeline</h2>
        <ul>
          <li>Week 1: Research (20+ users)</li>
          <li>Week 2: Build prototype</li>
          <li>Week 3: Testing & validation</li>
          <li>Week 4: Final pitch</li>
        </ul>
      </section>

      {/* Button */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "black",
            color: "white",
            cursor: "pointer"
          }}
        >
          Register Now
        </button>
      </div>

    </main>
  );
}