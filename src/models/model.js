import axios from 'axios'
import qs from 'qs'

const IS_DEV = process.env.NODE_ENV === 'development'
axios.defaults.baseURL = 'https://ancient-tor-41221.herokuapp.com'

export default {
  get (api, params) {
    const url = `${api}${params ? '?' + qs.stringify(params) : ''}`
    if (IS_DEV) console.log(`%cfetch url: ${url}`, 'color: blue')
    return axios.get(url)
      .then((res) => {
        if (IS_DEV) console.log('%cresponse', 'color: green;', res)
        return res
      })
      .catch((e) => {
        if (IS_DEV) console.log('%cerror', 'color: red;', e)
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
