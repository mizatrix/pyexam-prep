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

export type SectionType = 'trueFalse' | 'mcq' | 'traceOutput' | 'findErrors' | 'writeCode';

export interface SectionProgress {
  total: number;
  answered: number;
  correct: number;
}
