function reportError(err, state, action = '') {
  if (window.Newton) {
    const errorObject = {
      action,
      state: JSON.stringify(state),
      url: window.document.location.href,
      ...err,
    };

    try {
      const NewtonInstance = Newton.getSharedInstance();
      NewtonInstance.sendEvent('GENERIC_ERROR', Newton.SimpleObject.fromJSONObject(errorObject));
    } catch (e) {
      console.warn('Fail to report an error', errorObject);
    }
  }
  console.error('Caught an exception!', err, state);
}

window.onerror = function errorReporter(message, source, lineno, colno, error) {
  const errorObject = {
    message,
    source,
    lineno,
    error: JSON.stringify(error),
  };
  // a:1 otherwise SimpleObject raise an error -.-'
  reportError(errorObject, { a: 1 });
  // When the function returns true, this prevents the firing of the default event handler.
  return false;
};

export const crashReporter = store => next => (action) => {
  try {
    return next(action); // dispatch
  } catch (err) {
    reportError(err, store.getState(), action);
    throw err; // re-throw error
  }
};
