package com.mathewtri.recipeZ.service.recipe;

import com.mathewtri.recipeZ.model.Recipe;

import java.util.List;

public interface IRecipeService {

    boolean createRecipe(String userId, Recipe recipe);
    List<Recipe> fetchRecipes(String userId);
    Recipe fetchRecipeById(String userId, String recipeId);
    void deleteRecipeById(String userId, String recipeId);
    void updateRecipe(String userId, Recipe recipe);
}
