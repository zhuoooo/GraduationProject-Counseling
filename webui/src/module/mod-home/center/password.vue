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
      <mt-field type="password" v-model="oldPwd" placeholder="请输入原密码"></mt-field>
      <mt-field type="password" v-model="newPwd" placeholder="请输入新密码"></mt-field>
      <mt-field type="password" v-model="newPwd2" placeholder="再次输入新密码" @input="verify"></mt-field>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '修改密码',
        oldPwd: '',
        newPwd: '',
        newPwd2: '',
      }
    },
    methods: {
      verify() {
        console.log(11)
      },
      // 点击保存修改事件
      revise() {
        if(this.newPwd !== this.newPwd2){
          this.$toast('密码不一致');
          return;
        }else if(this.oldPwd !== this.$store.getters.getUserPwd) {
          console.log(this.$store.getters.getUserPwd)
          this.$toast('原密码错误')
        }else{
          this.$store.dispatch('resetPwd', { password: this.newPwd });
        }
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
  }
  .revise .revise_choose,
  .revise .revise_choose >>> a,
  .revise .revise_choose >>> div{
    background: transparent;
    border: none;
  }
  .revise >>> .mint-field-core{
    font-size: 0.9rem;
    padding-left: 10px;
    border-bottom: 1px solid #1c9bfc;
    background-color: transparent;
  }
</style>