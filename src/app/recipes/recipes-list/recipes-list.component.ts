import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
})
export class RecipesListComponent {
  @Output() selectedRecipe = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    {
      id: 'r1',
      name: 'Schnitzel',
      description: 'A super-tasty Schnitzel - just awesome!',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ingredients: ['French Fries', 'Pork Meat', 'Salad'],
    },
    {
      id: 'r2',
      name: 'Spaghetti',
      description: 'Italian Spaghetti with tomato sauce',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/a/ac/Pasta_Puttanesca.jpg',
      ingredients: ['Spaghetti', 'Meat', 'Tomatoes'],
    },
    {
      id: 'r3',
      name: 'Hamburger',
      description: 'American Hamburger with beef patty',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/0/0b/RedDot_Burger.jpg',
      ingredients: ['Buns', 'Beef Patty', 'Salad'],
    },
    {
      id: 'r4',
      name: 'Pizza',
      description: 'Italian Pizza with tomato sauce',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg',
      ingredients: ['Dough', 'Tomato Sauce', 'Cheese'],
    },
    {
      id: 'r5',
      name: 'Salad',
      description: 'Healthy Salad with vegetables',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/9/94/Salad_platter.jpg',
      ingredients: ['Lettuce', 'Tomatoes', 'Cucumber'],
    },
    {
      id: 'r6',
      name: 'Curry',
      description: 'Indian Curry with chicken',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Chicken_preparation_in_Malvani_style.jpg/1024px-Chicken_preparation_in_Malvani_style.jpg',
      ingredients: ['Rice', 'Chicken', 'Curry'],
    },
  ];

  onSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
    console.log('Recipe selected:', recipe);
  }
}
