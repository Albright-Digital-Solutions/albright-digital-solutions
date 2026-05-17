export default function About() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="px-4 py-20 bg-[var(--color-brand-surface)]/30 border-b border-[var(--color-brand-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-zinc-400 font-sans">
            We are a comprehensive digital agency partnering with businesses to build the future.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-3xl prose-p:text-zinc-300">
            <h2>Our Mission</h2>
            <p>
              At Albright Digital Solutions, our mission is to eliminate the technical and creative friction that holds businesses back. We believe that non-technical founders and growing enterprises shouldn't have to piece together fragmented solutions from multiple vendors. We are your all-in-one partner.
            </p>

            <div className="my-16 border-l-4 border-[var(--color-brand-accent)] pl-8 py-2">
              <p className="text-2xl font-serif italic text-white mb-0">
                "We don't just write code or design graphics; we execute your vision and make your ideas reality."
              </p>
            </div>

            <h2>Who We Are</h2>
            <p>
              We are a team of rigorous problem-solvers bridging the gap between high-end technical development and impactful creative strategy. Whether you need a bespoke web application, a seamless data migration, or an autonomous AI agent handling your customer support, we build infrastructure that scale.
            </p>
            
            <h2>Who We Serve</h2>
            <ul>
              <li><strong>Small-to-medium business owners</strong> ready to modernize their operations.</li>
              <li><strong>Non-technical founders</strong> who need a reliable, highly-capable technical partner.</li>
              <li><strong>Startups</strong> seeking scalable digital platforms and compelling pitch materials.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
