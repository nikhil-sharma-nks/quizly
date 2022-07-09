type UserType = {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  updatedAt: string;
  _id: string;
};

type AuthStateType = {
  isAuth: boolean;
  token: string;
  user: UserType | any;
};

type LoginActionType = {
  type: 'LOGIN_USER';
  payload: AuthStateType;
};

type LogoutActionType = {
  type: 'LOGOUT';
};

type AuthActionType = LoginActionType | LogoutActionType;

type AuthContextType = {
  authState: AuthStateType;
  authDispatch: React.Dispatch<AuthActionType>;
};

export type { AuthStateType, AuthActionType, AuthContextType };
