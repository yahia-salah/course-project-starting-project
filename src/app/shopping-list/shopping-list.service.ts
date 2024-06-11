import { Injectable } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    { name: 'Apples', amount: 5 },
    { name: 'Tomatoes', amount: 10 },
  ];

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      if (this.ingredients.find((i) => i.name === ingredient.name)) {
        this.ingredients.find((i) => i.name === ingredient.name).amount +=
          ingredient.amount;
      } else {
        this.ingredients.push(ingredient);
      }
    });
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
