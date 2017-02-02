export function session(state = { opened: false }, action) {
  switch (action.type) {
    case 'START_SESSION':
      return Object.assign({}, state, { ...action.session });
    case 'END_SESSION':
      return Object.assign({}, state, { ...action.session });
    case 'SET_RANK':
      return Object.assign({}, state, { ...action.session, rank: action.rank });
    default:
      return state;
  }
}
