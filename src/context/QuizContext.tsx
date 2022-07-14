import { useContext, createContext, useReducer } from 'react';
import { QuizReducer } from '../reducers';
import { ReactChildrenType, QuizContextType } from '../types';
const QuizContent = createContext({} as QuizContextType);

const useQuiz = () => useContext(QuizContent);

const InitialState = {
  categories: [],
  difficulty: '',
  quantity: 0,
  result: {
    attemptedQuestions: '',
    finalScore: '',
  },
  searchQuery: '',
};

const QuizProvider = ({ children }: ReactChildrenType) => {
  const [quizState, quizDispatch] = useReducer(QuizReducer, InitialState);
  return (
    <QuizContent.Provider value={{ quizState, quizDispatch }}>
      {children}
    </QuizContent.Provider>
  );
};

export { QuizProvider, useQuiz, InitialState };
