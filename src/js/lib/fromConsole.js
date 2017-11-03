export default function fromConsole() {
  let stack;
  try {
    // Throwing the error for Safari's sake, in Chrome and Firefox
    // var stack = new Error().stack; is sufficient.
    throw new Error();
  } catch (e) {
    stack = e.stack;
  }

  if (!stack) {
    return false;
  }

  const lines = stack.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].indexOf('at Object.InjectedScript.') > -1) {
      return true;
    }
    // Chrome console
    if (lines[i].indexOf('@debugger eval code') > -1) {
      return true;
    } // Firefox console

    if (lines[i].indexOf('_evaluateOn') > -1) {
      return true;
    }
    // Safari console    
    if (lines[i].indexOf('at <anonymous>') > -1) {
      return true;
    }
  }
  return false;
}
