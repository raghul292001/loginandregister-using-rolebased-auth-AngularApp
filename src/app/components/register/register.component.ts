import { Component } from '@angular/core';
import { FormBuilder,Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor (private builder:FormBuilder,private toastr:ToastrService,private service:AuthService,private router:Router){

  }

  registerForm=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.compose([Validators.required])),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    gender:this.builder.control('male'),
    role:this.builder.control(''),
    isactive:this.builder.control(false),
  });

  proceedRegisteration(){
    if(this.registerForm.valid){
      this.service.registerUser(this.registerForm.value).subscribe((res:any)=>{
        if (res!=null){
        this.toastr.success("Please contact admin for enable access","Registered Successfully");
        this.router.navigate(['login']);
        console.log(res);
        }else{
          this.toastr.warning(res.message)
        }

      })

    }else{
      this.toastr.warning("Please enter valid data")
    }
  }

}
