const QuizReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_QUIZ_COLLECTION': {
      return {
        ...state,
        quizCollection: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { QuizReducer };
