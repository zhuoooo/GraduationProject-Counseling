<template>
  <div class="revise">
    <mt-header :title="title">
      <router-link to="/center" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!-- <router-link to=""> -->
        <mt-button slot="right" @click="revise">保存</mt-button>
      <!-- </router-link> -->
    </mt-header>

    <div class="revise_choose">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" disabled type="tel" v-model="phone"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" disabled type="email" v-model="email"></mt-field>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '修改信息',
        username: this.$store.getters.getUserName,
        phone: this.$store.getters.getUserPhone,
        email: this.$store.getters.getUserEmail,
      }
    },
    methods: {
      // 点击保存修改事件
      revise(){
        this.$store.dispatch('revise', { email: this.email, username: this.username, phone: this.phone })
      },
    }
  }
</script>

<style scoped>
  .revise{
    /* height: 100%; */
    /* background-color: #fff; */
  }
  .revise >>> .mint-header{
    color: #3e3e3e;
    font-size: 0.9rem;
    background-color: #fbfbfb;
  }
  .revise >>> .mint-header-button.is-right button{
    background-color: #1c9bfc;
    color: #fff;
    padding: 0 13px;
    height: 28px;
  }

  .revise .revise_choose{
    padding: 20px 0;
    font-size: 0.9rem;
  }
  /* .revise .revise_choose,
  .revise .revise_choose >>> a,
  .revise .revise_choose >>> div{
    background: transparent;
    border: none;
  } */
  .revise >>> .mint-field-core, .revise >>> .mint-cell-text{
    font-size: 0.9rem;
    /* padding-left: 10px; */
    /* border-bottom: 1px solid #1c9bfc; */
    /* background-color: transparent; */
  }
</style>
