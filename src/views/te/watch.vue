<template>
  <div class="watch">
    <el-dialog
  title="请输入机台名字"
  :visible.sync="dialogVisible"
  :before-close="closeWindow"
  width="30%">
  <el-input v-model="itemName"></el-input>
  <el-button @click="confirmItem" style="margin-top:20px">确定</el-button>

</el-dialog>
    <div class="select-board">
      <span @click="filterBoard(item, index)"  :class="[item.show ? 'board-item': 'hidden-item']" v-for="(item, index) in originList" :key="index" >{{item.name}}</span>
    </div>
    <listview @deleItem="deleItem" @addItem="addItem" v-show = "item.show" v-for="(item, index) in originList" :name="item.name" :children="item.children" :color="item.color" :key="index"></listview>
  </div>
</template>

<script>
import listview from '@/components/listview'
export default {
  /* eslint-disable */ 
  data () {
    return {
      checkedCities: [],
      dialogVisible: false,
      itemName: '',
      // 哪一个站别
      station: '',
      originList: localStorage.getItem('classification') ? JSON.parse(localStorage.getItem('classification'))  : [
        {
          name: 'SPI',
          color: '#E55D87',
          children: [ ],
          show: true
        },
        {
          name: 'SMT',
          color: '#F09819',
          children: [],
           show: true
        },
        {
          name: 'TM',
          color: '#fbc7d4',
          children: [],
           show: true
        },
        {
          name: 'TIN',
          color: '#7AA1D2',
          children: [],
           show: true
        },
        {
          name: 'PACK',
          color:  '#3CA55C',
          children: [],
           show: true
        },
        {
          name: 'CPU',
          color: '#56B4D3',
          children: [],
           show: true
        },
        {
          name: 'DIP',
          color: '#9733EE',
          children: [],
           show: true
        }
      ]
    }
  },
  methods: {
    saveInfo () {
      setInterval(() => {
         localStorage.setItem('classification',JSON.stringify(this.originList)) 
      },120000)
    },
    closeWindow () {
      this.itemName = ''
      this.dialogVisible = false
      this.station = ''
      
    },
    addItem (name) {
      this.dialogVisible = true
      this.station = name
      // console.log(name)
    }, 
    deleItem (name, i) {
      
      this.originList.forEach((item, index) => {
        if (item.name === name) {
          item.children.splice(i, 1)
        }
      })
    },
    confirmItem () {
      this.originList.forEach((item, index) => {
        if (item.name === this.station) {
          item.children.push({name:this.itemName,value:this.station,status: true})
        }
      })
       this.closeWindow()
    },
    // 对显示的list做filter
    filterBoard (item, index) {
       this.originList[index]['show'] = !this.originList[index]['show']
       localStorage.setItem('classification',JSON.stringify(this.originList)) 
    },
    subscribeInfo (name,status) {
      this.sockets.subscribe(name, (data) => {
      // originList
        this.originList.forEach((item, index) => {
          if (item.name === data.value) {
            let hasItem = false
            // console.log(item)
            item.children.forEach((child, i) => {
              if (child.name === data.name) {
                hasItem = true
                child['status'] = status
              }
            })
            // if (!hasItem) {
            //   this.originList[index].children.push(data)
            // }
          } else {
            return
          }
        })
      })
    }
  },
  mounted () {
    // console.log(this.sockets)
    this.subscribeInfo('addName', true)
    this.subscribeInfo('aoiError', false)
    this.saveInfo()

  },
  components: {
    listview
  }
}
</script>

<style lang="scss" scoped>
  .watch{
    // position: absolute;
    // top:0;
    // left: 20px;
    // right: 0;
    // bottom: 0;
    display: flex;
    flex-wrap: wrap;
  }
  .select-board{
    width: 100%;
    text-align: center;
    .board-item{
      margin: 0 10px;
      cursor: pointer;
    }
  }

  .con {
    display: flex;
    margin: 20px;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 180px;
    border: 5px solid  #34a4d5;
    border-radius: 50%;
  }
  >>> .el-button{
    background: #34a4d5;
    color: #fff;
    font-weight: bold;
  }
  .board-item {
    display: inline-block;
    background: #409eff;
    color: #fff;
    padding: 7px;
    border-radius: 5px;
  }
  .hidden-item {
    margin: 0 10px;
    display: inline-block;
    // background: #409eff;
    border: 1px solid #409eff;
    // color: #fff;
    padding: 7px;
    border-radius: 5px;
    cursor: pointer;
  }


</style>
