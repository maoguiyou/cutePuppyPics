import { Component } from '@angular/core';
import { LoadingController,AlertController,NavController } from 'ionic-angular';

import Encryption from 'sha.js/index';

import { LoginService } from '../../shared/login-service/login-service'
import  { SocketService } from '../../shared/socket-service/socket-service';

@Component({
  templateUrl:'change-password.html'
})

export class ChangePasswordPage {
  constructor(
    private alertCtrl:AlertController,
    private loginService:LoginService,
    private SocketService:SocketService,
    private navCtrl:NavController
  ){ }
  oldPassword:string;
  newPassword:string;
  confirmPassword:string;
  changePassword():void{

    //密码不能为空
    if(!this.oldPassword || !this.newPassword || !this.confirmPassword){
      let alert = this.alertCtrl.create({
        title: 'modification password',
        subTitle: 'please input password',
        buttons: ['confirm']
      });
      alert.present();
    }else if(this.newPassword!=this.confirmPassword){//两次输入的密码不一致
      let alert = this.alertCtrl.create({
        title: 'modification password',
        subTitle: 'confirm password and new password is not consistent.',
        buttons: ['confirm']
      });
      alert.present();
    }else{
      let socket=this.SocketService.getSocket();
      console.log(this.loginService.getLoginData().acctLogin)
      let sendData={
        "OldPwd":Encryption('sha1').update(this.oldPassword,'utf8').digest('hex'),
        "NewPwd":Encryption('sha1').update(this.newPassword,'utf8').digest('hex'),
        "sessionId":this.loginService.getLoginData().sessionId,
        "token":this.loginService.getLoginData().token
      };
      socket.send( '3.' + JSON.stringify(sendData));
      socket.onmessage=(e)=>{
        let data=this.SocketService.getObject(e.data);
        console.log(data);
        if(data.command==3 && data.dat.code==0){
          console.log('modification success')
        }
      }
    }
  }
}
