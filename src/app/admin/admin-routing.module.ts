import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UsersRecipeComponent } from './users-recipe/users-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: 'recipes',
        component: RecipesComponent,
      },
      {
        path: 'usersRecipe/:id',
        component: UsersRecipeComponent,
      },
      {
        path: ':id',
        component: ViewRecipeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
