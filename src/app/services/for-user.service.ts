import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForUserService {
  // baseUrl = 'http://localhost:3000';
  baseUrl = 'https://recipemasterpizza.onrender.com';

  userBaseUrl = `${this.baseUrl}/api/v1/users`;
  constructor(private http: HttpClient) {}

  getRecipeCreatedUser(id: string) {
    return this.http.get(`${this.userBaseUrl}/user/${id}`);
  }

  getCurrentUser() {
    return this.http.get(`${this.userBaseUrl}/currentUser`);
  }
}
