import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiurl = " http://localhost:3000/user";

  getAllUsers(){
    return this.http.get(this.apiurl);
  }
  getById(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  getAllRole(){
    return this.http.get('http://localhost:3000/role');
  }
  registerUser(obj:any){
    return this.http.post(this.apiurl,obj);
  }
  updateUser(id:any,obj:any){
    return this.http.put(this.apiurl+'/'+id,obj);
  }
  IsloggedIn(){
    return sessionStorage.getItem('userName')!=null;
  }
  GetUserRole(){
    return sessionStorage.getItem('userRole')!=null?sessionStorage.getItem('userRole')?.toString():'';
  }
}
