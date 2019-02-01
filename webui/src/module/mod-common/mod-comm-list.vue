<template>
  <div class="comm-list">
    <p class="title">{{id.title}}</p>
    <section class="intro">
      {{id.content}}
    </section>
    <div class="img">
      <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
      <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
      <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
    </div>
    <div class="action">
      <span>{{id.commentNumber}}评论 · {{id.good}}赞</span>
      <span>{{id.time}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'mod-comm-list',
    props: ['id'],
    data () {
      return {
      }
    },
    created () {
      // this.$ajax({
      //   methods: 'get',
      //   url: '',
      //   data: {
      //     'id': this.section.id
      //   }
      // }).then(res=>{
      //   this.section = res.data
      // })
    }
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