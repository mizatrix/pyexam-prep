import { ExpressionEvalQuestion } from '../types';

export const expressionEvalQuestions: ExpressionEvalQuestion[] = [
  { id: 1, expression: '5 + 3 * 2', answer: '11', explanation: 'Multiplication first: 3*2=6, then 5+6=11.' },
  { id: 2, expression: '10 // 3', answer: '3', explanation: 'Floor division: 10÷3=3.33, floor is 3.' },
  { id: 3, expression: '10 % 3', answer: '1', explanation: 'Modulo: 10 divided by 3 leaves remainder 1.' },
  { id: 4, expression: '2 ** 3', answer: '8', explanation: 'Exponentiation: 2 raised to the power 3 = 8.' },
  { id: 5, expression: '15 // 4 + 15 % 4', answer: '6', explanation: '15//4=3, 15%4=3, so 3+3=6.' },
  { id: 6, expression: '"Hello" + " " + "World"', answer: 'Hello World', explanation: 'String concatenation joins strings together.' },
  { id: 7, expression: '"Ha" * 3', answer: 'HaHaHa', explanation: 'String repetition: "Ha" repeated 3 times.' },
  { id: 8, expression: 'len("Python")', answer: '6', explanation: '"Python" has 6 characters.' },
  { id: 9, expression: 'str(42) + str(8)', answer: '428', explanation: 'str() converts to string, then + concatenates: "42" + "8" = "428".' },
  { id: 10, expression: 'int(7.9)', answer: '7', explanation: 'int() truncates the decimal part, giving 7.' },
  { id: 11, expression: 'bool(0)', answer: 'False', explanation: '0 is falsy in Python, so bool(0) is False.' },
  { id: 12, expression: 'bool("hello")', answer: 'True', explanation: 'Non-empty strings are truthy, so bool("hello") is True.' },
  { id: 13, expression: 'not True and False', answer: 'False', explanation: 'not True = False, then False and False = False.' },
  { id: 14, expression: 'True or False and False', answer: 'True', explanation: 'and has higher precedence: False and False = False, then True or False = True.' },
  { id: 15, expression: '3 > 2 and 5 < 10', answer: 'True', explanation: '3>2 is True, 5<10 is True, True and True = True.' },
  { id: 16, expression: '"Python"[0]', answer: 'P', explanation: 'Index 0 gives the first character of the string.' },
  { id: 17, expression: '"Python"[-1]', answer: 'n', explanation: 'Index -1 gives the last character of the string.' },
  { id: 18, expression: '5 == 5.0', answer: 'True', explanation: 'Python considers 5 (int) and 5.0 (float) equal in value.' },
  { id: 19, expression: 'type(3.14).__name__', answer: 'float', explanation: '3.14 is a floating-point number, so its type is float.' },
  { id: 20, expression: '(10 + 5) * 2 - 4 // 2', answer: '28', explanation: '(10+5)=15, 15*2=30, 4//2=2, 30-2=28.' },
];
