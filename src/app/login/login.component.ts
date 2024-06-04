import { Component } from '@angular/core';
import { AdminAPIService } from '../adminAPIServices/admin-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=''

  constructor(private adminAPI:AdminAPIService){}

//define login
login(){
  if(this.email && this.password){
    //api call
    this.adminAPI.authenticateAPI(this.email,this.password)
  }else{
    alert("please fill the form")
  }
}

}




