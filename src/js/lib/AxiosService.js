import axios from 'axios';
import Location from './Location';

export const AxiosInstance = axios.create({
  // baseURL: window.location.origin //Location.getOrigin()
});
