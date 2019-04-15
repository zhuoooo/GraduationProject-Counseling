<template>
  <div class="center">
    <div class="photo">
      <img src="./imgs/userphoto.png" alt="userphoto" @click="turnPhoto">
      <!-- <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet> -->
    </div>
    <div class="info">
      <ul>
        <li>
          <router-link to="/center/revise" class="router">
            <div class="title">
              <span class="info">用户名：</span>
              <span class="value" >{{ userName }}</span>
            </div>
            <div class="alt">></div>
          </router-link>
        </li>
        <li>
          <router-link to="/center/revise" class="router">
            <div class="title">
              <span class="info">手机号：</span>
              <span class="value">{{ userPhone }}</span>
            </div>
            <div class="alt">></div>
          </router-link>
        </li>
        <li>
          <router-link to="/center/revise" class="router">
            <div class="title">
              <span class="info">邮箱：</span>
              <span class="value">{{ userEmail }}</span>
            </div>
            <div class="alt">></div>
          </router-link>
        </li>
        <li>
          <router-link to="/center/password" class="router">
            <div class="title">
              <span class="info">密码修改</span>
            </div>
            <div class="alt">></div>
          </router-link>
        </li>
        <li>
          <router-link to="/center/feedback" class="router">
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
  export default {
    data() {
      return {
        userName: this.$store.getters.getUserName,
        userPhone: this.$store.getters.getUserPhone,
        userEmail: this.$store.getters.getUserEmail,
        // sheetVisible: false,
        // actions: [
        //   {
        //     name: '拍照',
        //     method: ()=>{
        //       console.log("调用拍照")
        //       plus.gallery.pick(function(e) {
        //         let name = e.substr(e.lastIndexOf('/') + 1);
        //         compressImage(e,name);
        //       }, function(e) {
        //       }, {
        //         filter: "image"
        //       });
        //     }
        //   },
        //   {
        //     name: '从相册中选择'
        //   }
        // ]
      }
    },
    methods: {
      outLogin() {
        this.$store.commit('changeLogin', { token: '', userId: ''});
        this.$router.push({
          path: '/login'
        })
      },
      turnPhoto(){
        // this.sheetVisible = true;
      }
    },
    created(){
      if(!(this.userName && this.userPhone && this.userEmail)){
        this.$ajax({
          url: '/user/' + this.$store.getters.getUserId,
          method: 'get',
        }).then(res=>{
          this.userName = res.data.data.username;
          this.userPhone = res.data.data.phone;
          this.userEmail = res.data.data.email;
          this.$store.commit('changeInfo', { userName: res.data.data.username, userEmail: res.data.data.email, userPhone: res.data.data.phone, createAt: res.data.data.createAt, role: res.data.data.role });
        }).catch(err=>console.log(err))
      }
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