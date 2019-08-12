<template>
    <ul class = "dataBaseTree">
        <li v-for = "(item,index) in folder" :key = "index">
            <span @click = "select(item)" class="item-label" :class = "{'active':currentId == item.id}">
                <i class = "folderIcon" v-if="item.children">
                    <div v-if = "item.show" class="icon-extend el-icon-minus" style="color:#000"></div>
                    <div v-else class="icon-extend el-icon-plus"></div>
                </i>
                {{ item.label }}
            </span>
            <el-collapse-transition>
                <Mytree v-if = "item.children && item.show" :folder = "item.children" :select = "select" :currentId = "currentId">

                </Mytree>
            </el-collapse-transition>
        </li>
    </ul>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default{
      name: 'Mytree',
      props: ['folder', 'select', 'currentId'],
      data () {
        return {
          addParams: {
              label: '',
              children: []
          },
          noteData: {
              children: []
          }
        }
      },
      computed: {
        ...mapGetters(['catalog'])
      },
      methods: {}
    }
</script>

<style lang="scss" scoped>
    .dataBaseTree{
        padding-left:20px;
        line-height:40px;
        ul{
            padding-left:100px;
            line-height:40px;
        }
        li{
                position: relative;
                span.item-label{
                    display:inline-block;
                    box-sizing: border-box;
                    padding-left:20px;
                    height:100%;
                    width:100px;
                    color:#000;
                    font-size:14px;
                    position: relative;
                    cursor: pointer;
                    &:hover{
                        background: #EDF0F5;
                    }
                    .folderIcon{
                        position: absolute;
                        top:0;
                        left:0;
                        .icon-extend{
                          color:#000
                        }
                    }
                    &.active{
                      // background: #EDF0F5;
                      background:#409EFF;
                      color:#fff;
                    }
                }
            }
        // li{
        //     position: relative;
        //     span{
        //         display:inline-block;
        //         padding-left:40px;
        //         font-size:14px;
        //         height:100%;
        //         width:120px;
        //         cursor: pointer;
        //         position: relative;
        //         right:25px;
        //         top:-2px;
        //         color:#ababab;
        //         &:hover{
        //             background: #EDF0F5;
        //         }
        //         .titleIcon{
        //             color:#C3C3C3;
        //             font-size:16px;
        //             position: absolute;
        //             top:12px;
        //             left:16px;
        //         }
        //         .folderIcon{
        //             color:#BCBCBC;
        //             position: absolute;
        //             top:-1px;
        //             left:22px;
        //             .icon-extend{
        //               color:#000
        //             }
        //         }
        //     }
        //     .active{
        //         background: #EDF0F5;
        //     }
        // }
    }
</style>
