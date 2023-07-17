import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ForUserService } from 'src/app/services/for-user.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-view-current-user',
  templateUrl: './view-current-user.component.html',
  styleUrls: ['./view-current-user.component.css'],
})
export class ViewCurrentUserComponent {
  newImageSelected: boolean = false;
  errorMsg: string | null = null;
  passwordForm!: FormGroup;
  nameChangeForm!: FormGroup;
  @ViewChild('myInput') myInput!: ElementRef;

  user: any = {};
  constructor(
    private userService: ForUserService,
    private localService: LocalService,
    private auth: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.localService.showSpinner.next(true);
    this.userService.getCurrentUser().subscribe({
      next: (res: any) => {
        console.log(res);

        this.user = res.data.user;
        this.localService.showSpinner.next(false);
      },
      error: (err: any) => {
        this.errorMsg = 'Something went wrong! Please try again.';
        this.localService.showSpinner.next(false);
      },
    });

    this.passwordForm = new FormGroup({
      passwordCurrent: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.nameChangeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  logout() {
    this.localService.showSpinner.next(true);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('admin');

    setTimeout(() => {
      this.router.navigateByUrl('');
      this.localService.showSpinner.next(false);
    }, 1000);
  }
  changePassword() {
    if (this.passwordForm.invalid) {
      return this.localService.toNotify('red', 'INVALID FORM');
    }
    if (
      this.passwordForm.value.password !==
      this.passwordForm.value.passwordConfirm
    ) {
      return this.localService.toNotify(
        'red',
        'Password and Password Confirm is not same'
      );
    }
    this.localService.showSpinner.next(true);
    this.auth.changePassword(this.passwordForm.value).subscribe({
      next: (res: any) => {
        this.logout();
        this.localService.showSpinner.next(false);
        this.localService.toNotify(
          'green',
          'Please Sign In with your new Password'
        );
      },
      error: (err: any) => {
        this.localService.showSpinner.next(false);
        this.localService.toNotify(
          'red',
          'Something went wrong! Please try again.'
        );
        // console.log(err);
      },
    });
  }

  changeName() {
    if (this.nameChangeForm.invalid) {
      return this.localService.toNotify('red', 'INVALID FORM');
    }
    this.localService.showSpinner.next(true);

    this.auth.updateUser(this.nameChangeForm.value).subscribe({
      next: (res: any) => {
        // console.log(res);

        this.user.name = res.data.user.name;
        localStorage.setItem('username', res.data.user.name);

        this.localService.showSpinner.next(false);
        this.localService.toNotify('green', 'Name Has Been Updated');
      },
      error: (err: any) => {
        console.log(err);

        this.localService.showSpinner.next(false);
        this.localService.toNotify(
          'red',
          'Something went wrong! Please try again.'
        );
      },
    });
  }

  uploadPicture() {
    if (!this.myInput.nativeElement.value) return;

    const form: FormData = new FormData();
    form.append('photo', this.myInput.nativeElement.files[0]);

    this.auth.updateUser(form).subscribe({
      next: (res: any) => {
        this.user.name = res.data.user.name;
        this.localService.showSpinner.next(false);
        this.localService.toNotify('green', 'Image Has Been Updated');
        window.location.reload();
      },
      error: (err: any) => {
        this.localService.showSpinner.next(false);
        this.localService.toNotify(
          'red',
          'Something went wrong! Please try again.'
        );
      },
    });
  }

  fileSelected(event: any) {
    this.newImageSelected = true;
  }

  deleteAccount() {
    this.localService.showSpinner.next(true);

    this.auth.deleteCurrentUser().subscribe({
      next: (res: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('admin');

        setTimeout(() => {
          this.router.navigateByUrl('');
          this.localService.showSpinner.next(false);
          this.localService.toNotify('green', 'Account Has Been Deleted');
        }, 1000);
      },
      error: (err: any) => {
        this.localService.showSpinner.next(false);
        this.localService.toNotify(
          'red',
          'Something went wrong! Please try again.'
        );
      },
    });
  }
}
