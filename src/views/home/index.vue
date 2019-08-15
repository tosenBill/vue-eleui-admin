<template>
  <div id="home" class="home">
    <section>
      北京每选科技有限公司
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
    // this.getUserInfo()

    // const type = (this.query.type === 1 ? 0 : 1)
    // this.query = {
    //   ...this.query,
    //   type
    // }
    // this.handleCardList()
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
  .home{
    section{
      padding: 10px 20px
      min-width: 600px
      overflow-x scroll
    }
  }
</style>

