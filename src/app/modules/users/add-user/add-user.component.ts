import { Component, OnInit } from '@angular/core';
import { userModel } from '../usersmodel';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: userModel = {}
  allusers: any = []


  constructor(private api: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.api.getAllUserAPI().subscribe((result: any) => {
      this.allusers = result
    })
  }
  adduser() {
    const existingUser = this.allusers.find((item: any) => item.id == this.user.id)
    if (existingUser) {
      alert("Id is already exist!! use unique id to add user")
      }
     else {
      this.api.saveUserAPI(this.user).subscribe({
        next: (result: any) => {
          console.log(result);
          alert(`${result.name} has successfully added to our DB`)
          this.router.navigateByUrl('/users')

        },
        error: (err: any) => {
          console.log(err);

        }
      })


    }
  }


  Cancel() {
    this.user = {}
  }

}
