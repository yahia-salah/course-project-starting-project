import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DropdownDirective, LoadingSpinnerComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownDirective,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
