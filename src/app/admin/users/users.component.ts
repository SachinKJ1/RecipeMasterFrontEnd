import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any = [];
  errorMsg: string | null = null;
  constructor(
    private adminService: AdminService,
    private localService: LocalService
  ) {
    if (!this.users.length || !this.errorMsg) {
      this.localService.showSpinner.next(true);
    }
  }
  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.data.onlyUsers;
        this.localService.showSpinner.next(false);
        // console.log(this.users)
      },
      error: (err) => {
        // console.log(err);
        if (err.status === 401) {
          this.errorMsg = err.error.message;
        } else this.errorMsg = 'Something went wrong! Please try again.';
        this.localService.showSpinner.next(false);
      },
    });
  }

  deleteUser(id: string) {
    this.localService.showSpinner.next(true);
    this.adminService.deleteUser(id).subscribe({
      next: (res: any) => {
        window.location.reload();

        this.localService.showSpinner.next(false);
        // console.log(this.users)
      },
      error: (err) => {
        // console.log(err);
        if (err.status === 401) {
          this.errorMsg = err.error.message;
        } else this.errorMsg = 'Something went wrong! Please try again.';
        this.localService.showSpinner.next(false);
      },
    });
  }
}
