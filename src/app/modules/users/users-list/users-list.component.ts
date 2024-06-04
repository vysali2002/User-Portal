import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { userModel } from '../usersmodel';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  allUsers:userModel[]=[]
  searchKey:string=""
  p:number=1;
 



  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.getAllUser()
}

  getAllUser(){
    this.api.getAllUserAPI().subscribe((result:any)=>{
  
      this.allUsers=result.filter((user:any)=>user.id!="1")
    })

  }

  DeleteUser(id:any){
      this.api.removeUserAPI(id).subscribe((result:any)=>{
         this.getAllUser()
         
      })
  }

  sortByName(){
    this.allUsers.sort((user1:any,user2:any)=>user1.name.localeCompare(user2.name))
  }
  sortByID(){
    this.allUsers.sort((user1:any,user2:any)=>user1.id-user2.id)
  }

  generatePDF(){
     let pdf = new jspdf()
     let head = [['ID','NAME','EMAIL','STATUS']]
     let body:any = []
     this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.status=='1'?"Active":"InActive"])
     })
     pdf.setFontSize(16)
     pdf.text("ALL USERS LIST",10,10)
     autoTable(pdf,{head,body})
     pdf.output('dataurlnewwindow')
     pdf.save('all-users-list.pdf')
  }

}
