import { useContext, createContext, useEffect, useReducer } from 'react';
import { AuthReducer } from '../reducers';
import { ReactChildrenType, AuthContextType } from '../types';

const AuthContext = createContext({} as AuthContextType);

const useAuth = () => useContext(AuthContext);

const AuthInitialState = {
  isAuth: false,
  token: '',
  user: {},
};

const AuthProvider = ({ children }: ReactChildrenType) => {
  const [authState, authDispatch] = useReducer(AuthReducer, AuthInitialState);
  useEffect(() => {
    try {
      const localObj = {
        token: JSON.parse(localStorage.getItem('token')!),
        user: JSON.parse(localStorage.getItem('user')!),
        isAuth: JSON.parse(localStorage.getItem('isAuth')!),
      };
      authDispatch({ type: 'LOGIN_USER', payload: localObj });
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider, AuthInitialState };
