import { Component, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @Output() add = new EventEmitter<Ingredient>();
  @Output() delete = new EventEmitter<void>();
  name: string;
  amount: string;
  onAdd() {
    this.add.emit({ name: this.name, amount: parseInt(this.amount) });
  }
  onClear() {
    this.name = '';
    this.amount = '';
  }
  onDelete() {
    this.delete.emit();
  }
}
