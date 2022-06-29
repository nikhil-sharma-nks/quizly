import React, { useEffect, useState } from 'react';
import './rules.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizCategory } from '../../api';
import { Spinner, makeToast } from '../../components';
import { useQuiz } from '../../context';
import Select from 'react-select';

import Lottie from 'react-lottie';
import ITS_A_QUIZ from '../../assets/animation/ITS_A_QUIZ.json';

const Rules = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { quizState, quizDispatch } = useQuiz();
  const { categories } = quizState;
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { category } = await getQuizCategory(categoryId);
      setSelectedCategory(category);
      setLoading(false);
    })();
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ITS_A_QUIZ,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const styles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: state.selectProps.myFontSize,
    }),
  };

  const DifficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];
  const Quantity = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
  ];
  const handleDifficultyChange = (selectedOption) => {
    setSelectedDifficulty(selectedOption?.value || '');
  };
  const handleQuantityChange = (selectedOption) => {
    setSelectedQuantity(selectedOption?.value || '');
  };

  const handleSubmitQuiz = () => {
    if (!selectedDifficulty) {
      makeToast('Please Select Difficulty To Proceed With Quiz', 'error');
      return;
    }
    if (!selectedQuantity) {
      makeToast('Please Select Quantity To Proceed With Quiz', 'error');
      return;
    }
    quizDispatch({
      type: 'LOAD_QUIZ_OPTIONS',
      payload: {
        difficulty: selectedDifficulty,
        quantity: selectedQuantity,
      },
    });
    navigate(`/quiz/${categoryId}`);
  };

  return (
    <>
      <div className='app-page rules-page'>
        <div className='rules-intro-container'>
          <p className='intro-msg'>I see You Are Ready To Be Quizzed!</p>
          <div className='quiz-animation'>
            <Lottie options={defaultOptions} />
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className='quiz-info-container'>
            <div className='img-container'>
              <img
                src={selectedCategory?.img}
                alt='quiz animation'
                className='img-category'
              />
            </div>
            <div className='info-container'>
              <div className='info'>
                <p className='label'>Name :</p>
                <p className='value'>{selectedCategory.categoryName}</p>
              </div>
              <div className='info'>
                <p className='label'>Description :</p>
                <p className='value'>{selectedCategory.description}</p>
              </div>
              <div className='info'>
                <p className='label'>Difficulty :</p>
                <div className='value'>
                  <Select
                    onChange={handleDifficultyChange}
                    options={DifficultyOptions}
                    styles={styles}
                    // value={noteState.filter.sortBy}
                    placeholder='Difficulty'
                    className='select-box'
                    isClearable
                  />
                </div>
              </div>
              <div className='info'>
                <p className='label'>Quantity :</p>
                <div className='value'>
                  <Select
                    onChange={handleQuantityChange}
                    options={Quantity}
                    styles={styles}
                    // value={noteState.filter.sortBy}
                    placeholder='Number of questions'
                    className='select-box'
                    isClearable
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='rules-container mt-5'>
          <ol type='1' className='rules'>
            <li>This Quiz contains of multiple choice questions</li>
            <li>Please select difficulty of the quiz to get started</li>
            <li>
              Please select number of questions of the quiz to get started
            </li>
            <li>You will get 30 seconds to answer the quiz</li>
            <li>For each correct answer you will get 10 points</li>
            <li>There is no negative points for wrong answer</li>
            <li>Click on Next button to move to next question</li>
            <li>Click on Submit button to finish the quiz</li>
          </ol>
        </div>
        <div className='btn-container'>
          <button
            className='btn btn-primary btn-large'
            onClick={handleSubmitQuiz}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export { Rules };
