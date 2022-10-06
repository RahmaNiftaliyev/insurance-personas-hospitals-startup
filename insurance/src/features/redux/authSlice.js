import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../utils/firebase';
import { db } from '../utils/firebase';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  isAuth: false,
};

export const loginAsync = (email, password) => async (dispatch) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      dispatch(
        loginSuccess({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        }),
      );
    })
    .catch((error) => {
      dispatch(loginError({ code: error.code, message: error.message }));
    });
};

export const signOut = () => async (dispatch) => {
  auth
    .signOut()
    .then(() => {
      dispatch(logoutSuccess());
    })
    .catch((error) => {
      dispatch(logoutError({ code: error.code, message: error.message }));
    });
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      db.collection('collectionName')
        .add(action.payload)
        .then(function (response) {
          console.log('Document successfully written!');
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
    },
    loginError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    register: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    logoutError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginError,
  register,
  registerSuccess,
  registerError,
  logout,
  logoutSuccess,
  logoutError,
} = authSlice.actions;
