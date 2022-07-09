import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './result.scss';
import { useQuiz } from '../../context';
import { makeToast } from '../../components';
import { shuffleOptions } from '../../utils';
import { Question } from '../../types';

const Result = () => {
  const { quizState } = useQuiz();
  const navigate = useNavigate();
  const { result } = quizState;
  const { finalScore, attemptedQuestions }: any = result;
  type AttemptedQuestion = Question & { attempted: string };

  useEffect(() => {
    if (!attemptedQuestions) {
      makeToast('Got to play a quiz to see the result', 'info');
      navigate('/');
    }
  }, []);

  const getShuffledOptions = (questionItem: any) =>
    shuffleOptions([
      ...questionItem?.incorrect_answers,
      questionItem?.correct_answer,
    ]);

  const checkIfWrong = (questionItem: AttemptedQuestion, option: any) =>
    option === questionItem.attempted &&
    questionItem.attempted !== questionItem.correct_answer;

  return (
    <div className='app-page result-page'>
      <div className='result-header'>
        You Have Scored {finalScore}/{attemptedQuestions?.length * 10} Points!
      </div>
      <div className='questions-container'>
        {attemptedQuestions?.map((item: AttemptedQuestion, index: number) => (
          <div className='question' key={index}>
            <div className='question-container'>{item.question}</div>
            <div className='options-container'>
              {getShuffledOptions(item).map((option: any, index) => (
                <div
                  className={`option ${
                    checkIfWrong(item, option) ? 'wrong-answer' : ''
                  } ${item.correct_answer === option ? 'correct-answer' : ''}`}
                  key={option}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Result };
