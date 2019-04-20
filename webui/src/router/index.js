import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/module/mod-home/index')
const Login = () => import('@/module/mod-home/login/login')
const Register = () => import('@/module/mod-home/login/register')
const EleLogin = () => import('@/module/mod-home/login/eleLogin')
const Psylist = () => import('@/module/mod-home/psycal/psylist')
const PsySection = () => import('@/module/mod-home/psycal/section')
const Case = () => import('@/module/mod-home/case/index')
const CaseSection = () => import('@/module/mod-home/case/section')
const ExpertList = () => import('@/module/mod-home/expert/expertList')
const DetailExpert = () => import('@/module/mod-home/expert/detailExpert')
const Session = () => import('@/module/mod-home/session/index')
const Dialogue = () => import('@/module/mod-home/session/dialogue')
const Forum = () => import('@/module/mod-home/forum/index')
const Section = () => import('@/module/mod-home/forum/section')
const Release = () => import('@/module/mod-home/forum/release')
const Search = () => import('@/module/mod-home/search/search')
const Center = () => import('@/module/mod-home/center/index')
const CenterRevise = () => import('@/module/mod-home/center/revise')
const CenterPassword = () => import('@/module/mod-home/center/password')
const CenterFeedback = () => import('@/module/mod-home/center/feedback')

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
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/eleLogin',
      name: 'eleLogin',
      component: EleLogin
    },

    /**
     * 案例
     */
    {
      path: '/case',
      name: 'case',
      component: Case
    },
    {
      path: '/case/section',
      name: 'casesection',
      component: CaseSection
    },

    /**
     * 心理咨询
     */
    {
      path: '/psycal',
      name: 'psycal',
      component: Psylist,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/psycal/section',
      name: 'psycalsection',
      component: PsySection
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
      path: '/session/dialogue/:theSenderId/:theReceiveId',
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

    /**
     * 个人中心
     */
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
    },
    {
      path: '/center/password',
      name: 'password',
      component: CenterPassword,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/center/feedback',
      name: 'feedback',
      component: CenterFeedback,
      meta: {
        requireLogin: true
      }
    }
  ]
})
