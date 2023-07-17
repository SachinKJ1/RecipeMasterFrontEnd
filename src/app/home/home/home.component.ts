import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForRecipesService } from 'src/app/services/for-recipes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  curPage = 1;
  maxPage = 5;
  minPage = 1;
  recipes: any = [];
  errorMsg: string | null = null;
  showEmptyMsg = false;
  constructor(
    private recipeApi: ForRecipesService,
    private localService: LocalService,
    private router: Router
  ) {}
  ngOnInit() {
    if (!!localStorage.getItem('token')) {
      this.router.navigateByUrl('/authenticated');
    }

    if (!this.recipes.length || !this.errorMsg) {
      this.localService.showSpinner.next(true);
    }
    this.recipeApi.getAllRecipes().subscribe({
      next: (res: any) => {
        this.showEmptyMsg = true;

        this.recipes = res.data;
        this.maxPage = Math.floor(res.results / 12) + 1;
        this.localService.showSpinner.next(false);
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

    this.recipeApi.getAllRecipes(page).subscribe({
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
}
