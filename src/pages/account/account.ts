import { Component,OnInit } from '@angular/core';
import { NavParams,LoadingController } from 'ionic-angular';

import { LoginService } from '../../shared/login-service/login-service';
import { SocketService } from '../../shared/socket-service/socket-service';

@Component({
  templateUrl:'account.html'
})

export class AccountPage implements OnInit {
  constructor(
    private loginService:LoginService,
    private loadingCtrl: LoadingController,
    private navParams: NavParams,
    private socketService:SocketService
  ){ }

  pageAcceptObj=this.navParams.get('pageAcceptObj');//页面跳转传过来的值
  acctDetails:any;//定义一个变量，存放用户账单详情对象

  ngOnInit():void{
    //配置显示加载信息
    let loader=this.loadingCtrl.create({
      spinner: 'ios'
    });
    loader.present();//显示加载层

    //得到socket
    let socket = this.socketService.getSocket();
    let sendData={
      "Language":"en-cn",
      "serialNo":"201612221103090.254767395075286",
      "sessionId":this.loginService.getLoginData().sessionId,
      "token":this.loginService.getLoginData().token
    }
    socket.send('5.' + JSON.stringify(sendData));
    socket.onmessage=(e)=>{
      var data=this.socketService.getObject(e.data);
      console.log(data);
      if(data.command==5){
        loader.dismiss();//隐藏加载层
        this.acctDetails=data.dat.acctDetails;//把服务器推送的账单详情对象赋值给初始化定义的acctDetails变量中
      }
    }
  }

}
