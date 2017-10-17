import { localStorage } from './LocalStorage';

/**
 * This module is intendend to handle history navigation through games
 */
const LOCALSTORAGE_HISTORY_KEY = 'gfsdk_history';
export function push(element) {
  let history = JSON.parse(localStorage.getItem(LOCALSTORAGE_HISTORY_KEY));
  if (!history) { history = []; }
  history[history.length] = element;
  localStorage.setItem(LOCALSTORAGE_HISTORY_KEY, JSON.stringify(history));
  return history;
}

export function pop() {
  const history = JSON.parse(localStorage.getItem(LOCALSTORAGE_HISTORY_KEY));
  if (history && history.length > 0) {
    const value = history.pop();
    localStorage.setItem(LOCALSTORAGE_HISTORY_KEY, JSON.stringify(history));
    return value;
  }
}

export function getHistory() {
  const history = JSON.parse(localStorage.getItem(LOCALSTORAGE_HISTORY_KEY));
  if (history && history.length > 0) { return history; }
}

export default { push, pop, getHistory };
