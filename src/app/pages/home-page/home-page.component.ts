import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecipeFormComponent } from '../../components/create-recipe-form/create-recipe-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../service/auth.service';
import { RecipeService } from '../../service/recipe.service';
import { Recipe } from '../../model/recipe';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RecipeCardComponent,
    MatIconModule,
    MatButtonModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  recipes: Recipe[] = [];
  user: any = null;
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.authService.authSubject.subscribe((auth: any) => {
      this.user = auth.user;
    });
    this.recipeService.getRecipes().subscribe({
      next: (res: any) => {
        console.log(res, 'rrr');
      },
    });
    this.recipeService.recipeSubject.subscribe((recipeState) => {
      console.log(recipeState, '222');
      this.recipes = recipeState.recipes;
    });
  }

  handleOpenCreateForm() {
    const dialogOption = {
      width: '500px',
      margin: '0 auto',
    };
    this.dialog.open(CreateRecipeFormComponent, dialogOption);
  }
}
