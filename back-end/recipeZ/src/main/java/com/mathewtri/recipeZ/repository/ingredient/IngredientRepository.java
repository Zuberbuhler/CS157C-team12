package com.mathewtri.recipeZ.repository.ingredient;

import com.mathewtri.recipeZ.model.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class IngredientRepository implements IIngredientRepository{

    private final RedisTemplate redisTemplate;
    private final String KEY = "INGREDIENT";

    @Autowired
    public IngredientRepository(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public boolean createIngredient(String userId, Ingredient ingredient) {
        System.out.println(ingredient);
        try{
            redisTemplate.opsForHash().put(KEY + userId, ingredient.getId(), ingredient);
            return true;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<Ingredient> fetchIngredients(String userId) {
        return redisTemplate.opsForHash().values(KEY + userId);
    }

    @Override
    public Ingredient findIngredientById(String userId, String ingredientId) {
        return (Ingredient) redisTemplate.opsForHash().get(KEY + userId, ingredientId);
    }

    @Override
    public void deleteIngredient(String userId, String ingredientId) {
        redisTemplate.opsForHash().delete(KEY + userId, ingredientId);
    }

    @Override
    public void updateIngredient(String userId, Ingredient ingredient) {
        createIngredient(userId, ingredient);
    }
}
