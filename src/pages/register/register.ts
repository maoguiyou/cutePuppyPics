import { Component } from '@angular/core';

import Encryption from 'sha.js/index';
import { NavController,LoadingController } from 'ionic-angular';

import  { ChangeLanguageService } from '../../shared/change-language-service/change-language-service';
import  { SocketService } from '../../shared/socket-service/socket-service';
import  { TermsPage } from '../terms/terms';
@Component({
  selector:'page-register',
  templateUrl:'register.html'
})

export class RegisterPage {
  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private changeLanguageService:ChangeLanguageService,
    private SocketService:SocketService
  ) { }
  userName:string='MYRGZGY';
  passWord:string='aaa111';

  //login
  login():any {
    let loader=this.loadingCtrl.create({
      spinner: 'ios'
    });
    loader.present();
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
      console.log(data);
      if(data.dat.code==0){
        loader.dismiss();
        this.navCtrl.push(TermsPage,{'acctLogin':data.dat.acctLogin});
        console.log('欢迎：'+ data.dat.acctLogin.NickName);
      }
    }
  }
}
