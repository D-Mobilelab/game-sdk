import { dequeryfy, queryfy, merge } from 'docomo-utils';

const endpoint = 'http://s2s.startappnetwork.com/s2s/1.3/htmlads';
const src = '?partner=856974125&token=778645132&adw=320&adh=480&os=1&osVer=700&segId=65437653&pub=1&prod=com.foobar.app&dip=50.36.36.1&ua=Mozilla/5.0%20(iPhone;%20CPU%20iPhone%20OS%207_0%20like%20Mac%20OS%20X;%20en-us)%20AppleWebKit/537.51.1%20(KHTML,%20like%20Gecko)%20Version/7.0%20Mobile/11A465%20Safari/9537.53&loc=44.000000%2C-2.000000&isp=42501&gen=0&age=25&maturity=1&test=true&dId=17e3ce3518af76e4&reqId=1245';

let params = {
    ua: navigator.userAgent        
};

export function show() {
    params.refresh = Date.now();
    const query = merge(dequeryfy(src), params);
    const iframeSrc = queryfy(endpoint, query);
    
    return {
        type: 'SHOW_INTERSTITIAL',
        payload: { 
            show: true, 
            src: iframeSrc
        }
    }
}

export function hide() {
    /** empty source to force reload on show action */
    return {
        type: 'HIDE_INTERSTITIAL',
        payload: { show: false, src: '' }
    }
}