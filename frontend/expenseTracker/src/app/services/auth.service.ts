  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';  // Import Observable from rxjs
  import { tap } from 'rxjs/operators'
  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'http://localhost:3000/';
    constructor(private http: HttpClient) { }
    // ========== 1. Register with profile image ==========
    registerWithImage(user:any): Observable<any> {

      console.log("Entered")
      console.log(this.http.post(`${this.apiUrl}signup`,user));
      
      return this.http.post(`${this.apiUrl}signup`,user);
    }
  
    // ========== 2. Login ==========
    login(credentials: { email: string; password: string }): Observable<any> {
      return this.http.post(`${this.apiUrl}login`, credentials,{
        observe:'response',
        withCredentials:true
      })
    }
  
    // ========== 3. Logout ==========
    logout(): void {
      localStorage.removeItem('auth_token');
    }
  }
