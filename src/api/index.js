/**
 * Created by Cray on 2017/1/5.
 */
import Host from '../config/host'
// import Local from "@utils/local";
import axios from './axios'
import Utils from '@utils/utils'

import sysUsersApi from './modules/sysUsers' // 用户接口

export default Object.assign(
	{},
	Host,
	sysUsersApi,
	{
		// 菜单接口 /api/sys/menu/menuList
		menuList (params) {
			return this.get({
				url: this.API_HOST + `sys/menu/menuList`,
				params
			})
		}
  },
  {
		put ({ url, headers = this.getHeaders(), data = {} }) {
			return axios({ method: 'put', url, headers, data, timeout: 15000 })
		},
		putParam ({ url, headers = this.getHeaders(), params = {} }) {
			return axios({ method: 'put', url, headers, params, timeout: 15000 })
		},
		post ({ url, headers = this.getHeaders(), data = {} }) {
			return axios({ method: 'post', url, headers, data, timeout: 15000 })
		},
		get ({ url, headers = this.getHeaders(), params = {}, responseType = 'json' }) {
			return axios({ method: 'get', url, headers, params, responseType, timeout: 15000 })
		},
		delete ({ url, headers = this.getHeaders(), params = {} }) {
			return axios({ method: 'delete', url, headers, params, timeout: 15000 })
		},
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
