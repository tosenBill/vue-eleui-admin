/**
 * Created by Cray on 2017/1/5.
 */
import Host from '../config/host'
// import Local from "@utils/local";
import axios from './axios'
import Qs from 'qs'
import Utils from '@utils/utils'

import sysUsersApi from './modules/sysUsers' // 用户接口

export default Object.assign(
	{},
	Host,
	sysUsersApi,
  {
    /**
     * get方法，对应get请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    get (url, ...params) {
      return new Promise((resolve, reject) => {
        axios.get(url, {
          params: params,
          headers: { 'adolf-authorization': 'adolf31413ffapjfo' }
        })
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.data)
          })
      })
    },
    post (url, ...params) {
      return new Promise((resolve, reject) => {
        // const qsParams = Qs.stringify(...params)
        // console.log('params', qsParams)
        axios.post(url, Qs.stringify(...params), {
          headers: { 'adolf-authorization': 'adolf31413ffapjfo' }
        })
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.data)
          })
      })
    },
    /**
    * post方法，对应post请求
    * @param {String} url [请求的url地址]
    * @param {Object} params [请求时携带的参数]
    */
    // get ({ url, headers = this.getHeaders(), params = {}, responseType = 'json' }) {
    //   return axios({ method: 'get', url, headers, params, responseType, timeout: 15000 })
    // },
		// post ({ url, headers = this.getHeaders(), data = {} }) {
		// 	return axios({ method: 'post', url, headers, data, timeout: 15000 })
		// },
		getHeaders () {
			const { _DJ_TOKEN } = Utils.getCookie()
			const headers = {
				'Content-Type': 'application/json;charset=UTF-8'
			}
			if (_DJ_TOKEN) {
				headers.token = _DJ_TOKEN
			}
			return headers
		}
	}
)
