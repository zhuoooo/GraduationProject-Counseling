import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/module/mod-home/index'
import DoctorList from '@/module/mod-home/home/doctorList'
import Session from '@/module/mod-home/session/index'
import Dialogue from '@/module/mod-home/session/dialogue'
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
      path: '/doctor/list',
      name: 'doctorList',
      component: DoctorList
    },

    /**
     * 咨询会话
     */
    {
      path: '/session',
      name: 'session',
      component: Session
    },
    {
      path: '/session/dialogue',
      name: 'dialogue',
      component: Dialogue
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
