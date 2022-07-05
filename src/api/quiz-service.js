import axios from 'axios';

const getAllQuizCategories = async () => {
  const getAllQuizCategoriesBaseUrl = 'api/categories';
  try {
    const { data: categories, status } = await axios.get(
      getAllQuizCategoriesBaseUrl
    );
    if (status >= 200 && status <= 300) return categories;
    else throw new Error('Could Not Get Quiz Collection');
  } catch (err) {
    console.log(err.message);
  }
};

const getQuizCategory = async (categoryId) => {
  const getCategpryBaseUrl = `/api/categories/${categoryId}`;
  try {
    const { data: category, status } = await axios.get(getCategpryBaseUrl);
    if (status >= 200 && status <= 300) return category;
    else throw new Error('Could Not Get Quiz Collection');
  } catch (err) {
    console.log(err.message);
  }
};

const getSelectedQuiz = async (quizId) => {
  const token = localStorage.getItem('token');
  const getSelectedQuizBaseUrl = `/api/quiz/${quizId}`;
  try {
    const { data: quizzes, status } = await axios.get(getSelectedQuizBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    if (status >= 200 && status <= 300) return quizzes;
  } catch (err) {
    console.log(err.message);
  }
};

const getAllQuiz = async () => {
  const token = localStorage.getItem('token');
  const getAllQuizBaseUrl = `/api/quiz`;
  try {
    const { data: quizzes, status } = await axios.get(getAllQuizBaseUrl, {
      headers: {
        authorization: token,
      },
    });
    if (status >= 200 && status <= 300) return quizzes;
  } catch (err) {
    console.log(err.message);
  }
};

export { getAllQuizCategories, getQuizCategory, getSelectedQuiz, getAllQuiz };
