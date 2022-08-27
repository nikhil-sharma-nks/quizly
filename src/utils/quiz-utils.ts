import { Question, Categories } from '../types';
const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

const getRandomQuestions = (questions: any, quantity: number) => {
  const randomQuestion = new Set();
  while (randomQuestion.size < quantity) {
    const temp = questions[getRandomNumber(questions.length)];
    randomQuestion.add(temp);
  }
  return [...randomQuestion];
};

const shuffleOptions = (options: any[]) => {
  const shuffledOptions = new Set();
  while (shuffledOptions.size < 4) {
    const temp = options[getRandomNumber(4)];
    shuffledOptions.add(temp);
  }
  return [...shuffledOptions];
};

const filterBySearch = (searchQuery: string, categories: Categories[]) => {
  if (searchQuery.trim() === '') return categories;
  return categories.filter((category) =>
    category.categoryName

      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
  );
};

export { getRandomQuestions, getRandomNumber, shuffleOptions, filterBySearch };
