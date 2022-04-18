package com.mathewtri.recipeZ.service;

import com.mathewtri.recipeZ.model.User;
import com.mathewtri.recipeZ.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService, UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean createUser(User user) {
        // check if email is unique
        List<User> users = fetchUsers();
        boolean isExisted = users.stream()
                .anyMatch(currentUser -> currentUser.getEmail().equals(user.getEmail()));
        if (isExisted) {
            return false;
        }
         user.setPassword(passwordEncoder.encode(user.getPassword()));
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
    public void deleteUser(String userId)
    {
        userRepository.deleteById(userId);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = fetchUserByEmail(username);
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }
}
