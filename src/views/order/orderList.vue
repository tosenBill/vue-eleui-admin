<template>
  <div id="orderlist" class="orderlist container">
    <header>
      <div class="search-box">
        <!-- <el-input
          style="width: 200px"
          class="cellPhone-input"
          placeholder="办卡人姓名或入网号码查询"
          v-model.trim="query.cardName"
          clearable>
        </el-input> -->

        <el-input
          style="width: 200px"
          class="cellPhone-input"
          placeholder="办卡人姓名或入网号码查询"
          v-model.trim="query.cellPhone"
          clearable>
        </el-input>

        <el-input
          style="width: 175px"
          class="parentPhone-input"
          placeholder="推荐人权益卡号查询"
          v-model.trim="query.parentPhone"
          clearable>
        </el-input>

        <!-- <el-input
          style="width: 200px"
          class="cellPhone-input"
          placeholder="合作商姓名查询"
          v-model.trim="query.cooperativeName"
          clearable>
        </el-input> -->

        <el-select
          class="cellPhone-input"
          style="width: 130px"
          v-model="queryStatus"
          clearable
          placeholder="结算状态查询">
          <el-option
            v-for="item in accountStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-select
          class="cellPhone-input"
          style="width: 130px"
          v-model="recommendType"
          clearable
          placeholder="推荐方式查询">
          <el-option
            v-for="item in recommendStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-box">
        <el-date-picker
          v-model="value7"
          type="datetimerange"
          :picker-options="pickerOptions2"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>

        <el-button class="search-btn"
          type="primary"
          icon="el-icon-search"
          size="medium"
          @click="search_handle">
          搜索</el-button>

          <a v-if="!isExporting" href="http://admin.5g.meixuanlife.com/admin/card/export" @click="exportExcel" style="color:#fff;">
            <el-button type="primary" icon="el-icon-download" size="medium">
              导出
            </el-button>
          </a>
          <el-button v-else type="primary" plain disabled icon="el-icon-loading" size="medium">
              正在导出...
            </el-button>
          <!-- <el-button type="primary" @click="exportExcel" icon="el-icon-download" size="medium">
              导出
            </el-button> -->

      </div>
      <!-- <el-button type="primary" icon="el-icon-download" size="medium">导出</el-button> -->
    </header>
    <section>
      <my-tables
        :dataList='dataList'
        :loading='flags.loading'
        :size="query.size"
        :page="query.pageNom"
        :total="totalElements"
        @pageChange="pageChange_handler"
        class="mytable"
        >
        <el-table-column
          label="办卡人信息"
          align="center"
          >
          <template slot-scope="scope">
            <div style="text-align:left;" class="row">
              <span class="label">姓名: </span><span class="val">{{scope.row.name + '&nbsp;&nbsp;'}}</span>
              <span class="label">手机: </span><span class="val">{{scope.row.contactNumber}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">入网号码: </span><span class="val">{{scope.row.cellPhone + '&nbsp;&nbsp;'}}</span>
              <span class="label">办理套餐: </span><span class="val">{{scope.row.setMeal}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">权益礼包: </span><span class="val">{{scope.row.deliveryType || '暂无' + '&nbsp;&nbsp;'}}</span>
              <span class="label">礼包发放地址: </span><span class="val">{{scope.row.address}}</span>
            </div>
            <!-- statusVo -->
            <div v-if="scope.row.statusVo" class="row">
            <div style="text-align:left;">
              <span class="label">资料审核: </span><span class="val">{{scope.row.statusVo.auditStatus  + '&nbsp;&nbsp;'}}</span>
              <span class="label">充值缴费: </span><span class="val">{{scope.row.statusVo.isPay}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">余额宝冻结: </span><span class="val">{{scope.row.statusVo.isFreeze  + '&nbsp;&nbsp;'}}</span>
              <span class="label">号卡邮寄: </span><span class="val">{{scope.row.statusVo.logisticsStatus + '&nbsp;&nbsp;'}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">激活号卡: </span><span class="val">{{scope.row.statusVo.activateStatus}}</span>
            </div>

            <div style="text-align:left;" class="row">
              <span class="label">物流公司: </span><span class="val">{{scope.row.statusVo.logisticsCompany || '暂无'  + '&nbsp;&nbsp;'}}</span>
              <span class="label">物流单号: </span><span class="val">{{scope.row.statusVo.logisticsNum || '暂无'}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">收件人: </span><span class="val">{{scope.row.statusVo.receiverName || '暂无'  + '&nbsp;&nbsp;'}}</span>
              <span class="label">联系电话: </span><span class="val">{{scope.row.statusVo.receiverPhone || '暂无' + '&nbsp;&nbsp;'}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">权益卡收货地址: </span><span class="val">{{scope.row.statusVo.receiverAddress || '暂无'}}</span>
            </div>
            <div style="text-align:left;" class="row" v-if="scope.row.statusVo.nextStep">
              <span >下一步: </span><span style="font-wight:bold;" class="val">{{scope.row.statusVo.nextStep}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span style="color:#e4393c;">{{scope.row.statusVo.errorMsg}}</span>
            </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="合作商信息"
          align="center"
          >
          <template slot-scope="scope" v-if="scope.row.cooperator">
            <div style="text-align:left;" class="row">
              <span class="label">姓名: </span><span class="val">{{scope.row.cooperator.name  + '&nbsp;&nbsp;'}}</span>
              <span class="label">联系方式: </span><span class="val">{{scope.row.cooperator.contactNumber + '&nbsp;&nbsp;'}}</span>
              <span class="label">团队数量: </span><span class="val">{{scope.row.cooperator.teamCount}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">入网号码: </span><span class="val">{{scope.row.cooperator.cellPhone  + '&nbsp;&nbsp;'}}</span>
              <span class="label">类型: </span><span class="val">{{scope.row.cooperator.userType}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">支付宝: </span><span class="val">{{scope.row.cooperator.aliPay  + '&nbsp;&nbsp;'}}</span>
              <span class="label">身份证号: </span><span class="val">{{scope.row.cooperator.idCard}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">开户行: </span><span class="val">{{scope.row.cooperator.openingBank  + '&nbsp;&nbsp;'}}</span>
              <span class="label">银行卡号: </span><span class="val">{{scope.row.cooperator.bankCard}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">联系地址: </span><span class="val">{{scope.row.cooperator.address || ''}}</span>
            </div>
          </template>
          <!-- <template slot-scope="scope" v-if="!scope.row.cooperator">
            <div>
              暂无数据
            </div>
          </template> -->
        </el-table-column>

        <el-table-column
          label="推荐人信息"
          align="center"
          >
          <template slot-scope="scope" v-if="scope.row.recommend">
            <div style="text-align:left;" class="row">
              <span class="label">姓名: </span><span class="val">{{scope.row.recommend.name || ''  + '&nbsp;&nbsp;'}}</span>
              <span class="label">联系方式: </span><span class="val">{{scope.row.recommend.contactNumber || '' + '&nbsp;&nbsp;'}}</span>
              <span class="label">团队数量: </span><span class="val">{{scope.row.recommend.teamCount || ''}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">入网号码: </span><span class="val">{{scope.row.recommend.cellPhone || ''  + '&nbsp;&nbsp;'}}</span>
              <span class="label">类型: </span><span class="val">{{scope.row.recommend.userType || ''}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">支付宝: </span><span class="val">{{scope.row.recommend.aliPay || '暂无'  + '&nbsp;&nbsp;'}}</span>
              <span class="label">身份证号: </span><span class="val">{{scope.row.recommend.idCard || '暂无'}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">开户行: </span><span class="val">{{scope.row.recommend.openingBank || '暂无' + '&nbsp;&nbsp;'}}</span>
              <span class="label">银行卡号: </span><span class="val">{{scope.row.recommend.bankCard || '暂无'}}</span>
            </div>
            <div style="text-align:left;" class="row">
              <span class="label">联系地址: </span><span class="val">{{scope.row.recommend.address || ''}}</span>
            </div>
          </template>

        </el-table-column>

        <el-table-column label="操作"  width="110" align="center">
          <template slot-scope="scope">
            <div class="has-account-btn" v-if="scope.row.status == '1'">已结算</div>
            <el-button
              v-else
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">确定结算</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </my-tables>
    </section>
    <el-dialog
      title="确定结算"
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="false"
      >
      <div>
         <span>是否确定结算？</span>
        <!-- <el-input
          style="width:100%"
          class="cellPhone-input"
          placeholder="请输入开户手机号"
          v-model.trim="cellPhone"
          clearable>
        </el-input> -->
        <!-- <p v-if="dialogMsg" style="color:#e4393c;margin-top:5px;">{{dialogMsg}}</p> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="change_status_handle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

// import types from '@store/type'
// import axios from 'axios'
import MyTables from '@components/Common/Mytable'
import { mapGetters } from 'vuex'

export default {
  name: 'orderlist',
  data () {
    return {
      dialogVisible: false,
      cellPhone: '',
      dialogMsg: '',
      isExporting: false,
      value7: '',
      query: {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        status: 0, // 全部0，已结算1，未结算2
        type: '', // 直推信息代表’1‘，间推 ’0‘，‘空’为全部
        parentPhone: '', // 此号码下所有办卡信息
        startTime: '',
        endTime: '',
        cardName: '' // 办卡人姓名
        // cooperativeName: '' // 合作商姓名
      },
      queryStatus: '',
      recommendType: '',
      accountStatus: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '已结算'
      }, {
        value: '2',
        label: '未结算'
      }],
      recommendStatus: [{
        value: '1',
        label: '直推'
      }, {
        value: '0',
        label: '间推'
      }],
      flags: {
        loading: true
      },
      dataList: [],
      totalElements: 0,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  components: {
    MyTables
  },
  activated () {
  },
  deactivated () {
    // console.log('deactivated order')
  },
  created() {
  },
  mounted () {
    this.orderList()
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    exportExcel () {
      this.isExporting = true
      setTimeout(() => {
        this.isExporting = false
      }, 28000)
    },
    async orderList () {
      this.flags.loading = true
      const orderList = await this.$http.orderList(this.query).catch(err => console.log(err))
      if (orderList && orderList.records) {
        const { records = [], totalRecord } = orderList
        for (let i = 0; i < records.length; i++) {
          const statusVo = records[i].statusVo
          if (statusVo.activateStatus === '0') {
            statusVo.activateStatus = '未激活'
          } else if (statusVo.activateStatus === '1') {
            statusVo.activateStatus = '已激活'
          } else {
            statusVo.activateStatus = '激活异常'
          }

          if (statusVo.auditStatus === '0') {
            statusVo.auditStatus = '未审核'
          } else if (statusVo.auditStatus === '1') {
            statusVo.auditStatus = '已审核'
          } else {
            statusVo.auditStatus = '审核异常'
          }

          if (statusVo.isFreeze === '0') {
            statusVo.isFreeze = '未冻结'
          } else if (statusVo.isFreeze === '1') {
            statusVo.isFreeze = '已冻结'
          } else {
            statusVo.isFreeze = '冻结异常'
          }

          if (statusVo.isPay === '0') {
            statusVo.isPay = '未支付'
          } else if (statusVo.isPay === '1') {
            statusVo.isPay = '已支付'
          } else {
            statusVo.isPay = '支付异常'
          }

          if (statusVo.logisticsStatus === '0') {
            statusVo.logisticsStatus = '暂无物流'
          } else if (statusVo.logisticsStatus === '1') {
            statusVo.logisticsStatus = '发放中'
          } else {
            statusVo.logisticsStatus = '异常'
          }
        }
        this.dataList = records
        this.totalElements = totalRecord
        // this.query.pageNom++
      }
      //  else {
      //   orderList && this.$message({
      //     message: orderList.errMsg || '',
      //     type: 'warning'
      //   })
      // }

      this.flags.loading = false
    },
    // 修改状态
    async changeStatus (params) {
      const changeStatus = await this.$http.changeStatus(params).catch(
        err => console.log('catch-err', err)
      )
      if (changeStatus) {
        return Promise.resolve(changeStatus)
      } else {
        return Promise.reject(changeStatus)
      }
    },
    // dialog 确定按钮
    change_status_handle () {
      const regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!this.cellPhone) {
        this.dialogMsg = '请输入手机号'
        return
      } else if (!regPhone.test(this.cellPhone)) {
        this.dialogMsg = '请输入正确的手机号'
        return
      }

      this.changeStatus({ cellPhone: this.cellPhone }).then(res => {
        // console.log(res)
        if (res) {
          this.dialogVisible = false
          this.cellPhone = ''

          setTimeout(() => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }, 0)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit (row) {
      this.dialogVisible = true
      this.cellPhone = row.cellPhone || ''
      console.log(row)
    },
    search_enter_handle (e) { // 回车按钮
      const keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13 && this.query.cellPhone) {
          this.orderList()
      }
    },
    search_handle () {
      this.query.status = this.queryStatus || 0
      this.query.type = this.recommendType
      this.orderList()
    },
    /**
     * @description 分页 回调事件
     */
    pageChange_handler(page) {
      this.query.pageNom = page
      this.orderList()
    }
  },
  watch: {
    // recommendType (newval, oldval) {
    //   !this.recommendType && (this.query.type = 1) // 设置初始值
    // },
    queryStatus (newval, oldval) {
      !this.queryStatus && (this.query.status = 0) // 设置初始值
    },
    'query.cellPhone' (val, oldval) { // 监控清空时操作
      if (!val && oldval) {
        this.orderList()
      }
    },
    value7 (val) {
      this.query.startTime = val[0] || ''
      this.query.endTime = val[1] || ''
    }
  }
}
</script>
<style lang="stylus" scoped>
  .orderlist{
    header{
      // display flex
      // align-items center
      // justify-content space-between
      // padding: 10px 20px
      // min-width: 600px
      // overflow-x scroll
      .search-box{
        min-height 40px
        margin-bottom 10px
        // display flex;
        // margin-right: 20px;
        .parentPhone-input,
        .cellPhone-input{
          margin-right 10px
        }
        .search-btn{
          margin 0 10px
        }
        // &:nth-child(2) {
        //   margin-top 10px
        // }
      }
    }
    section {
      .row{
        .label{
          font-weight:500
          margin-right 5px
        }
        .val{
          margin-right 5px
          color:#818193;
        }
      }
      .has-account-btn{
        color:#51d251;
      }
    }
  }
</style>

