package com.mathewtri.recipeZ.controller;

import com.mathewtri.recipeZ.model.Post;
import com.mathewtri.recipeZ.service.post.IPostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class PostController {

    private final IPostService postService;

    @Autowired
    public PostController(IPostService postService) {
        this.postService = postService;
    }

    @PostMapping("/{userId}/posts")
    public ResponseEntity<Void> createPost(@PathVariable String userId, @RequestBody Post post){
        if(postService.createPost(userId, post))
        {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @GetMapping("/{userId}/posts")
    public ResponseEntity<List<Post>> fetchPostsByUser(@PathVariable String userId){
        List<Post> posts = postService.fetchPosts(userId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{userId}/posts/{postId}")
    public ResponseEntity<Post> findPostByIdAndUserId(@PathVariable String userId, @PathVariable String postId){
        Post post = postService.fetchPostByIdAndUserId(userId, postId);
        if(post == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.ok(post);
        }
    }

    @DeleteMapping("/{userId}/posts/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable String userId, @PathVariable String postId){
        postService.deletePostById(userId, postId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{userId}/posts")
    public ResponseEntity<Void> updatePost(@PathVariable String userId, @RequestBody Post post){
        log.info("Updating Post for user id " + userId + " with ingredient id " + post.getId());
        postService.updatePost(userId, post);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> fetchAllPosts(){
        List<Post> posts = postService.fetchAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<Post> fetchPostById(@PathVariable String postId){
        Post post = postService.fetchPostById(postId);
        return ResponseEntity.ok(post);
    }
}
