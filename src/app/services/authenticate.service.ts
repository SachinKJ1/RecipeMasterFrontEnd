import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../schema/userSchema';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  // baseUrl = 'http://localhost:3000';
  baseUrl = 'https://recipemasterpizza.onrender.com';

  userBaseUrl = `${this.baseUrl}/api/v1/users`;

  constructor(private http: HttpClient) {}

  userSignUp(user: User) {
    return this.http.post(`${this.userBaseUrl}/signUp`, user);
  }

  userLogin(user: User) {
    return this.http.post(`${this.userBaseUrl}/login`, user);
  }
  changePassword(user: User) {
    return this.http.post(`${this.userBaseUrl}/updatePassword`, user);
  }
  updateUser(user: any) {
    return this.http.patch(`${this.userBaseUrl}/updateCurrentUser`, user);
  }
  deleteCurrentUser() {
    return this.http.delete(`${this.userBaseUrl}/deleteMe`);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    return !!localStorage.getItem('admin');
  }
}
