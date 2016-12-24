import { Component,Input, OnInit,Pipe  } from '@angular/core';
import { DatePipe,DecimalPipe  } from '@angular/common';

import { GetServerTimeService } from '../../shared/get-server-time-service/get-server-time-service';


@Component({
  selector:"count-down",
  template:"<span [ngStyle]='countDown().textCorlor'>{{countDown().timeText}}</span>",
  providers:[DatePipe,DecimalPipe]
})

export class CountDownComponent implements OnInit{
  constructor(
    private dataPipe:DatePipe,
    private decimalPipe :DecimalPipe,
    private getServerTimeService:GetServerTimeService
  ){ }
  @Input()
  startTime:any;//比赛开始的时间
  countDownSecond:any;//离开赛还有多少秒
  countDownMinute:any;//离开赛还有多少分钟

  countDown():any {
    this.countDownSecond=Math.floor( ( new Date(this.startTime).getTime()-new Date(this.getServerTimeService.simulateServerTime).getTime() ) / 1000 );//计算里开赛还有多少秒
    this.countDownMinute=this.countDownSecond/60;//计算离开赛还有多少分钟
    let sign = this.countDownSecond < 0 ? '-' : '';//正负号
    if(this.countDownMinute<5){
      let timeString= sign + this.decimalPipe.transform(Math.abs( parseInt( this.countDownMinute ) ),'2.0-0')  + ':' + this.decimalPipe.transform( Math.abs(this.countDownSecond%60) ,'2.0-0');
      return {
        "timeText":timeString,
        "textCorlor":{"color":"#FF9A02"}
      }
    }else{
      return {
        "timeText":this.decimalPipe.transform(this.countDownMinute,'2.0-0') +" min",
        "textCorlor":{}
      }
    }
  }
  ngOnInit():void {

  }
}
