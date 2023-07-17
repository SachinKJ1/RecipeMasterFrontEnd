import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipeHomeComponent } from './recipe-home/recipe-home.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { AuthHomeComponent } from './auth-home/auth-home.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewCurrentUserComponent } from './view-current-user/view-current-user.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeHomeComponent,
    children: [
      {
        path: '',
        component: AuthHomeComponent,
      },

      {
        path: 'create',
        component: CreateRecipeComponent,
      },
      {
        path: 'manage',
        component: ManageRecipeComponent,
      },
      {
        path: 'currentUser',
        component: ViewCurrentUserComponent,
      },
      {
        path: 'update/:id',
        component: UpdateRecipeComponent,
      },
      {
        path: 'recipeCreater/:id',
        component: ViewUserComponent,
      },
      

      {
        path: 'bookmarks',
        component: BookmarksComponent,
      },
      {
        path: ':id',
        component: RecipeViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
