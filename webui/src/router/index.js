import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/module/mod-home/index'
import Login from '@/module/mod-home/login/login'
import ExpertList from '@/module/mod-home/expert/expertList'
import DetailExpert from '@/module/mod-home/expert/detailExpert'
import Session from '@/module/mod-home/session/index'
import Dialogue from '@/module/mod-home/session/dialogue'
import Forum from '@/module/mod-home/forum/index'
import Section from '@/module/mod-home/forum/section'
import Release from '@/module/mod-home/forum/release'
import Search from '@/module/mod-home/search/search'
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

    /**
     * 登录界面
     */
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    /**
     * 咨询会话
     */
    {
      path: '/session',
      name: 'session',
      component: Session,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/session/dialogue',
      name: 'dialogue',
      component: Dialogue,
      meta: {
        requireLogin: true
      }
    },

    /**
     * 专家部分
     */
    {
      path: '/expert/list',
      name: 'expertList',
      component: ExpertList
    },
    {
      path: '/expert/detail',
      name: 'detailExpert',
      component: DetailExpert
    },


    /**
     * 论坛页面
     */
    {
      path: '/forum',
      name: 'forum',
      component: Forum
    },
    {
      path: '/forum/section',
      name: 'section',
      component: Section
    },
    {
      path: '/forum/release',
      name: 'release',
      component: Release,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },

    // 个人中心
    {
      path: '/center',
      name: 'center',
      component: Center,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/center/revise',
      name: 'revise',
      component: CenterRevise,
      meta: {
        requireLogin: true
      }
    }
  ]
})
