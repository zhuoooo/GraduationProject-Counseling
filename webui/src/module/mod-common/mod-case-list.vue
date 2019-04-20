<template>
  <div class="case-list-box">
    <p class="title">{{section.title}}</p>
    <section class="intro">
      {{section.content}}
    </section>
    <div class="img">
      <!-- <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4"> -->
      <!-- <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4"> -->
      <!-- <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4"> -->
    </div>
    <div class="action">
      <span>{{section.createAt | convertTime('YYYY/MM/DD')}}</span>
      <span>由 {{section.username}} 发布</span>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'mod-case-list',
    props: ['section'],
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  .case-list-box{
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
    flex-wrap: wrap;
  }
  .img img, .intro img{
    width: 32%;
    height: 100%;
    margin-top: 5px;
  }
</style>
