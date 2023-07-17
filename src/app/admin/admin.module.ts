import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { UsersRecipeComponent } from './users-recipe/users-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { RecipesComponent } from './recipes/recipes.component';


@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    UsersRecipeComponent,
    ViewRecipeComponent,
    RecipesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
