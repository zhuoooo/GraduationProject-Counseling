<template>
  <div class="release">
    <mt-header title="发送帖子" fixed>
      <router-link to="/forum" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!-- <router-link to=""> -->
        <mt-button slot="right" @click="release">发布</mt-button>
      <!-- </router-link> -->
    </mt-header>
    <form>
      <mt-field placeholder="标题" v-model="title"></mt-field>
      <mt-field placeholder="内容" type="textarea" v-model="content"></mt-field>
    </form>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        title: '',
        content: ''
      }
    },
    methods: {
      release(){
        this.$ajax({
          url: '/article',
          method: 'post',
          header: {
            token: this.$store.getters.getUserToken
          },
          params: {
            content: this.copntent,
            title: this.title,
            createAt: new Date(),
            postId: '',
            updateAt: new Date(),
            userId: this.$store.getters.getUserId
          }
        }).then(res=>{
          this.$toast('发帖成功');
          this.$router.push({
            path: '/forum'
          })
        }).catch(err=>console.log(err))
      }
    },
    mounted() {
      let wH = window.screen.height + 'px';
      document.querySelector('body').setAttribute('style', 'background: #fff;')
      document.querySelector('#app').setAttribute('style', 'padding: 0;height:' + wH)
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
      document.querySelector('#app').removeAttribute('style')
    }
  }
</script>

<style scoped>
  .release{
    display: flex;
    position: relative;
    height: 100%;
    flex-direction: column;
    margin-top: 50px;
  }
  .release >>> .mint-header{
    color: #3e3e3e;
    font-size: 0.9rem;
    background-color: #fbfbfb;
  }
  .release >>> .mint-header-button.is-right button{
    background-color: #1c9bfc;
    color: #fff;
    padding: 0 13px;
    height: 28px;
  }
  .release form{
    padding: 0 0 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .release >>> .mint-button{
    height: 100%;
    font-size: 0.8rem;
    line-height: 25px;
  }

  .release >>> .is-textarea,
  .release >>> .is-textarea div{
    height: 100%;
  }
  .release >>> .mint-cell-wrapper{
    background-image: none;
    font-size: 0.9rem;
  }
  .release >>> .mint-cell-wrapper textarea{
    font-size: 1rem;
    height: 100%;
  }
</style>

