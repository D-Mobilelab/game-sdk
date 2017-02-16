export default function reporter(type, message) {
  if(!window.__GAME_REPORT__) {
    window.__GAME_REPORT__ = [];
  }
  window.__GAME_REPORT__.push({ type, message, ts: new Date().toISOString() });
}
