import { ADD_PLACE, DELETE_PLACE } from './ActionTypes';
import { url } from './config';

export const addPlace = (placeName, location, image) => {
    return dispatch  => {
        const placeData = {
          name: placeName,
          location: location
        };
        fetch(url, {
          method: "POST",
          body: JSON.stringify(placeData)
        })
          .catch(err => console.log(err))
          .then(res => res.json())
          .then(parsedRes => {
            console.log(parsedRes);
          })
    };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
