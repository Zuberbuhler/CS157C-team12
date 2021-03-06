package com.mathewtri.recipeZ.controller;

import com.mathewtri.recipeZ.model.User;
import com.mathewtri.recipeZ.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

    private final IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    // signup
    @PostMapping("/users/create")
    public ResponseEntity<Boolean> createUser(@RequestBody User user) {
        boolean success = userService.createUser(user);
        if (success) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // login
    @PostMapping("/users")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User fetchedUser = userService.fetchUserByEmailAndPassword(user.getEmail(), user.getPassword());
        System.out.println(fetchedUser);
        if (fetchedUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(fetchedUser);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> fetchUsers() {
        List<User> users = userService.fetchUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<User> fetchUserById(@PathVariable String userId) {
        User user = userService.fetchUserById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(user);
        }
    }

    @GetMapping("/users/search")
    public ResponseEntity<User> fetchUserByEmail(@RequestParam String email) {
        User user = userService.fetchUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(user);
        }
    }

    @DeleteMapping("/users/{userId}")
    public String delete(@PathVariable String userId) {
        User user = userService.fetchUserById(userId);
        if (user == null) {
            return "Failed to Delete User: id not found";
        } else {
            userService.deleteUser(userId);
            return "Deleted Student with id " + userId;
        }
    }
}
