/**
 * 实现对话功能
 */
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import store from '../store/index'

class session {
  constructor (src) {
    this.src = src;
    this.stompClient = '';
    this.timer = '';
    this.data = [];  //获取收到的信息

    this.initWebSocket()
  }
  initWebSocket() {
    this.connection();
    let that= this;
    // 断开重连机制,尝试发送消息,捕获异常发生时重连
    this.timer = setInterval(() => {
      try {
        that.stompClient.send('test');
      } catch (err) {
        console.log("断线了: " + err);
        that.connection();
      }
    }, 5000);
  }
  connection() {
    // 建立连接对象
    let socket = new SockJS(this.src);
    this.stompClient = Stomp.over(socket);
    let headers = {
      token: store.getters.getToken
    }
    // 向服务器发起websocket连接
    this.stompClient.connect(headers,() => {
      this.stompClient.subscribe('/charinfo', (msg) => {
        console.log(msg.body);
        this.data = msg.body;
      });
    }, err => {
      console.log('err:' + err);
    });
  }
  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}

export default session