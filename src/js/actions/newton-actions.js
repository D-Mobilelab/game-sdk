import Location from '../lib/Location';
import { getUserType } from './user-actions';
import NewtonAdapter from 'newton-adapter';

export function init(){
    return (dispatch, getState) => {
        const currentState = getState();
        return NewtonAdapter.init({
            secretId: currentState.vhost.NEWTON_SECRETID,
            enable: true, // enable newton
            waitLogin: false,     // wait for login to have been completed (async)
            properties: {
                environment: (currentState.generic.hybrid ? 'hybrid' : 'webapp'),
                white_label_id: currentState.game_info.label || 'it-gameasy'
            }
        });
    }
}

export function login(){
    return (dispatch, getState) => {
        const currentState = getState();
        
        let queryString = Location.getQueryString();
        if (typeof queryString.dest === 'undefined'){
            queryString.dest = 'N/A';
        }

        let toAdd = [
            ['country', currentState.vhost.TLD], 
            ['real_country', currentState.vhost.NT_REAL_COUNTRY],
            ['white_label_id', currentState.game_info.label],
            ['http_referrer', window.document.referrer]
        ];

        let userProperties = toAdd.reduce((accumulator, keyValue) => {
            let [key, value] = keyValue;
            if(value){ accumulator[key] = value; }
            return accumulator;
        }, queryString);
        
        return NewtonAdapter.login({
            type: 'external',
            userId: currentState.user.user,
            userProperties: userProperties,
            logged: getUserType(currentState.user)
        }).catch((reason) => Promise.resolve());
    }
}