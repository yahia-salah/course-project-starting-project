import { catchError, from, map, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  autoLogoutTimer: NodeJS.Timeout;
  constructor(private auth: Auth, private router: Router) {}

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
    clearTimeout(this.autoLogoutTimer);
    return from(this.auth.signOut()).pipe(
      catchError((error) => {
        return throwError(() => new Error(this.translateError(error)));
      }),
      tap({ complete: () => this.router.navigate(['/auth']) })
    );
  }

  private autoLogout(user: User) {
    console.log('Setting auto logout timer.');
    console.log(
      'Token Expiry: ',
      new Date((<any>user).stsTokenManager.expirationTime)
    );
    this.autoLogoutTimer = setTimeout(() => {
      console.log('Logging out user automatically.');
      this.logout();
    }, (<any>user).stsTokenManager.expirationTime - Date.now());
  }

  private translateError(error: any) {
    console.log('Translating Error: ', error);
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password.';
      case 'auth/too-many-requests':
        return 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
      default:
        return 'An error occurred.';
    }
  }

  get currentUser$() {
    return from(this.auth.authStateReady()).pipe(
      map(() => this.auth.currentUser)
    );
  }

  get authState$() {
    return authState(this.auth).pipe(
      tap({
        next: (user) => {
          if (user) this.autoLogout(user);
        },
      })
    );
  }

  get user$() {
    return user(this.auth);
  }
}
