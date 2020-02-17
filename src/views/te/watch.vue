<template>
  <div class="watch">
    <div class="con"  v-for="(item, index ) in AOIList" :key="item">
      <div class="box">
        <el-popover
        class="list"
        placement="top-start"
        title="标题"
        width="200"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <el-button slot="reference">{{item}}</el-button>
      </el-popover>
        <div class="content" :style="{'animation-delay': index + 's'}">

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      AOIList: ['a3faoi-d', 'a3faoi-e', 'a3faoi-d', 'a3faoi-e', 'a3faoi-d', 'a3faoi-e', 'a3faoi-d', 'a3faoi-e']
    }
  },
  methods: {
    test () {
      this.$socket.emit('err', '测试完')
    }
  },
  mounted () {
    this.sockets.subscribe('aoiError', (data) => {
      if (this.AOIList.indexOf(data) === -1) {
        this.AOIList.push(data)
      }
    })
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
  .box{
    width: 160px;
    height: 160px;
    // border: 1px solid #34a4d5;
    box-sizing: border-box;
    padding: 5px;

    // box-shadow: 1px 1px 1px #55bfda;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
  }
  .content{
    position: absolute;
    top: 40px;
    left: -30px;
    height: 200px;
    width: 200px;
    background: #34a4d5;
    border-radius: 40%;
    // box-shadow: 20px 20px #55bfda;
    /* transform-origin: 0 -250px; */
    animation: rotateCube 5s linear infinite;
    /* transition: all 3s ;
    transform: rotate(360deg)  */
  }
  .list{
    position: absolute;
    left: 50%;
    margin-left: -47.5px;
    top: 50%;
    z-index: 2;
  }
  >>> .el-button{
    background: #34a4d5;
    color: #fff;
    font-weight: bold;
  }

   @keyframes rotateCube {
    from{
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }
</style>
