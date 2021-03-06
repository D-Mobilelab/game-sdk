import Raven from 'raven-js';
import * as Constants from '../lib/Constants';
import { AxiosInstance } from '../lib/AxiosService';
import { getContentId } from './utils';
import { localStorage } from '../lib/LocalStorage';

export function canPlay() {
  return (dispatch) => {
    const url = Constants.CAN_DOWNLOAD_API_URL.replace(':ID', getContentId());
    return AxiosInstance.get(url, {
      withCredentials: true,
      params: { cors_compliant: 1 },
    }).then((response) => {
      if (process.env.NODE_ENV === 'development') {
        response.data.canDownload = true;
      }
      dispatch({ type: 'SET_CAN_PLAY', canPlay: response.data.canDownload });
    });
  };
}

export function getUserFavourites() {
  return (dispatch, getState) => {
    let getFavPromise;
    dispatch({ type: 'GET_FAVOURITES_START' });
    if (getState().user.logged) {
      getFavPromise = AxiosInstance.get(Constants.USER_GET_LIKE, {
        withCredentials: true,
        params: {
          user_id: getState().user.user, // userID
          size: 51,
        },
        validateStatus: status => status === 200 || status === 404,
      });
    } else {
      getFavPromise = Promise.resolve({ data: [] });
    }

    return getFavPromise.then((userFavouritesResponse) => {
      dispatch({ type: 'GET_FAVOURITES_END', favourites: userFavouritesResponse.data });
    })
      .catch((reason) => {
        dispatch({ type: 'GET_FAVOURITES_FAIL', payload: reason });
      });
  };
}

export function getUser() {
  return (dispatch) => {
    dispatch({ type: 'USER_CHECK_LOAD_START' });
    const query = {};

    console.log('user type: UO20');

    return AxiosInstance.get(Constants.USER_CHECK, { withCredentials: true, params: query })
      .then((userResponse) => {
        const user = userResponse.data;

        if (process.env.NODE_ENV === 'development') {
          const userType = localStorage.getItem('gfsdk-debug-user_type');
          if (userType === 'guest') {
            user.user = null;
            user.subscribed = false;
          } else if (userType === 'free') {
            user.user = decodeURIComponent(localStorage.getItem('gfsdk-debug-user_id'));
            user.subscribed = false;
          } else if (userType === 'premium') {
            user.user = localStorage.getItem('gfsdk-debug-user_id');
            user.subscribed = true;
          }
        }

        dispatch({ type: 'USER_CHECK_LOAD_END', user });
        if (!user.user) {
          Raven.setUserContext();
        } else {
          Raven.setUserContext(user);
        }

        return Promise.all([
          dispatch(getUserFavourites()),
        ]);
      })
      .catch((reason) => {
        dispatch({ type: 'USER_CHECK_LOAD_FAIL', reason });
      });
  };
}


export function increaseMatchPlayed() {
  return {
    type: 'INCREASE_MATCH_PLAYED',
  };
}

export function removeGameLike(gameId) {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_GAME_LIKE_START' });

    const URL = `${Constants.USER_DELETE_LIKE}?content_id=${gameId}&user_id=${getState().user.user}`;
    return AxiosInstance.post(URL, {}, { withCredentials: true })
      .then(() => {
        dispatch({ type: 'REMOVE_GAME_LIKE_END', payload: { id: gameId } });
      })
      .catch((reason) => {
        dispatch({ type: 'REMOVE_GAME_LIKE_ERROR', payload: reason });
      });
  };
}

export function addGameLike(gameId) {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_GAME_LIKE_START' });
    const query = {
      content_id: gameId,
      user_id: getState().user.user,
    };
    return AxiosInstance.get(Constants.USER_SET_LIKE, { withCredentials: true, params: query })
      .then((response) => {
        const { object_id } = response.data;
        dispatch({ type: 'ADD_GAME_LIKE_END', payload: { id: object_id, content_id: object_id } });
      })
      .catch((reason) => {
        dispatch({ type: 'ADD_GAME_LIKE_ERROR', payload: reason });
      });
  };
}

export function toggleGameLike() {
  return (dispatch, getState) => {
    const { user } = getState();
    const { game_info } = getState();

    const isFavourite = user.favourites.some(favourite => (favourite.id === game_info.id));
    const contentId = game_info.content_id;
    if (isFavourite) {
      return dispatch(removeGameLike(contentId));
    }
    return dispatch(addGameLike(contentId));
  };
}
