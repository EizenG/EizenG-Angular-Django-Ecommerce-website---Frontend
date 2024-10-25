import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.module';
import {BehaviorSubject, Observable } from 'rxjs';


const baseUrl = "http://127.0.0.1:8000/apiv1";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  userData = new BehaviorSubject({});
  userData$ = this.userData.asObservable();

  updateUserData(value : any){
    this.userData.next(value);
  }

  register(user : User) : Observable<any>{
    return this.http.post(`${baseUrl}/users/register/`,user);
  }

  signIn(user : any){
    return this.http.post(`${baseUrl}/token/`,user);
  }

  getUserData() : Observable<any>{
    return this.http.get(`${baseUrl}/users/data/`);
  }

  getUserPanier() : Observable<any>{
    return this.http.get(`${baseUrl}/users/panier/`)
  }

  updateUserPanier(data : string) : Observable<any>{
    return this.http.patch(`${baseUrl}/users/panier/`,{"fieldsToUpdate" : data});
  }

  updateUserDataBckend(data : FormData){
    return this.http.patch(`${baseUrl}/users/data/`, data);
  }

  changeUserPassword(data : any){
    return this.http.patch(`${baseUrl}/users/changePassword/`, data);
  }

  deleteProductFromUserPanier(asin : string){
    return this.http.delete(`${baseUrl}/users/panier/`, { body: { "lineToDelete": asin } });
  }

}
