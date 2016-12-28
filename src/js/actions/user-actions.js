import Constants from '../lib/Constants';
import { AxiosInstance } from '../lib/AxiosService';
import Cookies from 'js-cookie';
import { getContentId } from './gameinfo-actions';
import userCheckMock from '../../mocks/user-check';
const isProduction = (process.env.NODE_ENV === 'production');

/*const dadanetuser = `04adfriends_status=0&tld=xx&auth_token=!*POGGIO*!{"userId":"pasqualemangialavori@buongiorno.com","serviceId":"fakeservice","dateSubscription":"2016-12-23","dateLastBilling":"2016-12-23","dateNextBilling":"2016-12-30","dateSubscriptionEnd":"2016-12-30","profile":"","operator":"fake.ww","pin":"9999","status":1,"extra":{"user_billed":"y","credits":10},"country":"ww"}&cell=+pasqualemangialavori@buongiorno.com&op=fake.ww&chk=97a74b9f4323427f1f13a9fa0f772c78`;
const info_utente = `04stato_utente=1&crediti_premium2=0&data_iscr=2016-12-23&id_operatore=0&phone_company=fake.ww&crediti_nonpremium=10&data_scadenza_abb=2016-12-30&destinatario=+pasqualemangialavori@buongiorno.com&numero=+pasqualemangialavori@buongiorno.com&chk=ae99762dfb6eed69fc55533263d3f3fc`;
Cookies.set('dadanetuser', dadanetuser, { path: '/'});
Cookies.set('info_utente', info_utente, { path: '/'});*/

export function getUserFavourites(){
    return (dispatch, getState)=>{
        let getFavPromise;
        dispatch({ type: 'GET_FAVOURITES_START' }); 
        if (getState().user.logged){                        
            getFavPromise = AxiosInstance.get(Constants.USER_GET_LIKE, {
                params:{
                    user_id: getState().user.user, //userID
                    size: 51
                }
            });
        } else {
            getFavPromise = Promise.resolve({data:[]});
        }

        return getFavPromise.then((userFavouritesResponse)=>{
            dispatch({type: 'GET_FAVOURITES_END', favourites: userFavouritesResponse.data});
        }).catch((reason) => {
            dispatch({type: 'GET_FAVOURITES_FAIL'});
        });
    }
}

export function getUser(){
    return (dispatch, getState) =>{
        dispatch({ type: 'USER_CHECK_LOAD_START' });
        return AxiosInstance.get(Constants.USER_CHECK)
                .then((userResponse) => {
                    let data = {};
                    !isProduction ? data = userCheckMock : data = userResponse.data;                 
                    dispatch({type: 'USER_CHECK_LOAD_END', user: data});
                    return Promise.all([
                        dispatch(canPlay()),
                        dispatch(getUserFavourites())
                    ]);
                })                
                .catch((reason)=>{
                    dispatch({type: 'USER_CHECK_LOAD_FAIL', reason: reason});
                });
    }
}

export function canPlay(){
    return (dispatch, getState)=>{
        let url = Constants.CAN_DOWNLOAD_API_URL.replace(":ID", getContentId());
        return AxiosInstance.get(url, {
            params:{ cors_compliant:1 }
            }).then((response) => {
                dispatch({type:'SET_CAN_PLAY', canPlay: response.data.canDownload});
            });        
    }
}

export function increaseMatchPlayed(){
    return {
        type:'INCREASE_MATCH_PLAYED'
    }
}