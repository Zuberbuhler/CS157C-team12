package com.mathewtri.recipeZ.repository.post;

import com.mathewtri.recipeZ.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class PostRepository implements IPostRepository{

    private final RedisTemplate redisTemplate;
    private final String KEY = "Post";

    @Autowired
    public PostRepository(RedisTemplate redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    @Override
    public boolean createPost(String userId, Post post) {
        String hashKey = "user:" + userId + "|" + "post:" + post.getId();
        try
        {
            redisTemplate.opsForHash().put(KEY, hashKey, post);
            return true;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Post> fetchPostsByUserId(String userId) {
        Map<String, Post> entries = redisTemplate.opsForHash().entries(KEY);
        List<Post> result = new ArrayList<>();
        for(String key: entries.keySet()){
            String[] splitKey = key.split("\\|");
            String[] part1 = splitKey[0].split(":");
            String fetchUserId = part1[1];;
            if(fetchUserId.equals(userId)){
                result.add(entries.get(key));
            }
        }
        return result;
    }

    @Override
    public Post fetchPostByIdAndUserId(String userId, String postId) {
        Map<String, Post> entries = redisTemplate.opsForHash().entries(KEY);
        Post foundPost = null;
        for(String key: entries.keySet()){
            String[] splitKey = key.split("\\|");
            String[] part1 = splitKey[0].split(":");
            String[] part2 = splitKey[1].split(":");
            String fetchUserId = part1[1];
            String fetchPostId = part2[1];
            if(fetchUserId.equals(userId) && fetchPostId.equals(postId)){
                foundPost = entries.get(key);
                break;
            }
        }
        return foundPost;
    }

    @Override
    public void deletePostById(String userId, String postId) {
        Map<String, Post> entries = redisTemplate.opsForHash().entries(KEY);
        for(String key: entries.keySet()) {
            String[] splitKey = key.split("\\|");
            String[] part1 = splitKey[0].split(":");
            String[] part2 = splitKey[1].split(":");
            String fetchUserId = part1[1];
            String fetchPostId = part2[1];
            if (fetchUserId.equals(userId) && fetchPostId.equals(postId)) {
                redisTemplate.opsForHash().delete(KEY, key);
                break;
            }
        }
    }

    @Override
    public Post fetchPostById(String postId) {
        Map<String, Post> entries = redisTemplate.opsForHash().entries(KEY);
        Post foundPost = null;
        for(String key: entries.keySet()){
            String[] splitKey = key.split("\\|");
            String[] part2 = splitKey[1].split(":");
            String fetchPostId = part2[1];
            if(fetchPostId.equals(postId)){
                foundPost = entries.get(key);
                break;
            }
        }
        return foundPost;
    }

    @Override
    public void updatePost(String userId, Post post) {
        createPost(userId, post);
    }

    public List<Post> fetchAllPosts(){
        Map<String, Post> entries = redisTemplate.opsForHash().entries(KEY);
        List<Post> posts = new ArrayList<>();
        for(String key: entries.keySet()) {
            posts.add(entries.get(key));
        }
        return posts;
    }
}
