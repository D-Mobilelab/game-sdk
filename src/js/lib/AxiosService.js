import axios from 'axios';
import Location from './Location';

export let AxiosInstance = axios.create({
  //baseURL: window.location.origin //Location.getOrigin()
});