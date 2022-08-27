import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.scss';
import { signupUser, loginUser } from '../../api';
import { makeToast, Spinner } from '../../components';
import { useAuth } from '../../context';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authDispatch } = useAuth();

  const [signupInput, setSignupInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  type LoginInput = {
    email: string;
    password: string;
  };
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupInput({
      ...signupInput,
      [name]: value,
    });
  };
  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem('isAuth')!);
    if (isAuth) {
      navigate('/');
    }
  }, []);

  const loginHandler = async (event: any, loginInput: LoginInput) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(loginInput);
      if (data) {
        const { encodedToken, foundUser } = data;
        const authData = {
          token: encodedToken,
          user: foundUser,
          isAuth: true,
        };
        makeToast(
          `Login successful, Welcome ${foundUser.firstName}`,
          'success'
        );
        delete authData.user.password;
        delete authData.user.confirmPassword;
        authDispatch({ type: 'LOGIN_USER', payload: authData });
        navigate('/');
      } else {
        makeToast('Login Failed, Try Again!', 'error');
      }
    } catch (error) {
      makeToast('Login Failed, Try Again!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (signupInput.password !== signupInput.confirmPassword) {
      makeToast("Password Doesn't match! Please Try Again", 'error');
      return;
    }
    setLoading(true);
    try {
      const data = await signupUser(signupInput);
      if (data) {
        makeToast('Signup successful!', 'success');
        loginHandler(event, {
          email: signupInput.email,
          password: signupInput.password,
        });
        // navigate('/login');
      } else {
        makeToast('Signup Failed, Try Again!', 'error');
      }
    } catch (error) {
      console.log(error);
      makeToast('SignUp Failed, Try Again!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const demoSignUp = [
    {
      firstName: 'Jon',
      lastName: 'Doe',
      email: 'jondoe@gmail.com',
      password: '123123',
      confirmPassword: '123123',
    },
    {
      firstName: 'Virat',
      lastName: 'Kholi',
      email: 'viratKholi@gmail.com',
      password: '123123',
      confirmPassword: '123123',
    },
    {
      firstName: 'MS',
      lastName: 'Dhoni',
      email: 'MSD@gmail.com',
      password: '123123',
      confirmPassword: '123123',
    },
    {
      firstName: 'Kishore',
      lastName: 'Kumar',
      email: 'kishore_kumar@gmail.com',
      password: '123123',
      confirmPassword: '123123',
    },
    {
      firstName: 'Mohd.',
      lastName: 'Rafi',
      email: 'mohd_rafi@gmail.com',
      password: '123123',
      confirmPassword: '123123',
    },
  ];

  const fillDemoData = () => {
    const randomDemoInput = Math.floor(Math.random() * demoSignUp.length);
    setSignupInput({
      ...demoSignUp[randomDemoInput],
    });
  };

  return (
    <>
      <div className='auth-page'>
        <div className='signup-page-container'>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <form
                className='form-group'
                onSubmit={(event) => handleSignupSubmit(event)}
              >
                <p className='text-xxl text-centered color-primary'>Sign Up</p>
                <label htmlFor='signup_first_name' className='form-label'>
                  First Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='signup_first_name'
                  name='firstName'
                  placeholder='Enter your first name'
                  value={signupInput.firstName}
                  onChange={inputChangeHandler}
                  required
                />
                <label htmlFor='signup_last_name' className='form-label'>
                  Last Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='signup_last_name'
                  name='lastName'
                  placeholder='Enter your last name'
                  value={signupInput.lastName}
                  onChange={inputChangeHandler}
                  required
                />
                <label htmlFor='signup_email' className='form-label'>
                  Email address
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='signup_email'
                  placeholder='Enter your email'
                  name='email'
                  onChange={inputChangeHandler}
                  value={signupInput.email}
                  required
                />
                <label htmlFor='signup_password' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='signup_password'
                  placeholder='Enter your password'
                  name='password'
                  onChange={inputChangeHandler}
                  value={signupInput.password}
                  required
                />
                <label htmlFor='signup_password_confirm' className='form-label'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='signup_password_confirm'
                  placeholder='Conform your password'
                  name='confirmPassword'
                  onChange={inputChangeHandler}
                  value={signupInput.confirmPassword}
                  required
                />
                {signupInput.confirmPassword.length > 0 &&
                signupInput.confirmPassword === signupInput.password ? (
                  <p className='feedback feedback-success'>Password Matched!</p>
                ) : signupInput.confirmPassword.length > 0 ? (
                  <p className='feedback feedback-error'>
                    Password Not Matched
                  </p>
                ) : (
                  ''
                )}
                <button className='btn btn-primary mt-3' type='submit'>
                  Sign Up
                </button>
                <button
                  className='btn btn-primary-outlined mt-3'
                  onClick={fillDemoData}
                  type='button'
                >
                  Fill Demo Data
                </button>
                <div className='mt-3 text-centered'>
                  <Link to='/login' className='sign-up-link'>
                    Already Have An Account, Sign In!
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export { Signup };
