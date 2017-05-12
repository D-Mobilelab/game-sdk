import axios from 'axios';
import Location from './Location';

let AxiosInstance;
if (window.ORIGIN) {
  AxiosInstance = axios.create({
    baseURL: window.ORIGIN
  });
} else {
  AxiosInstance = axios.create();
}

export { AxiosInstance };
