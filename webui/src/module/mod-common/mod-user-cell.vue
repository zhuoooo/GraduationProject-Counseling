<template>
  <li class="user-cell">
    <router-link to="home" class="router">
      <div class="title">
        <span class="info">用户名：</span>
        <span class="value">hello</span>
      </div>
      <div class="alt">></div>
    </router-link>
  </li>
</template>

<script>
  export default{
    name: 'mod-user-li',
    data () {
      return {
        
      }
    },
  }
</script>

<style scoped>
  .user-cell{
    font-size: 0.9rem;
    margin-bottom: 10px;
    box-sizing: border-box;
    width: 100%;
    padding: 13px;
    background-color: #fff;
  }
  .user-cell .router{
    display: flex;
    color: #4d4d4d;
    justify-content: space-between;
  }
  .user-cell .router .title{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>