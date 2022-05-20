package com.mathewtri.recipeZ;

import com.mathewtri.recipeZ.model.Ingredient;
import com.mathewtri.recipeZ.model.Post;
import com.mathewtri.recipeZ.model.User;
import com.mathewtri.recipeZ.service.ingredient.IngredientService;
import com.mathewtri.recipeZ.service.post.PostService;
import com.mathewtri.recipeZ.service.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RecipeZApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecipeZApplication.class, args);
	}

	@Bean
	CommandLineRunner run(UserService userService, IngredientService ingredientService, PostService postService){
		return args -> {

			// create users
			User user1 = new User("56bf2944-b674-43d6-88aa-b1b453c95565", "user1@email.com", "Password1!");
			User user2 = new User("56bf2944-b674-43d6-88aa-b1b453c95565", "user2@email.com", "Password1!");

			userService.createUser(user1);
			userService.createUser(user2);

			// create ingredients
			Ingredient ingredient1 = new Ingredient("3b20bfe9-3b5d-4caf-8b94-901085b197ab", "Pepper", "03/11/2023", 1, 4, "pound");
			Ingredient ingredient2 = new Ingredient("d90e206d-3271-4de8-8e22-7b5b317e034d", "Tomato", "07/09/2022", 7, 7, "pound");
			Ingredient ingredient3 = new Ingredient("8a6966d2-e535-4330-b9e8-a8a56dba019a", "Salt", "12/06/2021", 7, 8, "ml");
			Ingredient ingredient4 = new Ingredient("d4d76adc-c0f7-4df3-a50a-eb6f231aed1f", "Orion", "12/01/2021", 10, 12, "each");
			Ingredient ingredient5 = new Ingredient("ef794469-74df-4227-8db1-14e755eb4618", "Chicken", "08/05/2021", 1, 12, "each");

			ingredientService.createIngredient(user1.getId(), ingredient1);
			ingredientService.createIngredient(user1.getId(), ingredient2);
			ingredientService.createIngredient(user1.getId(), ingredient3);
			ingredientService.createIngredient(user1.getId(), ingredient4);
			ingredientService.createIngredient(user1.getId(), ingredient5);

			// create posts
			Post post1 = new Post("How to cook popcorn chicken", "Here is ingredient you need to prepare", "https://media.istockphoto.com/photos/homemade-crispy-popcorn-chicken-picture-id470177926?b=1&k=20&m=470177926&s=170667a&w=0&h=rEt_L7ohZ1RIG5EEW4THVExBoAClkfXWBl7SvvkFlJc=");
			Post post2 = new Post("Making Pizza is Easy", "Pizza recipe list", "https://media.istockphoto.com/photos/pizza-with-salami-bell-pepper-tomatoes-and-cheese-pickles-bacon-and-picture-id1377372234?b=1&k=20&m=1377372234&s=170667a&w=0&h=xJeOjBlzkmr8PCYMD2YpXrpRMu1J-wETblKkCla5rro=");
			Post post3 = new Post("Beefsteak with Special Ingredient", "Special night with your family", "https://media.istockphoto.com/photos/beef-and-broccoli-stir-fry-picture-id644070696?b=1&k=20&m=644070696&s=170667a&w=0&h=TYYPAeNWxtvUH_3tODczpQsFo4UgxlPKtNjWulrY3v8=");
			Post post4 = new Post("Catfish with Orion", "Change your meal", "https://media.istockphoto.com/photos/fillet-of-salmon-with-vegetable-picture-id175028181?b=1&k=20&m=175028181&s=170667a&w=0&h=9SDGAG8CkgvTHfhPANh-TwIA1xJ8NelCSwl_ttUt-bk=");
			postService.createPost(user1.getId(), post1);
			postService.createPost(user1.getId(), post2);
			postService.createPost(user1.getId(), post3);
		};
	}
}
