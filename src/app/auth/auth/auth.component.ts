import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {
  Observable,
  Subscription,
  catchError,
  finalize,
  tap,
  throwError,
} from 'rxjs';
import { LoadingSpinnerService } from '../../shared/loading-spinner.service';
import { Router } from '@angular/router';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  form: FormGroup;
  isLoggedIn = false;
  authStateSubscription: Subscription;
  error: string;
  passwordVisible = false;
  faEyeSlash = faEyeSlash;
  faEye = faEye;

  constructor(
    private authService: AuthService,
    private loadingSpinnerService: LoadingSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.authStateSubscription = this.authService.authState$.subscribe(
      (user) => {
        console.log(user);
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    this.error = null;
    this.loadingSpinnerService.show();
    let authObs: Observable<any>;
    if (!this.isLoggedIn) {
      if (this.form.invalid) {
        this.loadingSpinnerService.hide();
        return;
      }
      if (!this.isLoginMode) {
        authObs = this.authService.signUp(
          this.form.value.email,
          this.form.value.password
        );
      } else {
        authObs = this.authService.login(
          this.form.value.email,
          this.form.value.password
        );
      }
    } else {
      authObs = this.authService.logout();
    }
    authObs
      .pipe(
        finalize(() => this.loadingSpinnerService.hide()),
        catchError((error) => {
          this.error = error.message;
          return throwError(() => error);
        }),
        tap({ complete: () => this.form.reset() })
      )
      .subscribe(() => this.router.navigate(['/']));
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
