package com.mathewtri.recipeZ.repository.ingredient;

import com.mathewtri.recipeZ.model.Ingredient;

import java.util.List;

public interface IIngredientRepository {
    boolean createIngredient(String userId, Ingredient ingredient);
    List<Ingredient> fetchIngredients(String userId);
    Ingredient findIngredientById(String userId, String ingredientId);
    void deleteIngredient(String userId, String ingredientId);
    void updateIngredient(String userId, Ingredient ingredient);
}
