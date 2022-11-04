import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router) { }

  // Check user is login or not ---- IsLoggedIn
  IsLoggedIn() {
    return !!localStorage.getItem('token');
  }

  // Clear LocalStorage
  clearData() {
    localStorage.clear();
  }

  // Signup API Call
  signup(data: any): Observable<any> {
    return this.http.post('http://localhost:8989/user/signup', data);
  }

  // Simple Login API call
  // login(data: any): Observable<any> {
  //   return this.http.post('http://localhost:8989/user/login', data);
  // }

  // Login API Call 
  async login(data: any): Promise<any> {
    this.clearData();

    const user: any = await this.http.post('http://localhost:8989/user/login', data).toPromise();
    console.log("user service ts", user);

    if (user.Token && user.result) {
      localStorage.setItem('token', user.Token);
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      localStorage.setItem('user', JSON.stringify(user.result));
    }
    return user;
  }


  // Logout Function
  logout() {
    let removeItem = localStorage.removeItem("token")
    if (removeItem == null) {
      this.router.navigate(['login'])
    }
  }

  // Update API Call
  update(_id: any, data: any) {
    let userData = { ...data, _id };
    console.log("userData update servise", userData)
    return this.http.post<any>(
      'http://localhost:8989/user/update', userData);
  }




}
