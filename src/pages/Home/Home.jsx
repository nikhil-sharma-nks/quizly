import React, { useEffect } from 'react';
import './home.scss';
import { getAllQuizCollections } from '../../api';
import { useQuiz, useAuth } from '../../context';
import { QuizCard } from '../../components';
const Home = () => {
  const { quizState, quizDispatch } = useQuiz();
  const { authState } = useAuth();
  const { quizCollection } = quizState;
  useEffect(() => {
    (async () => {
      const quizzes = await getAllQuizCollections();
      quizDispatch({ type: 'LOAD_QUIZ_COLLECTION', payload: quizzes });
    })();
  }, []);
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
        <div className='quiz-card-container'>
          {quizCollection.categories?.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </>
  );
};

export { Home };
