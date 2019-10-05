import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.sevice';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  serverUrl = 'https://mojtaba-spa-bc155.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.serverUrl + 'recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  getRecipe() {
     return this.http.get<Recipe[]>(this.serverUrl + 'recipes.json').pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }), tap(recipes => {
      this.recipeService.setRecipe(recipes);
    }));
  }


}
