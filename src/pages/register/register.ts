import { Component } from '@angular/core';

import Encryption from 'sha.js/index';
import { NavController,LoadingController } from 'ionic-angular';

import  { ChangeLanguageService } from '../../shared/change-language-service/change-language-service';
import { GetServerTimeService } from '../../shared/get-server-time-service/get-server-time-service';
import  { LoginService } from '../../shared/login-service/login-service';
import  { SocketService } from '../../shared/socket-service/socket-service';


import  { TermsPage } from '../terms/terms';
@Component({
  selector:'page-register',
  templateUrl:'register.html'
})

export class RegisterPage {
  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private loginService:LoginService,
    private changeLanguageService:ChangeLanguageService,
    private getServerTimeService:GetServerTimeService,
    private SocketService:SocketService
  ) { }
  userName:string='ng3';
  passWord:string='aaaaa';

  //login
  login():any {
    //配置显示加载信息
    let loader=this.loadingCtrl.create({
      spinner: 'ios'
    });
    loader.present();//显示加载层
    //请求参数
    var req={
      "AcctId":this.userName,
      "Pwd":Encryption('sha1').update(this.passWord, 'utf8').digest('hex'),
      "ClientIp":"119.129.208.210",
      "Language":null,
      "serialNo":"201612191530530.6779813738894676"
    }
    var str='1.'+JSON.stringify(req);
    console.log(req);
    this.SocketService.getSocket().send(str);
    this.SocketService.getSocket().onmessage=(e)=>{
      var data=this.SocketService.getObject(e.data);
      console.log('registerPage');
      console.log(data);
      if(data.command == 1 && data.dat.code==0){
        this.loginService.setLoginData(data.dat);//把登录得到的对象存储到login-service类中
        this.getServerTimeService.getServerTime().then(time=>console.log(time));//调用服务获取服务器时间
        loader.dismiss();
        this.navCtrl.push(TermsPage);
      }
    }
  }
}
