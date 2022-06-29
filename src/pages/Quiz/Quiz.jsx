import React, { useState, useEffect, useRef } from 'react';
import './quiz.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context';
import { Spinner, makeToast } from '../../components';
import { getSelectedQuiz } from '../../api';
import { getRandomQuestions, shuffleOptions } from '../../utils';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quizState, quizDispatch } = useQuiz();
  const { difficulty, quantity } = quizState;

  const [loading, setLoading] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);
  const incrementCounter = () => setCounter((current) => current + 1);
  const [timer, setTimer] = useState(30);
  const id = useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };
  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  }, [counter]);

  useEffect(() => {
    if (timer === 0) {
      clear();
      counter + 1 === quantity ? handleSubmit() : handleNext();
    }
  }, [timer]);

  useEffect(() => {
    if (!quizState.difficulty && !quizState.quantity) {
      makeToast(
        'Please select difficulty and quantity first to proceed with the quiz',
        'error'
      );
      navigate(`/rules/${quizId}`);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const { quiz } = await getSelectedQuiz(quizId);
        setSelectedQuiz(quiz);
        const data = getRandomQuestions(quiz[difficulty], quantity);
        setSelectedQuestions(data);
        const optionsShuffled = shuffleOptions([
          ...data[counter]?.incorrect_answers,
          data[counter]?.correct_answer,
        ]);
        setOptions([...optionsShuffled]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    if (selectedQuestions.length > 0) {
      const optionsShuffled = shuffleOptions([
        ...selectedQuestions[counter]?.incorrect_answers,
        selectedQuestions[counter]?.correct_answer,
      ]);
      setOptions([...optionsShuffled]);
    }
  }, [counter]);
  const handleOptionClick = (option) => setSelectedOption(option);

  const addToAttempted = () => {
    const attempted = {
      ...selectedQuestions[counter],
      attempted: selectedOption,
    };
    setAttemptedQuestions((a) => [...a, attempted]);
  };

  const handleNext = () => {
    if (selectedOption === selectedQuestions[counter]?.correct_answer) {
      setScore((s) => s + 10);
    }
    addToAttempted();
    setSelectedOption('');
    incrementCounter();
    setTimer(30);
  };
  const handleSubmit = () => {
    let finalScore = score;
    if (selectedOption === selectedQuestions[counter]?.correct_answer) {
      setScore((s) => s + 10);
      finalScore = finalScore + 10;
    }
    const attempted = {
      ...selectedQuestions[counter],
      attempted: selectedOption,
    };
    makeToast(`You Scored ${finalScore} points!`, 'success');
    quizDispatch({
      type: 'LOAD_RESULTS',
      payload: {
        attemptedQuestions: [...attemptedQuestions, attempted],
        finalScore,
      },
    });
    navigate('/result');
  };

  const handleQuit = () => {
    makeToast('Sorry To See You Go, Please Try A Quiz Again', 'info');
    quizDispatch({ type: 'RESET_RESULTS' });
    quizDispatch({ type: 'RESET_QUIZ_OPTIONS' });
    navigate('/');
  };

  return (
    <div className='app-page quiz-page'>
      <div className='quiz-container'>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className='question-container'>
              {selectedQuestions[counter]?.question}
            </div>
            <div className='quiz-info-container'>
              <p>
                Questions: {counter + 1}/{quantity}
              </p>
              <p>Time left : {timer} </p>
              <p>Score: {score}</p>
            </div>
            <div
              className='progress-bar'
              style={{ width: `${3.33 * timer}%` }}
            ></div>
            <div className='options-container'>
              {options &&
                options?.map((option) => (
                  <div
                    className={
                      option === selectedOption
                        ? 'option isSelected '
                        : 'option'
                    }
                    key={option}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
            </div>
            <div className='button-container'>
              <button
                className='btn btn-error-outlined btn-large'
                onClick={handleQuit}
              >
                Quit
              </button>
              {counter + 1 === quantity ? (
                <button
                  className='btn btn-primary btn-large'
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              ) : (
                <button
                  className='btn btn-primary btn-large'
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { Quiz };
