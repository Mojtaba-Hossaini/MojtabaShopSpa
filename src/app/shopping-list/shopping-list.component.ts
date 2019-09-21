import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('اینسپشن', 10),
    new Ingredient('بین ستاره ای', 5)
  ];


  constructor() { }

  ngOnInit() {
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
  }

}
