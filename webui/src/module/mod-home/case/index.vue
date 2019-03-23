<template>
  <div class="case">
    <form class="search" onsubmit="return false;">
      <div class="left" @click="goback">
        <span></span>
      </div>
      <input type="search" name="search" placeholder="请输入关键词搜索案例" @focus="search">
    </form>
    <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li v-for="section in sections" :key="section.psychologicalCaseId">
          <router-link :to="{path: '/case/section', query: {id: section.psychologicalCaseId}}">
            <mod-case-list :section="section"></mod-case-list>
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
        pageNum: 1,
        pageSize: 10,
        allLoaded: false,
      }
    },
    methods: {
      search(){
        this.$router.push({
          name: 'search',
          params: {search: 'case'}
        })
      },
      goback(){
        this.$router.push({
          path: '/home'
        });
      },
      loadBottom(){
        this.pageLoad(this.pageNum, this.pageSize)
        console.log('上拉被执行')
        this.$refs.loadmore.onBottomLoaded();
      },
      pageLoad(pageNum, pageSize){
        if(!this.$route.query.keywordId){
          if(!this.$store.getters.getUserToken){
            // 未登录
            this.$ajax({
              method: 'get',
              url: '/case/all',
              params: {
                pageNum: this.pageNum,
                pageSize: this.pageSize
              }
            }).then(res=>{
              this.sections = this.sections.concat(res.data.data.list);
              if(!res.data.data.hasNextPage){
                this.$toast('没有更多数据');
                this.allLoaded = true;
              }
              this.pageNum++;
            }).catch(err=>console.log(err))
          }else{
            // 登录
            this.$ajax({
              method: 'get',
              url: '/case/user/' + this.$store.getters.getUserId,
              params: {
                pageNum: this.pageNum,
                pageSize: this.pageSize
              }
            }).then(res=>{
              if(!res.data.data.hasNextPage){
                this.$toast('没有更多数据');
                this.allLoaded = true;
              }
              this.pageNum++;
            }).catch(err=>console.log(err))
          }
        }else{
          this.$ajax({
            method: 'get',
            url: '/casekeyword',
            params: {
              keyword: this.$route.query.keyword,
              pageNum: this.pageNum,
              pageSize: this.pageSize
            }
          }).then(res=>{
            if(!res.data.data.hasNextPage){
              this.$toast('没有更多数据');
              this.allLoaded = true;
            }
            this.pageNum++;
          }).catch(err=>console.log(err))
        }
      },
    },
    created(){
      this.pageLoad(this.pageNum, this.pageSize)
    },
  }
</script>

<style scoped>
  .case{
    background-color: #f7f7f7;
    height: 100vh;
  }

  .case .search{
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
  }
  .case .search input{
    font-size: 0.9rem;
    color: #4f4f4f;
    padding: 7px 5px 7px 25px;
    background-color: #f7f7f7;
    width: calc(100% - 35px);
    border: 0;
  }
  .case .search button{
    border: 0;
    width: 30px;
    line-height: 40px;
    height: 40px;
    background-color: transparent;
  }
  .case .search button:focus{
    outline: none;
  }
  .case .search button img{
    width: 20px;
    height: 20px;
  }
  .case .left{
    display: inline-block;
    flex: 0.5;
    width: 20px;
    font-size: 1rem;
    text-align: left;
    font-family: "mintui" !important;
  }
  .case .left span::before{
    content: "\E600";
  }
</style>