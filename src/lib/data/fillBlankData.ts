import { FillBlankQuestion } from '../types';

export const fillBlankQuestions: FillBlankQuestion[] = [
  { id: 1, code: 'x = ___("Enter a number: ")', answer: 'input', explanation: 'The input() function reads user input from the console.' },
  { id: 2, code: 'for i in ___(5):', answer: 'range', explanation: 'range() generates a sequence of numbers: 0, 1, 2, 3, 4.' },
  { id: 3, code: 'x = int("42")\n___(x)', answer: 'print', explanation: 'print() outputs values to the console.' },
  { id: 4, code: 'name = "Python"\nprint(___(name))', answer: 'len', explanation: 'len() returns the length (number of characters) of a string.' },
  { id: 5, code: 'numbers = [3, 1, 4, 1, 5]\nnumbers.___()', answer: 'sort', explanation: 'The sort() method sorts a list in ascending order in-place.' },
  { id: 6, code: 'x = 10\ny = 3\nresult = x ___ y  # result is 1', answer: '%', explanation: 'The % operator returns the remainder of integer division. 10 % 3 = 1.' },
  { id: 7, code: 'text = "Hello World"\nprint(text.___())', answer: 'upper', explanation: 'upper() converts all characters in a string to uppercase.' },
  { id: 8, code: 'fruits = ["apple", "banana"]\nfruits.___("cherry")', answer: 'append', explanation: 'append() adds an element to the end of a list.' },
  { id: 9, code: 'x = 5\ny = 2\nresult = x ___ y  # result is 2', answer: '//', explanation: 'The // operator performs integer (floor) division. 5 // 2 = 2.' },
  { id: 10, code: 'x = True\ny = False\nprint(x ___ y)  # prints True', answer: 'or', explanation: 'The or operator returns True if at least one operand is True.' },
  { id: 11, code: 'nums = [1, 2, 3, 4, 5]\nprint(___(nums))', answer: 'sum', explanation: 'sum() adds up all elements in an iterable.' },
  { id: 12, code: 'x = 3.7\nprint(___(x))  # prints 3', answer: 'int', explanation: 'int() truncates a float to an integer by removing the decimal part.' },
  { id: 13, code: 'word = "Python"\nprint(word[0:___])  # prints "Pyt"', answer: '3', explanation: 'Slicing word[0:3] extracts characters at indices 0, 1, 2.' },
  { id: 14, code: 'x = [1, 2, 3]\ny = ___(x)  # y is the number of elements', answer: 'len', explanation: 'len() returns the number of elements in a list.' },
  { id: 15, code: 'name = "alice"\nprint(name.___())  # prints "Alice"', answer: 'capitalize', explanation: 'capitalize() returns the string with its first character capitalized.' },
  { id: 16, code: 'x = ___  # a boolean value meaning yes/affirmative', answer: 'True', explanation: 'True is the boolean literal for a positive/affirmative value in Python.' },
  { id: 17, code: 'nums = [10, 20, 30]\nprint(___(nums))  # prints 30', answer: 'max', explanation: 'max() returns the largest element in an iterable.' },
  { id: 18, code: 'text = "Hello World"\nprint(text.___("World", "Python"))', answer: 'replace', explanation: 'replace() returns a new string with occurrences of old replaced by new.' },
  { id: 19, code: 'x = "42"\ny = ___(x)  # convert string to integer', answer: 'int', explanation: 'int() converts a string representation of a number to an integer.' },
  { id: 20, code: 'for i in range(1, ___):\n    print(i)  # prints 1, 2, 3, 4', answer: '5', explanation: 'range(1, 5) generates numbers from 1 up to but not including 5.' },
];
