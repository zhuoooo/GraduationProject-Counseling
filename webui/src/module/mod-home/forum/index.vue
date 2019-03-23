<template>
  <div class="forum">
    <form class="search" onsubmit="return false;">
      <input type="search" name="search" placeholder="请输入关键词搜索话题" @focus="search">
      <button @click="release">
        <img src="/static/imgs/write.png">
      </button>
    </form>
    <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li v-for="section in sections" :key="section.id">
          <router-link :to="{path: '/forum/section', query: {id: section.postId}}">
            <mod-comm-list :section="section"></mod-comm-list>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        sections: [],
        allLoaded: false,
        pageNum: 1,
        pageSize: 10
      }
    },
    created(){
      this.pageLoad(this.pageNum, this.pageSize)
    },
    methods: {
      search(){
        this.$router.push({
          name: 'search',
          params: {search: 'forum'}
        })
      },
      release(){
        this.$router.push({
          path: '/forum/release'
        })
      },
      pageLoad(pageNum, pageSize){
        this.$ajax({
          method: 'get',
          url: '/article/all',
          params: {
            pageNum: pageNum,
            pageSize: pageSize
          }
        }).then(res=>{
          this.sections = this.sections.concat(res.data.data.list);
          if(!res.data.data.hasNextPage){
            this.$toast('没有更多数据');
            this.allLoaded = true;
          }
          this.pageNum++;
        }).catch(err=>console.log(err))
      },
      loadBottom(){
        this.pageLoad(this.pageNum, this.pageSize)
        console.log('上拉被执行')
        this.$refs.loadmore.onBottomLoaded();
      }
    }
  }
</script>

<style scoped>
  .forum{
    background-color: #f7f7f7;
    height: calc(100vh - 55px);
    overflow: scroll;
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