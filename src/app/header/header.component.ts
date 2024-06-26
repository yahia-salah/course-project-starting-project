import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { LoadingSpinnerService } from '../shared/loading-spinner.service';
import { finalize, catchError, throwError, Subscription } from 'rxjs';
import { SweetAlertService } from '../shared/sweetalert.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authStateSubscription: Subscription;
  isLoggedIn = false;
  user: User;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private loadingSpinnerService: LoadingSpinnerService,
    private toastService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.authStateSubscription = this.authService.authState$.subscribe(
      (user) => {
        console.log(user);
        this.user = user;
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

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.loadingSpinnerService.show();
    this.authService
      .logout()
      .pipe(
        finalize(() => this.loadingSpinnerService.hide()),
        catchError((error) => {
          this.toastService.showToast({
            content: error.message,
            icon: 'error',
          });
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
