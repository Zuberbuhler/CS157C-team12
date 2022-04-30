package com.mathewtri.recipeZ.service.post;

import com.mathewtri.recipeZ.model.Post;
import com.mathewtri.recipeZ.repository.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostService implements IPostService{

    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public boolean createPost(String userId, Post post) {
        if(post.getId() == null){
            post.setId(UUID.randomUUID().toString());
        }

        return postRepository.createPost(userId, post);
    }

    @Override
    public List<Post> fetchPosts(String userId) {
        return postRepository.fetchPostsByUserId(userId);
    }

    @Override
    public Post fetchPostByIdAndUserId(String userId, String postId) {
        return postRepository.fetchPostByIdAndUserId(userId, postId);
    }

    @Override
    public Post fetchPostById(String postId) {
        return postRepository.fetchPostById(postId);
    }

    @Override
    public void deletePostById(String userId, String postId) {
        postRepository.deletePostById(userId, postId);
    }

    @Override
    public void updatePost(String userId, Post post) {
        postRepository.updatePost(userId, post);
    }

    @Override
    public List<Post> fetchAllPosts() {
        return postRepository.fetchAllPosts();
    }
}
