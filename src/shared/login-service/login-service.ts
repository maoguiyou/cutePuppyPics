import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  public loginData:any=null;
  constructor(){ }

  getLoginData():any{
      return this.loginData;
  }

  setLoginData(newLoginData):void{
      this.loginData=newLoginData;
  }
}
