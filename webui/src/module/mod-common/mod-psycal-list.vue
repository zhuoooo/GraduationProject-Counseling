<template>
  <li>
    <router-link :to="{name: 'psycalsection', query: {id: psycal.psychologicalId}}">
      <div>
        <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
      </div>
      <div>
        <h1>{{psycal.title}}</h1>
        <div class="intro">
          暂无介绍
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
  export default{
    name: 'mod-psycal-list',
    props: ['psycal'],
  }
</script>

<style scoped>
  li{
    margin-top: 10px;
    background-color: #fbfbfb;
  }
  li a{
    color: #000;
    display: flex;
    align-items: center;
  }
  li a img{
    width: 80px;
    margin: 10px 15px 10px 10px;
  }
  li a h1{
    font-size: 1rem;
  }
  li a .intro{
    color: #666;
    overflow: hidden;
    line-height: 1.5;
    margin: 0 0 5px;
    padding: 5px;
    font-size: 0.8rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>