import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Recipe 1',
      imageUrl: 'https://prods3.imgix.net/images/articles/2017_04/Non-featured-Chorizo-egg-recipe.jpg',
      ingredients: ['French Fries', 'Pork Meat', 'Salad']
    },
    {
      id: 'r2',
      title: 'Recipe 2',
      imageUrl: 'https://images.media-allrecipes.com/images/56589.png',
      ingredients: ['Spaguetti', 'Meat', 'Tomatoes']
    }
  ];

  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId) {
    return {
      ...this.recipes.find(recipe => recipe.id === recipeId)
    };
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
    this.recipesChanged.next(this.recipes);
  }
}
