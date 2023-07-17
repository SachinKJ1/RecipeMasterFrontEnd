import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageValidation } from 'src/app/Validators/image-validation';
import { ForRecipesService } from 'src/app/services/for-recipes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css'],
})
export class UpdateRecipeComponent {
  addForm!: FormGroup;
  recipe: any = {};
  realRecipe: any = {};
  errorMsg: string | null = null;
  constructor(
    private imageValidator: ImageValidation,
    private route: ActivatedRoute,
    private apiRecipe: ForRecipesService,
    private localService: LocalService,
    private router: Router,
    private cdref: ChangeDetectorRef
  ) {}
  ngOnInit() {
    if (!this.errorMsg) {
      this.localService.showSpinner.next(true);
    }
    const { id } = this.route.snapshot.params;
    this.apiRecipe.getOneRecipes(id).subscribe({
      next: (res: any) => {
        this.realRecipe = res.data;
        this.recipe = res.data;
        this.addForm.get('title')?.setValue(this.recipe.title);
        this.addForm.get('cooking_time')?.setValue(this.recipe.cooking_time);
        this.addForm.get('image_url')?.setValue(this.recipe.image_url);
        this.addForm.get('source_url')?.setValue(this.recipe.source_url);

        // pushing to ingredients form array
        this.recipe.ingredients.forEach((ing: any) => {
          const ingredients = new FormGroup({
            quantity: new FormControl(ing.quantity),
            unit: new FormControl(ing.unit),
            description: new FormControl(ing.description, Validators.required),
          });
          (<FormArray>this.addForm.get('ingredients')).push(ingredients);
        });
        this.localService.showSpinner.next(false);
      },
      error: (err: any) => {
        this.errorMsg = 'Something went wrong! Please try again Later';
        this.localService.showSpinner.next(false);
      },
    });

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
    let initialObj = {
      title: this.realRecipe.title,
      cooking_time: this.realRecipe.cooking_time,
      source_url: this.realRecipe.source_url,
      image_url: this.realRecipe.image_url,
      ingredients: this.realRecipe.ingredients,
    };
    initialObj.ingredients.forEach((val: any) => {
      delete val._id;
      delete val.id;
    });
    let initial = JSON.stringify(initialObj);
    let final = JSON.stringify(this.addForm.value);

    if (initial == final) {
      return this.localService.toNotify('red', 'Nothing Changed');
    }
    if (this.addForm.invalid) {
      return this.localService.toNotify('red', 'INVALID FORM');
    }

    this.localService.showSpinner.next(true);
    this.apiRecipe
      .updateRecipe(this.addForm.value, this.realRecipe._id)
      .subscribe({
        next: (res: any) => {
          this.localService.showSpinner.next(false);
          this.localService.toNotify('green', 'Recipe Updated Successfully');
          this.router.navigateByUrl('/authenticated');
        },
        error: (err: any) => {
          this.localService.showSpinner.next(false);
          this.localService.toNotify('red', err.error.message);
        },
      });
  }
  clear() {
    let frmArray = this.addForm.get('ingredients') as FormArray;
    frmArray.reset();
    this.addForm.reset();
  }
}

/* 
 // comparing two objects
    if (JSON.stringify(this.recipe) === JSON.stringify(update)) {
      alert('No Changed Values');
      return;
    } 
    
    cooking_time
: 
30
image_url
: 
"http://forkify-api.herokuapp.com/images/1649634_MEDIUMd3fc.jpg"
ingredients
: 
(6) [{…}, {…}, {…}, {…}, {…}, {…}]
publisher
: 
"BBC Good Food"
servings
: 
4
source_url
: 
"http://www.bbcgoodfood.com/recipes/1649634/pitta-pizzas"
title
: 
"Pitta pizzas"
_id
: 
"6491c7cef03c042110554559"
    */
