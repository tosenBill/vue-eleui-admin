<template>
  <el-aside :class="{'not-open':!sidebar.opened, 'is-open': sidebar.opened}"  width="200px" id="sideMenu">
    <el-menu :default-openeds="subMenuActive" :default-active="childMenuActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="!sidebar.opened" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <template v-for="(item) in datas">

        <router-link :to="{name: item.children[0].urlLink}" :key="item.path" v-if="item.children.length == 1">
          <el-menu-item :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{item.children[0].name}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else class="nav-item" :index="item.path" :key="item.path">
          <template slot="title">
            <i :class="item.icon"></i>
            <span class="nav-title">{{item.groupName}}</span>
          </template>
          <el-menu-item-group v-for="(child, index) in item.children" :key="index">
            <router-link :to="{name: child.urlLink}">
              <el-menu-item :index="child.urlLink">{{child.name}}</el-menu-item>
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
          groupName: '订单中心',
          path: 'orderList',
          icon: 'el-icon-document',
          children: [
            {
              urlLink: 'orderList',
              name: '订单列表'
            }
            // {
            //   urlLink: 'permissionome',
            //   name: '权限'
            // }
          ]
        },
        {
          groupName: '团队信息',
          path: 'groupInfo',
          icon: 'el-icon-menu',
          children: [
            {
              urlLink: 'groupInfo',
              name: '团队信息'
            }
          ]
        }
        // {
        //   groupName: '权限',
        //   path: 'permissionome',
        //   children: [
        //     {
        //       urlLink: 'permissionome',
        //       name: 'permission1'
        //     },
        //      {
        //       urlLink: 'aboutme',
        //       name: '关于我2'
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
        // console.log(val)
        const { matched, name } = val
        console.log(matched, 'matched')
        // this.subMenuActive = [meta.title || '']
        this.childMenuActive = name || 'orderList'
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
  transition: width .4s;
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
