/**
 * 状态管理
 */

var store = {
  state: {
    logined: false,  // 登录状态
    loginedUser: {
      id: '',
      userName: '',
      charinfo: ''
    },
  },
  Login(){
    console.log('调用Login')
    this.state.logined = true;
    let user = window.localStorage.getItem('user');
    this.state.loginedUser.userName = user.userName;
  },
  OutLogin(){
    console.log('调用OutLogin')
    this.state.logined = false;
    this.state.loginedUser.userName = '';
  },
  getLocalChar(){
    if(window.localStorage.getItem('char')){
      
    }
  }
}

export default store