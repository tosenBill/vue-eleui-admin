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
	created () { },
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

