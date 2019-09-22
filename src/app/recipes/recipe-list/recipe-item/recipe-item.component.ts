import { RecipeService } from './../../recipe.sevice';
import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
 
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onSelectRecipe() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
