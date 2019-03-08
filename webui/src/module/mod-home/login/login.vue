<template>
  <div class="login">
    <h1>大学生心理咨询平台</h1>
    <form onsubmit="return false;">
      <mt-field placeholder="请输入手机号或邮箱" v-model="username"></mt-field>
      <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <div class="line"></div>
      <div class="register">
        <router-link to="/register">注册新账号</router-link>
      </div>
      <div class="button">
        <mt-button type="primary" size="normal" @submit="login" @click="login">立即登录</mt-button>
      </div>
      <div class="sendreset">
        <router-link :to="{name: 'eleLogin', params: { name: 'elelogine' }}">短信登录</router-link> | 
        <router-link :to="{name: 'eleLogin', params: { name: 'forgot' }}">忘记密码?</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        username: '',
        password: '',
      }
    },
    methods: {
      login(){
        if(this.username == '' || this.password == ''){
          this.$toast('请输入完整信息');
          return
        }
        this.$store.dispatch('login', { username: this.username, password: this.password });
        this.$router.push({
          path: '/home'
        })
      },
      register(){
        this.$router.push({
          path: '/register'
        })
      }
    },
    mounted() {
      let wH = window.screen.height + 'px';
      document.querySelector('body').setAttribute('style', 'background: #fff;')
      document.querySelector('#app').setAttribute('style', 'padding: 0;height:' + wH)
      // Array.from(document.querySelectorAll('.login .mint-field input')).forEach(val=>{
      //   val.setAttribute('required', 'required');
      // })
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
  .login >>> .mint-cell-wrapper{
    background-origin: border-box;
  }
  .login >>> .mint-field input{

  }
  .login .line{
    border-bottom: 1px solid #d9d9d9;
  }
  .login >>> .mint-button{
    width: 200px;
    padding: 0 30px;
    font-size: 0.9rem;
  }
  .login .button{
    margin-top: 10px;
    text-align: center;
  }
  .login .register{
    margin-top: 5px;
    padding-right: 10px;
    text-align: right;
  }
  .login .register a{
    color: #555;
    font-size: 0.8rem;
  }
  .login .sendreset{
    margin-top: 10px;
    text-align: center;
  }
  .login .sendreset a{
    color: #555;
    font-size: 0.8rem;
  }
</style>