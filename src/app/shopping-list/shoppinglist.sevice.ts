import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientAdded = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('اینسپشن', 10),
        new Ingredient('بین ستاره ای', 5)
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number) {
          return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient) {
          this.ingredients.push(ingredient);
          this.ingredientAdded.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
          this.ingredients.push(...ingredients);
          this.ingredientAdded.next(this.ingredients.slice());
      }

      updateIngredient(id: number, newIngredient: Ingredient) {
          this.ingredients[id] = newIngredient;
          this.ingredientAdded.next(this.ingredients.slice());
      }

      deleteIngredient(id: number) {
          this.ingredients.splice(id, 1);
          this.ingredientAdded.next(this.ingredients.slice());
      }
}