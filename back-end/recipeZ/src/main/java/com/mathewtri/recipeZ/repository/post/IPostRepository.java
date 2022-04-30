package com.mathewtri.recipeZ.repository.post;

import com.mathewtri.recipeZ.model.Post;

import java.util.List;

public interface IPostRepository {
    boolean createPost(String userId, Post post);
    List<Post> fetchPostsByUserId(String userId);
    Post fetchPostByIdAndUserId(String userId, String postId);
    Post fetchPostById(String postId);
    void deletePostById(String userId, String postId);
    void updatePost(String userId, Post post);
}
