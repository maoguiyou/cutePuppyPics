import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import { RacingListPage } from '../racing-list/racing-list';

@Component({
  templateUrl:'main.html'
})

export class MainPage {
  constructor(
    private navCtrl:NavController,
    private navParams:NavParams
  ){ }

  list=[
    {"name":"即将开赛（所有类型)","iconName":"albums"},
    {"name": "赛马","iconName":"american-football"},
    {"name": "赛狗","iconName":"analytics"},
    {"name": "比赛国家顺序","iconName":"logo-buffer"},
    {"name": "投注记录","iconName":"boat"},
    {"name": "账户详情","iconName":"bonfire"},
    {"name": "对账单","iconName":"book"},
    {"name": "所有即将开始的比赛","iconName":"brush"}
  ]

  acctLogin=this.navParams.get("acctLogin");

  racingList(title:string):any {
    this.navCtrl.push(RacingListPage,{"title":title});
  }
}
