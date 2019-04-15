<template>
  <div>
    <!-- <mod-header title="心理测试"></mod-header> -->
    <mt-header title="心理测试" fixed>
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="answer">答案</mt-button>
    </mt-header>
    <div class="psylist">
      <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul v-for="psycal in psycalList" :key="psycal.psychologicalId">
          <mod-psycal-list :psycal="psycal" :isShow="isShow"></mod-psycal-list>
        </ul>
      </mt-loadmore>

    </div>
  </div>
</template>

<style scoped>
  .psylist{
    margin-top: 45px;
    height: calc(100vh - 45px);
  }
  div >>> .mint-header{
    color: #3e3e3e;
    font-size: 0.9rem;
    background-color: #fbfbfb;
  }
  div >>> .mint-header-button.is-right button{
    background-color: #1c9bfc;
    color: #fff;
    padding: 0 13px;
    height: 28px;
  }
</style>

<script>
  export default{
    data(){
      return{
        psycalList: [],
        allLoaded: false,
        pageNum: 1,
        pageSize: 5,
        isShow: false
      }
    },
    methods: {
      pageLoad(pageNum, pageSize){
        this.$ajax({
          method: 'get',
          url: '/psychological/all',
          params: {
            pageNum: pageNum,
            pageSize: pageSize
          }
        }).then(res=>{
          this.psycalList = this.psycalList.concat(res.data.data.list);
          console.log(this.psycalList)
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
      },
      answer() {
        this.isShow = this.isShow?false:true;
      }
    },
    created(){
      this.pageLoad(this.pageNum, this.pageSize);
    }
  }
</script>