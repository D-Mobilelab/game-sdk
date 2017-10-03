export function user(state = {
  matchPlayed: 0,
  user: null, // the user id
  isSaving: false,
  isFetching: false,
  localUserData: null,
  remoteUserData: null,
  userData: {
    CreatedAt: new Date(0).toISOString(),
    UpdatedAt: new Date(0).toISOString(),
    ProductId: null,
    contentId: null,
    domain: null,
    Creator: null,
    _id: null,
    info: null,
  },
  logged: false,
  favourites: [],
}, action) {
  switch (action.type) {
    case 'USER_CHECK_LOAD_START':
      return state;
    case 'USER_CHECK_LOAD_END':
      return Object.assign({}, state, { ...state, ...action.user });
    case 'USER_CHECK_LOAD_FAIL':
      return Object.assign({}, state, { ...state, error: action.reason });
    case 'GAME_INFO_LOAD_END':
      return Object.assign({}, state, { ...state, ...action.game_info.user });
    case 'GET_FAVOURITES_START':
      return state;
    case 'GET_FAVOURITES_END':
      return Object.assign({}, state, { ...state, favourites: action.favourites });
    case 'GET_FAVOURITES_FAIL':
      return Object.assign({}, state, { ...state, fetch_error: action.reason });
    case 'SET_CAN_PLAY':
      return Object.assign({}, state, { ...state, canPlay: action.canPlay });
    case 'INCREASE_MATCH_PLAYED':
      return Object.assign({}, state, { ...state, matchPlayed: state.matchPlayed += 1 });
    case 'ADD_GAME_LIKE_START':
      return state;
    case 'ADD_GAME_LIKE_END':
      const newFavourites = [...state.favourites, action.payload];
      return Object.assign({}, state, { favourites: newFavourites });
    case 'ADD_GAME_LIKE_ERROR':
      return state;
    case 'REMOVE_GAME_LIKE_START':
      return state;
    case 'REMOVE_GAME_LIKE_END':
      const { id } = action.payload;
      const newFilteredFavourites = state.favourites.filter((favourite) => {
        if (favourite) {
          return favourite.id !== id;
        }
      });
      return Object.assign({}, state, { favourites: newFilteredFavourites });
    case 'REMOVE_GAME_LIKE_ERROR':
      return state;
      /** SERVER SAVE */
    case 'SAVE_USER_DATA_SERVER_START':
      return Object.assign({}, state, { isSaving: true });
    case 'SAVE_USER_DATA_SERVER_END':
      const newUserDataEnd = { ...state.userData, ...action.payload };
      return Object.assign({}, state, { userData: newUserDataEnd, isSaving: false });
    case 'SAVE_USER_DATA_SERVER_ERROR':
      return Object.assign({}, state, { isSaving: false });
      /** LOCAL SAVE */
    case 'SAVE_USER_DATA_LOCAL_START':
      return state;
    case 'SAVE_USER_DATA_LOCAL_END':
      const newUserDataMem = { ...state.userData, info: action.payload.info, UpdatedAt: action.payload.UpdatedAt };
      return Object.assign({}, state, { userData: newUserDataMem });
    case 'SAVE_USER_DATA_LOCAL_ERROR':
      return state;
      /** LOAD SERVER */
    case 'LOAD_USER_DATA_SERVER_START':
      return Object.assign({}, state, { isFetching: true });
    case 'LOAD_USER_DATA_SERVER_END':
      let newUserData = null;
      if (action.payload) {
        newUserData = { ...state.remoteUserData, ...action.payload };
      }
      return Object.assign({}, state, { remoteUserData: newUserData, isFetching: false });
    case 'LOAD_USER_DATA_SERVER_ERROR':
      return Object.assign({}, state, { isFetching: false });
      /** LOAD LOCAL */
    case 'LOAD_USER_DATA_LOCAL_START':
      return state;
    case 'LOAD_USER_DATA_LOCAL_END':
      if (action.payload) {
        const newUserLocalData = { ...state.localUserData, ...action.payload };
        return Object.assign({}, state, { localUserData: newUserLocalData });
      }
      return state;
    case 'LOAD_USER_DATA_LOCAL_ERROR':
      return state;
    case 'LOAD_USER_DATA_END':
      const syncedData = { ...state.userData, ...action.payload };
      return Object.assign({}, state, { userData: syncedData });
    default:
      return state;
  }
}
