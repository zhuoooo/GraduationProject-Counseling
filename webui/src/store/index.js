/**
 * 状态管理
 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

const store = new Vuex.Store({
 
  state: {
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
    userName: '',
    userPhone: '',
    userEmail: '',
    password: '',
    charInfo: [],
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  },
  getters: {
    getToken: state => state.token,
    getUserName: state => state.userName,
    getUserPhone: state => state.userPhone,
    getUserEmail: state => state.userEmail,
    getCharInfo: state => state.charInfo,
    getUserId: state => state.userId,
    getUserPwd: state => state.password,
  },
  mutations: {
    changeLogin(state, user) {
      state.token = user.token;
      state.userId = user.userId;
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.userId);
    },
    changeInfo(state, user) {
      state.userName = user.userName;
      state.userPhone = user.userPhone;
      state.userEmail = user.userEmail;
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
        axios({
          url: '/user/login',
          method: 'post',
          params: {
            loginName: user.username,
            password: user.password
          }
        }).then(res=>{
          resolve(res.data)
          // store.commit('changeLogin', { token: res.data.token, userId: res.data.userId });
        }).catch(err=>console.log(err))
      });

      let getLoginInfo = new Promise((resolve, reject) => {
        axios({
          url: `/user/${store.getters.getUserId}`,
          method: 'get',
          header: {
            token: store.getters.getToken,
          }
        }).then(res=>{
          resolve(res.data)
        }).catch(err=>console.log(err))
      })

      getLoginToken.then(data=>{
        store.commit('changeLogin', { token: data.token, userId: data.userId });
        return getLoginInfo;
      }).then(data=>{
        store.commit('changeInfo', { userName: data.userName, userEmail: data.userEmail, userPhone: data.userPhone });
      }).catch(err=>console.log(err))
    },

    // 注册
    register(state, user) {
      this.$ajax({
        url: '/user/add',
        method: 'post',
        params: {
          email: user.email,
          password: user.password,
          phone: user.phone,
          username: user.username
        }
      }).then(res=>{
        store.commit('changeLogin', { token: res.data.token, userId: res.data.userId });
      }).catch(err=>console.log(err))
    },

    // 修改信息
    revise(state, user) {
      this.$ajax({
        url: `/user/${store.getters.getUserId}`,
        method: 'put',
        params: {
          createAt: '',
          email: user.email,
          headUrl: user.headUrl,
          password: user.password,
          phone: user.phone,
          role: '',
          updateAt: '',
          username: user.userName,
        },
        header: {
          token: store.getters.getToken
        }
      }).then(res=>{
        store.commit('changeInfo', {})
        this.$messagebox.alert('修改成功').then(action => {
          this.$router.push({
            path: '/center'
          })
        });
      }).catch(err=>console.log(err))
    },

    // 修改密码
    resetPwd(state, user) {
      this.$ajax({
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
        this.$messagebox.alert('修改成功').then(action => {
          this.$router.push({
            path: '/center'
          })
        });
      }).catch(err=>console.log(err))
    },

    // 获取交流人
    char(state){
      this.$ajax({
        url: `/charinfo/char/${store.getters.getUserId}`,
        method: 'get',
        header: {
          token: store.getters.getToken
        },
        params: {
          pageNum: 1,
          pageSize: 10
        }
      }).then(res=>{
        store.commit('changeChar', {  });
      }).catch(err=>console.log(err))
    },
  }
});

export default store