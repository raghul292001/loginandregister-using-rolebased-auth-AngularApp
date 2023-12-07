import { Injectable } from '@angular/core';
import {  CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot,  Router,  UrlTree,} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router,private service:AuthService,private toastz:ToastrService) {
    
  }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{

      if(this.service.IsloggedIn()){
        if(route.url.length>0){
          let menu = route.url[0].path;
          if(menu=='user'){
            if(this.service.GetUserRole()=='admin'){
                return true
            }else{
              this.toastz.error('You dont have access');
              this.router.navigate(['home']);
              return false;
            }

          }else{
            return true
          }

        }else{
          return true
        }
        return true
      }else{
        this.router.navigate(['login'])
        return false
      }
    }
}