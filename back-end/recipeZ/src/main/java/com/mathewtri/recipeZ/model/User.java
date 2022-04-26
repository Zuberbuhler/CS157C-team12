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
@RedisHash("User")
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
    @Id
    @Indexed
    private String id;
    @Indexed
    private String email;
    private String password;

    public User(String email, String password) {
        this(UUID.randomUUID().toString(), email, password);
    }
}