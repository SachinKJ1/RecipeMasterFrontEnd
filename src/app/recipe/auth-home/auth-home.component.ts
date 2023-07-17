import { Component, OnDestroy } from '@angular/core';
import { ForRecipesService } from 'src/app/services/for-recipes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css'],
})
export class AuthHomeComponent {
  sortByAscending: boolean = true;
  sortStateChanged: boolean = false;
  curPage = 1;
  maxPage = 5;
  minPage = 1;
  recipes: any = [];
  errorMsg: string | null = null;
  showEmptyMsg = false;
  placeholder = 'Created Time';
  query = '';

  constructor(
    private recipeApi: ForRecipesService,
    private localService: LocalService
  ) {
    if (!this.recipes.length || !this.errorMsg) {
      this.localService.showSpinner.next(true);
    }
  }
  ngOnInit() {
    this.getAllRecipes();

    this.localService.searchValue.subscribe({
      next: (res: any) => {
        this.localService.showSpinner.next(true);
        this.query = res;
        this.getAllRecipes(1, res);
        // for showing results
        document
          .getElementById('recipes')
          ?.scrollIntoView({ behavior: 'smooth' });
        // window.scroll({ top: 500, left: 0, behavior: 'smooth'});
      },
    });
  }

  getAllRecipes(page = 1, query = '') {
    this.recipeApi.getAllRecipes(page, query).subscribe({
      next: (res: any) => {
        this.recipes = res.data;
        this.maxPage = Math.floor(res.results / 12) + 1;
        this.localService.showSpinner.next(false);
        this.showEmptyMsg = true;
      },
      error: (err: any) => {
        this.errorMsg = 'Something went wrong! Please try again.';
        this.localService.showSpinner.next(false);
      },
    });
  }

  paginate(event: any) {
    this.localService.showSpinner.next(true);
    let page = event.target.dataset.page;

    this.recipeApi.getAllRecipes(page, this.query).subscribe({
      next: (res: any) => {
        this.recipes = res.data;
        this.curPage = +page;
        // console.log(page);
        window.scroll({
          top: 500,
          left: 0,
          behavior: 'smooth',
        });
        this.localService.showSpinner.next(false);
      },
      error: (err: any) => {
        this.errorMsg = 'Something went wrong! Please try again.';
        this.localService.showSpinner.next(false);
      },
    });
  }

  addToBookmarks(recipeId: string) {
    this.recipeApi.addToBookmarks(recipeId).subscribe({
      next: (res: any) => {
        this.localService.toNotify('green', 'Added to Bookmarks');
      },
      error: (err: any) => {
        if (err.status === 400) {
          return this.localService.toNotify(
            'red',
            'This Recipe is already Bookmarked'
          );
        }
        if (err.status === 401) {
          return this.localService.toNotify('red', err.error.message);
        }
        this.localService.toNotify(
          'red',
          'Something went wrong! Please try again later'
        );
      },
    });
  }

  setCreated() {
    this.placeholder = 'Created Time';
  }
  setCooking() {
    this.placeholder = 'Cooking Time';
    this.sortStateChanged = true;
  }
  onAscClick() {
    this.sortByAscending = true;
  }
  onDscClick() {
    this.sortStateChanged = true;
    this.sortByAscending = false;
  }

  onSort() {
    if (!this.sortStateChanged) return;
    
    if (!this.query.includes('title')) {
      this.query = '';
    }

    let queryString = this.query.replace(
      /\b(&sort=createdAt|&sort=-createdAt|&sort=cooking_time|&sort=-cooking_time)\b/g,
      (query) => ''
    );

    this.curPage = 1;
    if (this.placeholder === 'Created Time') {
      queryString += `&sort=${this.sortByAscending ? '-' : ''}createdAt`;
    }
    if (this.placeholder === 'Cooking Time') {
      queryString += `&sort=${this.sortByAscending ? '' : '-'}cooking_time`;
    }

    if (queryString) this.localService.searchValue.next(queryString);
  }
}
