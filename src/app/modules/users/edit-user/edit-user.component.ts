import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userModel } from '../usersmodel';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user:userModel={}
  constructor(private route:ActivatedRoute , private api:ApiService, private router:Router){}
  ngOnInit(): void {
      this.route.params.subscribe((result:any)=>{
        console.log(result);
        
        const {id} =result
        console.log(id);
        this.getUserDetails(id)
        
      })
  }

  getUserDetails(id:any){
      this.api.getAUserAPI(id).subscribe((result:any)=>{
        this.user=result
        console.log(this.user);
        
      })
  }
  Cancel(id:any){
    this.getUserDetails(id)
  }

    updateUser(){
      this.api.updateUserAPI(this.user).subscribe((result)=>{
        console.log(result);
        
        alert("updated successfully")
        this.router.navigateByUrl('/users')
      })
    }

    
}
