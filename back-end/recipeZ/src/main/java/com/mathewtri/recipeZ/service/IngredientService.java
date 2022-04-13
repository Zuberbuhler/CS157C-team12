package com.mathewtri.recipeZ.service;

import com.mathewtri.recipeZ.model.Ingredient;
import com.mathewtri.recipeZ.repository.IngredientRepository;
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
    public void createIngredient(String userId, Ingredient ingredient) {
        ingredientRepository.createIngredient(userId, ingredient);
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
