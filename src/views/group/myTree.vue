<template>
  <div id="mytree" class="mytree container">
    <header>
      <el-input
          style="width: 200px"
          class="cellPhone-input"
          placeholder="手机号查询"
          v-model.trim="cellPhone"
          @input="inputChange"
          clearable>
        </el-input>
        <el-button class="search-btn" type="primary" icon="el-icon-search" size="medium" @click="search_handle">搜索</el-button>
    </header>
    <section :style="{ height: getScreenHeight +'px'}">
      <div class="tree-info">
        <div class="search-tree" v-if="showSearchTree">
          <el-tree
            :indent="0"
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
              <div class="item-name" v-if="!item.append">
                <span  @click="treeLabelclick(item, index)" class="arrow-icon" :class="{'apend':item.append}"></span>
                <span>{{item.name}}</span>
                <!-- <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i> -->
                <i class="el-icon-loading" v-if="item.showLoading"></i>
              </div>
              <div v-if="item.append">
                <el-tree
                  :indent="0"
                  empty-text=""
                  :props="defaultProps"
                  :data="treeList[index].child"
                  :expand-on-click-node="false"
                  ref="tree"
                  default-expand-all
                  node-key="cellPhone"
                  @node-click="handleNodeClick"
                  >
                </el-tree>
              </div>
            </div>
            <div v-if="isLastpage" class="no-more-tip">无更多数据</div>
            <div v-else class="loadmore-btn" @click="loadMore">加载更多</div>
          </div>
        </div>
      </div>
      <div class="node-info" v-if="JSON.stringify(currendNOde) != '{}'">
        <div class="current-box">
          <div class="row">
            <div class="item">
              <span class="label">姓名：</span>
              <span class="detail">{{currendNOde.name}}</span>
            </div>
            <div class="item">
              <span class="label">权益卡号：</span>
              <span class="detail">{{currendNOde.cellPhone || '暂无'}}</span>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <span class="label">联系电话：</span>
              <span class="detail">{{currendNOde.contactNumber || '未填写'}}</span>
            </div>
            <div class="item">
              <span class="label">身份：</span>
              <span class="detail">{{currendNOde.userType || '暂无'}}</span>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <span class="label">支付宝账号：</span>
              <span class="detail">{{currendNOde.aliPay || '未填写'}}</span>
            </div>
            <div class="item">
              <span class="label">身份证号：</span>
              <span class="detail">{{currendNOde.idCard || '暂无'}}</span>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <span class="label">银行卡号：</span>
              <span class="detail">{{currendNOde.bankCard || '未填写'}}</span>
            </div>
            <div class="item">
              <span class="label">开户行：</span>
              <span class="detail">{{currendNOde.openingBank || '暂无'}}</span>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <span class="label">推荐人电话：</span>
              <span class="detail">{{currendNOde.recommenderPhone || '未填写'}}</span>
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
import { Loading } from 'element-ui'

export default {
  name: 'mytree',
  data () {
    return {
      getScreenHeight: 600 + 'px',
      cellPhone: '',
      treeList: [],
      searchTree: [],
      showSearchTree: false,
      showTree: false,
      isLastpage: false,
      currendNOde: {},
      query: {
        pageNom: 1,
        size: 15
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
    // this.getGroupFirstLevel(this.query)
  },
  deactivated () {
    console.log('deactivated group')
  },
  created() {

  },
  mounted () {
    this.getGroupFirstLevel(this.query)

    this.getScreenHeight = `${document.documentElement.clientHeight}` - 140
    // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
    window.onresize = () => {
      this.getScreenHeight = `${document.documentElement.clientHeight}` - 140
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 加载更多
    loadMore () {
      this.query.pageNom++
      this.getGroupFirstLevel(this.query)
    },
    inputChange (val) {
      if (val === '') {
        this.showSearchTree = false
      }
    },
    search_handle () {
      const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/

      if (!this.cellPhone) {
        this.$message('请输入手机号')
        return
      } else if (!reg.test(this.cellPhone)) {
        this.$message('请输入正确的手机号')
        return
      }

      this.getTreeByCellphone({ cellPhone: this.cellPhone }).then(res => {
        this.searchTree = [res]
        this.showSearchTree = true
      }).catch(err => {
        this.$toast(err)
      })
    },
    treeLabelclick (item, index) {
      item.showLoading = true
      this.getTreeByCellphone({ cellPhone: item.cellPhone })
      .then(res => {
        if (res) {
          this.treeList[index].append = !this.treeList[index].append
          this.treeList[index].child = [res]
        }
      })
      .catch(err => {
        this.$toast(err)
      })
      .finally(() => {
        item.showLoading = false
      })
    },
    handleNodeClick (data) {
      this.currendNOde = data
      console.log(data)
    },
    // 团队所有A级
    async getGroupFirstLevel (params) {
      const loadingInstance = Loading.service({
        target: 'section',
        lock: true,
        text: '玩命加载中...',
        fullscreen: true
      })

      const getGroupFirstLevel = await this.$http.getGroupFirstLevel(params).catch()
      if (getGroupFirstLevel && getGroupFirstLevel.records) {
        this.isLastpage = getGroupFirstLevel.lastPage
        const _records = getGroupFirstLevel.records

        for (let i = 0; i < _records.length; i++) {
          _records[i].child = []
          _records[i].append = false
          _records[i].showLoading = false // 显示加载中icon
        }

        this.treeList.push(
          ..._records
        )
        this.showTree = true
      } else {
        getGroupFirstLevel && getGroupFirstLevel.errMsg && this.$toast(getGroupFirstLevel.errMsg)
      }

      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close()
      })
    },
    // A级所有关系树
    async getTreeByCellphone (params) {
      const getTreeByCellphone = await this.$http.getTreeByCellphone(params).catch()
      if (getTreeByCellphone) {
        return Promise.resolve(getTreeByCellphone)
      } else {
        return Promise.reject(getTreeByCellphone.errMsg || '获取失败')
      }
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
    section{
      overflow-y scroll;
      display flex
      .tree-info{
        width: 50%;
        overflow-x scroll
      }
      .node-info{
        padding-left 10px
        width: 50%;
        // overflow-x scroll
        .current-box{
          padding: 10px;
          border: 1px solid #409EFF;
          border-radius: 10px;
          .row{
            display flex
            .item{
              flex 1
              height 40px
              display flex
              align-items center
              .label{
                margin-right 5px;
              }
              .detail{
                font-weight 500
              }
            }
          }
        }
      }
      .item-name{
        color #606266
        cursor pointer
        padding-left: 5px;
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
        }
        i{
          color #409eff
          margin-left 3px
        }
      }
      .loadmore-btn{
        cursor pointer
        color #409EFF
      }
      .no-more-tip{
        color: #535075;
        padding: 5px 0;
      }
    }
  }
</style>

