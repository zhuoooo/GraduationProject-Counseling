/**
 * 实现对话功能
 */
import Vue from 'vue'
import './request.js'

var chat = {
  chatData: [],
  getChatData(){
    Vue.prototype.$ajax({
      url: '',
      method: 'post',
      data: {
        userName: '',
        sendName: '',
      }
    }).then(res=>{
      this.chatData = res.data
    })
  },
  loop(){
    window.setInterval(() => {
      setTimeout(this.getChatData, 0)
    }, 1000)
  }
}

export default chat