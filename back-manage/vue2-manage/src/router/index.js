import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const postList = r => require.ensure([], () => r(require('@/page/postList')), 'postList');
const addPost = r => require.ensure([], () => r(require('@/page/addPost')), 'addPost');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const addUser = r => require.ensure([], () => r(require('@/page/addUser')), 'addUser');
const caseList = r => require.ensure([], () => r(require('@/page/caseList')), 'caseList');
const addCase = r => require.ensure([], () => r(require('@/page/addCase')), 'addCase');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/postList',
			component: postList,
			meta: ['帖子管理', '帖子列表'],
		},{
			path: '/addPost',
			component: addPost,
			meta: ['帖子管理', '添加帖子'],
		},{
			path: '/userList',
			component: userList,
			meta: ['用户管理', '用户列表'],
		},{
			path: '/addUser',
			component: addUser,
			meta: ['用户管理', '添加用户'],
		},{
			path: '/caseList',
			component: caseList,
			meta: ['案例管理', '案例列表'],
		},{
			path: '/addCase',
			component: addCase,
			meta: ['案例管理', '添加案例'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
