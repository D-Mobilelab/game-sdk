import Cookies from 'js-cookie';

import MockAdapter from 'axios-mock-adapter';
import { generatePony } from '../PonyToken';
import FakeConfig from './FakeConfig';
import { AxiosInstance } from '../AxiosService';

const mock = new MockAdapter(AxiosInstance);


fdescribe('PonyToken tests', function() {

    const createponyResponse = {
        "data": {
            "ponyUrl": "&_PONY=12-1776e43daf199f3a0f5360616b969517999999END"
        },
        "status": 200,
        "config": {
            "method": "JSONP",
            "transformRequest": [
            null
            ],
            "transformResponse": [
            null
            ],
            "url": "http://www2.gameasy.com/it/v01/createpony?callback=JSON_CALLBACK&data=%7B%22return_url%22%3A%22http%3A%2F%2Fwww2.gameasy.com%2Fit%2F%23!%2Fmfp%22%2C%22cookieData%22%3A%7B%22cookie%22%3A%7B%22dadanetuser%22%3A%2204adfriends_status%253D0%2526tld%253Dit%2526auth_token%253D%2521%252APOGGIO%252A%2521%257B%2522userId%2522%253A%2522%252B3912345678%2522%252C%2522serviceId%2522%253A%2522fakeservice%2522%252C%2522dateSubscription%2522%253A%25222017-06-06%2522%252C%2522dateLastBilling%2522%253A%25222017-06-06%2522%252C%2522dateNextBilling%2522%253A%25222017-06-13%2522%252C%2522dateSubscriptionEnd%2522%253A%25222017-06-13%2522%252C%2522profile%2522%253A%2522%2522%252C%2522operator%2522%253A%2522fake.it%2522%252C%2522pin%2522%253A%25229999%2522%252C%2522status%2522%253A%25221%2522%252C%2522extra%2522%253A%257B%2522user_billed%2522%253A%2522y%2522%252C%2522credits%2522%253A10%257D%252C%2522country%2522%253A%2522it%2522%257D%2526cell%253D%252B3912345678%2526op%253Dfake.it%2526chk%253D96a3e5e92f7561d07a68022a1def8ea1%22%2C%22info_utente%22%3A%2204stato_utente%253D1%2526crediti_premium2%253D0%2526data_iscr%253D2017-06-06%2526id_operatore%253D0%2526phone_company%253Dfake.it%2526crediti_nonpremium%253D10%2526data_scadenza_abb%253D2017-06-13%2526destinatario%253D%252B3912345678%2526numero%253D%252B3912345678%2526chk%253D1942e2641b6b90158cff450fa86eb016%22%2C%22mipuser%22%3A%22998092f8fcde11e69430005056b60712%22%7D%7D%7D",
            "headers": {
            "Accept": "application/json, text/plain, */*"
            },
            "withCredentials": true
        },
        "statusText": "load"
    };

    beforeAll(function(){
        mock.onGet(FakeConfig.MOA_API_CREATEPONY).reply(200, createponyResponse);
        ['dadanetuser','info_utente','mipuser'].forEach((value, index) => {
            Cookies.set(value, `mocked-${value}`);
        });
        mock.onGet(FakeConfig.MOA_API_CREATEPONY).reply(200, createponyResponse);
    });

    it('generatePony', function(done){
        /*generatePony(FakeConfig).then((response) => {
            console.log(response);
        }).catch(done.fail);**/
        AxiosInstance.get(FakeConfig.MOA_API_CREATEPONY).then((response) => {
            expect(response.data).toEqual(createponyResponse);
        });
    });
});
