import { RecipeService } from './../recipe.sevice';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  addToShoppingList() {
    this.recipeService.addIngredients(this.selectedRecipe.ingredients)
  }

}
