<template>
  <div id="mytree" class="mytree container">
    <section>
        <div v-for="(item, index) in treeList" :key="index">
          <div @click="treeLabelclick(item, index)" >{{item.name}}</div>
          <div v-if="index == meIndex">
            <el-tree
              :props="defaultProps"
              :data="meTree"
              ref="tree"
              node-key="cellPhone"
              @node-click="handleNodeClick"
              >
            </el-tree>
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
      currentId: null,
      treeList: [],
      showTree: false,
      meIndex: 0,
      meTree: [],
      outerIndex: null,
      innerId: null,
      query: {
        pageNom: 1,
        size: 100
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
    console.log('activated group')
    this.getGroupFirstLevel(this.query)

    // this.getTreeByCellphone({ cellPhone: '18570862377' }).then(res => {
    //   console.log(res)
    //   this.meTree = [res]
    // })
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
    treeLabelclick (item, index) {
      this.getTreeByCellphone({ cellPhone: item.cellPhone }).then(res => {
        this.meIndex = index
        this.meTree = [res]
        // this.$set(this.treeList[index], 'children', []) 18570862898

        // this.treeList[index].children = [res]
        // console.log(this.treeList[index].children)
        // this.treeList[index]
      })
    },
    handleNodeClick (data) {
      console.log(data)
      // this.getGroupFirstLevel(node).then(res => {

      // })
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
        this.treeList = _records

        _records.forEach(et => {
          if (et.children === undefined) {
            et.children = []
          }
        })
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

  }
</style>

