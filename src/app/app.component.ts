import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingSpinnerService } from './shared/loading-spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadingSubscription: Subscription;

  constructor(private loadingSpinnerService: LoadingSpinnerService) {}

  ngOnInit(): void {
    this.loadingSubscription = this.loadingSpinnerService.loading$.subscribe(
      (loading) => {
        this.isLoading = loading;
        console.log('loading', loading);
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
