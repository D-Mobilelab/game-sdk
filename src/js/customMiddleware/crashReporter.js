/**
 * Simple function to report an error on newton
 * if an error occurs 
 * @param {any} err - the error object throw in window.onerror
 * @param {any} [state={ a: 1 }] - the application state if any
 * @param {string} [action=''] - the last action before error was triggered
 * @returns {undefined}
 */
function reportError(err, state = { a: 1 }, action = '') {
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
    error: error.toString ? error.toString() : JSON.stringify(error),
  };
  // a:1 otherwise SimpleObject raise an error -.-'
  reportError(errorObject);
  // If the function returns true prevents the default event handler to fire
  return false;
};

// export the middleware
const crashReporter = store => next => (action) => {
  try {
    return next(action); // dispatch
  } catch (err) {
    reportError(err, store.getState(), action);
    throw err; // re-throw error
  }
};

export default crashReporter;
