import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  private loading = false;
  loading$ = new Subject<boolean>();

  constructor() {}

  show() {
    this.loading = true;
    this.loading$.next(this.loading);
  }

  hide() {
    this.loading = false;
    this.loading$.next(this.loading);
  }
}
