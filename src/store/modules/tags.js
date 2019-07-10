/*
 * @Author: 徐长剑
 * @Description: 【modules】页面导航标签
 * @Date: 2019-01-09 13:49:09
 */

const tagsView = {
  state: {
    list: [], // 需要缓存的标签
    cacheViews: [] // 需要缓存的页面
  },
  mutations: {
    /*
    * @Description: [mutations] 添加需要缓存的标签
    */
    ADD_TAGS: (state, list) => {
      state.list = list
    },
    /*
    * @Description: [mutations] 添加需要缓存的页面
    */
    ADD_CACHE_VIEWS: (state, data) => {
      state.cacheViews = [...state.cacheViews, data]
    },
    /*
    * @Description: [mutations] 去除需要缓存的页面
    */
    DEL_CACHE_VIEWS: (state, name) => {
      state.cacheViews = state.cacheViews.filter(k => k !== name)
      console.log(state.cacheViews, 'state.cacheViews ')
    }
  },
  actions: {
    /*
    * @Description: [actions] 添加需要缓存的标签
    */
    addTags({ commit, state }, data = {}) {
      const { name, meta } = data
      const isAddRoute = state.list.some(k => {
        return k.name === name
      })
      if (name && !isAddRoute) {
        meta.keepAlive && commit('ADD_CACHE_VIEWS', name)
        commit('ADD_TAGS', [...state.list, data])
      }
    },
    /*
    * @Description: [actions] 删除需要缓存的标签
    */
    delTags({ commit, state }, name) {
      return new Promise(resolve => {
        const _list = state.list.filter(k => k.name !== name)
        commit('ADD_TAGS', _list)
        commit('DEL_CACHE_VIEWS', name)
        resolve(state.list)
      })
    }
  }
}

export default tagsView
