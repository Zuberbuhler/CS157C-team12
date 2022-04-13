package com.mathewtri.recipeZ.controller;

import com.mathewtri.recipeZ.model.Recipe;
import com.mathewtri.recipeZ.model.User;
import com.mathewtri.recipeZ.service.IRecipeService;
import com.mathewtri.recipeZ.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class RecipeController {

    private final IRecipeService recipeService;

    @Autowired
    public RecipeController(IRecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("/recipes")
    public ResponseEntity<Boolean> createRecipe(@RequestBody Recipe recipe){
        boolean success = recipeService.createRecipe(recipe);
        if(success){
            return ResponseEntity.ok(true);
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @GetMapping("/recipes/{userId}")
    public ResponseEntity<List<Recipe>> fetchRecipes(@PathVariable String userId){
        List<Recipe> recipes = recipeService.fetchRecipes(userId);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/recipes/{userId}/{recipeId}")
    public ResponseEntity<Recipe> fetchRecipeById(@PathVariable String userId, @PathVariable String recipeId){
        Recipe recipe = recipeService.fetchRecipeById(userId, recipeId);
        if(recipe == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.ok(recipe);
        }
    }

    @DeleteMapping("/recipes/{userId}/{recipeId}")
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
}
