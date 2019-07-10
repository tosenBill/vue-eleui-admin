/**
 * Created by Cray on 2017/1/5.
 */
const _ENV = process.env._ENV
let API_HOST

switch (_ENV) {
	case 'production':
		API_HOST = 'http://omm.dianjia001.com/api/'
		break
	case 'testing':
		API_HOST = 'http://omm.17dianjia.net/api/'
		break
	default :
		API_HOST = 'http://omm.17dianjia.net/api/'
}
export default {
	API_HOST
}
