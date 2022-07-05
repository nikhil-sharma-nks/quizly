const getRandomNumber = (max) => Math.floor(Math.random() * max);

const getRandomQuestions = (questions, quantity) => {
  const randomQuestion = new Set();
  while (randomQuestion.size < quantity) {
    const temp = questions[getRandomNumber(questions.length)];
    randomQuestion.add(temp);
  }
  return [...randomQuestion];
};

const shuffleOptions = (options) => {
  const shuffledOptions = new Set();
  while (shuffledOptions.size < 4) {
    const temp = options[getRandomNumber(4)];
    shuffledOptions.add(temp);
  }
  return [...shuffledOptions];
};

const filterBySearch = (searchQuery, categories) => {
  if (searchQuery === '') return categories;
  return categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export { getRandomQuestions, getRandomNumber, shuffleOptions, filterBySearch };
