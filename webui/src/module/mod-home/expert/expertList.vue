<!-- 专家列表 -->
<template>
  <div class="doctorList">
    <mt-header title="专家咨询">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mod-home-list :experts="experts"></mod-home-list>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        experts: [
          {
            "id": 1,
            "name": "李红",
            "rank": "博士",
            "number": 123,
            "photo": "https://avatars2.githubusercontent.com/u/39826728?s=460&v=4"
          }
        ]
      }
    },
    created(){
      this.$ajax({
        url: '/user/user/type/2',
        method: 'get',
        params: {
          pageNum: 4,
          pageSize: 1
        },
      })
      .then(res=>{
        this.experts = res.data.data.list
      }).catch(err=>console.log(err))
    }
  }
</script>

<style scoped>
  .doctorList >>> .mint-header{
    color: #3e3e3e;
    font-size: 0.9rem;
    background-color: #fbfbfb;
  }
  .home-list{
    background-color: transparent;
  }
</style>