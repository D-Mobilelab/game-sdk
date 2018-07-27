import Newton from 'newton';
import * as Constants from '../lib/Constants';
import { AxiosInstance } from '../lib/AxiosService';
import { getContentId } from './utils';
import { localStorage } from '../lib/LocalStorage';

export function uo30CanPlay() {
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

export function uo30GetUserFavourites() {
  return (dispatch, getState) => {
    let getFavPromise;
    dispatch({ type: 'GET_FAVOURITES_START' });
    if (getState().user.logged) {

      console.warn('TODO: GET_FAVOURITES_START user.getcollection... ');

      // getFavPromise = AxiosInstance.get(Constants.USER_GET_LIKE, {
      //   withCredentials: true,
      //   params: {
      //     user_id: getState().user.user, // userID user30?
      //     size: 51,
      //   },
      //   validateStatus: status => status === 200 || status === 404,
      // });
      getFavPromise = Promise.resolve({ data: [] });
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

export function uo30GetUser() {
  return (dispatch, getState) => {
    dispatch({ type: 'USER_CHECK_LOAD_START' });
    const query = {};

    console.log('user type: UO30');

    const NewtonInstance = Newton.getSharedInstance();
    // if(NewtonInstance.isUserLogged()) {
    //   NewtonInstance.syncUserState();
    // }
    const getUserApi = getState().vhost.MOA_API_USER_PROFILE_GET.replace(':ACCESS_TOKEN', encodeURIComponent(NewtonInstance.getUserToken()));

    return AxiosInstance.get(getUserApi, { withCredentials: true, params: query })
      .then((userResponse) => {
        const user = userResponse.data;
        console.log(user,userResponse.data);
        if (user.state === '200') {
          user.user = ''; // fallback uo20 attribute 
        }

        if (process.env.NODE_ENV === 'development') {
          const userType = localStorage.getItem('gfsdk-debug-user_type');
          if (userType === 'guest') {
            user.user = null;
          } else if (userType === 'free') {
            user.user = decodeURIComponent(localStorage.getItem('gfsdk-debug-user_id'));
          } else if (userType === 'premium') {
            user.user = localStorage.getItem('gfsdk-debug-user_id');
          }
        }

        dispatch({ type: 'USER_CHECK_LOAD_END', user });
        if (window.Raven && window.Raven.isSetup()) {
          window.Raven.setUserContext(user);
        }

        return Promise.all([
          dispatch(uo30GetUserFavourites()),
        ]);
      })
      .catch((reason) => {
        dispatch({ type: 'USER_CHECK_LOAD_FAIL', reason });
      });
  };
}


export function uo30IncreaseMatchPlayed() {
  return {
    type: 'INCREASE_MATCH_PLAYED',
  };
}

export function uo30RemoveGameLike(gameId) {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_GAME_LIKE_START' });

    console.error('TODO: REMOVE_GAME_LIKE_START user.setcollection... ');

    // const URL = `${Constants.USER_DELETE_LIKE}?content_id=${gameId}&user_id=${getState().user.user}`; // user30?
    // return AxiosInstance.post(URL, {}, { withCredentials: true })
    //   .then(() => {
    //     dispatch({ type: 'REMOVE_GAME_LIKE_END', payload: { id: gameId } });
    //   })
    //   .catch((reason) => {
    //     dispatch({ type: 'REMOVE_GAME_LIKE_ERROR', payload: reason });
    //   });
  };
}

export function uo30AddGameLike(gameId) {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_GAME_LIKE_START' });
    
    console.error('TODO: ADD_GAME_LIKE_START user.setcollection... ');

    // const query = {
    //   content_id: gameId,
    //   user_id: getState().user.user, // user30?
    // };
    // return AxiosInstance.get(Constants.USER_SET_LIKE, { withCredentials: true, params: query })
    //   .then((response) => {
    //     const { object_id } = response.data;
    //     dispatch({ type: 'ADD_GAME_LIKE_END', payload: { id: object_id, content_id: object_id } });
    //   })
    //   .catch((reason) => {
    //     dispatch({ type: 'ADD_GAME_LIKE_ERROR', payload: reason });
    //   });
  };
}

export function uo30ToggleGameLike() {
  return (dispatch, getState) => {
    const { user } = getState();
    const { game_info } = getState();

    const isFavourite = user.favourites.some(favourite => (favourite.id === game_info.id));
    const contentId = game_info.content_id;
    if (isFavourite) {
      return dispatch(uo30RemoveGameLike(contentId));
    }
    return dispatch(uo30AddGameLike(contentId));
  };
}
