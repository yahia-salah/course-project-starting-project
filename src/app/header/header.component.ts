import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { LoadingSpinnerService } from '../shared/loading-spinner.service';
import { finalize, catchError, throwError, Subscription } from 'rxjs';
import { SweetAlertService } from '../shared/sweetalert.service';
import { User } from 'firebase/auth';
import {
  faEllipsis,
  faCloudArrowDown,
  faCloudArrowUp,
  faArrowRightFromBracket,
  faBowlFood,
  faVial,
} from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authStateSubscription: Subscription;
  isLoggedIn = false;
  user: User;
  faEllipsis = faEllipsis;
  faCloudArrowDown = faCloudArrowDown;
  faCloudArrowUp = faCloudArrowUp;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faBowlFood = faBowlFood;
  faVial = faVial;
  @ViewChild('bdNavbarToggle') bdNavbarToggle: ElementRef;
  @ViewChild('bdNavbar') bdNavbar: ElementRef;

  constructor(
    private recipeService: RecipeService,
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

  onLoadExampleData() {
    this.recipeService.setExampleRecipes();
  }

  onNavClick(event: MouseEvent) {
    if (this.bdNavbar.nativeElement.classList.contains('show')) {
      this.bdNavbarToggle.nativeElement.click();
    }
  }
}
