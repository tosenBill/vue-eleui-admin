<template>
  <div id="Header">
    <div class="header_left">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar" class="hamburger-container"/>
      <Breadcrumb/>
    </div>
    <div class="header_right">
      <theme-picker class="theme-switch right-menu-item"/>
      <div class="user_box">
        <el-dropdown size="medium">
          <span class="el-dropdown-link">
            {{userName || '佚名'}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="loginOut_clickHandler">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@components/Ui/Breadcrumb/index.vue'
import Hamburger from '@components/Ui/Hamburger/index.vue'
import ThemePicker from '@components/Ui/ThemePicker'
import { mapActions, mapGetters } from 'vuex'
import Utils from '@utils/utils'

export default {
  name: 'Header',
  components: {
    Breadcrumb,
    ThemePicker,
    Hamburger
  },
  data() {
    return {
      showPopFlag: false, // 控制用户信息弹出框显示隐藏
      userName: ''
    }
  },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar'
      // userInfo: "getUserInfo",
      // stores: "getStores",
      // storeLen: "getStoreLen"
    })
  },
  props: [],
  methods: {
    ...mapActions(['loginOut']),
    /**
     * 登出事件
     * */
    loginOut_clickHandler() {
      this.loginOut()
    },
    toggleSideBar () {
      this.$store.dispatch('changeSidbar')
      console.log(this.sidebar)
    }
  },
  created() {
    const { _userName } = Utils.getCookie()
    this.userName = _userName
  },
  mounted() {
    // console.log(this.sidebar)
   },
  destroyed() { },
  watch: {}
}
</script>
<style lang="scss" scoped>
#Header {
  padding: 5px;
  height: 50px;
  line-height: 50px;
  width: 100%;
  display: flex;
  .header_left {
    // float: left;
    flex: 1;
    display: flex;
    .hamburger-container{
      display: flex;
      align-items: center;
    }
  }
  .header_right {
    float: right;
    .user_box {
      display: inline-block;
      margin: 0 15px;
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}
</style>

