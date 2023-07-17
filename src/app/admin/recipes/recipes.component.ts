import { Component } from '@angular/core';
import { ForRecipesService } from 'src/app/services/for-recipes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  curPage = 1;
  maxPage = 5;
  minPage = 1;
  recipes: any = [];
  query = '';
  errorMsg: string | null = null;
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
        console.log(this.recipes);
        // this.showEmptyMsg = true;
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

  deleteRecipe(id: string) {
    this.localService.showSpinner.next(true);
    this.recipeApi.deleteRecipe(id).subscribe({
      next: (res: any) => {
        this.localService.toNotify('green', 'Recipe successfully deleted');
        this.localService.showSpinner.next(false);
        window.location.reload();
      },
      error: (err: any) => {
        this.localService.toNotify(
          'red',
          'Something went wrong! Please try again.'
        );
        this.localService.showSpinner.next(false);
      },
    });
  }
}
