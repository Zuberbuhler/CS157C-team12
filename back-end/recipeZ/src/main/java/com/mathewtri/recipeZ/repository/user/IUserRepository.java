package com.mathewtri.recipeZ.repository.user;

import com.mathewtri.recipeZ.model.User;

import java.util.List;

public interface IUserRepository {
    boolean createUser(User user);
    List<User> fetchUsers();
    User findUserById(String userId);
    void deleteById(String userId);
}
