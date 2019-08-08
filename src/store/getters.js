/**
 * Created by Administrator on 2017/1/12.
 */

export default {
    // 用户信息getters  返回用户信息
    getToken: state => state.users.token,
    sidebar: state =>  state.sidebar,
    visitedViews: state => state.visitedViews,
    cachedViews: state => state.cachedViews,
    userInfo: (state) => state.userInfo
}
