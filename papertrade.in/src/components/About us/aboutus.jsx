function AboutUs() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-16 mt-10">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-[#7c56dc]">
          About Us – PaperTrend.in
        </h1>

        {/* About */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">About PaperTrend.in</h2>
          <p>
            PaperTrend.in is a <strong>paper trading platform</strong> that allows
            users to simulate stock trading in real time — without risking actual
            money. It’s designed to help students, beginners, and aspiring traders
            practice, learn, and build confidence before entering the real market.
          </p>
        </section>

        {/* Our Story */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p>
            The idea for PaperTrend.in came from a common challenge:{" "}
            <strong>
              most beginners lose money in the stock market because they lack
              experience and proper tools to practice
            </strong>
            . Paid trading simulators exist, but they are often complex or not
            accessible to students.
          </p>
          <p>
            As a <strong>Computer Science and Engineering student</strong>, I
            decided to create an easy-to-use, free platform where anyone can
            practice trading safely.
          </p>
          <p>
            My personal challenge was to{" "}
            <strong>design and deploy the platform in just 1 week</strong> — and I
            successfully did it.
          </p>
        </section>

        {/* The Journey */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">The Journey</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Started with UI/UX design for simplicity and accessibility.</li>
            <li>
              Built the frontend in <strong>React + Tailwind + Framer Motion</strong>.
            </li>
            <li>
              Developed a <strong>FastAPI backend with SQLAlchemy</strong> for
              authentication, portfolios, and leaderboard.
            </li>
            <li>
              Deployed on <strong>AWS (EC2 + RDS)</strong> for scalability and
              reliability.
            </li>
            <li>
              Integrated <strong>dark mode, real-time charts, and authentication</strong>.
            </li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Technologies Used</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold">Frontend</h3>
              <ul className="list-disc pl-6">
                <li>React.js</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Backend</h3>
              <ul className="list-disc pl-6">
                <li>FastAPI</li>
                <li>SQLAlchemy</li>
                <li>PostgreSQL (AWS RDS)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Deployment</h3>
              <ul className="list-disc pl-6">
                <li>AWS EC2</li>
                <li>AWS RDS</li>
                <li>Vercel / Netlify</li>
                <li>GitHub + CI/CD</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>📈 Risk-Free Trading Simulation with virtual money.</li>
            <li>🏆 Leaderboard to track and compete with others.</li>
            <li>📰 Blogs & Courses for learning trading basics.</li>
            <li>📊 Market Section with stock-like charts.</li>
            <li>🌙 Dark/Light Mode for personalized experience.</li>
            <li>🔒 Secure Authentication using FastAPI + SQLAlchemy.</li>
          </ul>
        </section>

        {/* Why it Matters */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Why PaperTrend.in Matters</h2>
          <p>
            PaperTrend.in helps students and beginners practice trading without
            losing money. It encourages financial literacy and shows{" "}
            <strong>what can be achieved in just 1 week</strong> with the right
            tools. By combining <strong>finance and technology</strong>, it creates
            a unique learning ecosystem.
          </p>
        </section>

        {/* Closing Line */}
        <div className="text-center text-lg font-medium text-gray-700 dark:text-gray-300">
          ✨ In just one week, PaperTrend.in went from an idea to a fully deployed app
          on AWS. This is just the start — the journey continues 🚀
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
