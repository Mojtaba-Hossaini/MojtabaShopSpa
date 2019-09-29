import { RecipeService } from './../recipes/recipe.sevice';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  serverUrl = 'https://mojtaba-spa-bc155.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.serverUrl + 'recipes.json', recipes).subscribe( respnse => {
      console.log(respnse);
    });
  }

  getRecipes() {
    return this.http.get<Recipe[]>(this.serverUrl + 'recipes.json').pipe(map(recipes => {
      return recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }), tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}
