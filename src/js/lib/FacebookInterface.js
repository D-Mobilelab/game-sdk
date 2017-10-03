import { queryfy } from 'docomo-utils';
import {
  FB_SDK_VERSION,
  FB_SDK_URL,
} from './Constants';
import Location from './Location';

class FacebookInterface {
  constructor() {
    this.initialized = false;
    this.isMobile = false;
    this.trackPageView = this.trackPageView.bind(this);
    this.trackEvent = this.trackEvent.bind(this);
    this.isInitialized = this.isInitialized.bind(this);
    window.fbAsyncInit = this.onFbSDKInit.bind(this);
  }

  init(config) {
    if (process.env.APP_ENV === 'HYBRID') {
      return;
    }
    this.config = config;
    this.downloadSDK();
  }

  isInitialized() {
    return this.initialized;
  }

  downloadSDK() {
    /* eslint-disable */
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = `//${FB_SDK_URL}`;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    /* eslint-enable */
  }

  onFbSDKInit() {
    if (typeof window.FB === 'undefined') {
      console.warn('Cannot get facebook sdk', this.config);
    } else {
      window.FB.init({
        appId: this.config.fbAppId,
        cookie: true, // enable cookies to allow the server to access
        xfbml: false, // parse social plugins on this page
        version: FB_SDK_VERSION,
      });

      if (this.config.enableTracking && window.FB.AppEvents) {
        window.FB.AppEvents.logPageView();
      }
      this.initialized = true;
    }
  }

  /**
   * share
   * @param {String} url - the url to share
   * @returns {Promise} - the promise resolves on share end
   * @memberOf FacebookInterface
   */
  share(url) {
    const shareParams = {
      method: 'share',
      href: url,
    };

    /* global facebookConnectPlugin*/
    if (typeof window.facebookConnectPlugin !== 'undefined') {
      return new Promise((resolve, reject) => {
        facebookConnectPlugin.showDialog(shareParams, resolve, reject);
      });
    }

    if (!this.initialized) {
      return Promise.resolve(false);
    }

    return new Promise((resolve) => {
      window.FB.ui(shareParams, (response) => {
        resolve(response);
      });
    });
  }

  send(url) {
    if (!this.initialized) {
      return false;
    }

    if (this.isMobile) {
      const targetURL = queryfy('http://www.facebook.com/dialog/send', {
        app_id: this.config.fbAppId,
        link: url,
        redirect_uri: Location.getOrigin(),
      });
      window.open(targetURL, '_parent');
    } else {
      const shareParams = {
        method: 'send',
        display: 'iframe',
        link: url,
      };

      return new Promise(resolve => window.FB.ui(shareParams, resolve));
    }
  }

  trackPageView() {
    if (!this.config.enableTracking) { return; }
    window.FB.AppEvents.logPageView();
  }

  trackEvent(name, properties) {
    if (!this.config.enableTracking) { return; }
    window.FB.AppEvents.logEvent(name, null, properties);
  }
}

const FacebookInterfaceInstance = new FacebookInterface();
export default FacebookInterfaceInstance;
