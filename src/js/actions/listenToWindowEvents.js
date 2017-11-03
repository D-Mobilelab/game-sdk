// thunk action creator, needs redux-thunk
export default function listenToWindowEvents(name, mapEventToAction, filter = e => true) {
  return function (dispatch) {
    function handleEvent(e) {
      if (filter(e)) {
        dispatch(mapEventToAction(e));
      }
    }

    window.addEventListener(name, handleEvent);

    // note: returns a function to unsubscribe
    return () => window.removeEventListener(name, handleEvent);
  };
}
