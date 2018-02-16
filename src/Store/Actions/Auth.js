import { AsyncStorage } from 'react-native';
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
          dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn))
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

export const authStoreToken = (token, expiresIn) => {
  return dispatch => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    AsyncStorage.setItem('pl:auth:token', token);
    AsyncStorage.setItem('pl:auth:expiryDate', expiryDate.toString());
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        let fetchedToken;
        AsyncStorage.getItem('pl:auth:token')
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem('pl:auth:expiryDate')
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise;
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
    .then(token => {
      startMainTabs();
    })
    .catch(err => console.log('Failed to fetch token!'));
  }
}
