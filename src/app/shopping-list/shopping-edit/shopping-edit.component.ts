import { Component, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @Output() delete = new EventEmitter<void>();
  name: string;
  amount: string;

  constructor(private shoppingService: ShoppingListService) {}

  onAdd() {
    this.shoppingService.addIngredient({
      name: this.name,
      amount: parseInt(this.amount),
    });
  }
  onClear() {
    this.name = '';
    this.amount = '';
  }
  onDelete() {
    this.delete.emit();
  }
}
