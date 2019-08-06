<template>
  <el-aside :class="{'not-open':!sidebar.opened, 'is-open': sidebar.opened}"  width="200px" id="sideMenu">
    <el-menu :default-openeds="subMenuActive" :default-active="childMenuActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="!sidebar.opened" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <template v-for="(item) in datas">
        <el-submenu class="nav-item" :index="item.path" :key="item.path">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span class="nav-title">{{item.groupName}}</span>
          </template>
          <el-menu-item-group v-for="(child, index) in item.children" :key="index">
            <router-link :to="{name: child.urlLink}">
              <el-menu-item :index="child.urlLink">{{child.permissionName}}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      subMenuActive: [], // 一级菜单选中的菜单
      childMenuActive: '', // 二级菜单选中的菜单
      isCollapse: true,
      datas: [
        {
          groupName: '首页',
          path: 'home',
          children: [
            {
              urlLink: 'home',
              permissionName: '首页'
            }
            // {
            //   urlLink: 'about',
            //   permissionName: '关于我'
            // }
          ]
        }
        // {
        //   groupName: '权限',
        //   path: 'permissionome',
        //   children: [
        //     {
        //       urlLink: 'permissionome',
        //       permissionName: 'permission1'
        //     },
        //      {
        //       urlLink: 'aboutme',
        //       permissionName: '关于我2'
        //     }
        //   ]
        // }
      ]
    }
  },
  components: {
  },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar'
    })
  },
  mounted() {
    console.log(this.sidebar.opened)
  },
  methods: {
    handleOpen() { },
    handleClose() { },
    close() { },
    clickToggle () {
      this.opened = !this.opened
    }
  },
  watch: {
    $route: {
      handler (val) {
        console.log(this.$route)
        const { matched } = val
        console.log(matched, 'matched')
        // this.subMenuActive = [meta.title || '']
        // this.childMenuActive = name || 'home'
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.not-open{
  width: 65px !important;
  overflow-x: hidden;
}
.is-open{
   width: auto;
}
#sideMenu {
  background: $sideMenuColor;
  transition: width .8s;
  .el-menu-vertical-demo {
    border-right: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .nav-item > div:hover {
    .nav-title,
    i {
      color: #409eff;
    }
  }
  .active {
          background-color: $tabColor;
          color: #fff;
          border-color: $tabColor;
          &::before {
            content: "";
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
}
</style>
