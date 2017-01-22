import Stargate from 'stargatejs';
import Constants from '../lib/Constants';
import { AxiosInstance } from '../lib/AxiosService';
import { getContentId } from './gameinfo-actions';
import userCheckMock from '../../mocks/user-check';

const isProduction = (process.env.NODE_ENV === 'production');

export function getUserFavourites() {
  return (dispatch, getState) => {
    let getFavPromise;
    dispatch({ type: 'GET_FAVOURITES_START' });
    if (getState().user.logged) {
      getFavPromise = AxiosInstance.get(Constants.USER_GET_LIKE, {
        params: {
          user_id: getState().user.user, // userID
          size: 51,
        },
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
  return (dispatch, getState) => {
    dispatch({ type: 'USER_CHECK_LOAD_START' });
    const { generic } = getState();
    const query = {};
    if (generic.hybrid) { query.hybrid = 1; }

    if (generic.connectionState.online) {
      return AxiosInstance.get(Constants.USER_CHECK, { params: query })
        .then((userResponse) => {
          let data = {};
          !isProduction ? data = userCheckMock : data = userResponse.data;
          dispatch({ type: 'USER_CHECK_LOAD_END', user: data });
          return Promise.all([
            dispatch(canPlay()),
            dispatch(getUserFavourites()),
          ]);
        })
        .catch((reason) => {
          dispatch({ type: 'USER_CHECK_LOAD_FAIL', reason });
        });
    }
    if (generic.hybrid) {
      const filePath = [Stargate.file.BASE_DIR, Constants.USER_JSON_FILENAME].join('');
      return Stargate.file.readFileAsJSON(filePath)
          .then((responseData) => {
            dispatch({ type: 'USER_CHECK_LOAD_END', user: responseData });
          })
          .catch((reason) => {
            dispatch({ type: 'USER_CHECK_LOAD_FAIL', reason });
          });
    }
  };
}

export function canPlay() {
  return (dispatch) => {
    const url = Constants.CAN_DOWNLOAD_API_URL.replace(':ID', getContentId());
    return AxiosInstance.get(url, {
      params: { cors_compliant: 1 },
    }).then((response) => {
      dispatch({ type: 'SET_CAN_PLAY', canPlay: response.data.canDownload });
    });
  };
}

/**
 * Get the user type: guest(unlogged) free(facebook) or premium(subscribed)
 * @returns {String}
 */
export function getUserType(userInfo) {
  if (!userInfo.user) {
    return 'guest';
  } else if (!userInfo.subscribed) {
    return 'free';
  } else if (userInfo.subscribed) {
    return 'premium';
  }
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
    return AxiosInstance.post(URL)
            .then((response) => {
              dispatch({ type: 'REMOVE_GAME_LIKE_END', payload: { id: gameId, content_id: gameId } });
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
    return AxiosInstance.get(Constants.USER_SET_LIKE, { params: query })
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

    const isFavourite = user.favourites.some(favourite => favourite.contentId === game_info.contentId);
    const content_id = game_info.id;

    console.log('isFavourite', isFavourite);
    if (isFavourite) {
      return dispatch(removeGameLike(content_id));
    }
    return dispatch(addGameLike(content_id));
  };
}
