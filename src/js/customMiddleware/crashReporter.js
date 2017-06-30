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
  if (error === null || source === '' || error === '{}') {
    return false;
  }

  const errorObject = {
    message,
    source,
    lineno,
    error: error.toString(),
  };
  // a:1 otherwise SimpleObject raise an error -.-'
  reportError(errorObject, { a: 1 });
  // If the function returns true prevents the default event handler to fire
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
