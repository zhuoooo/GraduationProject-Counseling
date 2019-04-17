<template>
  <div class="section" @click="getPageId">
    <mt-header title="帖子内容" fixed>
      <router-link to="/forum" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="section_index">
      <h1 class="title">{{section.title}}</h1>
      <div class="info">
        <div class="left">
          <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
          <div>
            <p class="name">{{section.userName}}</p>
            <p class="post">身份标签 | {{section.createAt | convertTime('YYYY-MM-DD')}}</p>
          </div>
        </div>
      </div>
      <div class="section_info">
        {{section.content}}
      </div>
      <div class="giveLove">
        <div class="right" @click="love">{{giveLoveNum}}</div>
      </div>
    </div>

    <div class="section_comment">
      <h1>全部评论</h1>
      <div v-if="comments.length>0">
        <div v-for="(comment,index) in comments" :key="index">
          <mod-comment :comment="comment"></mod-comment>
        </div>
      </div>
      <div class="noComment" v-else>暂无评论</div>
      <mod-comment :comment="comment" @getCommitId="getCommitId"></mod-comment>
    </div>

    <div class="section_send_comment">
      <form @submit="sendComment">
        <mt-field placeholder="谈谈你的看法" type="textarea" rows="1" v-model="commentContent" ref="textarea"></mt-field>
        <input type="submit" value="发送" class="submit" @click="sendComment">
      </form>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        id: this.$route.query.id,
        section: {},
        comments: [],
        comment: {

        },
        pageNum: 1,
        pageSize: 5,
        giveLoveNum: 0,
        commentContent: '',
        parentId: 0, // 默认评论为父评论
      }
    },
    created(){
      this.$ajax({
        url: `/article/${this.id}`,
        method: 'get'
      }).then(res=>{
        this.section = res.data.data;
        this.giveLoveNum = res.data.data.giveLikeNum;
      }).catch(err=>console.log(err))

      // 获取评论
      this.getComment();
    },
    methods: {
      // 发表评论
      sendComment(){
        // if(this.)
        this.parentId = parseInt(this.getCommitId);
        console.log(this.parentId)
        this.$ajax({
          url: '/comment',
          method: 'post',
          params: {
            commentContent: this.commentContent,
            // commentsId: 1,
            // createAt: new Date().getTime(),
            parentId: this.parentId,
            postId: this.id,
            // updateAt: new Date().getTime(),
            userId: this.$store.getters.getUserId
          }
        }).then(res=>{
          console.log('发表成功');
          this.parentId = 0;
          this.getComment();
        }).catch(err=>console.log(err))
        return false;
      },
      // 点赞
      love(e){
        if(!this.$store.getters.getToken){
          this.$toast('请先登录....');
          return;
        }
        let target = e.currentTarget;
        target.classList.toggle('love');
        if(target.classList.contains('love')){
          // 点赞数加一
          this.$ajax({
            method: 'post',
            url: '/givealike/',
            params: {
              postId: this.id,
              userId: this.$store.getters.getUserId
            }
          }).then(res=>{
            if(res.data.status != 200) {
              target.classList.toggle('love');
              this.$toast('已点过......')
            }else{
              this.giveLoveNum++;
            }
          }).catch(err=>console.log(err))
        }else{
          // 点赞数减一
          this.$ajax({
            method: 'delete',
            url: '/givealike/',
            params: {
              postId: this.id,
              userId: this.$store.getters.getUserId
            }
          }).then(res=>{
            if(res.data.status != 200) {
              target.classList.toggle('love');
              this.$toast(res.data.msg)
            }else{
              this.giveLoveNum--;
            }
          }).catch(err=>console.log(err))
        }
      },
      // 获取评论
      getComment() {
        this.$ajax({
          url: `/comment/post/${this.id}`,
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(res=>{
          console.log(res.data.data)
          this.comments = res.data.data.list;
        }).catch(err=>console.log(err))
      },
      // 获取几级父类
      getCommitId(e){
        this.parentId = e;
        document.querySelector('.section_send_comment textarea').focus();
      },
      getPageId(){
        this.parentId = 0;
        console.log(this.parentId)
      }
    }
  }
</script>

<style scoped>
  .section >>> .mint-header{
    color: #3e3e3e;
    font-size: 0.9rem;
    background-color: #fbfbfb;
  }

  .section .section_index{
    padding: 10px;
    background-color: #fff;
    margin-top: 40px;
  }
  .section .section_index h1{
    font-weight: 500;
    font-size: 1.4rem;
    margin-top: 0;
  }
  .section .section_index .info{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .section .section_index .info .left{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 0.7rem;
    color: #8e8e8e;
  }
  .section .section_index .info .left .name{
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
  }
  .section .section_index .info .left img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .section .section_index .giveLove{
    text-align: right;
  }
  .section .section_index .right{
    color: #b1b1b1;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 10px;
    position: relative;
    display: inline-block;
  }
  .section .section_index .right::before{
    top: 2px;
    content: '';
    width: 14px;
    left: 0;
    transform: translate(-130%);
    height: 16px;
    display: block;
    position: absolute;
    background: url('../../../assets/imgs/unlove.png') no-repeat center;
    background-size: 14px 16px;
  }
  .section .section_index .love{
    color: #1c9bfc;
  }
  .section .section_index .love::before{
    background: url('../../../assets/imgs/love.png') no-repeat center;
    background-size: 14px 16px;
  }

  .section .section_index .section_info{
    margin-top: 20px;
    word-break: break-all;
    font-size: 1rem;
  }
  .section .section_index .section_info img{
    width: 100%;
  }

  .section .section_comment{
    background-color: #fff;
    padding: 8px 8px 0 8px;
    margin-top: 10px;
  }
  .section .section_comment h1{
    font-size: 1rem;
    font-weight: 400;
  }
  .section .section_comment .noComment{
    text-align: center;
    padding: 0 0 15px;
  }
  .section_send_comment{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .section_send_comment .submit{
    top: 0;
    right: 0;
    border: 0;
    color: #333;
    padding: 0 15px;
    height: 100%;
    font-size: 1rem;
    background: skyblue;
    position: absolute;
  }

  .section_send_comment >>> .mint-cell-wrapper{
    /* font-size: 1.1rem; */
  }
</style>