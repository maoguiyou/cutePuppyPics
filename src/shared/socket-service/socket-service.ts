import { Injectable } from '@angular/core';

@Injectable()
export class SocketService {
  // private socketUrl = 'ws://m.txbet.com:8080/'; //正式上的地址
  private socketUrl = 'ws://www.0000tx.net:8080/';//测试上的地址
  private socket = new WebSocket(this.socketUrl);//创建socket连接
  constructor() {
    this.socket.onopen = this.onOpen();
    this.socket.onclose = this.onClose();
    this.socket.onerror = this.onError();
  }

  getSocket():any {
    return this.socket;
  }

  //socket 连接成功
  onOpen(): any {
    console.log('connect success');
  }

  //socket 关闭连接
  onClose(): any {
    console.log('socket is close');
  }

  //socket error
  onError(): any {
    console.log('socket is error');
  }

  getObject(str): any {
    try{
      var i = str.indexOf("{");
      return {command: parseInt(str.substr(0, i)), dat:JSON.parse(str.substr(i))};
    }catch (e){
      console.log("parse json err");
      return null;
    }
  }

}
