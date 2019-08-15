<template>
  <div id="Header">
    <div class="header_left">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <Breadcrumb/>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <!-- <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@components/Ui/Breadcrumb/index.vue'
import Hamburger from '@components/Ui/Hamburger/index.vue'
// import ThemePicker from '@components/Ui/ThemePicker'
import { mapActions, mapGetters } from 'vuex'
// import Utils from '@utils/index'

export default {
  name: 'Header',
  components: {
    Breadcrumb,
    // ThemePicker,
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
    },
    logout () {
      // console.log('logout')
      this.$Utils.removeCookie('token')
      this.$router.push({ path: '/login' })
    }
  },
  created() {
    // const { _userName } = Utils.getCookie()
    // this.userName = _userName
  },
  mounted() {
    console.log(this.sidebar)
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
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .header_left {
    // float: left;
    flex: 1;
    display: flex;
    .hamburger-container{
      display: flex;
      align-items: center;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

