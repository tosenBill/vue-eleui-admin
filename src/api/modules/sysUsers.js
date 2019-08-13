/**
 * 供货商接口
 */
export default {
    /**
     * 用户注册
     * */
    loginIn(params) {
      return this.post(this.API_HOST + '/admin/login/pass', params)
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
    // 分页获取订单信息
    orderList (data) {
      return this.post(this.API_HOST + '/admin/card/team/page', data)
    },
    // 修改订单状态
    changeStatus (data) {
      return this.post(this.API_HOST + '/admin/card/update/status', data)
    },
    // 团队所有A级  pageNom，size
    getGroupFirstLevel (data) {
      return this.post(this.API_HOST + '/admin/user/team', data)
    },
    // A级所有关系树 userId
    // allTreeOfFirstLevel (data) {
    //   return this.post(this.API_HOST + '/admin/user/team/info', data)
    // },
    // 通过手机号，查找关系树 cellPhone
    getTreeByCellphone (data) {
      return this.post(this.API_HOST + '/admin/user/info/get', data)
    }
}
