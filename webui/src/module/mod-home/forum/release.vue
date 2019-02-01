<template>
  <div class="release">
    <mod-header title="发布帖子">
      <mt-button type="primary" size="small">发布</mt-button>
    </mod-header>

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

