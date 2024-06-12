import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../../models/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form: NgForm;
  @Output() clear = new EventEmitter<void>();
  ingredient: Ingredient;
  subscription: Subscription;
  editMode = false;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (ingredient) => {
        this.ingredient = ingredient;
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
        this.editMode = true;
      }
    );
  }

  onAdd() {
    if (this.editMode) {
      this.ingredient.name = this.form.value.name;
      this.ingredient.amount = parseInt(this.form.value.amount);
    } else {
      this.shoppingService.addIngredient({
        name: this.form.value.name,
        amount: parseInt(this.form.value.amount),
      });
      this.form.reset();
    }
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
    this.clear.emit();
  }

  onDelete() {
    this.form.reset();
    this.editMode = false;
    this.shoppingService.deleteIngredient(this.ingredient);
  }

  getControl(name: string) {
    return this.form?.controls[name];
  }
}
