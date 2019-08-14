<template>
  <div id="mytree" class="mytree container">
    <header>
      <el-input
          style="width: 200px"
          class="cellPhone-input"
          placeholder="手机号查询"
          v-model.trim="cellPhone"
          clearable>
        </el-input>
        <el-button class="search-btn" type="primary" icon="el-icon-search" size="medium" @click="search_handle">搜索</el-button>
    </header>
    <section>
      <div class="search-tree" v-if="showSearchTree">
        <el-tree
          empty-text=""
          :props="defaultProps"
          :data="searchTree"
          ref="tree"
          default-expand-all
          node-key="cellPhone"
          @node-click="handleNodeClick"
          >
        </el-tree>
      </div>
      <div v-show="!showSearchTree">
        <div v-if="showTree">
          <div v-for="(item, index) in treeList" :key="index">
            <div class="item-name" >
              <span  @click="treeLabelclick(item, index)" class="arrow-icon" :class="{'apend':item.append}"></span>
              <span>{{item.name}}</span>
            </div>
            <div v-if="item.append">
              <el-tree
                empty-text=""
                :props="defaultProps"
                :data="treeList[index].child"
                ref="tree"
                default-expand-all
                node-key="cellPhone"
                @node-click="handleNodeClick"
                >
              </el-tree>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

// import types from '@store/type'
import { mapGetters } from 'vuex'

export default {
  name: 'mytree',
  data () {
    return {
      cellPhone: '',
      currentId: null,
      treeList: [],
      searchTree: [],
      showSearchTree: false,
      showTree: false,
      meIndex: 0,
      meTree: [],
      outerIndex: null,
      innerId: null,
      query: {
        pageNom: 1,
        size: 20
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  components: {
  },
  activated () {
    this.getGroupFirstLevel(this.query)
  },
  deactivated () {
    console.log('deactivated group')
  },
  created() {

  },
  mounted () {
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    search_handle () {
      const cellPhone = '18570866688'
      this.getTreeByCellphone({ cellPhone }).then(res => {
        this.searchTree = [res]
        this.showSearchTree = true
      })
    },
    treeLabelclick (item, index) {
      this.getTreeByCellphone({ cellPhone: item.cellPhone }).then(res => {
        this.treeList[index].append = !this.treeList[index].append
        this.treeList[index].child = [res]
      })
    },
    handleNodeClick (data) {
      console.log(data)
    },
    loadNode1(node, resolve) {
      // 一级节点处理
      // if (node.level === 0) {
      //   // return resolve([{ name: 'region' }])
      //   // this.getGroupFirstLevel(this.query, resolve)
      //   this.getTreeByCellphone({ cellPhone: '18570862898' }).then(res => {
      //     this.myTree = resolve([res])
      //   })
      // }
      // 其余节点处理
      // if (node.level === 1) {
      //   // 注意！把resolve传到你自己的异步中去 18570862898
      //   console.log(node)
      //   setTimeout(() => {
      //     const data = [{
      //       name: 'leaf',
      //       children: [{
      //         name: '三级 1-1-1'
      //       }, {
      //         name: '三级 1-1-2'
      //       }]
      //     }, {
      //       name: 'zone'
      //     }]

      //     console.log(data)
      //     resolve(data)
      //   }, 500)
      //   this.getTreeByCellphone({ cellPhone: node.data.cellPhone }).then(res => {
      //     // resolve([res])
      //     console.log(res)
      //   })
      //   console.log(333)
      // }
      // if (node.level > 1) return resolve([])
    },
    // 团队所有A级
    async getGroupFirstLevel (params, resolve) {
      const getGroupFirstLevel = await this.$http.getGroupFirstLevel(params).catch()
      if (getGroupFirstLevel && getGroupFirstLevel.records) {
        const _records = getGroupFirstLevel.records

        for (let i = 0; i < _records.length; i++) {
          _records[i].child = []
          _records[i].append = false
        }
        this.treeList = _records
        console.log(this.treeList)
        this.showTree = true
        // resolve(_records)
        // this.MyTree = _records
      } else {
        getGroupFirstLevel && getGroupFirstLevel.errMsg && this.$toast(getGroupFirstLevel.errMsg)
      }
    },
    // A级所有关系树
    async getTreeByCellphone (params) {
      const getTreeByCellphone = await this.$http.getTreeByCellphone(params).catch()
      if (getTreeByCellphone) {
        return Promise.resolve(getTreeByCellphone)
      } else {
        return Promise.reject(getTreeByCellphone.errMsg)
      }
    },
    check () {

    },
    select (item) {
      // console.log(item)
      item.show = !item.show
      this.currentId = item.id
    }
  },
  watch: {
    'myTree': {
      handler (val) {
        console.log(val)
        this.myTree = val
      },
      deep: true
    }
  }
}
</script>
<style lang="stylus" scoped>
  .mytree{
    header{
      height 60px
      display flex
      align-items center
      .search-btn{
        margin-left 30px
      }
    }
    .item-name{
      color #606266
      cursor pointer
      // height 26px
      line-height 26px
      .arrow-icon{
        display inline-block
        transform: rotate(0);
                transition: transform .3s ease-in-out,-webkit-transform .3s ease-in-out;

      }
      .arrow-icon.apend{
            transform: rotate(90deg);
      }
      .arrow-icon:before{
            content: "\E791";
            font-family: element-icons!important
            color: #C0C4CC
            font-size: 12px;
            padding-right: 4px;
            // transform: rotate(90deg);
      }
    }
  }
</style>

