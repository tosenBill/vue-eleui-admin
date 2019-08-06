/**
 * Created by VULCAN on 2018/8/8.
 */
import axios from 'axios'
// import { API_HOST } from "../config";
import _ from 'lodash'
import Utils from '@utils/index'

// 请求超时时间
axios.defaults.timeout = 10000
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(
	res => {
    let _data = null
		if (res.status === 200) {
			_data = res.data
			if (_.isPlainObject(_data) && _data.code) {
				switch (_data.code) {
					case '00001-00000':
            window._Vue.$message.error(_data.errMsg)
            window._Vue.$router.replace({ path: '/' })
            _data = null
						break
					case '00001-00001':
						window._Vue.$message.error(_data.errMsg)
						_data = null
						break
				}
			}
		}
		return _data
	},
	err => {
    console.log('---------err', err.response.status)
		switch (err.response.status) {
			case 400:
        Utils.removeCookie('token')
        window._Vue.$router.replace({
          path: '/login'
        })

				break
			case 401: {
				break
			}
			case 405:
			case 500:
			default:
				break
		}
		return err.response
	}
)

export default axios
