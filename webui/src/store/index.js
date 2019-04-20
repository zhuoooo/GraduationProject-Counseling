/**
 * 状态管理
 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router/index'
Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
    userName: '',
    userPhone: '',
    userEmail: '',
    password: '',
    createAt: '',
    role: '',
    charInfo: [],
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  },
  getters: {
    getToken: state => state.token,
    getUserName: state => state.userName,
    getUserPhone: state => state.userPhone,
    getUserEmail: state => state.userEmail,
    getCharInfo: state => state.charInfo,
    getUserId: state => parseInt(state.userId, 10),
    getUserPwd: state => state.password,
    getUserCta: state => state.createAt,
    getUserRole: state => state.role,
  },
  mutations: {
    changeLogin(state, user) {
      state.token = user.token;
      state.userId = user.userId;
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.userId);
    },
    changeInfo(state, user) {
      state.userName = user.username;
      state.userPhone = user.phone;
      state.userEmail = user.email;
      state.createAt = user.createAt;
      state.role = user.role;
    },
    changePwd(state, user) {
      state.password = user.password;
    },
    changeChar(state, char) {
      state.charInfo = char;
    }
  },
  actions: {
    // 登录
    login(state, user) {
      let getLoginToken = new Promise((resolve, reject) => {
        Vue.prototype.$ajax({
          url: '/user/login',
          method: 'post',
          params: {
            loginName: user.username,
            password: user.password
          }
        }).then(res=>{
          if (res.data.status !== 200) {
            return Vue.prototype.$toast(res.data.msg || '密码错误');
          }
          resolve(res.data.data)
          store.commit('changePwd', { password: user.password});
          // store.commit('changeLogin', { token: res.data.token, userId: res.data.userId });
        }).catch(err=>console.log(err))
      });

      getLoginToken.then(data=>{
        console.log(data.token)
        if(!!data.token){
          store.commit('changeLogin', { token: data.token, userId: data.userId });
          store.commit('changeInfo', data);
          router.push({
            path: '/home'
          })
        }else{
          return Vue.prototype.$toast('账号或密码错误');
        }
      }).catch(err=>console.log(err))
    },

    // 注册
    register(state, user) {
      axios({
        url: '/user/add',
        method: 'post',
        params: {
          email: user.email,
          password: user.password,
          phone: user.phone,
          username: user.username,
          type: 1,
          status: 0
        }
      }).then(res=>{
        if(res.data.status == 200){
          store.commit('changeLogin', { token: res.data.token, userId: res.data.userId });
          Vue.$toast('注册成功');
          router.push({
            path: '/login'
          })
        }else{
          alert(res.data.msg);
          return;
        }
      }).catch(err=>console.log(err))
    },

    // 修改信息
    revise(state, user) {
      axios({
        url: `/user/${store.getters.getUserId}`,
        method: 'put',
        params: {
          email: user.email,
          headUrl: user.headUrl,
          password: user.password,
          phone: user.phone,
          role: store.getters.getUserRole,
          username: user.username,
        },
        header: {
          token: store.getters.getToken
        }
      }).then(res=>{
        Vue.$messagebox.alert('修改成功').then(() => {
          store.dispatch('setUserInfo')
          router.push({
            path: '/center'
          })
        });
      }).catch(err=>console.log(err))
    },

    setUserInfo ({state}) {
      Vue.prototype.$ajax({
        method: 'get',
        url: '/user/' + state.userId
      }).then(({data}) => {
        store.commit('changeInfo', data.data);
      });
    },

    // 修改密码
    resetPwd(state, user) {
      axios({
        url: `/user/reset/${store.getters.getUserId}`,
        method: 'put',
        header: {
          token: store.getters.getToken
        },
        params: {
          password: user.password
        }
      }).then(res=>{
        store.commit('changePwd', { password: user.password});
        Vue.$messagebox.alert('修改成功').then(action => {
          router.push({
            path: '/center'
          })
        });
      }).catch(err=>console.log(err))
    }
  }
});

export default store
