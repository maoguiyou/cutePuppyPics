import { Injectable,OnInit } from '@angular/core';

import { LoginService } from '../../shared/login-service/login-service';
import { SocketService } from '../../shared/socket-service/socket-service';

@Injectable()
export class GetServerTimeService{
  constructor(
    private loginService:LoginService,
    private socketService:SocketService
  ){ }

  simulateServerTime:any=Date.now();//初始化的时候等于客户端时间（防止请求失败或者中断等不可预测原因导致时间显示错乱)

  //去到服务器时间后通过倒计时同步服务器时间
  simulateServerTimeFun():any {
    let timer:any;
    clearTimeout(timer);//创建之前先清除定时器
    timer=setInterval(()=>{//用倒计时来同步服务器时间
      this.simulateServerTime+=1000;
    },1000)
  }

  //获取服务器时间，返回一个承诺
  getServerTime():Promise<any> {
    return new Promise<any>(resolve=>{
      let socket = this.socketService.getSocket();//获取socket对象
      let loginData = this.loginService.getLoginData();//获取loginData对象（登录成功返回的对象)
      //请求服务器时间的接口
      let sendData={
        "Language":loginData.lang,
        "serialNo":loginData.serialNo,
        "sessionId":loginData.sessionId,
        "token":loginData.token
      }
      socket.send('15.' + JSON.stringify(sendData));
      socket.onmessage=(e)=>{
        console.log('get-serve-time-service');
        let data= this.socketService.getObject(e.data);
        console.log(data);
        if(data.command == 15 && data.dat.code==0){
          this.simulateServerTime=data.dat.serviceTime;//把得到的服务器时间存到类的属性上
          this.simulateServerTimeFun();//指定函数，用倒计时同步服务器时间
          resolve(data.dat.serviceTime);//返回服务器时间戳
        }
      }
    })
  }


}
