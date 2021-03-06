import { Component,OnInit } from '@angular/core';
import { NavParams,LoadingController } from 'ionic-angular';

import { LoginService } from '../../shared/login-service/login-service';
import { SocketService } from '../../shared/socket-service/socket-service';

@Component({
  templateUrl:'racing-list.html'
})

export class RacingListPage implements OnInit{
  constructor(
    private loginService:LoginService,
    private loadingCtrl: LoadingController,
    private navParams: NavParams,
    private socketService:SocketService
  ){ }
  upcomingList = [];//定义一个空数组存放列表对象
  pageAcceptObj=this.navParams.get('pageAcceptObj');//页面跳转传过来的值
  acctLogin=this.loginService.getLoginData().acctLogin;//获取登录成功返回的信息

  ngOnInit():void{
    console.log(this.pageAcceptObj)
    //配置显示加载信息
    let loader=this.loadingCtrl.create({
      spinner: 'ios'
    });
    loader.present();//显示加载层

    //得到socket
    let socket = this.socketService.getSocket();
    let sendData={
      "IsUpcoming":true,
      "Total":20,
      "Country":this.pageAcceptObj.country,
      "MarketType":this.pageAcceptObj.gameType,
      "Language":"en-cn",
      "serialNo":"201612221103090.254767395075286",
      "sessionId":this.loginService.getLoginData().sessionId,
      "token":this.loginService.getLoginData().token
    }

    socket.send('6.' + JSON.stringify(sendData));
    socket.onmessage=(e)=>{
      var data=this.socketService.getObject(e.data);
      console.log(data);
      if(data.command==6){
        this.upcomingList=data.dat.upcoming;//渲染列表
        loader.dismiss();//隐藏加载层
      }
    }
  }
}
