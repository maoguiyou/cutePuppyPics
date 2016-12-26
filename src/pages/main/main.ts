import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginService } from '../../shared/login-service/login-service';

import { AccountPage } from '../account/account';
import { CountryListPage } from '../country-list/country-list';
import { RacingListPage } from '../racing-list/racing-list';

@Component({
  templateUrl:'main.html'
})

export class MainPage {
  constructor(
    private loginService:LoginService,
    private navCtrl:NavController
  ){ }

  //定义main页面的导航列表
  list=[
    {"title":"All","iconName":"horse","targetPage":RacingListPage},
    {"title": "horse","iconName":"horse","targetPage":RacingListPage,"gameType":"horse"},
    {"title": "harness","iconName":"harness","targetPage":RacingListPage,"gameType":"harness"},
    {"title": "dog","iconName":"dog","targetPage":RacingListPage,"gameType":"dog"},
    {"title": "账户详情","iconName":"horse","targetPage":AccountPage},
    {"title": "比赛国家顺序","iconName":"horse","targetPage":CountryListPage},
    {"title": "投注记录","iconName":"horse","targetPage":"horse"},
    {"title": "对账单","iconName":"horse","targetPage":"horse"}
  ]

  acctLogin=this.loginService.getLoginData().acctLogin;//获取登录成功返回的信息

  mainRouter(obj):void {//对象包含目标页面，点击游戏名称等信息
    this.navCtrl.push(obj.targetPage,{"pageAcceptObj":obj});
  }
}
