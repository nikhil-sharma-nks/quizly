import React, { useEffect, useState } from 'react';
import './home.scss';
import { getAllQuizCategories } from '../../api';
import { useQuiz, useAuth } from '../../context';
import { QuizCard, Spinner } from '../../components';
const Home = () => {
  const { quizState, quizDispatch } = useQuiz();
  const { authState } = useAuth();
  const { isAuth } = authState;
  const { categories } = quizState;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { categories } = await getAllQuizCategories();
      quizDispatch({ type: 'LOAD_QUIZ_CATEGORIES', payload: categories });
      setLoading(false);
    })();
  }, [isAuth]);
  return (
    <>
      <div className='app-page home-page'>
        <div className='welcome-message'>
          {authState.user?.firstName
            ? `Welcome ${authState.user.firstName}!`
            : 'Welcome!'}
        </div>
        <div className='intro-message'>
          Are You Ready To Be Quizzed? Choose any one of the categories below to
          get started
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className='quiz-card-container'>
            {categories?.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export { Home };
