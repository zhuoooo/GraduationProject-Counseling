<template>
  <div class="section">
    <mod-header title="帖子内容"></mod-header>
    <div class="section_index">
      <h1 class="title">fd</h1>
      <div class="info">
        <div class="left">
          <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
          <div>
            <p class="name">用户名</p>
            <p class="post">身份标签 | 2019-01-01</p>
          </div>
        </div>
      </div>
      <div class="section_info">
        fdafdafdsfffffffffffffffffffffffffffffffffffffffffffffffffff夫
        <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
      </div>
    </div>

    <div class="section_comment">
      <h1>全部评论</h1>
      <div>
        <mod-comment></mod-comment>
        <mod-comment></mod-comment>
      </div>
    </div>

    <div class="section_send_comment">
      <form>
        <mt-field placeholder="谈谈你的看法" type="textarea" rows="1"></mt-field>
      </form>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        id: this.$router.query.id,
        section: {
          'id': 2,
          'userName': '张三',
          'title': 'title'
        }
      }
    },
    created(){
      // this.$ajax({
      //   url: '/section',
      //   method: 'get',
      //   data: {
      //     id: this.id
      //   }
      // }).then(res=>{
      //   this.section = res.data.section
      // })
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
  .section_send_comment{
    position: fixed;
    bottom: 0;
    width: 100%;

  }
  .section_send_comment >>> .mint-cell-wrapper{
    /* font-size: 1.1rem; */
  }
</style>