import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  subscription: Subscription;
  selectedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
        this.selectedIngredient = null;
        this.ingredients[this.ingredients.length - 1];
      }
    );
  }

  onEditItem(ingredient: Ingredient) {
    this.selectedIngredient = ingredient;
    this.shoppingListService.startedEditing.next(ingredient);
  }

  onClear() {
    this.selectedIngredient = null;
  }
}
