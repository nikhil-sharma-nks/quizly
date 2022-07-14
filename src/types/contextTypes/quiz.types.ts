type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: number;
  correct_answer: string;
  incorrect_answers: string[];
};
type Quiz = {
  id: string;
  category: string;
  type: string;
  easy: Question[];
};

type Categories = {
  id: string;
  categoryName: string;
  description: string;
  img: string;
};

type QuizStateType = {
  categories: any;
  difficulty: string;
  quantity: number;
  result: any;
  searchQuery: string;
};
type LoadCategoriesType = {
  type: 'LOAD_QUIZ_CATEGORIES';
  payload: any;
};
type LoadQuizOptions = {
  type: 'LOAD_QUIZ_OPTIONS';
  payload: any;
};
type LoadResults = {
  type: 'LOAD_RESULTS';
  payload: any;
};
type SearchQuery = {
  type: 'SEARCH_QUERY';
  payload: string;
};
type MiscellaneousActionTypes = {
  type: 'RESET_QUIZ_OPTIONS' | 'RESET_RESULTS' | 'LOGOUT';
};

type QuizActionType =
  | LoadCategoriesType
  | LoadQuizOptions
  | SearchQuery
  | LoadResults
  | MiscellaneousActionTypes;

type QuizContextType = {
  quizState: QuizStateType;
  quizDispatch: React.Dispatch<QuizActionType>;
};

export type {
  Question,
  Quiz,
  Categories,
  QuizContextType,
  QuizActionType,
  QuizStateType,
};
