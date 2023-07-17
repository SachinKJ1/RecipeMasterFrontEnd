import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UniqueEmail } from 'src/app/Validators/unique-email';
import { User } from 'src/app/schema/userSchema';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  user!: User;
  signUpForm!: FormGroup;
  constructor(
    private auth: AuthenticateService,
    private emailValidate: UniqueEmail,
    private localService: LocalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{5,}[.]{1}[a-zA-Z]{2,}'
          ),
        ],
        [this.emailValidate.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  signUp() {
    if (
      this.signUpForm.value.password !== this.signUpForm.value.passwordConfirm
    )
      return this.localService.toNotify('red', 'Password Confirmation Failed');

    if (this.signUpForm.invalid)
      return this.localService.toNotify('red', 'Please check all the fields required');
    this.localService.showSpinner.next(true);

    this.user = {
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      passwordConfirm: this.signUpForm.value.passwordConfirm,
    };
    this.auth.userSignUp(this.user).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.data.user.name);
        this.localService.showSpinner.next(false);
        this.localService.toNotify('green', 'SUCCESSFULLY SIGNED UP');
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
