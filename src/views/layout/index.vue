<template>
  <div id="Layout">
    <div class="main-container" :style="{ height: getScreenHeight +'px'}">
      <side-nav/>
      <div class="content">
        <Header></Header>

        <tags-view/>

        <transition name="fade-transform" mode="out-in">
          <div class="main-view">
            <keep-alive :include="tags.cacheViews">
              <router-view :key="this.$route.fullPath"/>
            </keep-alive>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from './components/Header'
import TagsView from './components/TagsView'
import SideNav from './components/SideNav'
export default {
  name: 'Layout',
  data() {
    return {
      getScreenHeight: 600 + 'px'
    }
  },
  computed: {
    ...mapState(['tags'])
  },
  components: {
    Header,
    TagsView,
    SideNav
  },
  created() {
  },
  mounted() {
    this.getScreenHeight = `${document.documentElement.clientHeight}`
    // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
    window.onresize = () => {
      this.getScreenHeight = `${document.documentElement.clientHeight}`
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
#Layout {
  .main-container {
    display: flex;
    overflow: auto;
  }
  .content {
    width: 100%;
    overflow: hidden;
  }
}
</style>

