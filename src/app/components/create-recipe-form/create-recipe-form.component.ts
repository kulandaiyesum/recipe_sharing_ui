import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../service/recipe.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-recipe-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss',
})
export class CreateRecipeFormComponent {
  recipeItem: Recipe = {
    title: '',
    description: '',
    image: '',
    vegetarian: '',
  };
  constructor(
    private recipeService: RecipeService,
    public dialogRef: MatDialogRef<CreateRecipeFormComponent>
  ) {}

  onSubmit() {
    console.log(this.recipeItem);
    this.recipeService.createRecipe(this.recipeItem).subscribe((res) => {
      console.log(res);
      this.closeDialog();
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
