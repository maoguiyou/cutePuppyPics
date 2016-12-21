import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl:'racing-list.html'
})

export class RacingListPage {
  constructor(
    private navParams: NavParams
  ){ }
  title:string =this.navParams.get('title');//页面跳转传过来的值

  list=[
    {"name":"R1 阳光海岸 (澳)","time":"01:11"},
    {"name":"R5 巴拉来特 (澳)","time":"02:22"},
    {"name":"R4 阿斯科特 (澳)","time":"03:33"},
    {"name":"R5 温特沃斯 (澳)","time":"04:44"},
    {"name":"R5 克兰本 (澳)","time":"05:55"},
    {"name":"R4 伦瑟斯顿 (澳)","time":"06:66"},
    {"name":"R4 罗克汉顿 (澳)","time":"07:77"},
    {"name":"R1 阳光海岸 (澳)","time":"01:11"},
    {"name":"R5 巴拉来特 (澳)","time":"02:22"},
    {"name":"R4 阿斯科特 (澳)","time":"03:33"},
    {"name":"R5 温特沃斯 (澳)","time":"04:44"},
  ]
}
