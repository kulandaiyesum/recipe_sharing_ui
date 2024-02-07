import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UpdateRecipeFormComponent } from '../update-recipe-form/update-recipe-form.component';
import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../service/recipe.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() user: any;
  constructor(public dialog: MatDialog, private recipeService: RecipeService) {}

  updateRecipeForm(recipe: Recipe) {
    const dialogOptions = { width: '500px', margin: '0 auto', data: recipe };
    const dialogRef = this.dialog.open(
      UpdateRecipeFormComponent,
      dialogOptions
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  deleteRecipe(recipe: Recipe) {
    if (recipe.id !== undefined) {
      this.recipeService.deleteRecipe(recipe.id);
    }
  }
  likeRecipe() {
    if (this.recipe.id !== undefined)
      this.recipeService.likeRecipe(this.recipe.id).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
