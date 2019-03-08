<template>
  <div class="comment">
    <div class="info">
      <div class="img">
        <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
      </div>
      <div class="comment_content">
        <div class="content_info">
          <div>
            <p class="name">第二楼楼主</p>
            <p class="post">第二楼 | 2019-01-01</p>
          </div>
          <div class="right" @click="love">128</div>
        </div>
        <div class="content_user">给对方是否觉得萨里看风景的上课了房间里</div>
        <div class="content_other">
          <router-link to="">楼中楼第一楼：</router-link>
          <span>1111111111111111111111111111111111111111111111111111111111</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'mod-comment',
    props: ['comment'],
    data () {
      return {
        otherComment: [],
        pageNum: 1,
        pageSize: 5
      }
    },
    created () {
      this.$ajax({
        url: `/comment/parentId/${comment.id}`,
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res=>{
        this.otherComment = res.data
      }).catch(err=>console.log(err))
    },
    methods: {
      // love(e){
      //   e.currentTarget.classList.toggle('love');
      //   if(!e.currentTarget.classList.contains('love')){
      //     // 点赞数加一
      //     this.$ajax({
      //       method: 'post',
      //       url: '/givelike/',
      //       params: {
      //         postId: '',
      //         userId: ''
      //       }
      //     }).then(res=>{}).catch(err=>console.log(err))
      //   }else{
      //     // 点赞数减一
      //     this.$ajax({
      //       method: 'delete',
      //       url: '/givelike/',
      //       params: {
      //         postId: '',
      //         userId: ''
      //       }
      //     }).then(res=>{}).catch(err=>console.log(err))
      //   }
      // }
    }
  }
</script>

<style scoped>
  .comment{
    padding: 8px 5px;
    border-bottom: 1px solid #eee;
  }
  .comment .info{
    display: flex;
    justify-content: space-between;
  }
  .comment .info .img img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 5px 10px 0 0;
  }
  .comment .info .comment_content{
    width: calc(100% - 50px);
  }
  .comment .info .comment_content .post{
    font-size: 0.7rem;
    color: #8e8e8e;
  }
  .comment .info .comment_content .name{
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
  }
  .comment .info .content_info{
    display: flex;
    justify-content: space-between;
  }
  .comment .info .right{
    color: #b1b1b1;
    cursor: pointer;
    font-size: 0.8rem;
    position: relative;
  }
  .comment .info .right::before{
    content: '';
    position: absolute;
    width: 14px;
    left: -100%;
    height: 16px;
    display: block;
    background: url('/static/imgs/unlove.png') no-repeat center;
    background-size: 14px 16px;
  }
  .comment .info .love{
    color: #1c9bfc;
  }
  .comment .info .love::before{
    background: url('/static/imgs/love.png') no-repeat center;
    background-size: 14px 16px;
  }
  .comment .info .comment_content .content_other,
  .comment .info .comment_content .content_user{
    font-size: 0.9rem;
    margin: 5px 0 10px;
    word-break:break-all;
  }
  .comment .info .comment_content .content_other{
    background-color: #f5f5f5;
    padding: 8px 8px;
    font-size: 0.8rem;
    color: #3f3f3f;
  }
  .comment .info .comment_content .content_other a{
    color: #2d64b3;
  }
</style>