<template>
  <div id="grouplist" class="grouplist">
    <header>团队信息</header>
    <section>
      <div class="export-excel">
        <el-button type="primary" @click="export_excel_handle">导出Excel</el-button>
      </div>
      <my-tables
        id="out-table"
        :dataList='dataList'
        :loading='flags.loading'
        :size="query.size"
        :page="query.pageNom"
        :total="totalElements"
        @pageChange="pageChange_handler"
        >
        <el-table-column
          label="姓名"
          align="center"
          >
          <template slot-scope="scope">
            <p>姓名: {{ scope.row.name }}</p>
            <p>手机: {{ scope.row.cellPhone }}</p>
            <!-- <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>手机: {{ scope.row.cellPhone }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </!-->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="cellPhone" label="手机号" min-width="85">
          <template slot-scope="scope">
            <p>{{ scope.row.cellPhone }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isActivate" label="是否激活" min-width="85">
          <template slot-scope="scope">
            <span>{{ scope.row.isActivate ? '是' : '否'}}</span>
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
        </el-table-column>
      </my-tables>
    </section>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import types from '@store/type'

import MyTables from '@components/Common/Mytable'

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'grouplist',
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
    console.log('activated group')
  },
  deactivated () {
    console.log('deactivated group')
    this.flags = {
      loading: true
    }
    this.dataList = []
    this.totalElements = 0
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
    export_excel_handle () {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
      })
      try {
          FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          'sheetjs.xlsx'
          )
      } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
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
      this.flags.loading = true
      const handleCardList = await this.$http.handleCardList(this.query).catch(err => console.log(err))

      if (handleCardList && handleCardList.records) {
        const { records = [], totalRecord } = handleCardList
        this.dataList = records
        this.totalElements = totalRecord
        // this.query.pageNom++
      } else {
        this.$message({
          message: handleCardList.errMsg,
          type: 'warning'
        })
      }

      this.flags.loading = false
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
  .grouplist{
    section{
      padding: 10px 20px
      min-width: 600px
      overflow-x scroll
    }
  }
</style>

