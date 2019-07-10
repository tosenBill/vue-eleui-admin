<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="enter_clickHandler(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
/*
* @Author: 徐长剑
* @Date: 2019-01-08 14:57:16
* @Description: 面包屑导航
*/
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.getBreadcrumb()
      },
      immediate: true
    }
  },
  created() {

  },
  methods: {
    /*
    * @Description: 进入页面
    */
    enter_clickHandler(item) {
      const { path } = item
      this.$router.push({ path })
    },
    /*
    * @Description: 获得面包屑导航
    */
    getBreadcrumb() {
      console.log(this.$route, 'this.$route')
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          return true
        }
      })
      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [{ path: '/home', meta: { title: '首页' } }, ...matched]
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
