package com.mathewtri.recipeZ.controller;

import com.mathewtri.recipeZ.model.Recipe;
import com.mathewtri.recipeZ.service.recipe.IRecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class RecipeController {

    private final IRecipeService recipeService;

    @Autowired
    public RecipeController(IRecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("/{userId}/recipes")
    public ResponseEntity<Boolean> createRecipe(@PathVariable String userId, @RequestBody Recipe recipe){
        boolean success = recipeService.createRecipe(userId, recipe);
        if(success){
            return ResponseEntity.ok(true);
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @GetMapping("/{userId}/recipes")
    public ResponseEntity<List<Recipe>> fetchRecipes(@PathVariable String userId){
        List<Recipe> recipes = recipeService.fetchRecipes(userId);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{userId}/recipes/{recipeId}")
    public ResponseEntity<Recipe> fetchRecipeById(@PathVariable String userId, @PathVariable String recipeId){
        Recipe recipe = recipeService.fetchRecipeById(userId, recipeId);
        if(recipe == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.ok(recipe);
        }
    }

    @DeleteMapping("/{userId}/recipes/{recipeId}")
    public String delete(@PathVariable String userId, @PathVariable String recipeId)
    {
        Recipe recipe = recipeService.fetchRecipeById(userId, recipeId);
        if(recipe == null){
            return "Failed to Delete Recipe: userId or recipeId not found";
        }else{
            recipeService.deleteRecipeById(userId, recipeId);
            return "Deleted Recipe with id " + userId + " and recipeId " + recipeId;
        }
    }

    @PutMapping("/{userId}/recipes")
    public ResponseEntity<Void> updateRecipe(@PathVariable String userId, @RequestBody Recipe recipe){
        System.out.println("Updating Recipe for user id " + userId + " with recipe id " + recipe.getId());
        recipeService.updateRecipe(userId, recipe);
        return ResponseEntity.ok().build();
    }
}
