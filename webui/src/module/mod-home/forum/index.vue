<template>
  <div class="forum">
    <form class="search" onsubmit="return false;">
      <input type="search" name="search" placeholder="请输入关键词搜索话题" @focus="search">
      <button @click="release">
        <img src="../../../../static/imgs/write.png">
      </button>
    </form>
    <ul>
      <li v-for="section in sections" :key="section.id">
        <router-link :to="{path: '/forum/section', query: {id: section.id}}">
          <mod-comm-list :id="section"></mod-comm-list>
        </router-link>
      </li>
      <li>
        <mod-comm-list></mod-comm-list>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        result: [
          {'title':'1', 'value': '11'},
          {'title':'2', 'value': '22'},
          {'title':'3', 'value': '33'},
          {'title':'4', 'value': '44'},
          {'title':'5', 'value': '55'},
          {'title':'6', 'value': '66'},
        ],
        sections: [
          {
            'id': 2,
            'title': '标题1',
            'content': '焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑焦虑',
            'commentNumber': 120,
            'good': 12,
            'time': '2018/01/02',
          }
        ]
      }
    },
    methods: {
      search(){
        this.$router.push({
          path: '/search'
        })
      },
      release(){
        this.$router.push({
          path: '/forum/release'
        })
      }
    }
  }
</script>

<style scoped>
  .forum{
    background-color: #f7f7f7;
  }

  .forum .search{
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
  }
  .forum .search input{
    font-size: 0.9rem;
    color: #4f4f4f;
    padding: 7px 5px 7px 25px;
    background-color: #f7f7f7;
    width: calc(100% - 35px);
    border: 0;
  }
  .forum .search::before{
    font-size: 18px;
    color: #444;
    content: "\E604";
    font-family: "mintui";
    width: 20px;
    height: 20px;
    position: absolute;
    left: 20px;
    top: 2px;
  }
  .forum .search button{
    border: 0;
    width: 30px;
    line-height: 40px;
    height: 40px;
    background-color: transparent;
  }
  .forum .search button:focus{
    outline: none;
  }
  .forum .search button img{
    width: 20px;
    height: 20px;
  }
</style>