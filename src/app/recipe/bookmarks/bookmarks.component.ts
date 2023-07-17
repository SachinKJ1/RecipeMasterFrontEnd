import { Component } from '@angular/core';
import { ForRecipesService } from 'src/app/services/for-recipes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent {
  recipes: any = [];
  notLoading = false;
  errorMsg: string | null = null;
  constructor(
    private localService: LocalService,
    private recipeApi: ForRecipesService
  ) {}
  ngOnInit() {
    if (!this.recipes.length || !this.errorMsg) {
      this.localService.showSpinner.next(true);
    }
    this.recipeApi.getUserBookmarks().subscribe({
      next: (res: any) => {
        this.recipes = res.data.bookmarks;
        this.localService.showSpinner.next(false);
        this.notLoading = true
      },
      error: (err: any) => {
        this.errorMsg = 'Something went wrong! Please try again.';
        this.localService.showSpinner.next(false);
      },
    });
  }

  removeFromBookmarks(id: string) {
    this.localService.showSpinner.next(true);
    this.recipeApi.removeFromBookmarks(id).subscribe({
      next: (res: any) => {
        this.recipes = res.data.bookmarks;
        this.localService.toNotify('green', 'Recipe removed from Bookmarks');
        this.localService.showSpinner.next(false);
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
