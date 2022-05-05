import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import Homepage from "./components/Homepage";
import IngredientCreate from "./components/Ingredient/IngredientCreate";
import IngredientList from "./components/Ingredient/IngredientList"
import _Navbar from "./components/navbar/_Navbar";
import CreateRecipe from "./components/recipe/CreateRecipe";
import RecipeList from "./components/recipe/RecipeList.js"
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostList from "./components/post/PostList";
import PostCreate from "./components/post/PostCreate";
import PostDetail from "./components/post/PostDetail";
import IngredientNamesList from "./components/recipe/IngredientNamesList.js"
function App() {
   const navigate = useNavigate();
   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

   useEffect(() => {
      console.log(user);
      console.log("App effect");
      if (!user) {
         return navigate("/");
      }
      // localStorage.setItem("user", JSON.stringify(user));
   }, [setUser]);

   return (
      <Routes>
         <Route
            path="/"
            element={
               !user ? (
                  <SignIn />
               ) : (
                  <>
                     <_Navbar /> <Homepage />
                  </>
               )
            }
         />
         <Route
            path="/register"
            element={
               !user ? (
                  <Register />
               ) : (
                  <>
                     <_Navbar /> <Homepage />
                  </>
               )
            }
         />
         <Route
            path="/ingredients"
            element={
               <>
                  <_Navbar /> <IngredientList />
               </>
            }
         />
         <Route
            path="/ingredients/create"
            element={
               <>
                  <_Navbar />
                  <IngredientCreate />
               </>
            }
         />
         <Route
            path="/recipes"
            element={
               <>
                  <_Navbar />
                  <RecipeList />
               </>
            }
         />
         <Route
            path="/recipes/create"
            element={
               <>
                  <_Navbar />
                  <CreateRecipe />
               </>
            }
         />
         <Route
            path="/recipes/ingredients"
            element={
               <>
                  <_Navbar />
                  <IngredientNamesList />
               </>
            }
         />
         <Route
            path="/homepage"
            element={
               <>
                  <_Navbar />
                  <Homepage />
               </>
            }
         />

         <Route
            path="/posts"
            element={
               <>
                  <_Navbar />
                  <PostList />
               </>
            }
         />
         <Route
            path="/posts/create"
            element={
               <>
                  <_Navbar />
                  <PostCreate />
               </>
            }
         />

         <Route
            path="/homepage/posts/:postId"
            element={
               <>
                  <_Navbar />
                  <PostDetail />
               </>
            }
         />
      </Routes>
   );
}

export default App;
