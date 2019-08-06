/**
 * 供货商接口
 */
export default {
    loginIn(params) {
      return this.post(this.API_HOST + '/login/pass', params)
    },
    /**
     * @description 获取用户详情
     * @date 2018-11-02
     * @param {*} data
     * @returns *
     */
    getUserInfo () {
      return this.post(this.API_HOST + '/user/info')
    },
    // 办卡信息
    handleCardList (data) {
      return this.post(this.API_HOST + '/card/team/page', data)
    }
}
