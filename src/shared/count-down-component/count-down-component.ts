import { Component,Input, OnInit,Pipe  } from '@angular/core';
import { DatePipe,CurrencyPipe  } from '@angular/common';

@Component({
  selector:"count-down",
  template:"<span>{{countDown()}}</span>",
  providers:[DatePipe,CurrencyPipe]
})

export class CountDownComponent implements OnInit{
  constructor(
    private dataPipe:DatePipe,
    private currencyPipe :CurrencyPipe
  ){ }
  @Input()
  startTime:any;
  countDownSecond:any;
  countDownMinute:any;

  countDown():any {
    // console.log(this.currencyPipe.transform('12345','rmb',false,'2.2-2'));
    this.countDownSecond=Math.floor( ( new Date(this.startTime).getTime()-new Date().getTime() ) / 1000 );//计算里开赛还有多少秒
    this.countDownMinute=this.countDownSecond/60;//计算离开赛还有多少分钟
    let sign = this.countDownSecond < 0 ? '-' : '';//正负号
    if(this.countDownMinute<5){
      let timeString= sign + Math.abs( Math.floor(this.countDownMinute) ) + ':' + Math.abs(this.countDownSecond%60);
      return  timeString;
    }else{
      return this.dataPipe.transform(this.startTime,'hh:mm') ;
    }
  }
  ngOnInit():void {

  }
}
