import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input({ required: true }) recipe: Recipe;
  @Output() select = new EventEmitter<void>();

  onSelect() {
    this.select.emit();
    console.log('Recipe item selected!');
  }
}
