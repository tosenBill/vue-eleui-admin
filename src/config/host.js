/**
 * Created by Cray on 2017/1/5.
 */
const _ENV = process.env.NODE_ENV
let API_HOST

switch (_ENV) {
	case 'production':
    API_HOST = 'http://admin.5g.meixuanlife.com/'
		break
	case 'testing':
		API_HOST = 'http://admin.5g.meixuanlife.com/'
		break
	default :
    API_HOST = '/api'
}

export default {
	API_HOST
}
