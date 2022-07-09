import { AuthActionType, AuthStateType } from '../types';

const AuthReducer = (state: AuthStateType, action: AuthActionType) => {
  const { type } = action;
  const saveToLocalStorage = (state: any) => {
    const { isAuth, token, user } = state;
    try {
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuth', isAuth);
    } catch (err) {
      console.log(err.message);
    }
  };
  switch (type) {
    case 'LOGIN_USER': {
      saveToLocalStorage({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    }
    // case 'SIGNUP_USER': {
    //   saveToLocalStorage({ ...state, ...payload });
    //   return { ...state, ...payload };
    // }
    case 'LOGOUT': {
      saveToLocalStorage({ isAuth: false, token: '', user: {} });
      return { isAuth: false, token: '', user: {} };
    }
    default:
      return state;
  }
};

export { AuthReducer };
