<template>
  <div class="dialogue">
    <mt-header :title="name" fixed>
      <span slot="left">
        <mt-button icon="back" @click="goback"></mt-button>
      </span>
    </mt-header>

    <div class="dialogue_index">
      <mt-loadmore :auto-fill="false" :top-method="loadTop" ref="loadmore" topPullText=" " topDropText=" ">
        <ul class="dialogue__content" ref="char">
          <!--<li>
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
          </li>-->
          <li v-for="msg of charListBySort" :class="sender(msg)">
            <div class="photo">
              <img src="./imgs/userphoto.png">
            </div>
            <div class="username common-color-gray">{{msg.senderUsername}}</div>
            <div class="text">{{msg.chatContent}}</div>
          </li>

        </ul>
      </mt-loadmore>
    </div>

    <div class="bottom">
      <form onsubmit="return false;">
        <mt-field placeholder="" type="textarea" rows="1" v-model="introduction"></mt-field>
        <input type="submit" value="发送" class="submit" @click="send">
      </form>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        name: this.$route.query.username,
        introduction: '',
        userId: this.$store.getters.getUserId,
        theSenderId: this.$route.params.theSenderId,
        theReceiveId: this.$route.params.theReceiveId,
        connectID: `${this.$route.params.theSenderId}_to_${this.$route.params.theReceiveId}`,
        pageNum: 1,
        pageSize: 999,
        charList: []
      }
    },

    created () {
      /**
       * 这里接收交谈的内容
       */
      this.refreshCharContent();
      this.connect();
    },

    computed: {
      sender () {
        return (msg) => {
          return {
            'right': msg.theSenderId === parseInt(this.theSenderId),
            'left': msg.theSenderId !== parseInt(this.theSenderId)
          }
        };
      },
      charListBySort () {
        return this.charList.sort((prev, next) => {
          return prev.createAt - next.createAt;
        });
      }
    },

    methods: {
      send() {
        let vm  = this,
          url = "http://47.107.52.96/chardatainfo",
          sock = new SockJS(url),
          stomp = Stomp.over(sock);

        let payload = JSON.stringify({
          chatContent: vm.introduction,
          theSenderId: vm.theSenderId,
          theReceiveId: vm.theReceiveId
        });
        stomp.connect({name: 'zqh'}, function(frame) {
          stomp.send("/app/char",{}, payload);
          // vm.refreshCharContent();
          vm.charList.push({
            chatContent: vm.introduction,
            theSenderId: vm.theSenderId,
            theReceiveId: vm.theReceiveId,
            createAt: Date.now()
          })
          vm.introduction = '';

        });
      },
      connect() {
        let vm = this,
          socket = new SockJS('http://47.107.52.96/chardatainfo'),
          stompClient = Stomp.over(socket);

        stompClient.connect({name: 'zqh'}, function (frame) {
            //订阅/topic/char地址，当服务端向此地址发送消息时，客户端即可收到。
            stompClient.subscribe('/topic/char', function (receive) {
              //收到消息时的回调方法，展示欢迎信息。
              let receiveInfo = (JSON.parse(receive.body)).data;

              if (receiveInfo.theSenderId === vm.userId) {

              } else if (receiveInfo.theReceiveId === vm.userId) {

                vm.$toast('有新的消息，请接收！')
                vm.refreshCharContent();
              }
            });
        });
      },
      loadTop(){
        this.pageLoad(this.pageNum, this.pageSize)
        this.$refs.loadmore.onTopLoaded();
      },
      refreshCharContent () {
        this.charList = [];
        this.$nextTick(() => {
          this.pageLoad(this.theSenderId, this.theReceiveId)
          this.pageLoad(this.theReceiveId, this.theSenderId)
        });
      },
      pageLoad(theSenderId, theReceiveId){
        this.$ajax({
          method: 'get',
          url: `/charinfo/info/${theSenderId}/${theReceiveId}`,
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(res=>{
          if(!res.data.data.hasNextPage){
            this.allLoaded = true;
          }
          this.charList = this.charList.concat(res.data.data.list);
        }).catch(err=>console.log(err))
      },
      goback () {
        this.$router.go(-1);
      }
    },
    mounted() {
      let wH = window.screen.height - 50 + 'px';
      document.querySelector('body').setAttribute('style', 'height:' + wH)
      document.querySelector('#app').setAttribute('style', 'padding: 0 0 40px 0;height:' + wH)
      if(document.querySelector('body .dialogue_index').offsetHeight < window.screen.height - 77){
        document.querySelector('body .dialogue_index').setAttribute('style', `height: calc(${wH} - 77px)`)
      }

      document.documentElement.scrollTop = document.querySelector('.dialogue_index').scrollHeight;
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
    box-sizing: border-box;
    overflow-y: auto;
    margin: 40px 0 0;
    height: calc(100vh - 77px);
  }
  .dialogue__content {
    padding-bottom: 45px;
  }
  .dialogue_index .time{
    width: fit-content;
    margin: 0 auto;
    font-size: 0.8rem;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    background-color: #d6d7d8;
    margin-top: 10px;
  }
  .dialogue_index>ul{
    overflow: auto;
  }
  .dialogue_index ul li{
    margin-top: 20px;
  }
  .dialogue_index ul li.left{
    display: flex;
    position: relative;
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
    margin: 20px 15px 0;
    border-radius: 7px;
  }

  .dialogue_index ul li.left .username {
    position: absolute;
    margin: 0 0 0 60px;
  }

  .dialogue_index ul li.right{
    display: flex;
    flex-direction: row-reverse;
    position: relative;
  }
  .dialogue_index ul li.right .username{

    position: absolute;
    margin: 0 0 0 -63px;
  }

  .bottom{
    width: 100%;
    position: fixed;
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
