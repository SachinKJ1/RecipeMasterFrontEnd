import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForUserService } from 'src/app/services/for-user.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent {
  recipes: any = [];
  errorMsg: string | null = null;

  constructor(
    private userService: ForUserService,
    private route: ActivatedRoute,
    private localService: LocalService
  ) {}
  ngOnInit() {
    if (!this.recipes.length || !this.errorMsg) {
      this.localService.showSpinner.next(true);
    }
    const { id } = this.route.snapshot.params;
    this.userService.getRecipeCreatedUser(id).subscribe({
      next: (res: any) => {
        this.recipes = res.data.user;
        this.localService.showSpinner.next(false);
      },
      error: (err) => {
        this.errorMsg = 'Something went wrong! Please try again.';
        this.localService.showSpinner.next(false);
      },
    });
  }
}
