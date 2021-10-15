// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { MessageBox } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
// 配置接口
import axios from 'axios'
// axios.defaults.baseURL = ""
Vue.prototype.$http = axios
// 申请拦截器
axios.interceptors.request.use(config => {
  console.log(config)
  config.header.Authorization = window.sessionStorage.setItem('token')
  return config
})
Vue.config.productionTip = false
// eslint-disable-next-line no-undef
// 全局配置message
// Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
