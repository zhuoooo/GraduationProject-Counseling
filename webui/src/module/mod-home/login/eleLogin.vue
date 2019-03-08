<template>
  <div class="eleLogin">
    <mt-header :title="name" fixed>
      <router-link to="/login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <form onsubmit="return false;">
      <mt-field placeholder="请输入手机号" v-model="phone"></mt-field>
      <mt-field placeholder="请输入新密码" type="password" v-model="password" v-if="this.$route.params.name==='forgot'"></mt-field>
      <mt-field placeholder="请输入验证码" v-model="sms" class="sms">
        <mt-button type="primary" size="normal" @click="getCode">{{ smstext }}</mt-button>
      </mt-field>
      <div class="line"></div>
      <div class="button">
        <mt-button type="primary" size="normal" @submit="this.$route.params.name==='forgot'? reset : login" @click="this.$route.params.name==='forgot'? reset : login">{{ btntext }}</mt-button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .eleLogin >>> .mint-header{
    color: #3e3e3e;
    font-size: 0.9rem;
    background-color: #fff;
  }
  .eleLogin >>> .mint-header-button.is-right button{
    padding: 0 13px;
    height: 28px;
  }

  .eleLogin form{
    margin-top: 60px;
  }
  .eleLogin form >>> .sms{
    
  }
  .eleLogin form >>> .mint-button{
    font-size: 0.9rem;
  }
  .eleLogin .line{
    border-bottom: 1px solid #d9d9d9;
  }
  .eleLogin .button{
    margin-top: 20px;
    text-align: center;
  }
  .eleLogin .button >>> .mint-button{
    width: 200px;
    padding: 0 30px;
    font-size: 0.9rem;
  }
</style>

<script type="text/javascript">
  export default{
    data(){
      return{
        phone: '',
        sms: '',
        password: '',
        smstext: '获取验证码',
        name: this.$route.params.name==='forgot'? '忘记密码' : '短信登录',
        btntext: this.$route.params.name==='forgot'? '重置密码' : '立即登录',
      }
    },
    methods: {
      getCode() {
        if(this.$route.params.name === 'elelogine') {
        // return new Promise((resolve, reject) => {
          this.$ajax({
            url: '/user/send',
            method: 'post',
            params: {
              phone: this.phone
            }
          }).then(res=>{
            // resolve(res.data)
            this.smstext = '已发送';
            this.sms = res.data;
          }).catch(err=>/*reject(err)*/console.log(err))
        // })
        }else{
          this.$ajax({
            url: '/user/sendreset',
            method: 'post',
            params: {
              phone: this.phone
            }
          }).then(res=>{
            // resolve(res.data)
            this.smstext = '已发送';
            this.sms = res.data;
          }).catch(err=>/*reject(err)*/console.log(err))
        }
      },

      // 重置密码
      reset() {
        this.verifysms().then(data => {
          this.$ajax({
            url: '/user/reset',
            method: 'put',
            params: {
              code: this.sms,
              password: this.password,
              phone: this.phone
            }
          }).then(res=>{
            this.$store.commit('changeLogin', { token: res.data.token, userId: res.data.userId});
            this.$toast('修改成功');
            this.$router.push({
              path: '/home'
            })
          }).catch(err=>console.log(err))
        })
      },

      login() {
        this.verifysms().then(data => {
          this.$ajax({
            url: '/user/loginsms',
            method: 'put',
            params: {
              code: this.sms,
              phone: this.phone
            }
          }).then(res=>{
            this.$store.commit('changeLogin', { token: res.data.token, userId: res.data.userId});
            this.$toast('登录成功');
            this.$router.push({
              path: '/home'
            })
          }).catch(err=>console.log(err))
        })
      },

      // 校验验证码
      verifysms() {
        return new Promise((resolve, reject) => {
          this.$ajax({
            url: '/user/verifysms',
            method: 'post',
            params: {
              phone: this.phone,
              code: this.sms
            }
          }).then(res=>{
            resolve(res.data)
            // this.$store.commit('changeLogin', { token: res.data.token, userId: res.data.userId});
          }).catch(err=>{this.$toast('验证错误');})
        })
      },
    }
  }
</script>