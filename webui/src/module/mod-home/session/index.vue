<template>
  <div class="session">
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="./imgs/top.png">
      </mt-swipe-item>
    </mt-swipe>
    <div class="session_list">
      <ul>
        <li v-for="session in sessions" :key="session.id">
          <router-link :to="{ name: 'dialogue', params: { theSenderId: userId, theReceiveId: session.theReceiveId}, query: {username: session.receiveUsername}}" class="router">
            <img src="./imgs/userphoto.png">
            <div>
              <p class="info">
                <span class="name">{{ session.receiveUsername }}</span>
                <span class="time">{{ session.senderUsername }}</span>
              </p>
              <p class="content">{{ session.content }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import chat from 'util/session.js'
  export default{
    data(){
      return {
        sessions: [],
        pageSize: 8,
        pageNum: 1,
        userId: this.$store.getters.getUserId
      }
    },
    created() {
      this.$ajax({
        url: `/charinfo/char/${this.$store.getters.getUserId}`,
        method: 'get',
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res=>{
        this.sessions = res.data.data.list;
      })
      this.sessions = this.$store.getters.getCharInfo;
    }
  }
</script>

<style scoped>
  .session{
    background-color: #f7f7f7;
  }
  .mint-swipe{
    width: 100%;
    height: 120px;
  }
  .mint-swipe img{
    width: 100%;
    height: 100%;
  }

  .session_list ul{
    margin-top: 7px;
  }
  .session_list ul li .router{
    padding: 7px;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #f2f2f2;
  }
  .session_list img{
    width: 50px;
    height: 50px;
    margin-right: 7px;
  }
  .session_list div{
    width: calc(100% - 60px);
  }
  .session_list .info{
    display: flex;
    margin: 0;
    justify-content: space-between;
  }
  .session_list .info .name{
    color: #3c3c3c;
    font-size: 1.1rem;
    display: block;
  }
  .session_list .info .time{
    color: #7f7f80;
    font-size: 0.8rem;
  }
  .session_list .content{
    color: #a0a0a0;
    width: 100%;
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

</style>
