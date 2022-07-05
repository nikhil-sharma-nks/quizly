import React from 'react';
import { useNavigate } from 'react-router-dom';
import './quizCard.scss';

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();
  const handleQuizCardClick = () => {
    navigate(`/rules/${quiz.id}`);
  };
  return (
    <>
      <div className='quiz-card' onClick={handleQuizCardClick}>
        <div className='quiz-image-container'>
          <img src={quiz.img} alt='quiz category' className='quiz-image' />
        </div>
        <div className='quiz-info-container'>
          <div className='quiz-name'>{quiz.categoryName}</div>
          <div className='quiz-description'>{quiz.description}</div>
        </div>
      </div>
    </>
  );
};

export { QuizCard };
