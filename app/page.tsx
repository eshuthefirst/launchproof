// FILE: app/layout.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LaunchProof',
  description: 'Build it. Prove it. Pitch it.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white text-gray-900"}>
        <nav className="flex justify-between items-center px-8 py-4 border-b">
          <h1 className="font-bold text-xl">LaunchProof</h1>
          <div className="flex gap-6">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/competition">Competition</a>
            <a href="/apply">Apply</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

// FILE: app/page.js
export default function Home() {
  return (
    <main>
      <section className="text-center py-24 px-6">
        <h1 className="text-6xl font-bold mb-4">LaunchProof</h1>
        <p className="text-xl text-gray-600 mb-6">Build it. Prove it. Pitch it.</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700">
          Register Now
        </button>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-50 rounded-2xl">
          <h3 className="font-semibold text-lg">Teams</h3>
          <p>3–5 students</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-2xl">
          <h3 className="font-semibold text-lg">Registration</h3>
          <p>$20 per team</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-2xl">
          <h3 className="font-semibold text-lg">Duration</h3>
          <p>4 Weeks</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-2xl">
          <h3 className="font-semibold text-lg">Prize Pool</h3>
          <p>$750</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-700">
          LaunchProof is a 4-week business and technology competition where students solve real-world problems by building prototypes or designs and validating them with real user data.
        </p>
      </section>
    </main>
  );
}

// FILE: app/about/page.js
export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">About LaunchProof</h1>
      <p className="text-gray-700">
        LaunchProof is a startup-style competition where high school students build real solutions, create prototypes, and validate their ideas with real users.
      </p>
    </main>
  );
}

// FILE: app/competition/page.js
export default function Competition() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Competition</h1>

      <h2 className="text-xl font-semibold mb-2">Timeline</h2>
      <ul className="mb-6 space-y-2">
        <li>Week 1: Research (20+ users)</li>
        <li>Week 2: Build prototype</li>
        <li>Week 3: Testing & validation</li>
        <li>Week 4: Final pitch</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Prizes</h2>
      <ul className="space-y-2">
        <li>1st: $400</li>
        <li>2nd: $250</li>
        <li>3rd: $100</li>
      </ul>
    </main>
  );
}

// FILE: app/apply/page.js
export default function Apply() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Apply</h1>
      <p className="text-gray-600 mb-6">Join LaunchProof as a participant or executive.</p>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700"
        onClick={() => window.location.href = "https://forms.google.com"}
      >
        Apply Now
      </button>
    </main>
  );
}
