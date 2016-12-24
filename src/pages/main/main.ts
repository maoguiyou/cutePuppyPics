import { Component } from '@angular/core';

import { NavController,LoadingController } from 'ionic-angular';

import { LoginService } from '../../shared/login-service/login-service';
import { SocketService } from '../../shared/socket-service/socket-service';

import { RacingListPage } from '../racing-list/racing-list';

@Component({
  templateUrl:'main.html'
})

export class MainPage {
  constructor(
    private loadingCtrl: LoadingController,
    private loginService:LoginService,
    private socketService:SocketService,
    private navCtrl:NavController
  ){ }

  list=[
    {"name":"All","iconName":"horse","type":"All"},
    {"name": "horse","iconName":"horse","type":"horse"},
    {"name": "harness","iconName":"harness","type":"harness"},
    {"name": "dog","iconName":"dog","type":"dog"},
    {"name": "比赛国家顺序","iconName":"horse","type":"horse"},
    {"name": "投注记录","iconName":"horse","type":"horse"},
    {"name": "账户详情","iconName":"horse","type":"horse"},
    {"name": "对账单","iconName":"horse","type":"horse"},
    {"name": "所有即将开始的比赛","iconName":"horse","type":"horse"}
  ]

  acctLogin=this.loginService.getLoginData().acctLogin;

  racingList(title:string):any {
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
      "Language":"en-cn",
      "serialNo":"201612221103090.254767395075286",
      "sessionId":this.loginService.getLoginData().sessionId,
      "token":this.loginService.getLoginData().token
    }
    socket.send('6.' + JSON.stringify(sendData));
    socket.onmessage=(e)=>{
      var data=this.socketService.getObject(e.data);
      console.log('main-page');
      console.log(data);
      if(data.command==6){
        //从赛狗，赛马，塞车中根据需要过滤对象
        let filterUpcoming=[];
        if(title=='All'){//如果title为All的时候不许要过滤，全部数据都需要
          filterUpcoming=data.dat.upcoming
        }else{
          for (var item of data.dat.upcoming){
            item.GameType==title && filterUpcoming.push(item);
          }
        }
        loader.dismiss();//隐藏加载层
        this.navCtrl.push(RacingListPage,{"title":title,"upcomingList":filterUpcoming});
      }
    }
  }
}
