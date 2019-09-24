import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientAdded = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('اینسپشن', 10),
        new Ingredient('بین ستاره ای', 5)
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient) {
          this.ingredients.push(ingredient);
          this.ingredientAdded.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
          this.ingredients.push(...ingredients);
          this.ingredientAdded.next(this.ingredients.slice());
      }
}