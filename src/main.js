// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import '@/assets/scss/index.scss'
import store from '@/store'
import './routerStyle'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({

  debug: true,

  connection: 'http://localhost:3000/'

}))
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
