<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import '@css/main.scss'
export default {
	name: 'App',
	components: {},
	data () {
		return {
			minHeight: document.documentElement.clientHeight + 'px'
		}
	},

	computed: {},
	watch: {},
	created () {
    if (sessionStorage.getItem('store')) { // 页面加载前读取sessionStorage里的状态信息
      this.$store.replaceState(Object.assign(
        {},
        this.$store.state,
        JSON.parse(decodeURIComponent(sessionStorage.getItem('store'))))
      )
    }

    window.addEventListener('beforeunload', () => { // 在页面刷新前将vuex里的信息保存到sessionStorage里
      sessionStorage.setItem('store', encodeURIComponent(JSON.stringify(this.$store.state)))
    })
  },
	mounted () { }
}
</script>
<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.el-header {
  padding: 0 !important;
}
.el-main {
  height: 100%;
  position: relative;
}
</style>

