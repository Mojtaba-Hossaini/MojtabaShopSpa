import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientAdded = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('اینسپشن', 10),
        new Ingredient('بین ستاره ای', 5)
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient) {
          this.ingredients.push(ingredient);
          this.ingredientAdded.emit(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
          this.ingredients.push(...ingredients);
          this.ingredientAdded.emit(this.ingredients.slice());
      }
}