import axios from 'axios';

let AxiosInstance;
if (window._ORIGIN_) {
  AxiosInstance = axios.create({
    baseURL: window._ORIGIN_,
  });
} else {
  AxiosInstance = axios.create();
}

export { AxiosInstance };
