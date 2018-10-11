import axios from 'axios';
import * as mapData from './mapData.json';

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
