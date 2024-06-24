import { Component, Input } from '@angular/core';
import { Recipe } from '../../../../models/recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input({ required: true }) recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  getRecipeIndex() {
    return this.recipeService.getIndexById(this.recipe.id);
  }
}
