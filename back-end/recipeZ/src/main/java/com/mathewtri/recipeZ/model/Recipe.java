package com.mathewtri.recipeZ.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Data
@RedisHash("Recipe")
public class Recipe implements Serializable {

    @Id
    @Indexed
    private String id = UUID.randomUUID().toString();
    private String userId;
    private String recipe_name;
    private String recipe_image;
    private String recipe_content;
    private List<Ingredient> ingredientList;


}
