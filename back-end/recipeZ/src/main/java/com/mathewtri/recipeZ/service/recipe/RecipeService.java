package com.mathewtri.recipeZ.service.recipe;

import com.mathewtri.recipeZ.model.Recipe;
import com.mathewtri.recipeZ.repository.recipe.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService implements IRecipeService {


    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @Override
    public boolean createRecipe(String userId, Recipe recipe){
        List<Recipe> recipes = recipeRepository.fetchRecipes(userId);
        boolean isExisted = recipes.stream()
                .anyMatch(currentRecipe -> currentRecipe.getRecipe_name().equals(recipe.getRecipe_name()));
        if (isExisted) {
            return false;
        }
        return recipeRepository.createRecipe(userId, recipe);
    }

    @Override
    public List<Recipe> fetchRecipes(String userId) {
        return recipeRepository.fetchRecipes(userId);
    }

    @Override
    public Recipe fetchRecipeById(String userId, String recipeId) {
        return recipeRepository.fetchRecipeById(userId, recipeId);
    }

    @Override
    public void deleteRecipeById(String userId, String recipeId)
    {
        recipeRepository.deleteRecipeById(userId, recipeId);
    }

    @Override
    public void updateRecipe(String userId, Recipe recipe) {
        recipeRepository.updateRecipe(userId, recipe);
    }
}
