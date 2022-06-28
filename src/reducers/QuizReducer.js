const QuizReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_QUIZ_CATEGORIES': {
      return {
        ...state,
        categories: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { QuizReducer };
