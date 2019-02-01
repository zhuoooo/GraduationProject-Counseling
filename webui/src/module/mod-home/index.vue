<template>
  <div class="home">
    <!-- 轮播 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(img,index) in imgs" :key="index">
        <img :src="img.img">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 导航 -->
    <ul class="navbar">
      <li v-for="item in navbar" :key="item.id">
        <router-link :to="item.url">
          <img :src="item.image">
          <div>{{item.title}}</div>
        </router-link>
      </li>
    </ul>

    <!-- 主页内容列表部分 -->
    <div class="home-list">
      <div class="title">
        <div class="right">
          <img src="">
          <span>专家推荐</span>
        </div>
        <div class="left">
          <router-link to="expert/list">更多 ></router-link>
        </div>
      </div>
      <div class="content">
        <mod-home-list :experts="experts"></mod-home-list>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 首页
   */
  export default {
    name: "index",
    data () {
      return {
        imgs: [], //轮播图数据
        navbar: [],
        experts: [
          {
            "id": 1,
            "name": "李红",
            "rank": "博士",
            "number": 123,
            "photo": "https://avatars2.githubusercontent.com/u/39826728?s=460&v=4"
          }
        ]
      }
    },
    created () {
      this.$ajax.get('/swipe')
      .then(res=>{
        this.imgs = res.data.data.swipe
        console.log(this.imgs)
      })
      this.$ajax.get('/navbar/4')
      .then(res=>{
        this.navbar = res.data.data.navbar
        console.log(res.data.data.navbar)
      })
      this.$ajax.get('/expert/4')
      .then(res=>{
        this.experts = res.data.data.experts
      })
    },
  }
</script>

<style scoped>
  .home{
    background-color: #f7f7f7;
  }
  .mint-swipe{
    height: 150px;
  }
  .mint-swipe img{
    width: 100%;
    height: 100%;
  }
  .home >>> .mint-swipe-indicators .mint-swipe-indicator{
    background-color: transparent;
    opacity: .8;
    width: 7px;
    height: 7px;
    border: 1px solid #fff;
  }
  .home >>> .mint-swipe-indicators .is-active{
    background-color: #fff;
  }
  .navbar{
    display: flex;
    text-align: center;
    justify-content: space-around;
    background-color: #fff;
    padding: 20px 0;
  }
  .navbar li{
    flex: 1;
  }
  .navbar li a{
    color: #3e3c3d;
    font-size: 0.9rem;
  }
  .navbar li a img{
    width: 25px;
    height: 25px;
  }

  .home-list{
    margin-top: 10px;
    background: #fff;
  }
  .title{
    padding: 10px 20px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
  }
  .title .right{
    color: #3e3c3d;
    font-weight: 600;
  }
  .title .left a{
    color: #7f7f80;
  }

</style>
