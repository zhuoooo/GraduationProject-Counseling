<template>
  <div class="comm-list">
    <p class="title">{{section.title}}</p>
    <section class="intro">
      {{section.content}}
    </section>
    <div class="img" v-for="(imgurl,index) in section.imagesUrl" v-if="index<=3">
      <img :src="imgurl">
    </div>
    <div class="action">
      <span>{{section.commentNum}}评论 · {{section.giveLikeNum}}赞</span>
      <span>{{section.createdAt | convertTime('YYYY/MM/DD')}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'mod-comm-list',
    props: ['section'],
    data () {
      return {
      }
    },
  }
</script>

<style scoped>
  .comm-list{
    margin-top: 10px;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #bcbcbc;
  }
  p{
    margin: 7px 0;
  }
  .title{
    color: #000;
    font-weight: 600;
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  section.intro{
    color: #4f4f4f;
    margin: 10px 0;
    font-size: 0.9rem;
    line-height: 1.7;
    text-align: justify;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .action{
    color: #4f4f4f;
    display: flex;
    font-size: 0.8rem;
    margin: 8px 0;
    justify-content: space-between;
  }
  .img{
    display: flex;
    justify-content: space-between;
  }
  .img img, .intro img{
    width: 32%;
    height: 100%;
  }
</style>