import React, { useEffect, useState } from 'react';
import './home.scss';
import { getAllQuizCategories } from '../../api';
import { useQuiz, useAuth } from '../../context';
import { QuizCard, Spinner } from '../../components';
import { filterBySearch } from '../../utils';
import { Categories } from '../../types';
const Home = () => {
  const { quizState, quizDispatch } = useQuiz();
  const { authState } = useAuth();
  const { isAuth } = authState;
  const { categories, searchQuery } = quizState;
  const [loading, setLoading] = useState(false);
  const [quizToDisplay, setQuizToDisplay] = useState(categories);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { categories } = await getAllQuizCategories();
      quizDispatch({ type: 'LOAD_QUIZ_CATEGORIES', payload: categories });
      setQuizToDisplay(categories);
      setLoading(false);
    })();
  }, [isAuth]);

  useEffect(() => {
    const notesFilterBySearch = filterBySearch(searchQuery, categories);
    setQuizToDisplay([...notesFilterBySearch]);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    quizDispatch({
      type: 'SEARCH_QUERY',
      payload: e.target.value,
    });
  };

  return (
    <>
      <div className='app-page home-page'>
        <div className='navbar-search mt-4'>
          <i className='fa-solid fa-magnifying-glass'></i>
          <input
            type='text'
            className='form-control'
            placeholder='Search Quiz Here'
            value={searchQuery}
            onChange={handleInputChange}
          />
          <i
            className='fa-solid fa-xmark search-cancel'
            onClick={() =>
              quizDispatch({
                type: 'SEARCH_QUERY',
                payload: '',
              })
            }
          ></i>
        </div>

        {quizToDisplay.length > 0 ? (
          <>
            <div className='welcome-message'>
              {authState.user?.firstName
                ? `Welcome ${authState.user.firstName}!`
                : 'Welcome!'}
            </div>
            <div className='intro-message'>
              Are You Ready To Be Quizzed? Choose any one of the categories
              below to get started
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <div className='quiz-card-container'>
                {quizToDisplay?.map((quiz: Categories) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className='text-centered text-xl mt-4'>No Quiz Found</p>
        )}
      </div>
    </>
  );
};

export { Home };
