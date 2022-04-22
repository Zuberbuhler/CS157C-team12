package com.mathewtri.recipeZ.service.user;

import com.mathewtri.recipeZ.model.User;
import com.mathewtri.recipeZ.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;

    @Override
    public boolean createUser(User user) {
        // check if email is unique
        List<User> users = fetchUsers();
        boolean isExisted = users.stream()
                .anyMatch(currentUser -> currentUser.getEmail().equals(user.getEmail()));
        if (isExisted) {
            return false;
        }
        return userRepository.createUser(user);
    }

    @Override
    public List<User> fetchUsers() {
        return userRepository.fetchUsers();
    }

    @Override
    public User fetchUserById(String userId) {
        return userRepository.findUserById(userId);
    }

    @Override
    public User fetchUserByEmail(String email) {
        List<User> users = fetchUsers();

        return users.stream()
                .filter(user -> user.getEmail().equals(email))
                .findAny()
                .orElse(null);
    }

    @Override
    public User fetchUserByEmailAndPassword(String email, String password) {
        List<User> users = fetchUsers();

        return users.stream()
                .filter(user -> user.getEmail().equals(email) && user.getPassword().equals(password))
                .findAny()
                .orElse(null);
    }

    public void deleteUser(String userId)
    {
        userRepository.deleteById(userId);
    }

}
