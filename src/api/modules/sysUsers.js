/**
 * 供货商接口
 */
export default {
  /**
     * @description 获取用户详情
     * @date 2018-11-02
     * @param {*} data
     * @returns *
     */
    logIn(params) {
      return this.get(this.API_HOST + `/login/pass?cellPhone=${params.cellPhone}&password=${params.password}`)
    },
    /**
     * @description 获取用户详情
     * @date 2018-11-02
     * @param {*} data
     * @returns *
     */
    loginIn(params) {
      return this.post(this.API_HOST + '/login/pass', params)
    }
}
