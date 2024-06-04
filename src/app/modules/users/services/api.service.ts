import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../usersmodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url="https://userportal-pvg1.onrender.com"

  constructor(private http:HttpClient) { }

  //to check same id
  getAllUserAPI(){
    return this.http.get(`${this.server_url}/users`)
  }

    //add-user store
    saveUserAPI(user:userModel){
     return this.http.post(`${this.server_url}/users`,user)
    } 
    
    //to get 1 user details based on id
    getAUserAPI(id:any){
      return this.http.get(`${this.server_url}/users/${id}`)
    }

    //update user
    updateUserAPI(user:userModel){
      return this.http.put(`${this.server_url}/users/${user.id}`,user)
    }

    removeUserAPI(id:any){
      return this.http.delete(`${this.server_url}/users/${id}`)

    }
}
