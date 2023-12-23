import { createContext, useEffect, useReducer, useRef  } from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const activityTimeout = useRef(null);

  const resetTimeout = () => {
    if (activityTimeout.current) clearTimeout(activityTimeout.current);
    activityTimeout.current = setTimeout(logout, 15 * 60 * 1000); // 15 minutes
  };

  useEffect(() => {
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keydown', resetTimeout);
    window.addEventListener('scroll', resetTimeout);
    window.addEventListener('touchstart', resetTimeout);

    return () => {
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
      window.removeEventListener('scroll', resetTimeout);
      window.removeEventListener('touchstart', resetTimeout);
    };
    // eslint-disable-next-line
  }, []);


  

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          // Mock user data since no user data is fetched
          const user = {
            id: 1,
            email: '',
            name: 'admin',
            // ... other user properties
          };
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);


  // const login = async (number, password) => {
  //   // const response = await axios.post('/api/account/login', {
  //   const response = await axios.post('/api/userauth/v1/login/', {
  //     mobile:number,
  //     password,
  //   });
  //   // const { accessToken, user } = response.data;
  //   const { access, refresh, user } = response.data;

  //   setSession(access);
  //   window.localStorage.setItem('refresh', refresh);
  //   window.localStorage.setItem('accessToken', access);

  //   dispatch({
  //     type: 'LOGIN',
  //     payload: {
  //       user,
  //     },
  //   });
  // };


  const login = async (number, password, otp) => {
    const response = await axios.post('/api/userauth/v1/generate_admin_token/', { phone: number, otp });
    if (response.data.success) {
      const { access, refresh } = response.data;
      setSession(access);
      window.localStorage.setItem('refresh', refresh);
      window.localStorage.setItem('accessToken', access);
      dispatch({
        type: 'LOGIN',
        payload: { user: response.data.user },
      });
    } else {
      throw new Error(response.data.message);
    }
  };
  

  const register = async (email, password, password2, name, mobile) => {
    const response = await axios.post('/api/users/v1/register/', {
      email,
      password,
      password2,
      name,
      mobile
    });
    const { accessToken, data: user } = response.data;
    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  // const logout = async () => {
  //   setSession(null);
  //   dispatch({ type: 'LOGOUT' });
  // };

  const logout = async () => {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const refresh = window.localStorage.getItem('refresh');
      // eslint-disable-next-line 
      const response = await axios.post('/api/userauth/v1/logout/', {
        "refresh_token": refresh

      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

    } catch (err) {
      console.error(err);
    }
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };



  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
