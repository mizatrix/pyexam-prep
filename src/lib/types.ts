// Types for all exam sections

export interface TrueFalseQuestion {
  id: number;
  statement: string;
  answer: boolean;
  explanation: string;
  codeSnippet?: string;
}

export interface MCQQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TraceOutputQuestion {
  id: number;
  code: string;
  userInput?: string;
  expectedOutput: string;
  explanation: string;
}

export interface FindErrorQuestion {
  id: number;
  description: string;
  buggyCode: string;
  errors: { line: number; description: string; fix: string }[];
}

export interface WriteCodeQuestion {
  id: number;
  prompt: string;
  exampleRun: string;
  hints: string[];
  sampleSolution: string;
}

export interface UserAnswer {
  questionId: number;
  answer: unknown;
  isCorrect: boolean | null;
  isSubmitted: boolean;
}

// New question types

export interface FillBlankQuestion {
  id: number;
  code: string; // use ___ for the blank
  answer: string;
  explanation: string;
}

export interface ExpressionEvalQuestion {
  id: number;
  expression: string;
  answer: string;
  explanation: string;
}

export interface CodeReorderQuestion {
  id: number;
  description: string;
  shuffledLines: string[];
  correctOrder: number[]; // indices into shuffledLines
  explanation: string;
}

export interface MatchPairsQuestion {
  id: number;
  description: string;
  leftItems: string[];
  rightItems: string[];
  correctPairs: number[]; // rightItems index for each leftItem
}

export interface CompleteFunctionQuestion {
  id: number;
  description: string;
  functionSignature: string;
  sampleCall: string;
  expectedOutput: string;
  sampleBody: string;
  hints: string[];
}

export interface FlowchartToCodeQuestion {
  id: number;
  description: string;
  steps: string[]; // flowchart steps in order
  options: string[]; // code snippet options
  correctIndex: number;
  explanation: string;
}

export type SectionType = 'trueFalse' | 'mcq' | 'traceOutput' | 'findErrors' | 'writeCode' | 'fillBlank' | 'expressionEval' | 'codeReorder' | 'matchPairs' | 'completeFunction' | 'flowchartToCode';

export interface SectionProgress {
  total: number;
  answered: number;
  correct: number;
}
