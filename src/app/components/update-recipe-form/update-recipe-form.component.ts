import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Recipe } from '../../model/recipe';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeService } from '../../service/recipe.service';

@Component({
  selector: 'app-update-recipe-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './update-recipe-form.component.html',
  styleUrl: './update-recipe-form.component.scss',
})
export class UpdateRecipeFormComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateRecipeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipe,
    private recipeService: RecipeService
  ) {}

  onSubmit() {
    console.log(this.data);
    this.recipeService.updateRecipe(this.data).subscribe((res: any) => {
      console.log('update', res);
      this.closeDialog();
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
