import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/schema/userSchema';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInForm!: FormGroup;
  user!: User;
  constructor(
    private localService: LocalService,
    private auth: AuthenticateService,
    private router: Router
  ) {}
  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{5,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  login() {
    if (this.signInForm.invalid)
      return this.localService.toNotify('red', 'INVALID FORM');
    this.localService.showSpinner.next(true);
    this.user = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
    };
    this.auth.userLogin(this.user).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.data.user.name);
        // console.log(res.data.user);
        if (res.data.user.role === 'admin') {
          localStorage.setItem('admin', 'true');
        }
        this.localService.showSpinner.next(false);
        this.localService.toNotify('green', 'SUCCESSFULLY SIGNED IN');
        setTimeout(() => {
          this.router.navigateByUrl('/authenticated');
        }, 1000);
      },
      error: (err: any) => {
        if (err.status === 0) {
          this.localService.showSpinner.next(false);
          return this.localService.toNotify('red', 'No Internet Connection');
        }
        this.localService.toNotify('red', err.error.message);
        this.localService.showSpinner.next(false);
      },
    });
  }
}
