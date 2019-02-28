<template>
  <div class="my_search">
    <div class="mint-searchbar">
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input
        autofocus
        ref="input"
        @input="search"
        @keyup.enter="search"
        @click="searchRecordShow"
        type="search"
        :placeholder="placeholder"
        class="mint-searchbar-core">
      </div>
      <a
        class="mint-searchbar-cancel"
        @click="searchCancel"
        v-show="visible"
        v-text="cancelText">
      </a>
    </div>
    <div class="searchResult">
      <ul>
        <li v-for="result in searchResult" :key="result.id">
          <router-link :to="{name: 'forum', query: {keywordId: result.id}}">{{ result.message }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'mod-my-search',
    props: ['placeholder','url'],
    data(){
      return {
        currentValue: '',
        visible: true,
        cancelText: '取消',
        searchResult: [],
      }
    },
    methods: {
      /**
       * 取消事件
       */
      searchCancel(){
        this.$router.go(-1);
      },
      search(e){
        this.currentValue = e.target.value;
      },
      searchRecordShow(){
        console.log(this.placeholder)
      }
    },
    created() {
      this.$ajax({
        url: this.url,
        method: 'get',
      }).then(res=>{
        this.searchResult = res.data.data
      })
    }
  }
</script>

<style scoped>
  .my_search{
    background-color: #f7f7f7;
    height: 100%;
  }

  .my_search .mint-searchbar{
    background-color: #fff;
  }
  .my_search .mint-searchbar .mint-searchbar-inner{
    background-color: #f7f7f7;
  }
  .my_search .mint-searchbar .mint-searchbar-inner .mint-searchbar-core{
    background-color: #f7f7f7;
  }
  .my_search .mint-searchbar .mint-searchbar-inner .mintui-search{
    font-size: 18px;
    color: #444;
  }
  .my_search .mint-search-list{
    top: 15px;
  }

  .my_search .searchResult{
    padding: 5px 0;
  }
  .my_search .searchResult ul{}
  .my_search .searchResult ul li{
    padding: 0 35px;
    font-size: 1rem;
    line-height: 2.2;
    border-bottom: 1px solid #f1f1f1;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .my_search .searchResult ul li::before{
    content: "\E604";
    font-family: "mintui";
    position: absolute;
    width: 24px;
    height: 22px;
    font-size: 1.1rem;
    left: 10px;
    top: 0;
  }
  .my_search .searchResult ul li a{
    color: #4d4d4d;
  }
</style>