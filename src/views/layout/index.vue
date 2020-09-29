<template>
  <div >
    <div class="header-container"  :class="isExtend" >
       <headerNavBar @showUserBox="showUser" />
        <div class="logo">
          CND後台管理系統
        </div>
    </div>
    <!-- eslint-disable vue/require-component-is -->
    <!-- <sidebar class="sidebar-container" /> -->
    <div class="scroll-container">
      <el-scrollbar class="scroll" :class="isOpened">
          <el-menu  default-active="1-4-1" class="demo"  :background-color="variables.menuBg"
              :text-color="variables.menuText"
              :unique-opened="false"
              :active-text-color="variables.menuActiveText"
              :collapse-transition="false"
              mode="vertical"
              :collapse="opened"
              >
              <sideBarItem :key="index" v-for="(item,index) in items" :item="item" />
          </el-menu>
      </el-scrollbar>
    </div>
      <div class="mian" :class="isExtend">
      <div style="padding: 20px">
        <router-view ></router-view>
      </div>
        <el-dialog title="UserLogin" :visible.sync="isShowUser"  close="clearUser">
          <span style="display:inline-block;width: 160px;line-height: 40px">Username:</span>  <el-input
          placeholder="Please input Username"
          v-model.trim="user.username">
          </el-input>
          <span style="display:inline-block;width: 160px;line-height: 40px">Password:</span>  <el-input
          placeholder="Please input Password"
          v-model="user.password" type="password">
          </el-input>
          <el-button :loading="loading" style="margin-top:20px;" @click="doLogin" type="primary">Login</el-button>
        </el-dialog>
      </div>
  </div>
</template>

<script>
import variables from '@/assets/scss/variables.scss'
import sideBarItem from './sideBarItem'
import headerNavBar from './headerNavBar'
import { mapGetters, mapMutations } from 'vuex'
import { setToken } from '@/utils/auth'
import { userLogin } from '@/api/user'
// import { state } from 'vuex'
// import { Sidebar } from './Sidebar'
export default {
  data () {
    return {
      loading: false,
      user: {
        username: '',
        password: ''
      },
      isShowUser: false
    }
  },
  components: {
    sideBarItem,
    headerNavBar
  },
  methods: {
    clearUser () {
      this.user = {
        username: '',
        password: ''
      }
    },
    doLogin () {
      this.loading = true
      if (this.userName === '' || this.password === '') {
        this.loading = false
        this.$message({
          message: '請輸入完整的用戶名和密碼',
          type: 'warning'
        })
      } else {
        const that = this
        userLogin(this.user).then(res => {
          let {data} = res
          if (data === 'error') {
            that.loading = false
            this.$message({
              message: '用戶名或密碼錯誤',
              type: 'error'
            })
          } else if (data.status === 'ok' && data.token !== undefined) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            setToken(data)
            this.setLogin(true)
            that.isShowUser = false
            that.loading = false
          } else {
            this.$message({
              message: '未知错误请联系管理员!',
              type: 'error'
            })
            that.loading = false
          }
        })
      }
    },
    showUser () {
      this.isShowUser = true
    },
    ...mapMutations({
      setLogin: 'SET_LOGIN'
    })
  },
  created () {
    // console.log(this.state.opened)
  },
  computed: {
    isOpened () {
      return this.opened ? 'isCollapse' : ''
    },
    isExtend () {
      return this.opened ? 'isExtend' : ''
    },
    ...mapGetters([
      'opened'
    ]),
    items () {
      return this.$router.options.routes
    },
    variables () {
      return variables
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.scroll-container{
  width: 210px;
  overflow-x: hidden;
  position: flex;

}
>>>.el-scrollbar__bar{
  top: 200px!important;
  bottom: 200px !important;

}
.header-container{
    position: fixed;
  top:0;
  right: 0;
  left: 210px;
  height: 50px;
  // background: green;
  z-index: 200;
  background: #fff;
  transition: left 0.3s ease;
  border-bottom: 1px solid #e6e6e6;
}
.logo {
  position: absolute;
  left: 50%;
  top: 0;
  text-align: center;
  line-height: 50px;
  margin-left: -200px;
  font-weight: bold;
  width: 400px;
  font-size: 24px;
  font-style: italic;
  letter-spacing: 1px;
  height: 50px;
  z-index: 201;
  animation: stripes 2s linear infinite;
  background-color:#fff;
  background:linear-gradient(crimson 50%, #aaa 50%) 0 0/ 100% 50px ;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
.demo{
  border:none!important;
}
.mian{
  position: absolute;
  left: 210px;
  top:50px;
  bottom: 0;
  right: 0;
  transition: left 0.3s ease;
}
.isExtend {
  left: 56px;
}
.scroll{
  position: fixed;
  left: 0;
  top:0;
  bottom: -20px;
  width: 210px;
  background: $menuBg;
  transition: width 0.3s ease;
  overflow-x: hidden!important;
  // overflow-y: scroll;
}
.isCollapse {
  width: 56px;
  >>>.el-scrollbar__bar{
  top: 0!important;
  bottom: 0 !important;

}
}
@keyframes stripes {100% {background-position: 0 -50px;}}
</style>
