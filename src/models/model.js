import axios from 'axios';
import mapData from './mapData';

export default {
  get (url, params) {
    if (!url) {
      return new Promise((resolve) => {
        resolve(mapData);
      });
    }
    return axios.get(url, { params })
  }
}
