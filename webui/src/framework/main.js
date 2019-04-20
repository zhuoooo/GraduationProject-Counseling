// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../App'
import router from '../router/index'
import store from '@/store/index'
import ElementUI from 'element-ui'
import 'util/request'
import 'util/bus'
import '../assets/css/base.css'

Vue.use(ElementUI)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 注册全局组件
import MyHomeList from '@/module/mod-common/mod-home-list'
import MyCommList from '@/module/mod-common/mod-comm-list'
import MyUserLi from '@/module/mod-common/mod-user-cell'
import MyHeader from '@/module/mod-common/mod-header'
import MyComment from '@/module/mod-common/mod-comment'
import MySearch from '@/module/mod-common/mod-my-search'
import MyPsylist from '@/module/mod-common/mod-psycal-list'
import MyCaseList from '@/module/mod-common/mod-case-list'
Vue.component(MyHomeList.name, MyHomeList)
Vue.component(MyCommList.name, MyCommList)
Vue.component(MyUserLi.name, MyUserLi)
Vue.component(MyHeader.name, MyHeader)
Vue.component(MyComment.name, MyComment)
Vue.component(MySearch.name, MySearch)
Vue.component(MyPsylist.name, MyPsylist)
Vue.component(MyCaseList.name, MyCaseList)

// 路由守卫
router.beforeEach((to, from, next)=>{
  if(to.matched.some(req => req.meta.requireLogin)){

    if(!store.getters.getToken || !store.getters.getUserId){
      MintUI.Toast('请先登录...');
      next({
        path: '/login'
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

import Moment from 'moment'
Vue.filter('convertTime', (data, formatStr)=>{
  return Moment(data).format(formatStr);
})
// Moment.locale('zh-cn')


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
