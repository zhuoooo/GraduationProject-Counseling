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
      console.log(this.$route.params.search)
      if(this.$route.params.search === 'case'){
        this.url = '/casekeyword/'
      }else if(this.$route.params.search === 'forum'){
        this.url = '/keyword/all'
      }
    }
  }
</script>