package com.mathewtri.recipeZ.service.ingredient;

import com.mathewtri.recipeZ.model.Ingredient;
import com.mathewtri.recipeZ.repository.ingredient.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService implements IIngredientService{

    private final IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public boolean createIngredient(String userId, Ingredient ingredient) {

        List<Ingredient> ingredients = fetchIngredients(userId);
        boolean isExisted = ingredients.stream()
                .anyMatch(currentIngredient -> currentIngredient.getIngredientName().equals(ingredient.getIngredientName()));
        if (isExisted) {
            System.out.println("Ingredient Already Exists.");
            return false;
        }

        return ingredientRepository.createIngredient(userId, ingredient);
    }

    @Override
    public List<Ingredient> fetchIngredients(String userId) {
        return ingredientRepository.fetchIngredients(userId);
    }

    @Override
    public Ingredient findIngredientById(String userId, String ingredientId) {
        return ingredientRepository.findIngredientById(userId, ingredientId);
    }

    @Override
    public void deleteIngredient(String userId, String ingredientId) {
        ingredientRepository.deleteIngredient(userId, ingredientId);
    }

    @Override
    public void updateIngredient(String userId, Ingredient ingredient) {
        ingredientRepository.updateIngredient(userId, ingredient);
    }
}
