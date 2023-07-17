import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeHomeComponent } from './recipe-home/recipe-home.component';

import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { SharedModule } from '../shared/shared.module';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { AuthHomeComponent } from './auth-home/auth-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewCurrentUserComponent } from './view-current-user/view-current-user.component';

@NgModule({
  declarations: [
    RecipeHomeComponent,
    RecipeViewComponent,
    CreateRecipeComponent,
    ManageRecipeComponent,
    BookmarksComponent,
    AuthHomeComponent,
    UpdateRecipeComponent,
    ViewUserComponent,
    ViewCurrentUserComponent,
  ],
  imports: [CommonModule, RecipeRoutingModule, SharedModule,ReactiveFormsModule],
})
export class RecipeModule {}
