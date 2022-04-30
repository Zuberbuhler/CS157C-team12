package com.mathewtri.recipeZ.service.post;

import com.mathewtri.recipeZ.model.Post;

import java.util.List;

public interface IPostService {
    boolean createPost(String userId, Post post);
    List<Post> fetchPosts(String userId);
    Post fetchPostByIdAndUserId(String userId, String postId);
    Post fetchPostById(String postId);
    void deletePostById(String userId, String postId);
    void updatePost(String userId, Post post);
    List<Post> fetchAllPosts();
}
