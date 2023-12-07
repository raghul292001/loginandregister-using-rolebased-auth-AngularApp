import { Component,OnInit,Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {  MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-updatepop',
  templateUrl: './updatepop.component.html',
  styleUrls: ['./updatepop.component.css']
})
export class UpdatepopComponent implements OnInit {

  constructor (private builder:FormBuilder,private toastr:ToastrService,private service:AuthService,private router:Router, @Inject(MAT_DIALOG_DATA) public data:any,private dialog:MatDialogRef<UpdatepopComponent>){

  }

  rolelist:any;
  editData:any;
  ngOnInit(): void {
    this.getRoles();
  }
  registerForm=this.builder.group({
    id:this.builder.control(''),
    name:this.builder.control(''),
    password:this.builder.control(''),
    email:this.builder.control(''),
    gender:this.builder.control('male'),
    role:this.builder.control('',Validators.required),
    isactive:this.builder.control(false),
  });

  updateUser(){

    if(this.registerForm.valid){
      this.service.updateUser(this.registerForm.value.id,this.registerForm.value).subscribe(res=>{
        this.toastr.success("update Successfully");
        this.dialog.close();
      });

    }else{
      this.toastr.warning("Please Select Role");
    }

  }

  getRoles(){
    this.service.getAllRole().subscribe((res:any)=>{
      this.rolelist = res;
    })
    if(this.data.userId!=null && this.data.userId!=''){
      this.service.getById(this.data.userId).subscribe(res=>{
        this.editData = res;
        this.registerForm.setValue({id:this.editData.id,name:this.editData.name,email:this.editData.email,password:this.editData.password,role:this.editData.role,gender:this.editData.gender,isactive:this.editData.isactive})

      });
    }
  }

}
