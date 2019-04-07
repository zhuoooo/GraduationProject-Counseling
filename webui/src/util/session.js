/**
 * 实现对话功能
 */
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

class session {
  constructor (src) {
    this.src = src;
    this.stompClient = '';
    this.timer = '';
    this.data = [];

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
    let socket = new SockJS('/api/charinfo');
    this.stompClient = Stomp.over(socket);
    let headers = {
      // name: ''
    }
    // 向服务器发起websocket连接
    this.stompClient.connect(headers,() => {
      this.stompClient.subscribe(this.src, (msg) => {
        console.log(msg.body);
        this.data = msg.body;
      });
    }, err => {
      console.log(err);
    });
  }
  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}

export default session