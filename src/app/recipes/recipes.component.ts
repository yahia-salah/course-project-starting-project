import { Component } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  selectedRecipe: Recipe;

  onSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
    console.log('Show recipe detail:', recipe);
  }
}
