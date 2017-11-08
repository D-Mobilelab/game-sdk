import * as HistoryGame from '../lib/HistoryGame';
import * as menuActions from './menu-actions';

const addressBar = `${window.location.pathname}${window.location.search}`;
window.history.replaceState({ location: 'step0' }, document.title, `${addressBar}#0`);
window.history.pushState({ location: 'step1' }, document.title, `${addressBar}#1`);
window.history.pushState({ location: 'step2' }, document.title, `${addressBar}#2`);

export default function historyHandler(event) {
  return (dispatch) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const { state } = event;
    if (state && state.location === 'step1') {
      /* *
      * This means the user have clicked back and
      * coming from a related game
      * */
      dispatch({ type: 'BACK_CLICKED' });

      const lastHistoryGame = HistoryGame.pop();
      if (lastHistoryGame) {
        window.location.replace(lastHistoryGame);
        return false;
      }

      dispatch(menuActions.goToHome());
      return false;
    }
    return false;
  };
}
