<template>
  <div class="login">
    <h1>大学生心理咨询平台</h1>
    <form onsubmit="return false;">
      <mt-field placeholder="请输入用户名" v-model="username" @input="aa"></mt-field>
      <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button type="primary" size="large" @submit="login" @click="login">登录</mt-button>
    </form>
  </div>
</template>

<script>
  import store from 'util/store'
  export default{
    data(){
      return{
        username: 'aaa',
        password: 'aaa',
      }
    },
    methods: {
      aa(){
        console.log(store)
      },
      login(){
        // this.$ajax({
        //   method: 'post',
        //   url: '',
        //   data: {
        //     username: this.username,
        //     password: this.password
        //   }
        // }).then(res=>{
        //   this.$router.push({
        //     path: '/home'
        //   })
        // })
        let user = {
          userName: this.username
        }
        window.localStorage.setItem('user', user)
        store.Login()
        this.$router.push({
          path: '/home'
        })
      }
    },
    mounted() {
      let wH = window.screen.height + 'px';
      document.querySelector('body').setAttribute('style', 'background: #fff;')
      document.querySelector('#app').setAttribute('style', 'padding: 0;height:' + wH)
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
      document.querySelector('#app').removeAttribute('style')
    }
  }
</script>

<style scoped>
  .login{
    padding: 20px 0;
  }
  h1{
    color: #3e3e3e;
    margin: 20px 0;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }
</style>