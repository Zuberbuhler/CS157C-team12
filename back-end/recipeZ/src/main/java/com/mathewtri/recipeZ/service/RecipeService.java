package com.mathewtri.recipeZ.service;

import com.mathewtri.recipeZ.model.Recipe;
import com.mathewtri.recipeZ.model.User;
import com.mathewtri.recipeZ.repository.RecipeRepository;
import com.mathewtri.recipeZ.repository.UserRepository;
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
    public boolean createRecipe(Recipe recipe){
        List<Recipe> recipes = recipeRepository.fetchRecipes(recipe.getUserId());
        boolean isExisted = recipes.stream()
                .anyMatch(currentRecipe -> currentRecipe.getRecipe_name().equals(recipe.getRecipe_name()));
        if (isExisted) {
            return false;
        }
        return recipeRepository.createRecipe(recipe);
    }

    @Override
    public List<Recipe> fetchRecipes(String userId) {
        return recipeRepository.fetchRecipes(userId);
    }

    @Override
    public Recipe fetchRecipeById(String userId, String recipeId) {
        return recipeRepository.fetchRecipeById(userId, recipeId);
    }

    public void deleteRecipeById(String userId, String recipeId)
    {
        recipeRepository.deleteRecipeById(userId, recipeId);
    }

}
