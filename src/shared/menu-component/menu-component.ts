import { Component,ViewChild } from '@angular/core';
import { LoadingController,AlertController,NavController } from 'ionic-angular';

import { ChangeLanguageService } from '../../shared/change-language-service/change-language-service';
import { LoginService } from '../../shared/login-service/login-service';
import { SocketService } from '../../shared/socket-service/socket-service';

import { ChangePasswordPage } from '../../pages/change-password/change-password';
import { MainPage } from '../../pages/main/main';
import { RegisterPage } from '../../pages/register/register'

@Component({
  templateUrl: 'menu-component.html'
})
export class MenuComponent {
  constructor(
    private changeLanguageService:ChangeLanguageService,
    private alertCtrl:AlertController,
    private loadingCtrl: LoadingController,
    private loginService:LoginService,
    private socketService:SocketService
  ){  }

  @ViewChild('mainMenu') navCtrl: NavController;//获取menu组件静态变量的引用，从而获取到对应的NavController对象

  root = MainPage;//定义menu的根页面
  acctLogin = this.loginService.getLoginData().acctLogin;//获取登录成功返回的信息

  //修改密码
  changePassword():void{
    this.navCtrl.push(ChangePasswordPage);//跳转到修改密码页面
  }

  //退出登录(由于目前menu业务简单，所以没有把logOut写成独立的服务，如果menu业务复杂，将不可以在这里写任何功能性的代码，这里只是负责调用)
  logOut():void{
    //配置显示加载信息
    let loader=this.loadingCtrl.create({
      spinner: 'ios'
    });
    loader.present();//显示加载层

    let socket=this.socketService.getSocket();
    let sendData={
      "sessionId":this.loginService.getLoginData().sessionId,
      "token":this.loginService.getLoginData().token
    }

    socket.send('2.' + JSON.stringify(sendData));

    socket.onmessage=(e)=>{
      let data=this.socketService.getObject(e.data);
      console.log(data);
      if(data.command==2){
        console.log('logOut success');
        let alert = this.alertCtrl.create({
          title: 'LogOut success',
          message: 'please repeat sign in.',
          enableBackdropDismiss:false,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.navCtrl.push(RegisterPage);
              }
            }
          ]
        });
        alert.present();
        loader.dismiss();
      }
    }
  }
}
