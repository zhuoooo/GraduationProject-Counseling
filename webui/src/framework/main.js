// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../App'
import router from '../router/index'
import ElementUI from 'element-ui'
import 'util/request'

Vue.use(ElementUI)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import Axios from 'axios'
Vue.prototype.$axios = Axios
// 配置公共url
Axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5c388b4a4ca7fb6358ce72e9/home'

import '../../static/css/base.css'

// 注册全局组件
import MyHomeList from '@/module/mod-common/mod-home-list'
import MyCommList from '@/module/mod-common/mod-comm-list'
import MyUserLi from '@/module/mod-common/mod-user-cell'
Vue.component(MyHomeList.name, MyHomeList)
Vue.component(MyCommList.name, MyCommList)
Vue.component(MyUserLi.name, MyUserLi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
