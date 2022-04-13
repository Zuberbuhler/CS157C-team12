package com.mathewtri.recipeZ.controller;

import com.mathewtri.recipeZ.model.Ingredient;
import com.mathewtri.recipeZ.service.IIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class IngredientController {
    private final IIngredientService ingredientService;

    @Autowired
    public IngredientController(IIngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping("/{userId}/ingredients")
    public ResponseEntity<Void> createIngredient(@PathVariable String userId, @RequestBody Ingredient ingredient){
        ingredientService.createIngredient(userId, ingredient);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}/ingredients")
    public ResponseEntity<List<Ingredient>> fetchIngredients(@PathVariable String userId){
        List<Ingredient> ingredients = ingredientService.fetchIngredients(userId);
        return ResponseEntity.ok(ingredients);
    }

    @GetMapping("/{userId}/ingredients/{ingredientId}")
    public ResponseEntity<Ingredient> findIngredientById(@PathVariable String userId, @PathVariable String ingredientId){
        Ingredient ingredient = ingredientService.findIngredientById(userId, ingredientId);
        if(ingredient == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.ok(ingredient);
        }
    }

    @DeleteMapping("/{userId}/ingredients/{ingredientId}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable String userId, @PathVariable String ingredientId){
        ingredientService.deleteIngredient(userId, ingredientId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{userId}/ingredients")
    public ResponseEntity<Void> updateIngredient(@PathVariable String userId, @RequestBody Ingredient ingredient){
        ingredientService.updateIngredient(userId, ingredient);
        return ResponseEntity.ok().build();
    }


}
