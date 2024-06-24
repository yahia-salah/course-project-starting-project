import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Recipe } from '../../models/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private recipeService: RecipeService, private http: HttpClient) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(environment.api.baseUrl + '/recipes', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(environment.api.baseUrl + '/recipes').pipe(
      map((recipes) => {
        return (<Recipe[]>recipes).map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ?? [],
          };
        });
      }),
      tap((recipes) => this.recipeService.setRecipes(recipes))
    );
  }
}
