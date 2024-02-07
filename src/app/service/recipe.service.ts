import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseRecipeUrl: string = 'http://localhost:8080/api/recipes';

  constructor(private http: HttpClient) {}

  recipeSubject = new BehaviorSubject<any>({
    recipes: [],
    loading: false,
    newRecipe: null,
  });

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    });
  }

  getRecipes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseRecipeUrl}`, { headers }).pipe(
      tap((recipes) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes });
      })
    );
  }

  createRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseRecipeUrl}`, recipe, { headers }).pipe(
      tap((newRecipe) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({
          ...currentState,
          recipes: [newRecipe, ...currentState.recipes],
        });
      })
    );
  }
  updateRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseRecipeUrl}/${recipe.id}`, recipe, { headers })
      .pipe(
        tap((updatedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const UpdateRecipes = currentState.recipes.map((item: any) =>
            item.id === updatedRecipe.id ? updatedRecipe : item
          );
          this.recipeSubject.next({
            ...currentState,
            recipes: UpdateRecipes,
          });
        })
      );
  }
  deleteRecipe(recipeId: number) {
    const headers = this.getHeaders();
    // /{recipeId}
    this.http.delete(`${this.baseRecipeUrl}/${recipeId}`, { headers }).pipe(
      tap((deletedRecipe: any) => {
        const currentState = this.recipeSubject.value;
        const UpdateRecipes = currentState.recipes.filter(
          (item: any) => item.id !== recipeId
        );
        this.recipeSubject.next({
          ...currentState,
          recipes: UpdateRecipes,
        });
      })
    );
  }
  likeRecipe(recipeId: number): Observable<any> {
    const headers = this.getHeaders();
    console.log(`${this.baseRecipeUrl}/${recipeId}/like`);
    return this.http
      .put(`${this.baseRecipeUrl}/${recipeId}/like`, null, { headers: headers })
      .pipe(
        tap((likedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const UpdateRecipes = currentState.recipes.map((item: any) =>
            item.id === likedRecipe.id ? likedRecipe : item
          );
          this.recipeSubject.next({
            ...currentState,
            recipes: UpdateRecipes,
          });
        })
      );
  }
}
