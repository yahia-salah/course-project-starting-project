import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DropdownDirective, LoadingSpinnerComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FontAwesomeModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownDirective,
    LoadingSpinnerComponent,
    FontAwesomeModule,
  ],
})
export class SharedModule {}
