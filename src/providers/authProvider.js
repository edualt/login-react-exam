import { useReducer } from 'react';

import authReducer from '../reducers/authReducer';
import { decodeJWT } from '../utils/jwt';
import AuthContext from '../context/authContext';

const INITIAL_STATE = {
  user: {
    id: null,
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    gender: null,
    image: null,
  },
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const AuthProvider = ({ children }) => {
  const init = (initialState) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null) return initialState;

    const user = decodeJWT(accessToken);

    return {
      ...initialState,
      user,
      accessToken,
      isAuthenticated: true,
    };
  };

  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE, init);

  const setAccessToken = (accessToken) => {
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      payload: accessToken,
    });
    localStorage.setItem('accessToken', accessToken);
  };

  const deleteToken = () => {
    localStorage.removeItem('accessToken');
  };

  const logout = () => {
    deleteToken();
    dispatch({
      type: 'LOGOUT',
      payload: INITIAL_STATE,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;