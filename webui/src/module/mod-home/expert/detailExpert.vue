<!-- 专家详情 -->
<template>
  <div class="detail_expert">
    <mt-header title="专家详情">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="detail_index">
      <h1 class="name">{{detail.username}}专家</h1>
      <div class="info">
        <div class="left">
          <img :src="detail.headUrl || 'https://avatars2.githubusercontent.com/u/39826728?s=460&v=4'">
          <div>
            <p class="name">{{detail.username}}</p>
            <p class="post">{{detail.role}} | {{ detail.createAt | convertTime('YYYY-MM-DD') }}</p>
          </div>
        </div>
        <router-link :to="{ name: 'dialogue', params: {theSenderId, theReceiveId}, query: {username: detail.username}}">
          <mt-button type="primary" size="small" class="button">咨询</mt-button>
        </router-link>
      </div>
      <div class="detail_info" :class="{'common-color-gray': !detail.content}" v-if="!caseList.length">
        {{detail.content || '这个专家很懒，没有留下什么~'}}
      </div>
      <mt-loadmore class="case-list" v-else>
        <ul>
          <li v-for="section in caseList" :key="section.psychologicalCaseId">
            <router-link :to="{path: '/case/section', query: {id: section.psychologicalCaseId}}">
              <mod-case-list :section="section"></mod-case-list>
            </router-link>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detail: {},
        caseList: [],
        theReceiveId: this.$route.query.userId,
        theSenderId: this.$store.getters.getUserId
      }
    },
    mounted () {
      this.setTeacherCase()
    },
    created() {
      this.$ajax({
        method: 'get',
        url: `/user/${this.theReceiveId}`
      }).then(({data})=>{
        this.detail = data.data;
      }).catch(err=>console.log(err))
    },
    methods: {
      setTeacherCase () {
        this.$ajax({
          methods: 'get',
          url: `/case/user/${this.theReceiveId}`
        }).then(({data}) => {
          this.caseList = data.data.list
        })
      }
    }
  }
</script>

<style scoped>
  .detail_expert >>> .mint-header{
    color: #3e3e3e;
    font-size: 0.9rem;
    background-color: #fbfbfb;
  }

  .detail_expert .detail_index{
    padding: 10px;
  }
  .detail_expert .detail_index .name{
    font-weight: 500;
    font-size: 1.4rem;
  }
  .detail_expert .detail_index .info{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .detail_expert .detail_index .info .left{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .detail_expert .detail_index .info .left{
    font-weight: 500;
    font-size: 0.7rem;
    color: #8e8e8e;
  }
  .detail_expert .detail_index .info .left .name{
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
  }
  .detail_expert .detail_index .info .left img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .detail_expert .detail_index .info .button{
    font-size: 0.8rem;
    padding: 0 15px;
  }

  .detail_expert .detail_index .detail_info{
    margin-top: 20px;
    word-break: break-all;
    font-size: 1rem;
  }
  .detail_expert .detail_index .detail_info img{
    width: 100%;
  }
</style>
