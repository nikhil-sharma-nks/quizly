import { useContext, createContext, useReducer } from 'react';
import { QuizReducer } from '../reducers';
const QuizContent = createContext();

const useQuiz = () => useContext(QuizContent);

const QuizProvider = ({ children }) => {
  const [quizState, quizDispatch] = useReducer(QuizReducer, {
    categories: [],
    difficulty: '',
    quantity: '',
    result: {},
    searchQuery: '',
  });
  return (
    <QuizContent.Provider value={{ quizState, quizDispatch }}>
      {children}
    </QuizContent.Provider>
  );
};

export { QuizProvider, useQuiz };
