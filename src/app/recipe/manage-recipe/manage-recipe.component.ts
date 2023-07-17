import { Component } from '@angular/core';
import { ForRecipesService } from 'src/app/services/for-recipes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrls: ['./manage-recipe.component.css'],
})
export class ManageRecipeComponent {
  recipes: any = [];
  errorMsg: string | null = null;
  notLoading = false;
  constructor(
    private localService: LocalService,
    private recipeApi: ForRecipesService
  ) {}
  ngOnInit() {
    if (!this.recipes.length || !this.errorMsg) {
      this.localService.showSpinner.next(true);
    }
    this.recipeApi.getUserCreatedRecipes().subscribe({
      next: (res: any) => {
        this.recipes = res.data.recipe;
        this.localService.showSpinner.next(false);
        this.notLoading = true;
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
        this.recipes = res.data.recipe;
        this.localService.showSpinner.next(false);
        this.notLoading = true;
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
