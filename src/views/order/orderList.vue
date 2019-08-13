<template>
  <div id="orderlist" class="orderlist container">
    <header>
      <div class="search-box">
        <el-input
          style="width: 200px"
          class="cellPhone-input"
          placeholder="订单查询"
          v-model.trim="query.cellPhone"
          clearable>
        </el-input>

        <el-input
          style="width: 200px"
          class="parentPhone-input"
          placeholder="关联订单查询"
          v-model.trim="query.parentPhone"
          clearable>
        </el-input>

        <!-- <template> -->
          <el-select style="width: 130px" v-model="queryStatus"  clearable placeholder="请选择状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <!-- </template> -->

        <el-button class="search-btn" type="primary" icon="el-icon-search" size="medium" @click="search_handle">搜索</el-button>
      </div>
      <el-button type="primary" icon="el-icon-download" size="medium">导出</el-button>
    </header>
    <section>
      <my-tables
        :dataList='dataList'
        :loading='flags.loading'
        :size="query.size"
        :page="query.pageNom"
        :total="totalElements"
        @pageChange="pageChange_handler"
        >
        <el-table-column
          label="办卡人信息"
          align="center"
          >
          <template slot-scope="scope">
            <div style="text-align:left;">
              <span>姓名: </span><span>{{scope.row.name + '&nbsp;&nbsp;'}}</span>
              <span>手机: </span><span>{{scope.row.contactNumber}}</span>
            </div>
            <div style="text-align:left;">
              <span>入网号码: </span><span>{{scope.row.cellPhone + '&nbsp;&nbsp;'}}</span>
              <span>办理套餐: </span><span>{{scope.row.setMeal}}</span>
            </div>
            <div style="text-align:left;">
              <span>权益礼包: </span><span>{{scope.row.deliveryType || '暂无' + '&nbsp;&nbsp;'}}</span>
              <span>礼包发放地址: </span><span>{{scope.row.address}}</span>
            </div>
            <!-- statusVo -->
            <div v-if="scope.row.statusVo">
            <div style="text-align:left;">
              <span>资料审核: </span><span>{{scope.row.statusVo.auditStatus  + '&nbsp;&nbsp;'}}</span>
              <span>充值缴费: </span><span>{{scope.row.statusVo.isPay}}</span>
            </div>
            <div style="text-align:left;">
              <span>余额宝冻结: </span><span>{{scope.row.statusVo.isFreeze  + '&nbsp;&nbsp;'}}</span>
              <span>号卡邮寄: </span><span>{{scope.row.statusVo.logisticsStatus + '&nbsp;&nbsp;'}}</span>
            </div>
            <div style="text-align:left;">
              <span>激活号卡: </span><span>{{scope.row.statusVo.activateStatus}}</span>
            </div>

            <div style="text-align:left;">
              <span>物流公司: </span><span>{{scope.row.statusVo.logisticsCompany  + '&nbsp;&nbsp;'}}</span>
              <span>物流单号: </span><span>{{scope.row.statusVo.logisticsNum}}</span>
            </div>
            <div style="text-align:left;">
              <span>收件人: </span><span>{{scope.row.statusVo.receiverName  + '&nbsp;&nbsp;'}}</span>
              <span>联系电话: </span><span>{{scope.row.statusVo.receiverPhone + '&nbsp;&nbsp;'}}</span>
            </div>
            <div style="text-align:left;">
              <span>权益卡收货地址: </span><span>{{scope.row.statusVo.receiverAddress}}</span>
            </div>
            <div style="text-align:left;" v-if="scope.row.statusVo.nextStep">
              <span>下一步: </span><span style="font-wight:bold;">{{scope.row.statusVo.nextStep}}</span>
            </div>
            <div style="text-align:left;">
              <span style="color:#e4393c;">{{scope.row.statusVo.errorMsg}}</span>
            </div>
            </div>
          </template>
          <!-- <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>手机: {{ scope.row.cellPhone }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template> -->
        </el-table-column>

        <el-table-column
          label="合作商信息"
          align="center"
          >
          <template slot-scope="scope" v-if="scope.row.cooperator">
            <div style="text-align:left;">
              <span>姓名: </span><span>{{scope.row.cooperator.name  + '&nbsp;&nbsp;'}}</span>
              <span>联系方式: </span><span>{{scope.row.cooperator.contactNumber + '&nbsp;&nbsp;'}}</span>
              <span>团队数量: </span><span>{{scope.row.cooperator.teamCount}}</span>
            </div>
            <div style="text-align:left;">
              <span>入网号码: </span><span>{{scope.row.cooperator.cellPhone  + '&nbsp;&nbsp;'}}</span>
              <span>类型: </span><span>{{scope.row.cooperator.userType}}</span>
            </div>
            <div style="text-align:left;">
              <span>支付宝: </span><span>{{scope.row.cooperator.aliPay  + '&nbsp;&nbsp;'}}</span>
              <span>身份证号: </span><span>{{scope.row.cooperator.idCard}}</span>
            </div>
            <div style="text-align:left;">
              <span>开户行: </span><span>{{scope.row.cooperator.openingBank  + '&nbsp;&nbsp;'}}</span>
              <span>银行卡号: </span><span>{{scope.row.cooperator.bankCard}}</span>
            </div>
            <div style="text-align:left;">
              <span>联系地址: </span><span>{{scope.row.cooperator.address || ''}}</span>
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
            <div style="text-align:left;">
              <span>姓名: </span><span>{{scope.row.recommend.name || ''  + '&nbsp;&nbsp;'}}</span>
              <span>联系方式: </span><span>{{scope.row.recommend.contactNumber || '' + '&nbsp;&nbsp;'}}</span>
              <span>团队数量: </span><span>{{scope.row.recommend.teamCount || ''}}</span>
            </div>
            <div style="text-align:left;">
              <span>入网号码: </span><span>{{scope.row.recommend.cellPhone || ''  + '&nbsp;&nbsp;'}}</span>
              <span>类型: </span><span>{{scope.row.recommend.userType || ''}}</span>
            </div>
            <div style="text-align:left;">
              <span>支付宝: </span><span>{{scope.row.recommend.aliPay || '暂无'  + '&nbsp;&nbsp;'}}</span>
              <span>身份证号: </span><span>{{scope.row.recommend.idCard || '暂无'}}</span>
            </div>
            <div style="text-align:left;">
              <span>开户行: </span><span>{{scope.row.recommend.openingBank || '暂无' + '&nbsp;&nbsp;'}}</span>
              <span>银行卡号: </span><span>{{scope.row.recommend.bankCard || '暂无'}}</span>
            </div>
            <div style="text-align:left;">
              <span>联系地址: </span><span>{{scope.row.recommend.address || ''}}</span>
            </div>
          </template>

        </el-table-column>

        <el-table-column label="操作"  width="110" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">状态审核</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </my-tables>
    </section>
    <el-dialog
      title="审核状态"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialog_close_handle"
      >
      <div>
        <el-input
          style="width:100%"
          class="cellPhone-input"
          placeholder="请输入开户手机号"
          v-model.trim="cellPhone"
          clearable>
        </el-input>
        <p v-if="dialogMsg" style="color:#e4393c;margin-top:5px;">{{dialogMsg}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="change_status_handle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import types from '@store/type'
import MyTables from '@components/Common/Mytable'
import { mapGetters } from 'vuex'

export default {
  name: 'orderlist',
  data () {
    return {
      dialogVisible: false,
      cellPhone: '',
      dialogMsg: '',
      query: {
        pageNom: 1,
        size: 20,
        cellPhone: '',
        status: 0, // 全部0，通过1，未通过2
        type: 0, // 直推信息代表’1‘，间推 ’0‘
        parentPhone: '' // 此号码下所有办卡信息
      },
      queryStatus: '',
      statusOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '通过'
      }, {
        value: '2',
        label: '未通过'
      }],
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
  },
  deactivated () {
    console.log('deactivated order')
    this.flags = {
      loading: true
    }
    this.dataList = []
    this.totalElements = 0
  },
  created() {

  },
  mounted () {
    // this.getUserInfo()

    // const type = (this.query.type === 1 ? 0 : 1)
    // this.query = {
    //   ...this.query,
    //   type
    // }
    this.orderList()
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
    async orderList () {
      this.flags.loading = true
      const orderList = await this.$http.orderList(this.query).catch(err => console.log(err))
      console.log(orderList)
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
        console.log(this.dataList)
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
    // dialog 关闭回调
    dialog_close_handle () {
      this.cellPhone = ''
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
      this.query.status = this.queryStatus
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
    queryStatus (newval, oldval) {
      !this.queryStatus && (this.query.status = 0)
    },
    'query.cellPhone' (val, oldval) { // 监控清空时操作
      if (!val && oldval) {
        this.orderList()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .orderlist{
    header{
      min-height 60px
      display flex
      align-items center
      justify-content space-between
      // padding: 10px 20px
      // min-width: 600px
      // overflow-x scroll
      .search-box{
        display flex;
        margin-right: 20px;
        .parentPhone-input,
        .cellPhone-input{
          margin-right 20px
        }
        .search-btn{
          margin-left 20px
        }
      }
    }
  }
</style>

