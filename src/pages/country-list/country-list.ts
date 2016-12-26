import { Component,OnInit } from '@angular/core';
import { NavController,NavParams,LoadingController } from 'ionic-angular';

import { LoginService } from '../../shared/login-service/login-service';
import { SocketService } from '../../shared/socket-service/socket-service';

import { RacingListPage } from '../racing-list/racing-list';

@Component({
  templateUrl:'country-list.html'
})

export class CountryListPage implements OnInit{
  constructor(
    private loginService:LoginService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private socketService:SocketService
  ){ }

  pageAcceptObj=this.navParams.get('pageAcceptObj');//页面跳转传过来的值
  countryList = [];//定义一个空数组存放国家列表对象
  acctLogin=this.loginService.getLoginData().acctLogin;//获取登录成功返回的信息

  ngOnInit():void{
    //配置显示加载信息
    let loader=this.loadingCtrl.create({
      spinner: 'ios'
    });
    loader.present();//显示加载层

    //得到socket
    let socket = this.socketService.getSocket();
    let sendData={
      "IsCountry":true,
      "Language":"zh-cn",
      "serialNo":"201612221103090.254767395075286",
      "sessionId":this.loginService.getLoginData().sessionId,
      "token":this.loginService.getLoginData().token
    }

    socket.send('17.' + JSON.stringify(sendData));
    socket.onmessage=(e)=>{
      var data=this.socketService.getObject(e.data);
      console.log(data);
      if(data.command==17){
        this.countryList=data.dat.countrys;//获取国家列表
        loader.dismiss();//隐藏加载层
      }
    }
  }

  //点击国家查看该国家的赛事
  getCountryGame(country):void{
    this.navCtrl.push(RacingListPage,{"pageAcceptObj":{title:country,"country":country}})
  }

}
