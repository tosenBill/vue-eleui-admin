/**
 * Created by Cray on 2017/1/5.
 */
import Host from '../config/host'
import axios from './axios'
import Qs from 'qs'
import Utils from '@utils/index'

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
          headers: this.getHeaders()
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
        axios.post(url, Qs.stringify(...params), {
          headers: { 'token': this.getHeaders().token }
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
		getHeaders () {
      const token = Utils.getCookie('token')
			const headers = {
				'Content-Type': 'application/json;charset=UTF-8'
      }

			if (token) {
				headers.token = token
			} else {
        window._Vue.$router.push({ path: '/login' })
      }
			return headers
		}
	}
)
