import axios from 'axios';
import * as mapData from './mapData.json';

export default {
  get (url, params) {
    if (!url) {
      if (!params) {
        return new Promise((resolve) => {
          resolve(mapData);
        });
      } else {
        let res = mapData[params.campus || 0].buildings[params.building || 0].floors[params.floor || 0];
        return new Promise((resolve) => {
          resolve(res);
        })
      }
    }
    return axios.get(url, { params })
  }
}
