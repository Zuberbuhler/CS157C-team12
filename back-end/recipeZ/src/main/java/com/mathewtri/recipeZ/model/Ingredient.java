package com.mathewtri.recipeZ.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("Ingredient")
public class Ingredient implements Serializable {
    @Id
    @Indexed
    private String id;
    private String ingredientName;
    private String expiration;
    private int par;
    private int quantity;
    private String quantityType;

    public Ingredient(String ingredientName, String expiration, int par, int quantity, String quantityType) {
        this(UUID.randomUUID().toString(), ingredientName, expiration, par, quantity, quantityType);
    }
}