import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageValidation } from 'src/app/Validators/image-validation';
import { Recipe } from 'src/app/schema/recipeSchema';
import { ForRecipesService } from 'src/app/services/for-recipes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
})
export class CreateRecipeComponent {
  addForm!: FormGroup;
  constructor(
    private imageValidator: ImageValidation,
    private localService: LocalService,
    private recipeService: ForRecipesService,
    private router: Router
  ) {}
  ngOnInit() {
    // Form
    

    this.addForm = new FormGroup({
      title: new FormControl('', Validators.required),
      cooking_time: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      source_url: new FormControl(''),
      image_url: new FormControl('', [
        Validators.required,
        this.imageValidator.validate,
      ]),
      ingredients: new FormArray([]),
    });

    let arrIngredients = ['', '', '', ''];
    arrIngredients.forEach((item) => {
      const ingredients = new FormGroup({
        quantity: new FormControl(''),
        unit: new FormControl(''),
        description: new FormControl('', Validators.required),
      });
      (<FormArray>this.addForm.get('ingredients')).push(ingredients);
    });
  }

  get ingControls() {
    return (this.addForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    const ingredients = new FormGroup({
      quantity: new FormControl(''),
      unit: new FormControl(''),
      description: new FormControl('', Validators.required),
    });
    (<FormArray>this.addForm.get('ingredients')).push(ingredients);
  }

  onRemoveIngredient(i: number) {
    const ingArr: any = this.addForm.get('ingredients');

    // to ensure at least 4 ingredients are added for a Recipe
    if (ingArr.length <= 4) {
      // alert('Atleast 4 Ingredients should be added for a Recipe');
      this.localService.toNotify(
        'red',
        'Atleast 4 Ingredients should be added for a Recipe'
      );
      return;
    }

    ingArr.removeAt(i);
  }

  create() {
    if (this.addForm.invalid) {
      return this.localService.toNotify('red', 'INVALID FORM');
    }
    this.localService.showSpinner.next(true);
    this.recipeService.CreateRecipe(this.addForm.value).subscribe({
      next: (res: any) => {
        this.localService.showSpinner.next(false);
        this.localService.toNotify('green', 'Recipe created successfully');
        this.router.navigateByUrl('/authenticated');
      },
      error: (err: any) => {
        this.localService.toNotify(
          'green',
          'Something Went Wrong! Please try again.'
        );

        this.localService.showSpinner.next(false);
      },
    });
    console.log(this.addForm.value);
  }
  clear() {
    let frmArray = this.addForm.get('ingredients') as FormArray;
    frmArray.reset();
    this.addForm.reset();
  }
}
