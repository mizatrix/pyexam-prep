"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  trueFalseQuestions,
  mcqQuestions,
  traceOutputQuestions,
  findErrorQuestions,
  writeCodeQuestions,
  fillBlankQuestions,
  expressionEvalQuestions,
  codeReorderQuestions,
  matchPairsQuestions,
  completeFunctionQuestions,
  flowchartToCodeQuestions,
} from "@/lib/data";

const SECTION_TITLES = [
  "True / False", "Multiple Choice", "Trace the Output", "Find & Fix Errors", "Write Code",
  "Fill in the Blank", "Expression Eval", "Code Reorder", "Match Pairs", "Complete Function", "Flowchart → Code",
];
const SECTION_ICONS = ["✓✗", "◉", "▶", "🐛", "💻", "✏️", "🧮", "🔀", "🔗", "📝", "📊"];
const PAGE_SIZE = 5;

function PracticeContent() {
  const searchParams = useSearchParams();
  const initialSection = parseInt(searchParams.get("section") || "0");
  const [activeSection, setActiveSection] = useState(initialSection);
  const [page, setPage] = useState(0);

  // Original section states
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean | null>>({});
  const [tfRevealed, setTfRevealed] = useState<Record<number, boolean>>({});
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number | null>>({});
  const [mcqRevealed, setMcqRevealed] = useState<Record<number, boolean>>({});
  const [traceAnswers, setTraceAnswers] = useState<Record<number, string>>({});
  const [traceRevealed, setTraceRevealed] = useState<Record<number, boolean>>({});
  const [errorRevealed, setErrorRevealed] = useState<Record<number, boolean>>({});
  const [codeAnswers, setCodeAnswers] = useState<Record<number, string>>({});
  const [codeHintLevel, setCodeHintLevel] = useState<Record<number, number>>({});
  const [codeRevealed, setCodeRevealed] = useState<Record<number, boolean>>({});

  // New section states
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [fillRevealed, setFillRevealed] = useState<Record<number, boolean>>({});
  const [exprAnswers, setExprAnswers] = useState<Record<number, string>>({});
  const [exprRevealed, setExprRevealed] = useState<Record<number, boolean>>({});
  const [reorderSelections, setReorderSelections] = useState<Record<number, number[]>>({});
  const [reorderRevealed, setReorderRevealed] = useState<Record<number, boolean>>({});
  const [matchSelections, setMatchSelections] = useState<Record<number, Record<number, number | null>>>({});
  const [matchRevealed, setMatchRevealed] = useState<Record<number, boolean>>({});
  const [cfAnswers, setCfAnswers] = useState<Record<number, string>>({});
  const [cfHintLevel, setCfHintLevel] = useState<Record<number, number>>({});
  const [cfRevealed, setCfRevealed] = useState<Record<number, boolean>>({});
  const [flowAnswers, setFlowAnswers] = useState<Record<number, number | null>>({});
  const [flowRevealed, setFlowRevealed] = useState<Record<number, boolean>>({});
  const [activeMatchLeft, setActiveMatchLeft] = useState<number | null>(null);

  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const switchSection = (idx: number) => { setActiveSection(idx); setPage(0); };

  const resetAll = () => {
    setTfAnswers({}); setTfRevealed({}); setMcqAnswers({}); setMcqRevealed({});
    setTraceAnswers({}); setTraceRevealed({}); setErrorRevealed({});
    setCodeAnswers({}); setCodeHintLevel({}); setCodeRevealed({});
    setFillAnswers({}); setFillRevealed({}); setExprAnswers({}); setExprRevealed({});
    setReorderSelections({}); setReorderRevealed({}); setMatchSelections({}); setMatchRevealed({});
    setCfAnswers({}); setCfHintLevel({}); setCfRevealed({});
    setFlowAnswers({}); setFlowRevealed({}); setActiveMatchLeft(null);
    setScores([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); setPage(0);
  };

  const ALL_QUESTIONS = [
    trueFalseQuestions, mcqQuestions, traceOutputQuestions, findErrorQuestions, writeCodeQuestions,
    fillBlankQuestions, expressionEvalQuestions, codeReorderQuestions, matchPairsQuestions,
    completeFunctionQuestions, flowchartToCodeQuestions,
  ];
  const getQuestions = () => ALL_QUESTIONS[activeSection];
  const totalPages = Math.ceil(getQuestions().length / PAGE_SIZE);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paginatedQuestions: any[] = getQuestions().slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Handlers for original sections
  const handleTF = (qId: number, ans: boolean) => {
    if (tfRevealed[qId]) return;
    setTfAnswers({ ...tfAnswers, [qId]: ans });
    const q = trueFalseQuestions.find(q => q.id === qId)!;
    const correct = ans === q.answer;
    setTfRevealed({ ...tfRevealed, [qId]: true });
    if (correct && !tfRevealed[qId]) { const s = [...scores]; s[0]++; setScores(s); }
  };
  const handleMCQ = (qId: number, idx: number) => {
    if (mcqRevealed[qId]) return;
    setMcqAnswers({ ...mcqAnswers, [qId]: idx });
    const q = mcqQuestions.find(q => q.id === qId)!;
    setMcqRevealed({ ...mcqRevealed, [qId]: true });
    if (idx === q.correctIndex) { const s = [...scores]; s[1]++; setScores(s); }
  };
  const handleTraceCheck = (qId: number) => {
    const q = traceOutputQuestions.find(q => q.id === qId)!;
    const isCorrect = (traceAnswers[qId] || "").trim() === q.expectedOutput.trim();
    setTraceRevealed({ ...traceRevealed, [qId]: true });
    if (isCorrect && !traceRevealed[qId]) { const s = [...scores]; s[2]++; setScores(s); }
  };
  const handleErrorReveal = (qId: number) => { setErrorRevealed({ ...errorRevealed, [qId]: true }); };
  const handleCodeHint = (qId: number) => {
    const current = codeHintLevel[qId] || 0;
    const q = writeCodeQuestions.find(q => q.id === qId)!;
    if (current < q.hints.length) setCfHintLevel({ ...codeHintLevel, [qId]: current + 1 });
  };
  const handleCodeReveal = (qId: number) => { setCodeRevealed({ ...codeRevealed, [qId]: true }); };

  // Handlers for new sections
  const handleFillCheck = (qId: number) => {
    const q = fillBlankQuestions.find(q => q.id === qId)!;
    const isCorrect = (fillAnswers[qId] || "").trim().toLowerCase() === q.answer.toLowerCase();
    setFillRevealed({ ...fillRevealed, [qId]: true });
    if (isCorrect && !fillRevealed[qId]) { const s = [...scores]; s[5]++; setScores(s); }
  };
  const handleExprCheck = (qId: number) => {
    const q = expressionEvalQuestions.find(q => q.id === qId)!;
    const isCorrect = (exprAnswers[qId] || "").trim() === q.answer.trim();
    setExprRevealed({ ...exprRevealed, [qId]: true });
    if (isCorrect && !exprRevealed[qId]) { const s = [...scores]; s[6]++; setScores(s); }
  };
  const handleReorderToggle = (qId: number, lineIdx: number) => {
    if (reorderRevealed[qId]) return;
    const current = reorderSelections[qId] || [];
    if (current.includes(lineIdx)) {
      setReorderSelections({ ...reorderSelections, [qId]: current.filter(i => i !== lineIdx) });
    } else {
      setReorderSelections({ ...reorderSelections, [qId]: [...current, lineIdx] });
    }
  };
  const handleReorderCheck = (qId: number) => {
    const q = codeReorderQuestions.find(q => q.id === qId)!;
    const sel = reorderSelections[qId] || [];
    const isCorrect = JSON.stringify(sel) === JSON.stringify(q.correctOrder);
    setReorderRevealed({ ...reorderRevealed, [qId]: true });
    if (isCorrect && !reorderRevealed[qId]) { const s = [...scores]; s[7]++; setScores(s); }
  };
  const handleMatchSelect = (qId: number, leftIdx: number, rightIdx: number) => {
    if (matchRevealed[qId]) return;
    const current = matchSelections[qId] || {};
    setMatchSelections({ ...matchSelections, [qId]: { ...current, [leftIdx]: rightIdx } });
  };
  const handleMatchCheck = (qId: number) => {
    const q = matchPairsQuestions.find(q => q.id === qId)!;
    const sel = matchSelections[qId] || {};
    const allCorrect = q.correctPairs.every((correct, i) => sel[i] === correct);
    setMatchRevealed({ ...matchRevealed, [qId]: true });
    if (allCorrect && !matchRevealed[qId]) { const s = [...scores]; s[8]++; setScores(s); }
  };
  const handleCFHint = (qId: number) => {
    const current = cfHintLevel[qId] || 0;
    const q = completeFunctionQuestions.find(q => q.id === qId)!;
    if (current < q.hints.length) setCfHintLevel({ ...cfHintLevel, [qId]: current + 1 });
  };
  const handleCFReveal = (qId: number) => { setCfRevealed({ ...cfRevealed, [qId]: true }); };
  const handleFlowSelect = (qId: number, idx: number) => {
    if (flowRevealed[qId]) return;
    setFlowAnswers({ ...flowAnswers, [qId]: idx });
    const q = flowchartToCodeQuestions.find(q => q.id === qId)!;
    setFlowRevealed({ ...flowRevealed, [qId]: true });
    if (idx === q.correctIndex) { const s = [...scores]; s[10]++; setScores(s); }
  };

  const answeredCount = () => {
    const answeredMaps = [tfRevealed, mcqRevealed, traceRevealed, errorRevealed, codeRevealed, fillRevealed, exprRevealed, reorderRevealed, matchRevealed, cfRevealed, flowRevealed];
    return Object.keys(answeredMaps[activeSection]).length;
  };

  const shortLabels = ["T/F", "MCQ", "Trace", "Errors", "Code", "Fill", "Eval", "Order", "Match", "Func", "Flow"];

  const renderSection = () => {
    const s = activeSection;

    // 0: True/False
    if (s === 0) return paginatedQuestions.map((q: typeof trueFalseQuestions[0]) => {
      const revealed = tfRevealed[q.id];
      const answer = tfAnswers[q.id];
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#ebedfb] mb-4">{q.statement}</p>
              {q.codeSnippet && <pre className="code-block p-4 mb-4 text-[#e2e8f0]">{q.codeSnippet}</pre>}
              <div className="flex gap-3">
                <button onClick={() => handleTF(q.id, true)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${revealed ? (q.answer === true ? "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30" : answer === true ? "bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30" : "bg-[#1a2235] text-[#6b7280] border border-transparent") : "bg-[#1a2235] text-[#ebedfb] border border-[rgba(114,220,255,0.15)] hover:border-[#00d2ff]"}`}>✓ True</button>
                <button onClick={() => handleTF(q.id, false)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${revealed ? (q.answer === false ? "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30" : answer === false ? "bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30" : "bg-[#1a2235] text-[#6b7280] border border-transparent") : "bg-[#1a2235] text-[#ebedfb] border border-[rgba(114,220,255,0.15)] hover:border-[#00d2ff]"}`}>✗ False</button>
              </div>
              {revealed && <p className="mt-3 text-[#9ca3af] text-sm">{q.explanation}</p>}
            </div>
          </div>
        </div>
      );
    });

    // 1: MCQ
    if (s === 1) return paginatedQuestions.map((q: typeof mcqQuestions[0]) => {
      const revealed = mcqRevealed[q.id];
      const selected = mcqAnswers[q.id];
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#ebedfb] mb-3">{q.question}</p>
              {q.codeSnippet && <pre className="code-block p-4 mb-4 text-[#e2e8f0] whitespace-pre-wrap">{q.codeSnippet}</pre>}
              <div className="space-y-2">
                {q.options.map((opt: string, i: number) => (
                  <button key={i} onClick={() => handleMCQ(q.id, i)} className={`w-full text-left px-4 py-3 rounded-lg text-sm border transition-all ${revealed ? (i === q.correctIndex ? "bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]" : i === selected ? "bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]" : "bg-[#1a2235] border-transparent text-[#6b7280]") : "bg-[#1a2235] border-[rgba(114,220,255,0.15)] text-[#ebedfb] hover:border-[#00d2ff]"}`}>
                    <span className="font-bold mr-2">{String.fromCharCode(97 + i)})</span> {opt}
                  </button>
                ))}
              </div>
              {revealed && <p className="mt-3 text-[#9ca3af] text-sm">{q.explanation}</p>}
            </div>
          </div>
        </div>
      );
    });

    // 2: Trace Output
    if (s === 2) return paginatedQuestions.map((q: typeof traceOutputQuestions[0]) => {
      const revealed = traceRevealed[q.id];
      const isCorrect = (traceAnswers[q.id] || "").trim() === q.expectedOutput.trim();
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#ebedfb] mb-3 font-semibold">What is the output of this code?</p>
              {q.userInput && <p className="text-[#f59e0b] text-sm mb-2">User input: {q.userInput}</p>}
              <pre className="code-block p-4 mb-4 text-[#e2e8f0] whitespace-pre-wrap">{q.code}</pre>
              <div className="mb-3">
                <label className="text-[#6b7280] text-xs uppercase tracking-wider mb-1 block">Your Output:</label>
                <textarea className="terminal-input w-full p-3" rows={2} placeholder="Type the expected output..." value={traceAnswers[q.id] || ""} onChange={e => setTraceAnswers({ ...traceAnswers, [q.id]: e.target.value })} disabled={revealed} />
              </div>
              {!revealed && <button onClick={() => handleTraceCheck(q.id)} className="px-4 py-2 bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] rounded-lg text-sm font-bold hover:bg-[#00d2ff]/20 transition-all">Check Answer</button>}
              {revealed && (
                <div className="mt-3 p-3 rounded-lg bg-[#111827] border border-[rgba(114,220,255,0.08)]">
                  <p className={`text-sm font-bold mb-2 ${isCorrect ? "text-[#10b981]" : "text-[#ef4444]"}`}>{isCorrect ? "✓ Correct!" : "✗ Incorrect"}</p>
                  <p className="text-[#6b7280] text-xs mb-1">Expected output:</p>
                  <pre className="terminal-output p-3 mb-2 whitespace-pre-wrap">{q.expectedOutput}</pre>
                  <p className="text-[#9ca3af] text-sm">{q.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });

    // 3: Find Errors
    if (s === 3) return paginatedQuestions.map((q: typeof findErrorQuestions[0]) => {
      const revealed = errorRevealed[q.id];
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#ebedfb] mb-2 font-semibold">{q.description}</p>
              <p className="text-[#f59e0b] text-xs mb-3">Find {q.errors.length} error(s) in the code below:</p>
              <pre className="code-block p-4 mb-4 text-[#e2e8f0] whitespace-pre-wrap">
                {q.buggyCode.split("\n").map((line: string, i: number) => (
                  <div key={i} className="flex"><span className="code-line-number pr-3 mr-3">{i + 1}</span><span>{line}</span></div>
                ))}
              </pre>
              {!revealed && <button onClick={() => handleErrorReveal(q.id)} className="px-4 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] rounded-lg text-sm font-bold hover:bg-[#f59e0b]/20 transition-all">Show Errors & Fixes</button>}
              {revealed && (
                <div className="space-y-3">
                  {q.errors.map((err: { line: number; description: string; fix: string }, i: number) => (
                    <div key={i} className="p-3 rounded-lg bg-[#ef4444]/5 border border-[#ef4444]/20">
                      <p className="text-[#ef4444] text-sm font-bold">Line {err.line}: {err.description}</p>
                      <p className="text-[#10b981] text-sm mt-1">Fix: {err.fix}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });

    // 4: Write Code
    if (s === 4) return paginatedQuestions.map((q: typeof writeCodeQuestions[0]) => {
      const hintLevel = codeHintLevel[q.id] || 0;
      const revealed = codeRevealed[q.id];
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#ebedfb] mb-3 font-semibold">{q.prompt}</p>
              <div className="mb-4 p-3 rounded-lg bg-[#0d1117] border border-[rgba(114,220,255,0.1)]">
                <p className="text-[#6b7280] text-xs uppercase tracking-wider mb-1">Example Run:</p>
                <pre className="text-[#10b981] text-sm whitespace-pre-wrap font-mono">{q.exampleRun}</pre>
              </div>
              {hintLevel > 0 && (
                <div className="mb-4 space-y-2">
                  {q.hints.slice(0, hintLevel).map((hint: string, i: number) => (
                    <div key={i} className="p-2 rounded bg-[#f59e0b]/5 border border-[#f59e0b]/20 text-[#f59e0b] text-sm">💡 {hint}</div>
                  ))}
                </div>
              )}
              <textarea className="terminal-input w-full p-3 mb-3" rows={5} placeholder="Write your Python code here..." value={codeAnswers[q.id] || ""} onChange={e => setCodeAnswers({ ...codeAnswers, [q.id]: e.target.value })} />
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => handleCodeHint(q.id)} className="px-4 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] rounded-lg text-sm font-bold hover:bg-[#f59e0b]/20 transition-all">Show Hint ({hintLevel}/{q.hints.length})</button>
                {!revealed && <button onClick={() => handleCodeReveal(q.id)} className="px-4 py-2 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#8b5cf6] rounded-lg text-sm font-bold hover:bg-[#8b5cf6]/20 transition-all">Show Solution</button>}
              </div>
              {revealed && (
                <div className="mt-4 p-4 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20">
                  <p className="text-[#10b981] text-sm font-bold mb-2">Sample Solution:</p>
                  <pre className="code-block p-4 text-[#e2e8f0] whitespace-pre-wrap">{q.sampleSolution}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });

    // 5: Fill in the Blank
    if (s === 5) return paginatedQuestions.map((q: typeof fillBlankQuestions[0]) => {
      const revealed = fillRevealed[q.id];
      const isCorrect = (fillAnswers[q.id] || "").trim().toLowerCase() === q.answer.toLowerCase();
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#6b7280] text-xs uppercase tracking-wider mb-2">Fill in the blank (___)</p>
              <pre className="code-block p-4 mb-4 text-[#e2e8f0] whitespace-pre-wrap">{q.code}</pre>
              <div className="flex gap-3 items-center flex-wrap">
                <input type="text" className="terminal-input px-3 py-2 flex-1 min-w-[120px]" placeholder="Your answer..." value={fillAnswers[q.id] || ""} onChange={e => setFillAnswers({ ...fillAnswers, [q.id]: e.target.value })} disabled={revealed} />
                {!revealed && <button onClick={() => handleFillCheck(q.id)} className="px-4 py-2 bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] rounded-lg text-sm font-bold hover:bg-[#00d2ff]/20 transition-all">Check</button>}
              </div>
              {revealed && (
                <div className={`mt-3 p-3 rounded-lg ${isCorrect ? "bg-[#10b981]/5 border border-[#10b981]/20" : "bg-[#ef4444]/5 border border-[#ef4444]/20"}`}>
                  <p className={`text-sm font-bold ${isCorrect ? "text-[#10b981]" : "text-[#ef4444]"}`}>{isCorrect ? "✓ Correct!" : `✗ Answer: ${q.answer}`}</p>
                  <p className="text-[#9ca3af] text-sm mt-1">{q.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });

    // 6: Expression Evaluation
    if (s === 6) return paginatedQuestions.map((q: typeof expressionEvalQuestions[0]) => {
      const revealed = exprRevealed[q.id];
      const isCorrect = (exprAnswers[q.id] || "").trim() === q.answer.trim();
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#6b7280] text-xs uppercase tracking-wider mb-2">What does this evaluate to?</p>
              <pre className="code-block p-4 mb-4 text-[#e2e8f0] text-lg font-bold whitespace-pre-wrap">{q.expression}</pre>
              <div className="flex gap-3 items-center flex-wrap">
                <input type="text" className="terminal-input px-3 py-2 flex-1 min-w-[120px]" placeholder="Result..." value={exprAnswers[q.id] || ""} onChange={e => setExprAnswers({ ...exprAnswers, [q.id]: e.target.value })} disabled={revealed} />
                {!revealed && <button onClick={() => handleExprCheck(q.id)} className="px-4 py-2 bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] rounded-lg text-sm font-bold hover:bg-[#00d2ff]/20 transition-all">Check</button>}
              </div>
              {revealed && (
                <div className={`mt-3 p-3 rounded-lg ${isCorrect ? "bg-[#10b981]/5 border border-[#10b981]/20" : "bg-[#ef4444]/5 border border-[#ef4444]/20"}`}>
                  <p className={`text-sm font-bold ${isCorrect ? "text-[#10b981]" : "text-[#ef4444]"}`}>{isCorrect ? "✓ Correct!" : `✗ Answer: ${q.answer}`}</p>
                  <p className="text-[#9ca3af] text-sm mt-1">{q.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });

    // 7: Code Reorder
    if (s === 7) return paginatedQuestions.map((q: typeof codeReorderQuestions[0]) => {
      const sel = reorderSelections[q.id] || [];
      const revealed = reorderRevealed[q.id];
      const isCorrect = JSON.stringify(sel) === JSON.stringify(q.correctOrder);
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#ebedfb] mb-2 font-semibold">{q.description}</p>
              <p className="text-[#6b7280] text-xs mb-3">Click lines in the correct order:</p>
              <div className="space-y-2 mb-4">
                {q.shuffledLines.map((line: string, i: number) => {
                  const orderPos = sel.indexOf(i);
                  return (
                    <button key={i} onClick={() => handleReorderToggle(q.id, i)} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-mono border transition-all whitespace-pre-wrap ${revealed ? (q.correctOrder.indexOf(i) === sel.indexOf(i) && sel.includes(i) ? "bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]" : "bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]") : orderPos >= 0 ? "bg-[#00d2ff]/10 border-[#00d2ff]/30 text-[#00d2ff]" : "bg-[#1a2235] border-[rgba(114,220,255,0.15)] text-[#e2e8f0] hover:border-[#00d2ff]"}`}>
                      {orderPos >= 0 && <span className="inline-block w-6 h-6 rounded-full bg-[#00d2ff]/20 text-[#00d2ff] text-xs font-bold text-center leading-6 mr-2">{orderPos + 1}</span>}
                      {line}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3">
                {!revealed && sel.length === q.shuffledLines.length && <button onClick={() => handleReorderCheck(q.id)} className="px-4 py-2 bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] rounded-lg text-sm font-bold hover:bg-[#00d2ff]/20 transition-all">Check Order</button>}
                {!revealed && sel.length > 0 && <button onClick={() => setReorderSelections({ ...reorderSelections, [q.id]: [] })} className="px-4 py-2 bg-[#6b7280]/10 border border-[#6b7280]/30 text-[#6b7280] rounded-lg text-sm font-bold hover:bg-[#6b7280]/20 transition-all">Clear</button>}
              </div>
              {revealed && (
                <div className={`mt-3 p-3 rounded-lg ${isCorrect ? "bg-[#10b981]/5 border border-[#10b981]/20" : "bg-[#ef4444]/5 border border-[#ef4444]/20"}`}>
                  <p className={`text-sm font-bold mb-1 ${isCorrect ? "text-[#10b981]" : "text-[#ef4444]"}`}>{isCorrect ? "✓ Correct order!" : "✗ Incorrect"}</p>
                  {!isCorrect && <p className="text-[#6b7280] text-xs mb-1">Correct order:</p>}
                  {!isCorrect && q.correctOrder.map((idx: number, i: number) => <p key={i} className="text-[#10b981] text-sm font-mono">{i + 1}. {q.shuffledLines[idx]}</p>)}
                  <p className="text-[#9ca3af] text-sm mt-2">{q.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });

    // 8: Match Pairs
    if (s === 8) return paginatedQuestions.map((q: typeof matchPairsQuestions[0]) => {
      const sel = matchSelections[q.id] || {};
      const revealed = matchRevealed[q.id];
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#ebedfb] mb-3 font-semibold">{q.description}</p>
              <p className="text-[#6b7280] text-xs mb-3">Click a left item, then click its matching right item:</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="space-y-2">
                  {q.leftItems.map((item: string, i: number) => (
                    <button key={i} onClick={() => !revealed && setActiveMatchLeft(i)} className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${revealed ? (sel[i] === q.correctPairs[i] ? "bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]" : "bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]") : activeMatchLeft === i ? "bg-[#00d2ff]/10 border-[#00d2ff]/30 text-[#00d2ff]" : sel[i] != null ? "bg-[#8b5cf6]/10 border-[#8b5cf6]/30 text-[#8b5cf6]" : "bg-[#1a2235] border-[rgba(114,220,255,0.15)] text-[#e2e8f0] hover:border-[#00d2ff]"}`}>
                      {item}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {q.rightItems.map((item: string, i: number) => (
                    <button key={i} onClick={() => { if (!revealed && activeMatchLeft != null) { handleMatchSelect(q.id, activeMatchLeft, i); setActiveMatchLeft(null); } }} className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${revealed ? (Object.values(sel).includes(i) && q.correctPairs[Number(Object.keys(sel).find(k => sel[Number(k)] === i))] === i ? "bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]" : "bg-[#1a2235] border-transparent text-[#6b7280]") : "bg-[#1a2235] border-[rgba(114,220,255,0.15)] text-[#e2e8f0] hover:border-[#00d2ff]"}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              {!revealed && Object.keys(sel).length === q.leftItems.length && <button onClick={() => handleMatchCheck(q.id)} className="px-4 py-2 bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] rounded-lg text-sm font-bold hover:bg-[#00d2ff]/20 transition-all">Check Matches</button>}
              {revealed && (
                <div className="mt-3 p-3 rounded-lg bg-[#111827] border border-[rgba(114,220,255,0.08)]">
                  <p className="text-[#10b981] text-sm font-bold mb-2">Correct Pairs:</p>
                  {q.leftItems.map((item: string, i: number) => <p key={i} className="text-sm text-[#e2e8f0]">{item} → {q.rightItems[q.correctPairs[i]]}</p>)}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });

    // 9: Complete Function
    if (s === 9) return paginatedQuestions.map((q: typeof completeFunctionQuestions[0]) => {
      const hintLevel = cfHintLevel[q.id] || 0;
      const revealed = cfRevealed[q.id];
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#ebedfb] mb-3 font-semibold">{q.description}</p>
              <pre className="code-block p-4 mb-3 text-[#00d2ff] whitespace-pre-wrap font-bold">{q.functionSignature}</pre>
              <div className="mb-3 p-3 rounded-lg bg-[#0d1117] border border-[rgba(114,220,255,0.1)]">
                <p className="text-[#6b7280] text-xs uppercase tracking-wider mb-1">Sample Call & Expected Output:</p>
                <pre className="text-[#e2e8f0] text-sm whitespace-pre-wrap font-mono">{q.sampleCall}</pre>
                <pre className="text-[#10b981] text-sm whitespace-pre-wrap font-mono mt-1">→ {q.expectedOutput}</pre>
              </div>
              {hintLevel > 0 && <div className="mb-3 space-y-2">{q.hints.slice(0, hintLevel).map((h: string, i: number) => <div key={i} className="p-2 rounded bg-[#f59e0b]/5 border border-[#f59e0b]/20 text-[#f59e0b] text-sm">💡 {h}</div>)}</div>}
              <textarea className="terminal-input w-full p-3 mb-3" rows={4} placeholder="Write the function body..." value={cfAnswers[q.id] || ""} onChange={e => setCfAnswers({ ...cfAnswers, [q.id]: e.target.value })} />
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => handleCFHint(q.id)} className="px-4 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] rounded-lg text-sm font-bold hover:bg-[#f59e0b]/20 transition-all">Show Hint ({hintLevel}/{q.hints.length})</button>
                {!revealed && <button onClick={() => handleCFReveal(q.id)} className="px-4 py-2 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#8b5cf6] rounded-lg text-sm font-bold hover:bg-[#8b5cf6]/20 transition-all">Show Solution</button>}
              </div>
              {revealed && (
                <div className="mt-4 p-4 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20">
                  <p className="text-[#10b981] text-sm font-bold mb-2">Sample Body:</p>
                  <pre className="code-block p-4 text-[#e2e8f0] whitespace-pre-wrap">{q.sampleBody}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });

    // 10: Flowchart to Code
    if (s === 10) return paginatedQuestions.map((q: typeof flowchartToCodeQuestions[0]) => {
      const selected = flowAnswers[q.id];
      const revealed = flowRevealed[q.id];
      return (
        <div key={q.id} className="glass-card-static p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#6b7280] text-sm font-mono min-w-[2rem]">Q{q.id}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#ebedfb] mb-3 font-semibold">{q.description}</p>
              <div className="mb-4 p-4 rounded-lg bg-[#0d1117] border border-[rgba(114,220,255,0.1)]">
                <p className="text-[#00d2ff] text-xs uppercase tracking-wider mb-2">Flowchart Steps:</p>
                <div className="space-y-1">
                  {q.steps.map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#00d2ff]/10 text-[#00d2ff] text-xs text-center leading-6 font-bold flex-shrink-0">{i + 1}</span>
                      <span className="text-[#e2e8f0] text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {q.options.map((opt: string, i: number) => (
                  <button key={i} onClick={() => handleFlowSelect(q.id, i)} className={`w-full text-left rounded-lg border transition-all overflow-hidden ${revealed ? (i === q.correctIndex ? "bg-[#10b981]/10 border-[#10b981]/30" : i === selected ? "bg-[#ef4444]/10 border-[#ef4444]/30" : "bg-[#1a2235] border-transparent") : "bg-[#1a2235] border-[rgba(114,220,255,0.15)] hover:border-[#00d2ff]"}`}>
                    <div className="p-2 sm:p-3">
                      <span className={`text-xs font-bold ${revealed ? (i === q.correctIndex ? "text-[#10b981]" : i === selected ? "text-[#ef4444]" : "text-[#6b7280]") : "text-[#00d2ff]"}`}>Option {String.fromCharCode(65 + i)}</span>
                      <pre className="text-sm text-[#e2e8f0] font-mono whitespace-pre-wrap mt-1">{opt}</pre>
                    </div>
                  </button>
                ))}
              </div>
              {revealed && <p className="mt-3 text-[#9ca3af] text-sm">{q.explanation}</p>}
            </div>
          </div>
        </div>
      );
    });

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1e]">
      <Navbar />
      <main className="pt-20 flex-grow flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-64 lg:min-h-screen lg:border-r border-b lg:border-b-0 border-[rgba(114,220,255,0.1)] bg-[#080c18] p-3 sm:p-4 lg:p-6 lg:sticky lg:top-20 lg:self-start">
          <h2 className="text-sm font-bold text-[#6b7280] uppercase tracking-widest mb-4 hidden lg:block">Sections</h2>
          {/* Mobile: scrollable row */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 lg:hidden">
            {SECTION_TITLES.map((title, i) => (
              <button key={title} onClick={() => switchSection(i)} className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl text-xs font-medium transition-all flex-shrink-0 min-w-[3.5rem] ${activeSection === i ? "bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff]" : "text-[#9ca3af] hover:bg-[#111827] border border-transparent"}`}>
                <span className="text-base leading-none">{SECTION_ICONS[i]}</span>
                <span className="text-[9px] leading-tight">{shortLabels[i]}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${scores[i] > 0 ? "bg-[#10b981]/20 text-[#10b981]" : "bg-[#1a2235] text-[#6b7280]"}`}>{scores[i]}</span>
              </button>
            ))}
          </div>
          {/* Desktop: vertical list */}
          <div className="hidden lg:flex flex-col gap-1">
            {SECTION_TITLES.map((title, i) => (
              <button key={title} onClick={() => switchSection(i)} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm font-medium transition-all whitespace-nowrap ${activeSection === i ? "bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff]" : "text-[#9ca3af] hover:bg-[#111827] hover:text-[#ebedfb] border border-transparent"}`}>
                <span className="text-base">{SECTION_ICONS[i]}</span>
                <span className="text-xs">{title}</span>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${scores[i] > 0 ? "bg-[#10b981]/20 text-[#10b981]" : "bg-[#1a2235] text-[#6b7280]"}`}>{scores[i]}</span>
              </button>
            ))}
          </div>
          {/* Mobile: score bar */}
          <div className="lg:hidden mt-3 flex items-center gap-3 px-2">
            <span className="text-xs text-[#6b7280]">Score:</span>
            <span className="text-sm font-bold text-[#00d2ff]">{scores.reduce((a, b) => a + b, 0)}/{getQuestions().length * SECTION_TITLES.length}</span>
            <div className="flex-1 h-1.5 bg-[#1a2235] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00d2ff] to-[#10b981] rounded-full transition-all duration-500" style={{ width: `${(scores.reduce((a, b) => a + b, 0) / (getQuestions().length * SECTION_TITLES.length)) * 100}%` }} />
            </div>
          </div>
          {/* Desktop: score */}
          <div className="hidden lg:block mt-6 pt-4 border-t border-[rgba(114,220,255,0.08)]">
            <p className="text-xs text-[#6b7280] uppercase tracking-widest mb-2">Total Score</p>
            <p className="text-2xl font-black text-[#00d2ff]">{scores.reduce((a, b) => a + b, 0)}</p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 p-4 md:p-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ebedfb]">
                {SECTION_ICONS[activeSection]} {SECTION_TITLES[activeSection]}
              </h1>
              <p className="text-[#6b7280] text-sm mt-1">
                {answeredCount()} of {getQuestions().length} answered • Score: {scores[activeSection]}
              </p>
            </div>
            <button onClick={resetAll} className="px-3 sm:px-4 py-2 bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] rounded-lg text-xs sm:text-sm font-bold hover:bg-[#ef4444]/20 transition-all">
              ↺ Reset All
            </button>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {renderSection()}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-10 mb-8">
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="px-4 py-2 rounded-lg border border-[rgba(114,220,255,0.15)] text-[#9ca3af] hover:border-[#00d2ff] hover:text-[#00d2ff] disabled:opacity-30 transition-all text-sm">← Previous</button>
            <span className="text-[#6b7280] text-sm">Page {page + 1} of {totalPages}</span>
            <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page === totalPages - 1} className="px-4 py-2 rounded-lg border border-[rgba(114,220,255,0.15)] text-[#9ca3af] hover:border-[#00d2ff] hover:text-[#00d2ff] disabled:opacity-30 transition-all text-sm">Next →</button>
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
