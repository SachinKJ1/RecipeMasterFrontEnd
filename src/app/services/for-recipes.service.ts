import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../schema/recipeSchema';

@Injectable({
  providedIn: 'root',
})
export class ForRecipesService {
  // baseUrl = 'http://localhost:3000';
  baseUrl = 'https://recipemasterpizza.onrender.com';

  recipeBaseUrl = `${this.baseUrl}/api/v1/recipes`;
  bookmarksBaseUrl = `${this.baseUrl}/api/v1/bookmarks`;
  defaultQuery = '?fields=title,image_url,cooking_time,createdBy';
  constructor(private http: HttpClient) {}

  getAllRecipes(page = 1, queryString = '') {
    return this.http.get(
      `${this.recipeBaseUrl}${this.defaultQuery}&page=${page}${queryString}`
    );
  }

  getOneRecipes(id: string) {
    return this.http.get(`${this.recipeBaseUrl}/${id}`);
  }

  getUserCreatedRecipes() {
    return this.http.get(`${this.recipeBaseUrl}/userRecipes`);
  }

  getUserBookmarks() {
    return this.http.get(`${this.bookmarksBaseUrl}/userBookmarks`);
  }
  addToBookmarks(recipe: string) {
    return this.http.post(`${this.bookmarksBaseUrl}`, { recipe });
  }
  removeFromBookmarks(id: string) {
    return this.http.delete(`${this.bookmarksBaseUrl}/${id}`);
  }

  CreateRecipe(recipe: Recipe) {
    return this.http.post(`${this.recipeBaseUrl}`, recipe);
  }
  updateRecipe(recipe: Recipe, id: string) {
    return this.http.patch(`${this.recipeBaseUrl}/${id}`, recipe);
  }
  deleteRecipe(id: string) {
    return this.http.delete(`${this.recipeBaseUrl}/${id}`);
  }
}

/* 
  getOneRecipes(id: string) {
    return this.http.get(`${this.recipeBaseUrl}/${id}`, {
      headers: new HttpHeaders({
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTZjZmMyZDIzY2RkOGUwMjkzMjExYyIsImlhdCI6MTY4NzYwODQ4NiwiZXhwIjoxNjk1Mzg0NDg2fQ.YZVlcWvcZWfcv5aY3b0mlRUa-k3jol6ONZEa6Bo07SY',
      }),
    });
  }
} */
