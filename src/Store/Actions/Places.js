import { SET_PLACES, REMOVE_PLACE } from './ActionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import { storeImage, deleteUrl, url } from './config';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch(storeImage, {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
          console.log(err);
          alert('Something went wrong. Please try again');
          dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
          console.log(parsedRes)
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch(url, {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })
        .catch(err => {
          console.log(err);
          alert('Something went wrong. Please try again');
          dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        });
    };
};

export const getPlaces = () => {
  return dispatch => {
    fetch(url)
      .catch(err => {
        alert('Something went wrong. Please try again')
      })
      .then(res => res.json())
      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = (key) => {
    return dispatch => {
      dispatch(removePlace(key));
      fetch(deleteUrl + key + ".json", {
          method: "DELETE"
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong. Please try again');
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('Done!');
      })
    };
};

export const removePlace = (key) => {
  return {
    type: REMOVE_PLACE,
    key: key
  }
}
