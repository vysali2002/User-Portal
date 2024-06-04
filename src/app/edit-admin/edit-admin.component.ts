import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminAPIService } from '../adminAPIServices/admin-api.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  editAdminStatus:boolean =false;
  adminDetails:any= {}
  adminProfile:string ="https://cdn-icons-png.flaticon.com/512/201/201565.png" 

  constructor(private adminAPI:AdminAPIService){}
 @Output() onAdminChange = new EventEmitter()
  ngOnInit(): void {
      this.adminAPI.getAdminDetails().subscribe((result:any)=>{
       this.adminDetails = result
       if(result.picture){
        this.adminProfile=result.picture
       }
      })
  }

  editAdminBtn(){
    this.editAdminStatus = true
  }
  cancel(){
    this.editAdminStatus= false
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    // this.adminProfile = URL.createObjectURL(uploadFile)
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      this.adminProfile = event.target.result
      this.adminDetails.picture = this.adminProfile
    }
    console.log(this.adminDetails);
    
  }
  UpdateAdmin(){
    this.adminAPI.updateAdminDetails(this.adminDetails).subscribe({
      next:(result:any)=>{
        this.editAdminStatus = false
        alert("updated successfully!!")
        sessionStorage.setItem("adminDetails",JSON.stringify(result))
         this.onAdminChange.emit(result.name)
      },
      error:(reason:any)=>{
       console.log(reason);
       alert("Updation Failed!!")
       
      }
    })
  }

}
