import axios from 'axios';

const getAllQuizCollections = async () => {
  const getAllQuizCollectionBaseUrl = 'api/categories';
  try {
    const { data: quizzes, status } = await axios.get(
      getAllQuizCollectionBaseUrl
    );
    if (status >= 200 && status <= 300) return quizzes;
    else throw new Error('Could Not Get Quiz Collection');
  } catch (err) {
    console.log(err.message);
  }
};

const getQuizCategory = async (categoryId) => {
  const getCategpryBaseUrl = `/api/categories/${categoryId}`;
  try {
    const { data: quiz, status } = await axios.get(getCategpryBaseUrl);
    if (status >= 200 && status <= 300) return quiz;
    else throw new Error('Could Not Get Quiz Collection');
  } catch (err) {
    console.log(err.message);
  }
};

export { getAllQuizCollections, getQuizCategory };
