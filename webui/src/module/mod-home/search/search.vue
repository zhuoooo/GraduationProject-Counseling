<template>
  <div class="search">
    <mod-my-search placeholder="搜索" :url="this.$route.params.search"></mod-my-search>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        url: ''
      }
    },
    created() {
      if(this.$route.params.search === 'case'){
        this.url = '/case/search'
      }else if(this.$route.params.search === 'forum'){
        this.url = '/keyword/all'
      }
    }
  }
</script>

<style scoped>
  .search {
  }
</style>
