import platform from 'platform';

let _platform = platform;
let setMock = () => {}
let isTesting = () => process.env.NODE_ENV === 'testing';
if (isTesting()){	
	setMock = (UAString)=>{
		_platform = platform.parse(UAString)
	}
}

/**
 * Returns true if the browser is running on Android device
 * @returns {Boolean} - true if it's android
 */
const isAndroid = ()=>{
	let os = _platform.os.family;
	if(os && typeof os === 'string'){
		os = os.toLowerCase();
		return os.indexOf('android') > -1;
	} else {
		return false;
	}
}

/**
 * Returns true if the browser is running on iOS devices
 * @returns {Boolean} - true if it's ios
 */
const isIOS = ()=>{
	let os = _platform.os.family;
	if(os && typeof os === 'string'){
		os = os.toLowerCase();
		return os.indexOf('ios') > -1;
	} else {
		return false;
	}
}

/**
 * Returns true if the browser is running on macOSX system
 * it's not equal to isIOS
 * @returns {Boolean} - true if it's macOSX
 */
const isMacOS = ()=>{
	let os = _platform.os.family;
	if(os && typeof os === 'string'){
		os = os.toLowerCase();
		return os.indexOf('os x') > -1;
	} else {
		return false;
	}
}
export {isIOS, isAndroid, isMacOS, setMock};