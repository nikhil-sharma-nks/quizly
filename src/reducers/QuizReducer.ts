import { QuizStateType, QuizActionType } from '../types';
const QuizReducer = (state: QuizStateType, action: QuizActionType) => {
  const { type } = action;
  switch (type) {
    case 'LOAD_QUIZ_CATEGORIES': {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case 'LOAD_QUIZ_OPTIONS': {
      const { difficulty, quantity } = action.payload;
      return {
        ...state,
        difficulty,
        quantity,
      };
    }
    case 'LOAD_RESULTS': {
      const { attemptedQuestions, finalScore } = action.payload;
      return {
        ...state,
        result: {
          attemptedQuestions,
          finalScore,
        },
      };
    }
    case 'RESET_QUIZ_OPTIONS': {
      return {
        ...state,
        difficulty: '',
        quantity: 0,
      };
    }
    case 'RESET_RESULTS': {
      return {
        ...state,
        result: {
          attemptedQuestions: '',
          finalScore: 0,
        },
      };
    }
    case 'SEARCH_QUERY': {
      return {
        ...state,
        searchQuery: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        categories: [],
        difficulty: '',
        quantity: 0,
        result: {
          attemptedQuestions: '',
          finalScore: 0,
        },
        searchQuery: '',
      };
    }
    default: {
      return state;
    }
  }
};

export { QuizReducer };
