<template>
  <div id="app" @click="done()">
    <router-view />
    <mt-tabbar id="tabbar" v-model="selected" fixed v-if="tabBar">
      <mt-tab-item id="home" data-name="home" @click.native="showHome">
        <img slot="icon" src="./assets/imgs/tabbar/home.png" v-show="chooseH">
        <img slot="icon" src="./assets/imgs/tabbar/unHome.png" v-show="!chooseH">
        首页
      </mt-tab-item>
      <mt-tab-item id="session" data-name="session" @click.native="showSession">
        <img slot="icon" src="./assets/imgs/tabbar/session.png" v-show="chooseS">
        <img slot="icon" src="./assets/imgs/tabbar/unSession.png" v-show="!chooseS">
        咨询会话
      </mt-tab-item>
      <mt-tab-item id="forum" data-name="forum" @click.native="showForum">
        <img slot="icon" src="./assets/imgs/tabbar/forum.png" v-show="chooseF">
        <img slot="icon" src="./assets/imgs/tabbar/unForum.png" v-show="!chooseF">
        心理论坛
      </mt-tab-item>
      <mt-tab-item id="center" data-name="center" @click.native="showCenter">
        <img slot="icon" src="./assets/imgs/tabbar/center.png" v-show="chooseC">
        <img slot="icon" src="./assets/imgs/tabbar/unCenter.png" v-show="!chooseC">
        个人中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import chat from 'util/session.js'

export default {
  name: 'App',
  data(){
    return{
      selected: 'home',
      chooseH: true,
      chooseS: false,
      chooseF: false,
      chooseC: false,
      tabBar: true,
      clickTime: null,
      lastTime: null,
    }
  },
  methods: {
    unShow(){
      this.chooseH = false;
      this.chooseS = false;
      this.chooseF = false;
      this.chooseC = false;
    },
    showHome(){
      this.unShow();
      if(!this.chooseH) this.chooseH = true;
      else this.chooseH = false;
    },
    showSession(){
      this.unShow();
      if(!this.chooseS) this.chooseS = true;
      else this.chooseS = false;
    },
    showForum(){
      this.unShow();
      if(!this.chooseF) this.chooseF = true;
      else this.chooseF = false;
    },
    showCenter(){
      this.unShow();
      if(!this.chooseC) this.chooseC = true;
      else this.chooseC = false;
    },
    switchTab(ele){
      switch(ele){
        case 'home':
          this.showHome();break;
        case 'session':
          this.showSession();break;
        case 'forum':
          this.showForum();break;
        case 'center':
          this.showCenter();break;
      };
    },
    showTab(to,from){
      if(to.path == '/' || to.path == '/home' || to.path == '/session' || to.path == '/forum' || to.path == '/center'){
        this.tabBar = true
      }else{
        this.tabBar = false;
      }
    },
    done(){
      this.clickTime = new Date().getTime();
      if(this.clickTime - this.lastTime > 1800000){
        this.$store.commit('changeLogin', { token: '', userId: ''});
        this.$router.push({
          path: '/login'
        })
      }else{
        this.lastTime = new Date().getTime();
      }
      console.log(this.clickTime)
    },
  },
  watch: {
    selected(newV, oldV){
      this.$router.push({
        name: newV
      })
      window.sessionStorage.setItem('tabSelect', newV);
    },

    // 监听路由变化
    $route(to, from){
      this.showTab(to, from);
      if(this.tabBar){
        this.selected = to.name;
      }
      this.switchTab( this.selected )
    }
  },
  mounted() {
    this.selected = window.sessionStorage.getItem('tabSelect');
    this.switchTab( this.selected )
    this.showTab(this.$router.history.current);
  },
  created() {
    this.lastTime = new Date().getTime();
  }
}
</script>

<style>
  #header{
    background-color: #ccc;
  }

  #tabbar{
    background-color: #fff;
  }

  #app{
    padding: 0 0 55px;

  }
  .mint-tabbar a .mint-tab-item-label{
    font-size: 0.7rem;
  }
  .mint-tabbar a .mint-tab-item-icon img{
    width: 22px;
  }
</style>
