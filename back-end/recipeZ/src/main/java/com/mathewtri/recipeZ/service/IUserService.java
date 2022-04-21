package com.mathewtri.recipeZ.service;

import com.mathewtri.recipeZ.model.User;

import java.util.List;

public interface IUserService {

    boolean createUser(User user);
    List<User> fetchUsers();
    User fetchUserById(String userId);
    User fetchUserByEmail(String email);
    User fetchUserByEmailAndPassword(String email, String password);
    public void deleteUser(String userId);
}
