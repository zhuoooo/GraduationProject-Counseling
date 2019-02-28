<template>
  <div class="center">
    <div class="photo">
      <img @click="aaa" src="../../../../static/imgs/userphoto.png" alt="userphoto">
    </div>
    <div class="info">
      <ul>
        <li>
          <router-link :to="{path: '/center/revise', query: {value: 'userName'}}" class="router">
            <div class="title">
              <span class="info">用户名：</span>
              <span class="value" >{{userInfo.userName}}</span>
            </div>
            <div class="alt">></div>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/center/revise', query: {value: 'phone'}}" class="router">
            <div class="title">
              <span class="info">手机号：</span>
              <span class="value">{{ userInfo.phone }}</span>
            </div>
            <div class="alt">></div>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/center/revise', query: {value: 'email'}}" class="router">
            <div class="title">
              <span class="info">邮箱：</span>
              <span class="value">暂未绑定</span>
            </div>
            <div class="alt">></div>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/center/revise', query: {value: 'password'}}" class="router">
            <div class="title">
              <span class="info">密码修改</span>
            </div>
            <div class="alt">></div>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/center/revise', query: {value: 'sugges'}}" class="router">
            <div class="title">
              <span class="info">意见反馈</span>
            </div>
            <div class="alt">></div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="button">
      <mt-button type="primary" size="normal" @click="outLogin">退出当前账户</mt-button>
    </div>
  </div>
</template>

<script>
  import store from 'util/store'
  export default {
    data(){
      return {
        userName: '',
        userInfo: {}
      }
    },
    methods: {
      aaa(){
        console.log(store)
      },
      outLogin(){
        window.localStorage.removeItem('user')
        store.OutLogin()
        console.log(store)
        this.$router.push({
          path: '/login'
        })
      }
    },
    created(){
      // this.$ajax({
      //   methods: 'post',
      //   url: '/userInfo',
      //   data: {
      //     userName: this.userName
      //   }
      // }).then((res)=>{
      //   this.userInfo = res.data
      // }).catch(err=>console.log(err))
    }

  }
</script>

<style scoped>
  .center{
    background-color: #f7f7f7;
  }

  .photo{
    padding: 35px;
    text-align: center;
  }
  .photo img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  .info li{
    font-size: 0.9rem;
    margin-bottom: 10px;
    box-sizing: border-box;
    width: 100%;
    padding: 13px;
    background-color: #fff;
  }
  .info li .router{
    display: flex;
    color: #4d4d4d;
    justify-content: space-between;
  }
  .info li .router .title{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info li .alt{
    font-weight: 100;
    transform: scale(1.2, 2.5);
  }

  .info li:last-child{
    margin-bottom: 10px;
  }

  .button{
    margin: 20px 0;
    text-align: center;
  }
  .button button{
    font-size: 0.9rem;
    padding: 0 70px;
  }

</style>