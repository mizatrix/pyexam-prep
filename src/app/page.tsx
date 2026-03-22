import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { icon: "✓✗", title: "True / False", marks: 5, count: 50, desc: "Test your understanding of Python fundamentals with concept-based true/false questions.", color: "from-[#00d2ff]/10 to-[#3b82f6]/5", borderHover: "hover:border-[#00d2ff]/40" },
  { icon: "◉", title: "Multiple Choice", marks: 5, count: 50, desc: "Practice with multiple-choice questions covering syntax, operators, and output prediction.", color: "from-[#3b82f6]/10 to-[#8b5cf6]/5", borderHover: "hover:border-[#3b82f6]/40" },
  { icon: "▶", title: "Trace the Output", marks: 8, count: 50, desc: "Read Python code and predict the exact console output — the most critical exam skill.", color: "from-[#10b981]/10 to-[#00d2ff]/5", borderHover: "hover:border-[#10b981]/40" },
  { icon: "🐛", title: "Find & Fix Errors", marks: 4, count: 50, desc: "Spot bugs in Python code and write the correct fix — a key debugging exercise.", color: "from-[#f59e0b]/10 to-[#ef4444]/5", borderHover: "hover:border-[#f59e0b]/40" },
  { icon: "💻", title: "Write Code", marks: 8, count: 50, desc: "Write complete Python programs from scratch with guided hints and model solutions.", color: "from-[#8b5cf6]/10 to-[#00d2ff]/5", borderHover: "hover:border-[#8b5cf6]/40" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1e]">
      <Navbar />

      <main className="pt-24 flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 hero-glow -z-10" />
          {/* Floating code snippets */}
          <div className="absolute top-20 left-10 text-[#00d2ff]/10 text-xs font-mono animate-float hidden lg:block">
            print(&quot;Hello World&quot;)
          </div>
          <div className="absolute top-40 right-20 text-[#3b82f6]/10 text-sm font-mono animate-float stagger-2 hidden lg:block">
            if x &gt; 5:
          </div>
          <div className="absolute bottom-20 left-1/4 text-[#8b5cf6]/10 text-xs font-mono animate-float stagger-4 hidden lg:block">
            for i in range(10):
          </div>

          <div className="max-w-7xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/20 text-[#00d2ff] text-xs font-bold tracking-widest uppercase mb-4">
              University Level Excellence
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#ebedfb] leading-tight">
              Master{" "}
              <span className="gradient-text">Python</span>{" "}
              Exams
            </h1>
            <p className="text-xl md:text-2xl text-[#9ca3af] max-w-2xl mx-auto font-light leading-relaxed">
              Practice with 370+ interactive programming questions and ace your
              BIS Introduction to Programming exam.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link
                href="/practice"
                className="group relative px-8 py-4 bg-gradient-to-br from-[#00d2ff] to-[#3b82f6] text-[#0a0f1e] font-bold rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_35px_rgba(0,210,255,0.5)] transition-all animate-pulse-glow"
              >
                <span>Start Practicing</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="px-6 py-8 border-y border-[rgba(114,220,255,0.08)]">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-black text-[#00d2ff]">370+</p>
              <p className="text-[#6b7280] text-sm mt-1">Practice Questions</p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#10b981]">11</p>
              <p className="text-[#6b7280] text-sm mt-1">Question Types</p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#8b5cf6]">30</p>
              <p className="text-[#6b7280] text-sm mt-1">Total Marks</p>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <div className="mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold tracking-tight text-[#ebedfb] mb-2">
              Technical Mastery
            </h2>
            <div className="h-1 w-20 bg-[#00d2ff] rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s, i) => (
              <Link
                key={s.title}
                href={`/practice?section=${i}`}
                className={`glass-card p-8 flex flex-col justify-between group ${s.borderHover} bg-gradient-to-b ${s.color} min-h-[220px] opacity-0 animate-slide-up stagger-${i + 1}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl">{s.icon}</span>
                  <span className="px-3 py-1 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] text-xs font-bold">
                    {s.marks} Marks
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#ebedfb] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[#9ca3af] font-light text-sm leading-relaxed">
                    {s.desc}
                  </p>
                  <p className="text-[#6b7280] text-xs mt-3">
                    {s.count} practice questions
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Bottom */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto glass-card-static p-12">
            <h2 className="text-2xl font-bold text-[#ebedfb] mb-4">
              Ready to Practice?
            </h2>
            <p className="text-[#9ca3af] mb-8">
              Start with any section or take the full practice exam. Track your
              progress and improve your score.
            </p>
            <Link
              href="/practice"
              className="inline-block px-8 py-4 bg-gradient-to-br from-[#00d2ff] to-[#3b82f6] text-[#0a0f1e] font-bold rounded-xl hover:shadow-[0_0_35px_rgba(0,210,255,0.5)] transition-all"
            >
              Begin Practice Exam →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
