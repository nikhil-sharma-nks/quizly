import { QuizReducer } from '../../reducers';
import { InitialState } from '../../context';
import { QuizActionType, QuizStateType } from '../../types';
describe('testing cart reducer', () => {
  test('should load categories', () => {
    const action: QuizActionType = {
      type: 'LOAD_QUIZ_CATEGORIES',
      payload: [
        {
          id: '1',
          categoryName: 'Science: Computers',
          description:
            'This is for all the teck geeks out there! Show off your knowledge',
          img: 'COMPUTER_1',
        },
        {
          id: '2',
          categoryName: 'General Knowledge',
          description:
            'Take this General Knowledge Quiz to know whether you know the basics of this world',
          img: 'GENERAL_KNOWLEDGE_2',
        },
      ],
    };
    const expectedState: QuizStateType = {
      categories: [
        {
          id: '1',
          categoryName: 'Science: Computers',
          description:
            'This is for all the teck geeks out there! Show off your knowledge',
          img: 'COMPUTER_1',
        },
        {
          id: '2',
          categoryName: 'General Knowledge',
          description:
            'Take this General Knowledge Quiz to know whether you know the basics of this world',
          img: 'GENERAL_KNOWLEDGE_2',
        },
      ],
      difficulty: '',
      quantity: 0,
      result: {
        attemptedQuestions: '',
        finalScore: '',
      },
      searchQuery: '',
    };
    const state = QuizReducer(InitialState, action);
    expect(state).toEqual(expectedState);
  });

  test('should load quiz options - difficulty and quantity', () => {
    const action: QuizActionType = {
      type: 'LOAD_QUIZ_OPTIONS',
      payload: {
        difficulty: 'hard',
        quantity: 5,
      },
    };
    const expectedState: QuizStateType = {
      categories: [],
      difficulty: 'hard',
      quantity: 5,
      result: {
        attemptedQuestions: '',
        finalScore: '',
      },
      searchQuery: '',
    };
    const state = QuizReducer(InitialState, action);
    expect(state).toEqual(expectedState);
  });

  test('should load results', () => {
    const action: QuizActionType = {
      type: 'LOAD_RESULTS',
      payload: {
        attemptedQuestions: [
          {
            attempted: 'Moving Picture',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What does the MP  stand for in MP3?',
            correct_answer: 'Moving Picture',
            incorrect_answers: ['Music Player', 'Multi Pass', 'Micro Point'],
          },
          {
            attempted: 'Gigahertz',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What does GHz stand for?',
            correct_answer: 'Gigahertz',
            incorrect_answers: ['Gigahotz', 'Gigahetz', 'Gigahatz'],
          },
          {
            attempted: 'Ruby',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question:
              'The programming language  Swift  was created to replace what other programming language?',
            correct_answer: 'Objective-C',
            incorrect_answers: ['C#', 'Ruby', 'C++'],
          },
          {
            attempted: '',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'HTML is what type of language?',
            correct_answer: 'Markup Language',
            incorrect_answers: [
              'Macro Language',
              'Programming Language',
              'Scripting Language',
            ],
          },
          {
            attempted: '1',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What amount of bits commonly equals one byte?',
            correct_answer: '8',
            incorrect_answers: ['1', '2', '64'],
          },
        ],
        finalScore: 20,
      },
    };

    const expectedState: QuizStateType = {
      categories: [],
      difficulty: '',
      quantity: 0,
      result: {
        attemptedQuestions: [
          {
            attempted: 'Moving Picture',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What does the MP  stand for in MP3?',
            correct_answer: 'Moving Picture',
            incorrect_answers: ['Music Player', 'Multi Pass', 'Micro Point'],
          },
          {
            attempted: 'Gigahertz',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What does GHz stand for?',
            correct_answer: 'Gigahertz',
            incorrect_answers: ['Gigahotz', 'Gigahetz', 'Gigahatz'],
          },
          {
            attempted: 'Ruby',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question:
              'The programming language  Swift  was created to replace what other programming language?',
            correct_answer: 'Objective-C',
            incorrect_answers: ['C#', 'Ruby', 'C++'],
          },
          {
            attempted: '',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'HTML is what type of language?',
            correct_answer: 'Markup Language',
            incorrect_answers: [
              'Macro Language',
              'Programming Language',
              'Scripting Language',
            ],
          },
          {
            attempted: '1',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What amount of bits commonly equals one byte?',
            correct_answer: '8',
            incorrect_answers: ['1', '2', '64'],
          },
        ],
        finalScore: 20,
      },
      searchQuery: '',
    };
    const state = QuizReducer(InitialState, action);
    expect(state).toEqual(expectedState);
  });

  test('should reset quiz options', () => {
    const action: QuizActionType = {
      type: 'RESET_QUIZ_OPTIONS',
    };
    const state = QuizReducer(
      {
        categories: [],
        difficulty: 'hard',
        quantity: 10,
        result: {
          attemptedQuestions: [],
          finalScore: 20,
        },
        searchQuery: '',
      },
      action
    );

    const expectedState: QuizStateType = {
      categories: [],
      difficulty: '',
      quantity: 0,
      result: {
        attemptedQuestions: [],
        finalScore: 20,
      },
      searchQuery: '',
    };

    expect(state).toEqual(expectedState);
  });

  test('should reset results', () => {
    const action: QuizActionType = {
      type: 'RESET_RESULTS',
    };
    const InitialState = {
      categories: [],
      difficulty: 'hard',
      quantity: 10,
      result: {
        attemptedQuestions: [
          {
            attempted: 'Moving Picture',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What does the MP  stand for in MP3?',
            correct_answer: 'Moving Picture',
            incorrect_answers: ['Music Player', 'Multi Pass', 'Micro Point'],
          },
          {
            attempted: 'Gigahertz',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What does GHz stand for?',
            correct_answer: 'Gigahertz',
            incorrect_answers: ['Gigahotz', 'Gigahetz', 'Gigahatz'],
          },
          {
            attempted: 'Ruby',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question:
              'The programming language  Swift  was created to replace what other programming language?',
            correct_answer: 'Objective-C',
            incorrect_answers: ['C#', 'Ruby', 'C++'],
          },
          {
            attempted: '',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'HTML is what type of language?',
            correct_answer: 'Markup Language',
            incorrect_answers: [
              'Macro Language',
              'Programming Language',
              'Scripting Language',
            ],
          },
          {
            attempted: '1',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What amount of bits commonly equals one byte?',
            correct_answer: '8',
            incorrect_answers: ['1', '2', '64'],
          },
        ],
        finalScore: 20,
      },
      searchQuery: '',
    };
    const state = QuizReducer(InitialState, action);
    const expectedState: QuizStateType = {
      categories: [],
      difficulty: 'hard',
      quantity: 10,
      result: {
        attemptedQuestions: '',
        finalScore: 0,
      },
      searchQuery: '',
    };

    expect(state).toEqual(expectedState);
  });

  test('should add to search query', () => {
    const action: QuizActionType = {
      type: 'SEARCH_QUERY',
      payload: 'this is a searched query',
    };

    const state = QuizReducer(InitialState, action);

    const expectedState: QuizStateType = {
      categories: [],
      difficulty: '',
      quantity: 0,
      result: {
        attemptedQuestions: '',
        finalScore: '',
      },
      searchQuery: 'this is a searched query',
    };

    expect(state).toEqual(expectedState);
  });

  test('should logout user', () => {
    const action: QuizActionType = {
      type: 'LOGOUT',
    };
    const InitialState = {
      categories: [
        {
          id: '1',
          categoryName: 'Science: Computers',
          description:
            'This is for all the teck geeks out there! Show off your knowledge',
          img: 'COMPUTER_1',
        },
        {
          id: '2',
          categoryName: 'General Knowledge',
          description:
            'Take this General Knowledge Quiz to know whether you know the basics of this world',
          img: 'GENERAL_KNOWLEDGE_2',
        },
      ],
      difficulty: 'hard',
      quantity: 10,
      result: {
        attemptedQuestions: [
          {
            attempted: 'Moving Picture',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What does the MP  stand for in MP3?',
            correct_answer: 'Moving Picture',
            incorrect_answers: ['Music Player', 'Multi Pass', 'Micro Point'],
          },
          {
            attempted: 'Gigahertz',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What does GHz stand for?',
            correct_answer: 'Gigahertz',
            incorrect_answers: ['Gigahotz', 'Gigahetz', 'Gigahatz'],
          },
          {
            attempted: 'Ruby',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question:
              'The programming language  Swift  was created to replace what other programming language?',
            correct_answer: 'Objective-C',
            incorrect_answers: ['C#', 'Ruby', 'C++'],
          },
          {
            attempted: '',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'HTML is what type of language?',
            correct_answer: 'Markup Language',
            incorrect_answers: [
              'Macro Language',
              'Programming Language',
              'Scripting Language',
            ],
          },
          {
            attempted: '1',
            category: 'Science: Computers',
            type: 'multiple',
            difficulty: 'easy',
            question: 'What amount of bits commonly equals one byte?',
            correct_answer: '8',
            incorrect_answers: ['1', '2', '64'],
          },
        ],
        finalScore: 20,
      },
      searchQuery: 'this is a searched query',
    };

    const state = QuizReducer(InitialState, action);

    const expectedState: QuizStateType = {
      categories: [],
      difficulty: '',
      quantity: 0,
      result: {
        attemptedQuestions: '',
        finalScore: 0,
      },
      searchQuery: '',
    };

    expect(state).toEqual(expectedState);
  });
});
