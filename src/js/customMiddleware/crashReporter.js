function reportError(err, state, action = '') {
  if (window.Newton) {
    const errorObject = Newton.SimpleObject.fromJSONObject({
      action,
      url: window.document.location.href,
      err: JSON.stringify({ ...err })
    });
    let NewtonInstance = Newton.getSharedInstance();
    NewtonInstance.sendEvent('GENERIC_ERROR', errorObject);
  }
  console.error('Caught an exception!', err, state);
}

window.onerror = function(message, source, lineno, colno, error) {
  const errorObject = {
    message,
    source,
    lineno,
    error: JSON.stringify(error)
  }
  // a:1 otherwise SimpleObject raise an error -.-'
  reportError(errorObject, { a: 1 });
  // When the function returns true, this prevents the firing of the default event handler.
  return false;
}

export const crashReporter = store => next => (action) => {
  try {
    return next(action); // dispatch
  } catch (err) {
    reportError(err, store.getState(), action);
    throw err; // re-throw error
  }
};
