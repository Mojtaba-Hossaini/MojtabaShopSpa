import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.sevice';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', { static: false }) shopForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.startEditing.subscribe(
      (id: number) => {
        this.editItemIndex = id;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(id);
        this.shopForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  addItem(form: NgForm) {
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editItemIndex, new Ingredient(form.value.name, form.value.amount));
    } else {
      this.shoppingService.addIngredient(
        new Ingredient(form.value.name, form.value.amount));
    }
    this.editMode = false;
    form.reset();
    }

    onClear() {
      this.shopForm.reset();
      this.editMode = false;
    }

    onDelete() {
      this.shoppingService.deleteIngredient(this.editItemIndex);
      this.shopForm.reset();
      }

}
