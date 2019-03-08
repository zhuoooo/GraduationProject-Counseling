<template>
  <div class="revise">
    <mt-header :title="title">
      <router-link to="/center" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!-- <router-link to=""> -->
        <mt-button slot="right" @click="send">发送</mt-button>
      <!-- </router-link> -->
    </mt-header>

    <div class="revise_choose">
      <mt-field type="password" v-model="feedback" placeholder="请输入反馈内容"></mt-field>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '意见反馈',
        feedback: '',
      }
    },
    methods: {
      // 点击保存修改事件
      send() {
        if(this.feedback === ''){
          this.$toast('反馈内容不能为空');
        }else{
          this.$ajax({
            url: '/feedback',
            method: 'post',
            header: {
              token: this.$store.getters.getUserToken
            },
            params: {
              content: 'this.feedback',
              createAt: '',
              feedbackId: '',
              status: '',
              updateAt: '',
              userId: this.$store.getters.getUserId
            }
          }).then(res=>{
            this.$toast('反馈成功');
            this.$router.push({
              path: '/center'
            })
          }).catch(err=>console.log(err))
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