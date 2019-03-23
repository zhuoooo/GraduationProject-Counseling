/**
 * 全局请求
 */

import Vue from 'vue'
import axios from 'axios'; //引入文件
import MintUI from 'mint-ui';
import store from '../store';

Vue.prototype.$ajax = axios; //将axios挂载到Vue实例中的$ajax上面alias
// 配置公共url
axios.defaults.baseURL = '/api';
axios.defaults.headers.common['token'] = store.getters.getToken;

//配置请求拦截器，显示loading图标
// axios.interceptors.request.use(config=>{
//   MintUI.Indicator.open({
//     text: '拼命加载中'
//   });
//   return config;
// });

// //配置响应拦截器，关闭loading图标
// axios.interceptors.response.use(response=>{
//   MintUI.Indicator.close();
//   return response;
// })
