import { Utils } from 'stargatejs';
let theWindow = {};
const isProduction = () => process.env.NODE_ENV !== "production";

if(isProduction()){
    let DEBUG_OPTIONS = {};
    let windowConf = require('./windowConf');

    DEBUG_OPTIONS = Utils.dequeryfy(window.location.href);
    theWindow.location = windowConf(DEBUG_OPTIONS.host, DEBUG_OPTIONS.game_id, DEBUG_OPTIONS.country_code);
} else if(!isProduction()) {
    theWindow = window;
}

class Location{
    getOrigin(){
        if (!theWindow.location.origin) {             
            theWindow.location.origin = `${theWindow.location.protocol}//${theWindow.location.hostname}${(theWindow.location.port ? ':${theWindow.location.port}' : '')}`;
        }
        let isGameasyRegex = new RegExp(/http:\/\/www2?\.gameasy\.com\/([a-zA-Z0-9-_]*)/);        
        let isGameasyMatch = theWindow.location.href.match(isGameasyRegex);

        let gameasyCountryCode = '', 
            toJoin = [];
        if (isGameasyMatch !== null){
            gameasyCountryCode = isGameasyMatch[1];
            // if we are in testing integration mode we need this for url composition
            gameasyCountryCode = gameasyCountryCode === 'test' ? 'ww-it' : gameasyCountryCode;
        }

        toJoin.push(theWindow.location.origin);
        if(gameasyCountryCode && gameasyCountryCode !== ''){
            toJoin.push(gameasyCountryCode);
        }        
        return toJoin.join("/");
    }

    getCurrentHref(){
        return theWindow.location.href;
    }

    getQueryStringKey(key){
        return Utils.dequeryfy(theWindow.location.href)[key];
    }

    getQueryString(){
        return Utils.dequeryfy(theWindow.location.href);
    }

    isGameasy(){
        return true;
    }
}

const LocationInstance = new Location();
export default LocationInstance;