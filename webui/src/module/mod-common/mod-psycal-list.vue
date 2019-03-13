<template>
  <li>
    <router-link to="/">
      <div>
        <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
      </div>
      <div>
        <h1>心理测试</h1>
        <div class="intro">
          简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
  export default{
    name: 'mod-psycal-list',
  }
</script>

<style scoped>
  li{
    margin-top: 10px;
    background-color: #fbfbfb;
  }
  li a{
    display: flex;
    color: #000;
  }
  li a img{
    width: 80px;
    margin: 10px 15px 10px 10px;
  }
  li a h1{
    font-size: 1rem;
  }
  li a .intro{
    font-size: 0.8rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>