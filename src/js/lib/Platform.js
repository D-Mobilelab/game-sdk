/**
 * Returns true if the browser is running on Android device
 * @param {String} [UA=window.navigator.userAgent] - the userAgent string
 * @returns {Boolean} - true if it's android
 */
const isAndroid = (UA = window.navigator.userAgent) => /Android/.test(UA);


/**
 * Returns true if the browser is running on iOS devices
 * @param {String} [UA=window.navigator.userAgent] - the userAgent string
 * @returns {Boolean} - true if it's ios
 */
const isIOS = (UA = window.navigator.userAgent) => /iP(hone|od|ad)/.test(UA);

export default { isAndroid, isIOS };
