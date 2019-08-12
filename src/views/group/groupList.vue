<template>
  <div id="grouplist" class="grouplist container">
    <section>
      <MyTree :folder="trees" :select = "select" :currentId="currentId"></MyTree>
    </section>
  </div>
</template>

<script>

// import types from '@store/type'
import { mapGetters } from 'vuex'
import MyTree from '@components/Common/Mytree'

export default {
  name: 'grouplist',
  data () {
    return {
      currentId: null,
      trees: [
        {
            id: 1,
            label: '1级目录1',
            show: false,
            children: [
                {
                    id: '1-1',
                    label: '1.1目录'
                },
                {
                    id: '1-2',
                    label: '1.2目录'
                },
                {
                    id: '1-3',
                    label: '1.3目录'
                }
            ]
        },
        {
            id: 2,
            label: '1级目录2',
            show: false,
            children: []
        },
        {
            id: 3,
            label: '1级目录3',
            show: false,
            children: [
                {
                    id: '3-1',
                    label: '3.1目录'
                },
                {
                    id: '3-2',
                    label: '3.2目录',
                    show: false,
                    children: [
                        {
                            id: '3-2-1',
                            label: '3.2.1目录',
                            show: false,
                            children: [
                              {
                                id: '15591611037',
                                label: '沈小童'
                              }
                            ]
                        },
                        {
                            id: '3-2-2',
                            label: '3.2.2目录'
                        },
                        {
                            id: '',
                            label: '3.2.3目录'
                        }
                    ]
                }
            ]
        }
      ],
      outerIndex: null,
      innerId: null
    }
  },
  components: {
    MyTree
  },
  activated () {
    console.log('activated group')
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
    check () {

    },
    select (item) {
      // console.log(item)
      item.show = !item.show
      this.currentId = item.id
    }
  }
}
</script>
<style lang="stylus" scoped>
  .grouplist{

  }
</style>

