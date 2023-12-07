import { Component , DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'loginandregister-using-rolebased-auth1';
  isUserLoggedIn=false;
  isAdminUser=false;
  constructor(private router :Router,private service:AuthService){}
  ngDoCheck(): void {
    this.userLoggedIn();
  }
  userLoggedIn(){
    let currenturl=this.router.url;
    if(currenturl=='/login' || currenturl == '/register'){
      this.isUserLoggedIn =false;
    }else{
      this.isUserLoggedIn=true;
    }
    if(this.service.GetUserRole()==='admin'){
      this.isAdminUser = true;
    }else{
      this.isAdminUser =false;
    }
  }
}
