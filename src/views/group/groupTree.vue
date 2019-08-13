<template>
  <div style="height: auto">
    <div class="main">
      <div v-for="(item, index) in footer" :key="index" @click="footA(item)">{{item.name}}</div>
      <ul>
        <div>
          <li v-if="treeNode.length != 0">
            <Tree
              :treeNode="treeNode"
              :allOpen="allOpen"
              :nodeTrigger="nodeTrigger"
              :checkBox="checkBox"
              :beforeClick="beforeClick"
              :checkBoxType="checkBoxType"
              :clickNode="clickNode"
              :hiddenLine="hiddenLine"
              @checkBoxCall="checkBoxCall"
              @call='call'
            />
          </li>
        </div>
        <!-- <li v-if="treeNode.length != 0">
          <Tree
            :treeNode="treeNode"
            :nodeTrigger="nodeTrigger"
            :checkBox="checkBox"
            :beforeClick="beforeClick"
            :checkBoxType="checkBoxType"
            :clickNode="clickNode"
            :hiddenLine="hiddenLine"
            @checkBoxCall="asyncCheckBoxCall"
            @call='callAsync'
            :async="async"
            :asyncCall="asyncCall"
          />
        </li> -->
      </ul>
    </div>

  </div>

</template>

<script>
  import Tree from './tree'

  export default {
    components: { Tree },
    data() {
      return {
        treeNode: [],
        footer: [],
        allOpen: null,
        allClose: null,
        nodeTrigger: false,
        /* 是否开启复选框*/
        checkBox: false,
        clickFirstNode: false,
        checkFirstCheckBox: false,
        /* 是否级联选中*/
        checkBoxType: true,
        tree: [],
        trees: [],
        firstIsOpen: false,
        hiddenLine: false,
        async: true,
        query: {
          pageNom: 1,
          size: 10
        }
      }
    },
    methods: {
      footA (item) {
        this.getTreeByCellphone({ cellPhone: item.cellPhone }).then(val => {
          console.log(val)
          // this.$nextTick(() => {
          //   this.treeNode = [val]
          // })
          setTimeout(() => {
            this.treeNode = [val]
          }, 0)
        })
      },
      isOpen() {
        if (this.allOpen == null) {
          return 'system default 系统默认'
        } else {
          return this.allOpen ? 'open all' : 'close all'
        }
      },
      /* 复选框选中/取消 回调*/
      checkBoxCall(checkBox) {
        console.log('checkBox', checkBox)
      },
      asyncCheckBoxCall(checkBox) {
        console.log('asyncCheckBox', checkBox)
      },
      beforeClick(node) {
        // 可操作内部
        console.log('beforeClick', node)
        const getTreeByCellphone = this.getTreeByCellphone({ cellPhone: node.cellPhone })

        getTreeByCellphone.then(val => {
          // this.treeNode[0].children.push(val)
          this.treeNode = [val]
        })
        // const treeNode = JSON.parse(JSON.stringify(this.treeNode))

        // this.treeNode = treeNode
        // console.log(this.treeNode)
        if (this.clickFirstNode) { return node.id !== '1' }
        return true
      },
      beforeCheckBox(node) {
        console.log('checkFirstCheckBox', node)
        if (this.checkFirstCheckBox) { return node.id !== '1' }
        return true
      },
      checkBoxHandle(value) {
        console.log('value', value)
      },
      openFirst() {
        this.trees[0].open = !this.trees[0].open
        this.firstIsOpen = this.trees[0].open
      },
      /* 回调初始化后的数据 以后修改tree实现对节点的操作即可*/
      call(data) {
        console.log('data', data)
        // this.trees = data
        // this.getTreeByCellphone({ cellPhone: data.cellPhone })
      },
      callAsync(data) {
        console.log('data', data)
        // this.getTreeByCellphone({ cellPhone: data.cellPhone })
      },
      /* 点击节点信息 上个点击节点信息*/
      clickNode(data, oldData) {
        /* if(data.children){
          data.children.push({
            id: (new Date()).getTime(),
            name:'新增节点',
            children:[]
          });
        }else{
        }*/
        console.log(data, oldData)
        // data.open=true;
        // this.getTreeByCellphone({ cellPhone: data.cellPhone })
      },
      /* 异步回调函数 data 当前节点数据 call 回调函数*/
      asyncCall(data, call) {
        // const getTreeByCellphone = this.getTreeByCellphone({ cellPhone: data.cellPhone })
        console.log('asyncCall')
        // getTreeByCellphone.then(val => {
        //   // console.log(val)
        //   call([val])
        // })
        // setTimeout(function () {
        //   // const hm = '' + (new Date()).getTime()
        //   // const addNode = [
        //   //   { id: hm, name: 'children node' + hm.substr(hm.length - 4, hm.length) }
        //   // ]
        //   const addNode = [
        //     { name: 'st', cellPhone: '1525' }
        //   ]
        //   call(addNode)
        // }, 800)
      },
      // 团队所有A级
      async getGroupFirstLevel (params) {
        const getGroupFirstLevel = await this.$http.getGroupFirstLevel(params).catch()
        if (getGroupFirstLevel && getGroupFirstLevel.records) {
          const _records = getGroupFirstLevel.records
          for (let i = 0; i < _records.length; i++) {
            if (_records[i].children === undefined) {
              _records[i].children = []
            }
          }
          this.footer = _records
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
      }
    },
    activated () {
      console.log('grouptree activated invoked')
      // this.getGroupFirstLevel(this.query)
      this.getTreeByCellphone({ cellPhone: '15803745630' }).then(val => {
        console.log(val)
        this.treeNode = [val]
      })
    },
    deactivated () {
      this.treeNode = []
    },
    mounted() {
      // this.allOpen = true;
      // this.getGroupFirstLevel(this.query)
    },
    computed: {
    },
    created() {

    },
    watch: {
      // treeNode (val) {
      //   console.log(val)
      //   this.treeNode = val
      // }
      'treeNode': {
        handler (val) {
          // this.$nextTick(() => {
            // this.treeNode = [val]
            // this.treeNode = val
          // })
          this.treeNode = val
        },
        deep: true
      }
    }
  }
</script>

<style scoped >
  .main ul li {
    list-style: none;
    float: left;
    width: 25%;

  }
</style>
