import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // baseUrl = 'http://localhost:3000';
  baseUrl = 'https://recipemasterpizza.onrender.com';
  userBaseUrl = `${this.baseUrl}/api/v1/users`;
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.userBaseUrl);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.userBaseUrl}/deleteUser/${userId}`);
  }

  deleteRecipe(recipeId: string) {
    return this.http.delete(`${this.userBaseUrl}/deleteUser/${recipeId}`);
  }
}
