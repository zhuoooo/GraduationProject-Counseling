<template>
  <li>
      <!-- <div>
        <img src="https://avatars2.githubusercontent.com/u/39826728?s=460&v=4">
      </div> -->
      <div class="question">
        <h1>{{psycal.title}}</h1>
        <div class="intro">
          <label for="opt1" v-for="(answer, index) in psycal.answer" :key="index">
            <input type="radio" :name="psycal.psychologicalId" value="answer">
            <span>{{psycal.answer}}</span>
          </label>
        </div>
        <div class="rightAnswer" v-show="isShow">正解：{{psycal.rightAnswer}}</div>
      </div>
  </li>
</template>

<script>
  export default{
    name: 'mod-psycal-list',
    props: ['psycal', 'isShow'],
  }
</script>

<style scoped>
  li{
    margin-top: 10px;
    padding: 10px;
    background-color: #fbfbfb;
  }
  li .question{
    color: #000;
    /* display: flex; */
    align-items: center;
  }
  li .question img{
    width: 80px;
    margin: 10px 15px 10px 10px;
  }
  li .question h1{
    font-size: 1rem;
  }
  li .question .intro{
    color: #666;
    overflow: hidden;
    line-height: 1.5;
    margin: 0 0 5px;
    padding: 5px;
    font-size: 0.8rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  li .question .rightAnswer{
    font-size: 0.8rem;
    text-align: right;
    color: red;
  }
</style>