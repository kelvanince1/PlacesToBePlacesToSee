import { TRY_AUTH } from './ActionTypes';
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
      if (parsedRes.error) {
        alert('Login failed. Please try again')
      } else {
          startMainTabs();
      }
    });
  };
};

export const authSignUp = (authData) => {
  return dispatch => {

    fetch(signUpUrl, {
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
      if (parsedRes.error) {
        alert('Login failed. Please try again')
      } else {
          startMainTabs();
      }
    });
  };
};
