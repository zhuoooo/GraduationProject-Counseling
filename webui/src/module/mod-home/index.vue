<template>
  <div class="home">
    <!-- 轮播 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(img,index) in imgs" :key="index">
        <img :src="img">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 导航 -->
    <ul>
      <li v-for="item in navbar" :key="item.id">
        <router-link :to="item.url">
          <img :src="item.image">
          <div>{{item.title}}</div>
        </router-link>
      </li>
    </ul>

    <!-- 主页内容列表部分 -->
    <mod-home-list></mod-home-list>

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
        navbar: []
      }
    },
    created () {
      this.$axios.get('/swipe')
      .then(res=>{
        this.imgs = res.data.data.swipe
        console.log(this.imgs)
      })

      this.$axios.get('/navbar/4')
      .then(res=>{
        this.navbar = res.data.data.navbar
        console.log(res.data.data.navbar)
      })
    }
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

  ul{
    display: flex;
    text-align: center;
    justify-content: space-around;
    background-color: #fff;
    padding: 20px 0;
  }
  li{
    flex: 1;
  }
  ul li a{
    color: #3e3c3d;
    font-size: 0.9rem;
  }
</style>
