import axios from 'axios'
import qs from 'qs'

const ENV = process.env.NODE_ENV
const DOMAIN = 'https://ancient-tor-41221.herokuapp.com'

export default {
  get (api, params) {
    const url = `${DOMAIN}${api}${params ? '?' + qs.stringify(params) : ''}`
    if (ENV === 'development') {
      console.log(`%cfetch url: ${url}`, 'color: blue')
    }
    return axios.get(url)
      .then((res) => {
        if (ENV === 'development') console.log('%cresponse', 'color: green;', res)
        return res
      })
      .catch((e) => {
        if (ENV === 'development') console.log('%cerror', 'color: red;', e)
        return {
          data: {
            responseStatus: 4,
            message: '请求出错，请检查网络'
          }
        }
      })
  }
  // if (!url) {
  //   if (!params) {
  //     return new Promise((resolve) => {
  //       resolve(mapData);
  //     });
  //   } else {
  //     let res = mapData[params.campus || 0].buildings[params.building || 0].floors[params.floor || 0];
  //     return new Promise((resolve) => {
  //       resolve(res);
  //     })
  //   }
  // }
  // return axios.get(url, { params })
}
