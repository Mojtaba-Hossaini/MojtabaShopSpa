import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shoppinglist.sevice';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
   private recipes: Recipe[] = [
        new Recipe('کریستوفر نولان',
         'بهترین کارگردان حال حاضر سینما',
         'https://pmcvariety.files.wordpress.com/2018/05/nolan.jpg?w=1000',
          [
              new Ingredient('اینسپشن', 10),
              new Ingredient('اینتراستالر', 9)
          ]),
        new Recipe('هیچ کاک', 'کصکش ترین کارگردان',
         'https://ichef.bbci.co.uk/news/660/cpsprodpb/4DAA/production/_104228891_mediaitem104228889.jpg', [
             new Ingredient('سرگیجه', 6),
             new Ingredient('طناب', 4)
         ])
      ];

      constructor(private shopService: ShoppingListService) {}

      getRecipes() {
          return this.recipes.slice();
      }

      getrecipe(id: number) {
          return this.recipes[id];
      }

      addIngredients(ingredients: Ingredient[]) {
        this.shopService.addIngredients(ingredients);
      }
}