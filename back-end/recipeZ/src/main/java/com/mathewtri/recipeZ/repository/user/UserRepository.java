package com.mathewtri.recipeZ.repository.user;

import com.mathewtri.recipeZ.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository implements IUserRepository {

    private final RedisTemplate redisTemplate;
    private final String KEY = "USER";

    @Autowired
    public UserRepository(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public boolean createUser(User user) {
        try
        {
            redisTemplate.opsForHash().put(KEY, user.getId(), user);
            return true;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<User> fetchUsers() {
        return redisTemplate.opsForHash().values(KEY);
    }

    @Override
    public User findUserById(String userId) {
        return (User) redisTemplate.opsForHash().get(KEY, userId);
    }

    @Override
    public void deleteById(String userId) {
        HashOperations hashOp = redisTemplate.opsForHash();
        hashOp.delete(KEY, userId);
    }
}
