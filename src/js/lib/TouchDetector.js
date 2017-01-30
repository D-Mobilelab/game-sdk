export const isTouch = () => (('ontouchstart' in window)
                || (window.navigator.MaxTouchPoints > 0)
                || (window.navigator.msMaxTouchPoints > 0));
