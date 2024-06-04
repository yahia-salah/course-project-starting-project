import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    {
      id: 'r1',
      name: 'Schnitzel',
      description: 'A super-tasty Schnitzel - just awesome!',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ingredients: [
        { name: 'French Fries', amount: 1 },
        { name: 'Pork Meat', amount: 2 },
        { name: 'Salad', amount: 3 },
      ],
    },
    {
      id: 'r2',
      name: 'Spaghetti',
      description: 'Italian Spaghetti with tomato sauce',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/a/ac/Pasta_Puttanesca.jpg',
      ingredients: [
        { name: 'Spaghetti', amount: 1 },
        { name: 'Meat', amount: 4 },
        { name: 'Tomatoes', amount: 2 },
      ],
    },
    {
      id: 'r3',
      name: 'Hamburger',
      description: 'American Hamburger with beef patty',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/0/0b/RedDot_Burger.jpg',
      ingredients: [
        { name: 'Buns', amount: 1 },
        { name: 'Beef Patty', amount: 2 },
        { name: 'Salad', amount: 3 },
      ],
    },
    {
      id: 'r4',
      name: 'Pizza',
      description: 'Italian Pizza with tomato sauce',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg',
      ingredients: [
        { name: 'Dough', amount: 1 },
        { name: 'Tomato Sauce', amount: 4 },
        { name: 'Cheese', amount: 8 },
      ],
    },
    {
      id: 'r5',
      name: 'Salad',
      description: 'Healthy Salad with vegetables',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/9/94/Salad_platter.jpg',
      ingredients: [
        { name: 'Lettuce', amount: 1 },
        { name: 'Tomatoes', amount: 1 },
        { name: 'Cucumber', amount: 1 },
      ],
    },
    {
      id: 'r6',
      name: 'Curry',
      description: 'Indian Curry with chicken',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Chicken_preparation_in_Malvani_style.jpg/1024px-Chicken_preparation_in_Malvani_style.jpg',
      ingredients: [
        { name: 'Rice', amount: 1 },
        { name: 'Chicken', amount: 1 },
        { name: 'Curry', amount: 1 },
      ],
    },
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return [...this.recipes];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
