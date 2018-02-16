import { TRY_AUTH, AUTH_SET_TOKEN } from './ActionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../Screens/MainTabs/startMainTabs';

import { signUpUrl, signInUrl } from './config';

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let url = signInUrl;
    if (authMode === 'signup') {
      url = signUpUrl
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      console.log(err);
      alert('Login failed. Please try again');
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch(uiStopLoading());
      if (!parsedRes.idToken) {
        alert('Login failed. Please try again')
      } else {
          dispatch(authSetToken(parsedRes.idToken))
          startMainTabs();
      }
    });
  };
};

export const authSetToken = (token) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        reject();
      } else {
        resolve(token);
      }
    });
    return promise;
  };
};
