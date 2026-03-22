"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  trueFalseQuestions,
  mcqQuestions,
  traceOutputQuestions,
  findErrorQuestions,
  writeCodeQuestions,
} from "@/lib/data";

const SECTION_TITLES = [
  "True / False",
  "Multiple Choice",
  "Trace the Output",
  "Find & Fix Errors",
  "Write Code",
];
const SECTION_ICONS = ["✓✗", "◉", "▶", "🐛", "💻"];
const PAGE_SIZE = 5;

function PracticeContent() {
  const searchParams = useSearchParams();
  const initialSection = parseInt(searchParams.get("section") || "0");
  const [activeSection, setActiveSection] = useState(initialSection);
  const [page, setPage] = useState(0);

  // True/False state
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean | null>>({});
  const [tfRevealed, setTfRevealed] = useState<Record<number, boolean>>({});

  // MCQ state
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number | null>>({});
  const [mcqRevealed, setMcqRevealed] = useState<Record<number, boolean>>({});

  // Trace state
  const [traceAnswers, setTraceAnswers] = useState<Record<number, string>>({});
  const [traceRevealed, setTraceRevealed] = useState<Record<number, boolean>>({});

  // Find Errors state
  const [errorRevealed, setErrorRevealed] = useState<Record<number, boolean>>({});

  // Write Code state
  const [codeAnswers, setCodeAnswers] = useState<Record<number, string>>({});
  const [codeHintLevel, setCodeHintLevel] = useState<Record<number, number>>({});
  const [codeRevealed, setCodeRevealed] = useState<Record<number, boolean>>({});

  // Score tracking
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    setPage(0);
  }, [activeSection]);

  const getQuestions = () => {
    const all = [trueFalseQuestions, mcqQuestions, traceOutputQuestions, findErrorQuestions, writeCodeQuestions];
    return all[activeSection];
  };

  const totalPages = Math.ceil(getQuestions().length / PAGE_SIZE);
  const paginatedQuestions = getQuestions().slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleTfAnswer = (id: number, answer: boolean) => {
    if (tfRevealed[id]) return;
    setTfAnswers({ ...tfAnswers, [id]: answer });
    setTfRevealed({ ...tfRevealed, [id]: true });
    const q = trueFalseQuestions.find((q) => q.id === id)!;
    if (q.answer === answer) {
      setScores((s) => { const n = [...s]; n[0]++; return n; });
    }
  };

  const handleMcqAnswer = (id: number, idx: number) => {
    if (mcqRevealed[id]) return;
    setMcqAnswers({ ...mcqAnswers, [id]: idx });
    setMcqRevealed({ ...mcqRevealed, [id]: true });
    const q = mcqQuestions.find((q) => q.id === id)!;
    if (q.correctIndex === idx) {
      setScores((s) => { const n = [...s]; n[1]++; return n; });
    }
  };

  const handleTraceCheck = (id: number) => {
    setTraceRevealed({ ...traceRevealed, [id]: true });
    const q = traceOutputQuestions.find((q) => q.id === id)!;
    const userAns = (traceAnswers[id] || "").trim();
    const expected = q.expectedOutput.trim();
    if (userAns === expected) {
      setScores((s) => { const n = [...s]; n[2]++; return n; });
    }
  };

  const handleErrorReveal = (id: number) => {
    setErrorRevealed({ ...errorRevealed, [id]: true });
  };

  const handleCodeReveal = (id: number) => {
    setCodeRevealed({ ...codeRevealed, [id]: true });
  };

  const handleShowHint = (id: number) => {
    const current = codeHintLevel[id] || 0;
    const q = writeCodeQuestions.find((q) => q.id === id)!;
    if (current < q.hints.length) {
      setCodeHintLevel({ ...codeHintLevel, [id]: current + 1 });
    }
  };

  const answeredCount = () => {
    switch (activeSection) {
      case 0: return Object.keys(tfRevealed).length;
      case 1: return Object.keys(mcqRevealed).length;
      case 2: return Object.keys(traceRevealed).length;
      case 3: return Object.keys(errorRevealed).length;
      case 4: return Object.keys(codeRevealed).length;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1e]">
      <Navbar />
      <main className="pt-20 flex-grow flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-64 lg:min-h-screen lg:border-r border-b lg:border-b-0 border-[rgba(114,220,255,0.1)] bg-[#080c18] p-4 lg:p-6 lg:sticky lg:top-20 lg:self-start">
          <h2 className="text-sm font-bold text-[#6b7280] uppercase tracking-widest mb-4 hidden lg:block">
            Sections
          </h2>
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {SECTION_TITLES.map((title, i) => (
              <button
                key={title}
                onClick={() => setActiveSection(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all whitespace-nowrap ${
                  activeSection === i
                    ? "bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff]"
                    : "text-[#9ca3af] hover:bg-[#111827] hover:text-[#ebedfb] border border-transparent"
                }`}
              >
                <span className="text-lg">{SECTION_ICONS[i]}</span>
                <span className="hidden lg:inline">{title}</span>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                  scores[i] > 0 ? "bg-[#10b981]/20 text-[#10b981]" : "bg-[#1a2235] text-[#6b7280]"
                }`}>
                  {scores[i]}
                </span>
              </button>
            ))}
          </div>
          {/* Score summary */}
          <div className="hidden lg:block mt-8 pt-6 border-t border-[rgba(114,220,255,0.08)]">
            <p className="text-xs text-[#6b7280] uppercase tracking-widest mb-2">Total Score</p>
            <p className="text-3xl font-black text-[#00d2ff]">
              {scores.reduce((a, b) => a + b, 0)}
              <span className="text-sm text-[#6b7280] font-normal"> / 250</span>
            </p>
            <div className="mt-3 h-2 bg-[#1a2235] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00d2ff] to-[#10b981] rounded-full transition-all duration-500"
                style={{ width: `${(scores.reduce((a, b) => a + b, 0) / 250) * 100}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#ebedfb]">
                {SECTION_ICONS[activeSection]} {SECTION_TITLES[activeSection]}
              </h1>
              <p className="text-[#6b7280] text-sm mt-1">
                {answeredCount()} of {getQuestions().length} answered • Score: {scores[activeSection]}
              </p>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {activeSection === 0 &&
              paginatedQuestions.map((q) => {
                const tq = q as typeof trueFalseQuestions[0];
                const answered = tfRevealed[tq.id];
                const userAnswer = tfAnswers[tq.id];
                const isCorrect = userAnswer === tq.answer;
                return (
                  <div key={tq.id} className="glass-card-static p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{tq.id}</span>
                      <div className="flex-1">
                        <p className="text-[#ebedfb] mb-4">{tq.statement}</p>
                        {tq.codeSnippet && (
                          <pre className="code-block p-4 mb-4 text-[#e2e8f0]">{tq.codeSnippet}</pre>
                        )}
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleTfAnswer(tq.id, true)}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                              answered && tq.answer === true
                                ? "bg-[#10b981]/20 border border-[#10b981] text-[#10b981]"
                                : answered && userAnswer === true && !isCorrect
                                ? "bg-[#ef4444]/20 border border-[#ef4444] text-[#ef4444]"
                                : "bg-[#1a2235] border border-[rgba(114,220,255,0.15)] text-[#9ca3af] hover:border-[#10b981] hover:text-[#10b981]"
                            }`}
                          >
                            ✓ True
                          </button>
                          <button
                            onClick={() => handleTfAnswer(tq.id, false)}
                            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                              answered && tq.answer === false
                                ? "bg-[#10b981]/20 border border-[#10b981] text-[#10b981]"
                                : answered && userAnswer === false && !isCorrect
                                ? "bg-[#ef4444]/20 border border-[#ef4444] text-[#ef4444]"
                                : "bg-[#1a2235] border border-[rgba(114,220,255,0.15)] text-[#9ca3af] hover:border-[#ef4444] hover:text-[#ef4444]"
                            }`}
                          >
                            ✗ False
                          </button>
                        </div>
                        {answered && (
                          <div className={`mt-4 p-4 rounded-lg border ${isCorrect ? "bg-[#10b981]/10 border-[#10b981]/30" : "bg-[#ef4444]/10 border-[#ef4444]/30"}`}>
                            <p className={`font-bold text-sm ${isCorrect ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                              {isCorrect ? "✓ Correct!" : "✗ Incorrect"} — Answer: {tq.answer ? "True" : "False"}
                            </p>
                            <p className="text-[#9ca3af] text-sm mt-1">{tq.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            {activeSection === 1 &&
              paginatedQuestions.map((q) => {
                const mq = q as typeof mcqQuestions[0];
                const answered = mcqRevealed[mq.id];
                const userAnswer = mcqAnswers[mq.id];
                return (
                  <div key={mq.id} className="glass-card-static p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{mq.id}</span>
                      <div className="flex-1">
                        <p className="text-[#ebedfb] mb-3">{mq.question}</p>
                        {mq.codeSnippet && (
                          <pre className="code-block p-4 mb-4 text-[#e2e8f0] whitespace-pre">{mq.codeSnippet}</pre>
                        )}
                        <div className="space-y-2">
                          {mq.options.map((opt: string, i: number) => {
                            const letter = String.fromCharCode(97 + i);
                            const isSelected = userAnswer === i;
                            const isCorrectOption = mq.correctIndex === i;
                            return (
                              <button
                                key={i}
                                onClick={() => handleMcqAnswer(mq.id, i)}
                                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                                  answered && isCorrectOption
                                    ? "bg-[#10b981]/10 border-[#10b981]/50 text-[#10b981]"
                                    : answered && isSelected && !isCorrectOption
                                    ? "bg-[#ef4444]/10 border-[#ef4444]/50 text-[#ef4444]"
                                    : "bg-[#1a2235] border-[rgba(114,220,255,0.1)] text-[#9ca3af] hover:border-[#00d2ff]/40 hover:text-[#ebedfb]"
                                }`}
                                disabled={!!answered}
                              >
                                <span className="font-bold mr-2">{letter})</span> {opt}
                              </button>
                            );
                          })}
                        </div>
                        {answered && (
                          <div className={`mt-4 p-4 rounded-lg border ${userAnswer === mq.correctIndex ? "bg-[#10b981]/10 border-[#10b981]/30" : "bg-[#ef4444]/10 border-[#ef4444]/30"}`}>
                            <p className="text-[#9ca3af] text-sm">{mq.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            {activeSection === 2 &&
              paginatedQuestions.map((q) => {
                const tq = q as typeof traceOutputQuestions[0];
                const revealed = traceRevealed[tq.id];
                const userAns = (traceAnswers[tq.id] || "").trim();
                const isCorrect = revealed && userAns === tq.expectedOutput.trim();
                return (
                  <div key={tq.id} className="glass-card-static p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{tq.id}</span>
                      <div className="flex-1">
                        <p className="text-[#ebedfb] mb-3 font-semibold">What is the output of this code?</p>
                        {tq.userInput && (
                          <p className="text-[#f59e0b] text-sm mb-2">User input: {tq.userInput}</p>
                        )}
                        <pre className="code-block p-4 mb-4 text-[#e2e8f0] whitespace-pre">{tq.code}</pre>
                        <div className="mb-3">
                          <label className="text-[#6b7280] text-xs uppercase tracking-wider mb-1 block">Your Output:</label>
                          <textarea
                            className="terminal-input w-full p-3 min-h-[80px]"
                            placeholder="Type the expected output here..."
                            value={traceAnswers[tq.id] || ""}
                            onChange={(e) => setTraceAnswers({ ...traceAnswers, [tq.id]: e.target.value })}
                            disabled={revealed}
                          />
                        </div>
                        {!revealed && (
                          <button
                            onClick={() => handleTraceCheck(tq.id)}
                            className="px-5 py-2 bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] rounded-lg text-sm font-bold hover:bg-[#00d2ff]/20 transition-all"
                          >
                            Check Answer
                          </button>
                        )}
                        {revealed && (
                          <div className={`mt-4 p-4 rounded-lg border ${isCorrect ? "bg-[#10b981]/10 border-[#10b981]/30" : "bg-[#ef4444]/10 border-[#ef4444]/30"}`}>
                            <p className={`font-bold text-sm mb-2 ${isCorrect ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                              {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                            </p>
                            <p className="text-[#6b7280] text-xs mb-1">Expected output:</p>
                            <pre className="terminal-output p-3 mb-2 whitespace-pre">{tq.expectedOutput}</pre>
                            <p className="text-[#9ca3af] text-sm">{tq.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            {activeSection === 3 &&
              paginatedQuestions.map((q) => {
                const eq = q as typeof findErrorQuestions[0];
                const revealed = errorRevealed[eq.id];
                return (
                  <div key={eq.id} className="glass-card-static p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{eq.id}</span>
                      <div className="flex-1">
                        <p className="text-[#ebedfb] mb-2 font-semibold">{eq.description}</p>
                        <p className="text-[#f59e0b] text-xs mb-3">Find {eq.errors.length} error(s) in the code below:</p>
                        <pre className="code-block p-4 mb-4 text-[#e2e8f0] whitespace-pre">
                          {eq.buggyCode.split("\n").map((line: string, i: number) => (
                            <div key={i} className="flex">
                              <span className="code-line-number pr-3 mr-3">{i + 1}</span>
                              <span className={revealed && eq.errors.some((e: { line: number }) => e.line === i + 1) ? "text-[#ef4444] bg-[#ef4444]/10 px-1 rounded" : ""}>
                                {line}
                              </span>
                            </div>
                          ))}
                        </pre>
                        {!revealed && (
                          <button
                            onClick={() => handleErrorReveal(eq.id)}
                            className="px-5 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] rounded-lg text-sm font-bold hover:bg-[#f59e0b]/20 transition-all"
                          >
                            Show Errors & Fixes
                          </button>
                        )}
                        {revealed && (
                          <div className="space-y-3 mt-4">
                            {eq.errors.map((err: { line: number; description: string; fix: string }, i: number) => (
                              <div key={i} className="p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
                                <p className="text-[#ef4444] text-sm font-bold">Line {err.line}: {err.description}</p>
                                <p className="text-[#10b981] text-sm font-mono mt-1">Fix: {err.fix}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            {activeSection === 4 &&
              paginatedQuestions.map((q) => {
                const wq = q as typeof writeCodeQuestions[0];
                const revealed = codeRevealed[wq.id];
                const hintLevel = codeHintLevel[wq.id] || 0;
                return (
                  <div key={wq.id} className="glass-card-static p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{wq.id}</span>
                      <div className="flex-1">
                        <p className="text-[#ebedfb] mb-3 font-semibold">{wq.prompt}</p>
                        <div className="mb-4 p-3 rounded-lg bg-[#0d1117] border border-[rgba(114,220,255,0.1)]">
                          <p className="text-[#6b7280] text-xs uppercase tracking-wider mb-1">Example Run:</p>
                          <pre className="text-[#10b981] text-sm whitespace-pre font-mono">{wq.exampleRun}</pre>
                        </div>
                        {hintLevel > 0 && (
                          <div className="mb-4 space-y-2">
                            {wq.hints.slice(0, hintLevel).map((hint: string, i: number) => (
                              <div key={i} className="p-2 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] text-sm">
                                💡 Hint {i + 1}: {hint}
                              </div>
                            ))}
                          </div>
                        )}
                        <textarea
                          className="terminal-input w-full p-4 min-h-[120px] mb-3"
                          placeholder="Write your Python code here..."
                          value={codeAnswers[wq.id] || ""}
                          onChange={(e) => setCodeAnswers({ ...codeAnswers, [wq.id]: e.target.value })}
                        />
                        <div className="flex gap-3 flex-wrap">
                          {hintLevel < wq.hints.length && (
                            <button
                              onClick={() => handleShowHint(wq.id)}
                              className="px-4 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] rounded-lg text-sm font-bold hover:bg-[#f59e0b]/20 transition-all"
                            >
                              Show Hint ({hintLevel}/{wq.hints.length})
                            </button>
                          )}
                          {!revealed && (
                            <button
                              onClick={() => handleCodeReveal(wq.id)}
                              className="px-4 py-2 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#8b5cf6] rounded-lg text-sm font-bold hover:bg-[#8b5cf6]/20 transition-all"
                            >
                              Show Solution
                            </button>
                          )}
                        </div>
                        {revealed && (
                          <div className="mt-4 p-4 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20">
                            <p className="text-[#10b981] text-sm font-bold mb-2">Sample Solution:</p>
                            <pre className="code-block p-4 text-[#e2e8f0] whitespace-pre">{wq.sampleSolution}</pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-10 mb-8">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 rounded-lg border border-[rgba(114,220,255,0.15)] text-[#9ca3af] hover:border-[#00d2ff] hover:text-[#00d2ff] disabled:opacity-30 disabled:hover:border-[rgba(114,220,255,0.15)] disabled:hover:text-[#9ca3af] transition-all text-sm"
            >
              ← Previous
            </button>
            <span className="text-[#6b7280] text-sm">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="px-4 py-2 rounded-lg border border-[rgba(114,220,255,0.15)] text-[#9ca3af] hover:border-[#00d2ff] hover:text-[#00d2ff] disabled:opacity-30 disabled:hover:border-[rgba(114,220,255,0.15)] disabled:hover:text-[#9ca3af] transition-all text-sm"
            >
              Next →
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <div className="text-[#00d2ff] animate-pulse text-xl font-bold">Loading...</div>
      </div>
    }>
      <PracticeContent />
    </Suspense>
  );
}
