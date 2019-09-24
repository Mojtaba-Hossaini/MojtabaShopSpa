import { RecipeService } from './../recipe.sevice';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.selectedRecipe = this.recipeService.getrecipe(this.id);
      }
    );
  }

  addToShoppingList() {
    this.recipeService.addIngredients(this.selectedRecipe.ingredients)
  }

}
