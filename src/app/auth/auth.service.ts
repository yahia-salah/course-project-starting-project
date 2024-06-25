import { catchError, from, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  signUp(email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      catchError((error) => {
        return throwError(() => new Error(this.translateError(error)));
      })
    );
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((error) => {
        return throwError(() => new Error(this.translateError(error)));
      })
    );
  }

  logout() {
    return from(this.auth.signOut()).pipe(
      catchError((error) => {
        return throwError(() => new Error(this.translateError(error)));
      })
    );
  }

  private translateError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password.';
      default:
        return 'An error occurred.';
    }
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  get authState$() {
    return authState(this.auth);
  }
}
