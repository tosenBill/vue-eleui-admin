<template>
  <div id="home" class="home">
    <section>
      <my-tables
        :dataList='dataList'
        :size="query.size"
        :page="query.pageNom"
        :total="totalElements"
        @pageChange="pageChange_handler"
        >
        <el-table-column align="left" prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column align="center" prop="cellPhone" label="手机号" min-width="85"></el-table-column>
        <el-table-column align="center" prop="isActivate" label="是否激活" min-width="85">
          <template slot-scope="scope">
            <span>{{ scope.row.isActivate ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </my-tables>
    </section>
  </div>
</template>

<script>

import types from '@store/type'
import MyTables from '@components/Common/Mytable'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      query: {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        status: 0, // 全部0，通过1，未通过2
        type: 0 // 直推信息代表’1‘，间推 ’0‘
      },
      flags: {
        loading: true
      },
      dataList: [],
      totalElements: 0
    }
  },
  components: {
    MyTables
  },
  activated () {
    console.log(this.user)
  },
  created() {

  },
  mounted () {
    this.getUserInfo()

    const type = (this.query.type === 1 ? 0 : 1)
    this.query = {
      ...this.query,
      type
    }
    this.handleCardList()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    async getUserInfo () {
      const userInfo = await this.$http.getUserInfo().catch()
      if (userInfo && userInfo.data) {
        //
        this.$store.commit(types.SET_USER_INFO, userInfo.data)
        console.log(this.userInfo)
      } else {
        // this.$toast(userInfo.errMsg)
      }
    },
    async handleCardList () {
      const handleCardList = await this.$http.handleCardList(this.query).catch(err => console.log(err))

      if (handleCardList && handleCardList.records) {
        const { records = [], totalRecord } = handleCardList
        this.dataList = records
        console.log(this.dataList)
        this.totalElements = totalRecord
        // this.query.pageNom++
      } else {
        this.$message({
          message: handleCardList.errMsg,
          type: 'warning'
        })
      }
    },
    /**
     * @description 分页 回调事件
     */
    pageChange_handler(page) {
      this.query.pageNom = page
      this.handleCardList()
    }
  }
}
</script>
<style lang="stylus" scoped>
  .home{
    section{
      padding: 10px 20px
      min-width: 600px
    }
  }
</style>

