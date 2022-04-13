package com.mathewtri.recipeZ.repository;

import com.mathewtri.recipeZ.model.Recipe;
import com.mathewtri.recipeZ.model.User;

import java.util.List;

public interface IRecipeRepository {
    boolean createRecipe(Recipe recipe);
    List<Recipe> fetchRecipes(String userId);
    Recipe fetchRecipeById(String userId, String recipeId);
    void deleteRecipeById(String userId, String recipeId);
}
