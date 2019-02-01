<template>
  <ul>
    <li v-for="expert in experts" :key="expert.id">
      <router-link :to="{name: 'detailExpert', query: {id: expert.id}}">
        <img :src="expert.photo">
        <p>
          <span class="name">{{ expert.name }}</span>
          <span class="rank">{{ expert.rank }}</span>
        </p>
        <p class="number">{{ expert.number }}次咨询</p>
      </router-link>
    </li>
  </ul>
</template>

<script type="text/javascript">
  export default{
    name: 'mod-home-list',
    props: ['experts'],
    data () {
      return {
        // experts: [
        //   {
        //     "id": 1,
        //     "name": "李红",
        //     "rank": "博士",
        //     "number": 123,
        //     "photo": "https://avatars2.githubusercontent.com/u/39826728?s=460&v=4"
        //   }
        // ]
      }
    },
  }
</script>

<style type="text/css" scoped>
  
  ul{
    display: flex;
    padding: 5px 20px;
    flex-wrap: wrap;
  }
  ul li{
    width: 33.3%;
    padding: 0 5px 5px;
    box-sizing: border-box;
  }
  ul li img{
    width: 100%;
  }
  ul li p{
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  ul li p .name{
    font-size: 0.9rem;
    color: #3e3c3d;
  }
  ul li p .rank{
    font-size: 0.7rem;
    color: #7f7f80;
  }
  ul li p.number{
    font-size: 0.8rem;
    color: #7f7f80;
  }
</style>