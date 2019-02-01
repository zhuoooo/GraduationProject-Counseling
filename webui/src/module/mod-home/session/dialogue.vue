<template>
  <div class="dialogue">
    <mt-header :title="name">
      <router-link to="/session" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/session" slot="right">
        <mt-button>
          <img src="../../../../static/imgs/tabbar/unCenter.png">
        </mt-button>
      </router-link>
    </mt-header>

    <div class="dialogue_index">
      <ul>
        <li>
          <div class="time">2018/12/29 12:12</div>
          <ul>
            <li class="left">
              <div class="photo">
                <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
              </div>
              <div class="text"></div>
            </li>
            <li class="right">
              <div class="photo">
                <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
              </div>
              <div class="text">12312312311fdsafdsaf范德萨发到付</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="bottom">
      <form onsubmit="return false;">
        <mt-field placeholder="" type="textarea" rows="1" v-model="introduction"></mt-field>
        <input type="submit" value="发送" class="submit">
      </form>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        name: this.$route.query.dialogueUser,
        introduction: '',
      }
    },
    create(){
      /**
       * 这里接收交谈的内容
       */
      this.$ajax({

      }).then(res=>{
        
      })
    },
    methods: {
      
    },
    mounted() {
      let wH = window.screen.height + 'px';
      document.querySelector('body').setAttribute('style', 'height:' + wH)
      document.querySelector('#app').setAttribute('style', 'padding: 0;height:' + wH)
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
      document.querySelector('#app').removeAttribute('style')
    }
  }
</script>

<style scoped>
  .dialogue >>> .mint-header{
    color: #3e3e3e;
    font-size: 0.9rem;
    background-color: #fff;
  }
  .dialogue >>> .mint-header-button.is-right button{
    padding: 0 13px;
    height: 28px;
  }
  .dialogue >>> .mint-header-button.is-right button img{
    height: 18px;
  }

  .dialogue_index{
    padding: 10px;
  }
  .dialogue_index .time{
    width: fit-content;
    margin: 0 auto;
    font-size: 0.8rem;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    background-color: #d6d7d8;
  }
  .dialogue_index ul li ul li{
    margin-top: 20px;
  }
  .dialogue_index ul li.left{
    display: flex;
  }
  .dialogue_index ul li img{
    width: 45px;
    height: 45px;
    border-radius: 7px;
  }
  .dialogue_index ul li .text{
    padding: 10px;
    word-break: break-all;
    color: #8e8b8b;
    font-size: 0.9rem;
    background-color: #fff;
    margin: 0 15px;
    border-radius: 7px;
  }

  .dialogue_index ul li.right{
    display: flex;
    flex-direction: row-reverse;
  }

  .bottom{
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .bottom >>> .mint-field-core{
    font-size: 0.9rem;
  }
  .bottom >>> .mint-cell{
    min-height: 30px;
    width: calc(100% - 65px);
  }
  .bottom .submit{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background-color: skyblue;
    border: none;
    padding: 0 20px;
  }
</style>