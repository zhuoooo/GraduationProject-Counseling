<template>
  <div class="session">
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="../../../../static/imgs/图层2.png">
      </mt-swipe-item>
    </mt-swipe>
    <div class="session_list">
      <ul>
        <li v-for="session in sessions" :key="session.id">
          <router-link :to="{path: '/session/dialogue', query: {dialogueUser: session.name}}" class="router">
            <img :src="session.img">
            <div>
              <p class="info">
                <span class="name">{{ session.name }}</span>
                <span class="time">{{ session.lasttime }}</span>
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
  export default{
    data(){
      return {
        sessions: [
          {
            'id': '1',
            'img': 'https://avatars2.githubusercontent.com/u/39826728?s=460&v=4',
            'name': '张三',
            'lasttime': '2018/08/01',
            'content': '不用担心，我没有什么烦心事心么烦心事心么烦心事心事心'
          }
        ],
      }
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