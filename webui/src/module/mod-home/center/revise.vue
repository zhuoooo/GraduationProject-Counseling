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
      <mt-field v-for="(placeholder, index) in placeholderArr" :key="index" :placeholder="placeholder" :type="type" v-model="value"></mt-field>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        type: this.$route.query.value,
        placeholderArr: [],
        title: '',
        value: '',
        userInfo: {}
      }
    },
    created(){
      console.log(this.type);
      switch( this.type ){
        case 'userName':
          this.userName();break;
        case 'phone':
          this.phone();break;
        case 'email':
          this.email();break;
        case 'password':
          this.password();break;
        case 'sugges':
          this.sugges();break;
      };
      this.$ajax({
        methods: 'post',
        url: '/userInfo',
        data: {
          userName: this.userName
        }
      }).then((res)=>{
        this.userInfo = res.data
      })
    },
    methods: {
      // 点击保存修改事件
      revise(){
        let that = this;
        this.$ajax({
          methods: 'post',
          url: '',
          data: {
            type: that.type,
            value: that.value,
            // id: 传改用户的唯一标识
          }
        }).then((res)=>{
          this.$messagebox.alert('操作成功').then(action => {
            this.$router.push({
              path: '/center'
            })
          });
        }).catch((err)=>{
          this.$messagebox.alert('修改失败');
        })
      },


      userName(){
        this.title = '更改用户名';
        this.placeholderArr = ['请输入用户名'];
        this.value = this.userInfo.userName ? this.userInfo.userName : '';
      },
      phone(){
        this.title = '更改手机号';
        this.placeholderArr = ['请输入手机号'];
        this.value = this.userInfo.phone ? this.userInfo.phone : '';
      },
      email(){
        this.title = '绑定邮箱';
        this.placeholderArr = ['请输入邮箱'];
        this.value = this.userInfo.email ? this.userInfo.email : '';
      },
      password(){
        this.title = '修改密码';
        this.placeholderArr = ['请输入您的原密码', '请输入您的新密码', '请再次输入您的新密码'];
      },
      sugges(){
        this.title = '意见反馈';
        this.placeholderArr = ['请输入您的意见'];
      }
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