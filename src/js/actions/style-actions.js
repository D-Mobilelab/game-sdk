export function setStyles(styles = {}) {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_STYLES', payload: styles });
  };
}
