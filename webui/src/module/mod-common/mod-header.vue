<template>
  <header>
    <div class="left" @click="goback">
      <span></span>
    </div>
    <div class="title">{{title}}</div>
    <div class="right">
      <slot></slot>
    </div>
  </header>
</template>

<script>
  export default{
    name: 'mod-header',
    props: ['title'],
    data(){},
    methods: {
      goback(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  header{
    background-color: #fbfbfb;
    font-size: 0.9rem;
    color: #3e3e3e;
    display: flex;
    line-height: 1.8;
    padding: 10px;
    justify-content: space-between;
  }
  header .left, header .right{
    flex: 0.5;
    width: 50px;
    font-size: 1rem;
    text-align: left;
    font-family: "mintui" !important;
  }
  header .left span::before{
    content: "\E600";
  }
  header .right{
    text-align: right;
  }
  header .title{
    flex: 1;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 400;
  }
</style>