import { AuthReducer } from '../../reducers';
import { AuthActionType, AuthStateType } from '../../types';

describe('testing auth reducer', () => {
  test('should login user', () => {
    const ExpectedState: AuthStateType = {
      isAuth: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJjZTAzY2IwNy04MTcyLTQwNTAtOGYxYy1lZTY1MmI4MDRmZjEiLCJlbWFpbCI6Im5pa2hpbC5oYXJzaC5zaGFybWFAZ21haWwuY29tIn0.jdr1JAuOmNSDQr8o7-Gx64nhUxt0rzD8wLIDVKcV3mc',
      user: {
        createdAt: '2022-07-10T01:20:52+05:30',
        email: 'nikhil.harsh.sharma@gmail.com',
        firstName: 'Nikhil',
        id: '2',
        lastName: 'Sharma',
        updatedAt: '2022-07-10T01:20:52+05:30',
        _id: 'ce03cb07-8172-4050-8f1c-ee652b804ff1',
      },
    };

    const InitialState = { isAuth: false, token: '', user: {} };
    const action: AuthActionType = {
      type: 'LOGIN_USER',
      payload: ExpectedState,
    };

    const state = AuthReducer(InitialState, action);

    expect(state).toEqual(ExpectedState);
  });

  test('should logout user', () => {
    const InitialState: AuthStateType = {
      isAuth: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJjZTAzY2IwNy04MTcyLTQwNTAtOGYxYy1lZTY1MmI4MDRmZjEiLCJlbWFpbCI6Im5pa2hpbC5oYXJzaC5zaGFybWFAZ21haWwuY29tIn0.jdr1JAuOmNSDQr8o7-Gx64nhUxt0rzD8wLIDVKcV3mc',
      user: {
        createdAt: '2022-07-10T01:20:52+05:30',
        email: 'nikhil.harsh.sharma@gmail.com',
        firstName: 'Nikhil',
        id: '2',
        lastName: 'Sharma',
        updatedAt: '2022-07-10T01:20:52+05:30',
        _id: 'ce03cb07-8172-4050-8f1c-ee652b804ff1',
      },
    };

    const ExpectedState: AuthStateType = {
      isAuth: false,
      token: '',
      user: {},
    };

    const action: AuthActionType = {
      type: 'LOGOUT',
    };
    const state = AuthReducer(InitialState, action);

    expect(state).toEqual(ExpectedState);
  });
});
