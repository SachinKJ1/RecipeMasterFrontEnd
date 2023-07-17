import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForRecipesService } from 'src/app/services/for-recipes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent {
  recipe: any = {};
  errorMsg: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private apiRecipe: ForRecipesService,
    private localService: LocalService
  ) {}
  ngOnInit() {
    if (!this.errorMsg) {
      this.localService.showSpinner.next(true);
    }
    const { id } = this.route.snapshot.params;
    this.apiRecipe.getOneRecipes(id).subscribe({
      next: (res: any) => {
        this.recipe = res.data;
        this.localService.showSpinner.next(false);
      },
      error: (err: any) => {
        console.error(err);
        this.errorMsg = 'Something went wrong! Please try again later';
        this.localService.showSpinner.next(false);
      },
    });
  }

  addIngredients() {
    this.recipe.ingredients.forEach((el: any) => {
      if (el.quantity === null) return;
      return (el.quantity = el.quantity / this.recipe.servings + el.quantity);
    });
    this.recipe.servings = this.recipe.servings * 1 + 1;
  }
  subIngredients() {
    if (this.recipe.servings == 1) return;
    this.recipe.ingredients.forEach((el: any) => {
      if (el.quantity === null) return;
      return (el.quantity = el.quantity - el.quantity / this.recipe.servings);
    });
    this.recipe.servings = this.recipe.servings * 1 - 1;
  }
}
