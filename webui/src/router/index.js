import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/module/mod-home/index'
import Session from '@/module/mod-home/session/index'
import Forum from '@/module/mod-home/forum/index'
import Center from '@/module/mod-home/center/index'
import CenterRevise from '@/module/mod-home/center/revise'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'home'}
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/session',
      name: 'session',
      component: Session
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum
    },

    // 个人中心
    {
      path: '/center',
      name: 'center',
      component: Center,
      // children: [{
      //   path: '/phone',
      //   component: CenterPhone
      // }]
    },
    {
      path: '/center/revise',
      name: 'revise',
      component: CenterRevise
    }
  ]
})
