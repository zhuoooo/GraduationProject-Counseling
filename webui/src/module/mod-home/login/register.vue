<template>
  <div class="register">
    <h1>大学生心理咨询平台</h1>
    <form onsubmit="return false;">
      <mt-field placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
      <mt-field placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <div class="line"></div>
      <div class="button">
        <mt-button type="primary" size="normal" @submit="register" @click="register">注册并登陆</mt-button>
      </div>
    </form>
  </div>
</template>

<script>
  // import store from 'util/store'
  export default{
    data(){
      return{
        email: '',
        password: '',
        phone: '',
        username: '',
      }
    },
    methods: {
      register(){
        if(this.username == '' || this.password == ''){
          this.$toast('请输入完整信息');
          return
        }
        this.$store.dispatch('register', { username: this.username, password: this.password, email: this.email, phone: this.phone });
      }
    },
    mounted() {
      let wH = window.screen.height + 'px';
      document.querySelector('body').setAttribute('style', 'background: #fff;')
      document.querySelector('#app').setAttribute('style', 'padding: 0;height:' + wH)
      Array.from(document.querySelectorAll('.login .mint-field input')).forEach(val=>{
        val.setAttribute('required', 'required');
      })
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
      document.querySelector('#app').removeAttribute('style')
    }
  }
</script>

<style scoped>
  .register{
    padding: 20px 0;
  }
  h1{
    color: #3e3e3e;
    margin: 20px 0;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }
  .register >>> .mint-cell-wrapper{
    background-origin: border-box;
  }
  .register .line{
    border-bottom: 1px solid #d9d9d9;
  }
  .register >>> .mint-button{
    padding: 0 30px;
    font-size: 0.9rem;
  }
  .register .button{
    margin-top: 20px;
    text-align: center;
  }
</style>