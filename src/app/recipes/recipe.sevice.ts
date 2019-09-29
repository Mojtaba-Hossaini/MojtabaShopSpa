import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shoppinglist.sevice';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

//    private recipes: Recipe[] = [
//         new Recipe('کریستوفر نولان',
//          'بهترین کارگردان حال حاضر سینما',
//          'https://pmcvariety.files.wordpress.com/2018/05/nolan.jpg?w=1000',
//           [
//               new Ingredient('اینسپشن', 10),
//               new Ingredient('اینتراستالر', 9)
//           ]),
//         new Recipe('هیچ کاک', 'کصکش ترین کارگردان',
//          'https://ichef.bbci.co.uk/news/660/cpsprodpb/4DAA/production/_104228891_mediaitem104228889.jpg', [
//              new Ingredient('سرگیجه', 6),
//              new Ingredient('طناب', 4)
//          ])
//       ];

private recipes: Recipe[] = [];

      constructor(private shopService: ShoppingListService) {}

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }

      getrecipe(id: number) {
          return this.recipes[id];
      }

      addRecipe(recipe: Recipe) {
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice())
      }

      updateRecipe(id: number, newRecipe: Recipe) {
          this.recipes[id] = newRecipe;
          this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(id: number) {
          this.recipes.splice(id, 1);
          this.recipesChanged.next(this.recipes.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.shopService.addIngredients(ingredients);
      }
}