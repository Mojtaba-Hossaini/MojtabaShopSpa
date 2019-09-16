import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('کریستوفر نولان', 'بهترین کارگردان حال حاضر سینما', 'https://pmcvariety.files.wordpress.com/2018/05/nolan.jpg?w=1000'),
    new Recipe('هیچ کاک', 'کیری ترین کارگردان',
     'https://ichef.bbci.co.uk/news/660/cpsprodpb/4DAA/production/_104228891_mediaitem104228889.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
