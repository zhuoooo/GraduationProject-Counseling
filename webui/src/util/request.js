/**
 * 全局请求
 */

import Vue from 'vue'
import axios from 'axios'; //引入文件

Vue.prototype.$ajax = axios; //将axios挂载到Vue实例中的$ajax上面alias
