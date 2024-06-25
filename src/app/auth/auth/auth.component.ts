import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

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

  constructor(private authService: AuthService) {}

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
    if (!this.isLoggedIn) {
      if (this.form.invalid) {
        return;
      }
      if (!this.isLoginMode) {
        this.authService.signUp(
          this.form.value.email,
          this.form.value.password
        );
      } else {
        this.authService.login(this.form.value.email, this.form.value.password);
      }
    } else {
      this.authService.logout();
    }
    this.form.reset();
  }
}
