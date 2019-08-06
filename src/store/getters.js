/**
 * Created by Administrator on 2017/1/12.
 */

export default {
    // 用户信息getters  返回用户信息
    getToken: state => state.users.token,
    sidebar: state =>  state.sidebar,
    userInfo: (state) => state.userInfo
}
