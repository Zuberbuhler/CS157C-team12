package com.mathewtri.recipeZ.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;
import java.util.UUID;

@Data
@RedisHash("User")
public class User implements Serializable {

    @Id
    @Indexed
    private String id = UUID.randomUUID().toString();
    private String username;
    @Indexed
    private String email;
    private String password;

}
