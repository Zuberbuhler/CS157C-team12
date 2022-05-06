package com.mathewtri.recipeZ.repository.recipe;

import com.mathewtri.recipeZ.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecipeRepository implements IRecipeRepository{
    private final RedisTemplate redisTemplate;
    private final String KEY = "RECIPE";

    @Autowired
    public RecipeRepository(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public boolean createRecipe(String userId, Recipe recipe) {
        try
        {
            redisTemplate.opsForHash().put(KEY + userId, recipe.getId(), recipe);
            return true;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Recipe> fetchRecipes(String userId) {
        return redisTemplate.opsForHash().values(KEY + userId);
    }

    @Override
    public Recipe fetchRecipeById(String userId, String recipeId) {
        return (Recipe) redisTemplate.opsForHash().get(KEY + userId, recipeId);
    }

    @Override
    public void deleteRecipeById(String userId, String recipeId) {
        HashOperations hashOp = redisTemplate.opsForHash();
        hashOp.delete(KEY + userId, recipeId);
    }

    @Override
    public void updateRecipe(String userId, Recipe recipe) {
        createRecipe(userId, recipe);
    }

}
