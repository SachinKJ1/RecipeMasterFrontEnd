import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForRecipesService } from 'src/app/services/for-recipes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css'],
})
export class AuthHeaderComponent {
  placeholder = 'Recipes';
  showSearch = false;
  query = '';

  constructor(
    private localService: LocalService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  queryBuilder() {
    if (!this.query) return;

    let queryString;

    if (this.placeholder === 'Recipes') {
      queryString = `&title[regex]=${this.query}&title[options]=i`;
    }
    if (this.placeholder === 'Ingredient') {
      queryString = `&ingredients.description[regex]=${this.query}&ingredients.description[options]=i`;
    }
    if (this.placeholder === 'Cooking Time') {
      queryString = `&cooking_time=${this.query}`;
    }
    if (queryString) {
      this.localService.searchValue.next(queryString);

      this.router.navigateByUrl('/authenticated');
    }

    // console.log(queryString);
  }

  setIngredient() {
    this.placeholder = 'Ingredient';
  }
  setCookTime() {
    this.placeholder = 'Cooking Time';
  }
  setRecipe() {
    this.placeholder = 'Recipes';
  }

  ngDoCheck() {
    if (this.router.url === '/authenticated') {
      this.showSearch = true;
    } else this.showSearch = false;
  }
}
