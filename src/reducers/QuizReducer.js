const QuizReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_QUIZ_CATEGORIES': {
      return {
        ...state,
        categories: payload,
      };
    }
    case 'LOAD_QUIZ_OPTIONS': {
      const { difficulty, quantity } = payload;
      return {
        ...state,
        difficulty,
        quantity,
      };
    }
    case 'LOAD_RESULTS': {
      const { attemptedQuestions, finalScore } = payload;
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
        quantity: '',
      };
    }
    case 'RESET_RESULTS': {
      return {
        ...state,
        result: {
          attemptedQuestions: '',
          finalScore: '',
        },
      };
    }
    case 'LOGOUT': {
      return { categories: [], difficulty: '', quantity: '', result: {} };
    }
    default: {
      return state;
    }
  }
};

export { QuizReducer };
