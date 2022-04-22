package com.mathewtri.recipeZ;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RecipeZApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecipeZApplication.class, args);
	}

//	@Bean
//	CommandLineRunner run(UserService userService){
//		return args -> {
//
//			userService.createUser(new User(null, "trido", "trido@gmail.com", "1234"));
//			userService.createUser(new User(null, "mathew", "mathew@microsoft.com", "1234"));
//			userService.createUser(new User(null, "john", "john@amazon.com", "1234"));
//
//		};
//	}
}
