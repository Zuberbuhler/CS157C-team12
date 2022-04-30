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
@RedisHash("Post")
@NoArgsConstructor
@AllArgsConstructor
public class Post implements Serializable {
    @Id
    @Indexed
    private String id;
    @Indexed
    private String title;
    private String content;
    private String imgUrl;

    public Post(String title, String content, String imgUrl){
        this(UUID.randomUUID().toString(), title, content, imgUrl);
    }
}

