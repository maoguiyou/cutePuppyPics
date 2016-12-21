import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  templateUrl:'terms.html'
})

export class TermsPage {
  constructor(
    private navCtrl:NavController
  ){ }
  //点击同意按钮
  isAgree:boolean = true;
    termsAgree():void {
      console.log(this.isAgree);
    }
  //点击不同意按钮返回登录页
    termsDisagree():void {
      this.navCtrl.pop();//删除在navCtrl栈里面的页面对象，也就是把当前页面从栈里面删除
    }
}
