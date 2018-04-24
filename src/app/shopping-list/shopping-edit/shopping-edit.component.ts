import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') sLForm: NgForm;
  subscription: Subscription;
  editMode = false;
  itemToBeEditedIndex: number;
  itemToBeEdited: Ingredient;

  constructor(private sLService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.sLService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.itemToBeEditedIndex = index;
      this.itemToBeEdited = this.sLService.getIngredient(index);
      this.sLForm.setValue({
        name: this.itemToBeEdited.name,
        amount: this.itemToBeEdited.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newIngredientItem = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.sLService.updateIngredient(this.itemToBeEditedIndex, newIngredientItem);
    } else {
      this.sLService.addIngredient(newIngredientItem);
    }
    this.sLForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.sLForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.sLService.deleteIngredient(this.itemToBeEditedIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
