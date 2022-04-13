package com.mathewtri.recipeZ.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;
import java.util.UUID;

@Data
@RedisHash("Ingredient")
public class Ingredient implements Serializable {
    @Id
    @Indexed
    private String id = UUID.randomUUID().toString();
    private String userId;
    private String ingredientName;
    private String expiration;
    private int par;
    private int quantity;
    private String quantityType;
}