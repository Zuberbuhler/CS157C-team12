import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faFrown, faCheck } from "@fortawesome/free-solid-svg-icons";
import VerticallyCenteredModal from "./VerticallyCenteredModal.js";

import axios from "axios";

import "./RecipeList.css";
import { Link } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";

export default function RecipeList() {
   const URL = "http://localhost:8080/api/users/";
   const [recipes, setRecipes] = useState([]);
   const [recipe, setRecipe] = useState({});
   const [recipeSelected, setRecipeSelected] = useState(false);
   const [modalShow, setModalShow] = useState(false);
   const [ingredients, setIngredients] = useState([]);

   useEffect(() => {
      loadIngredients();
      loadRecipes();
   }, []);

   const loadIngredients = async (_ingredList) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      const result = await axios.get(`${URL}${userId}/ingredients`);

      setIngredients(result.data);
   };

   // load all recipes
   const loadRecipes = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      const result = await axios.get(`${URL}${userId}/recipes`);
      setRecipes(result.data);
   };

   // load an recipe
   function loadRecipe(_recipe) {
      setRecipe(_recipe);
      console.log("showing Modal with Recipe", _recipe);
      setModalShow(true);
   }

   const updateRecipe = async (_recipe) => {
      console.log("updating recipe: ", _recipe);
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      await axios.put(`${URL}${userId}/recipes`, _recipe).then(setModalShow(false));
   };

   // delete an recipe
   const deleteRecipe = async (recipeId) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      const result = await axios.delete(`${URL}${userId}/recipes/${recipeId}`);
      setModalShow(false);
   };

   const handleUpdateRecipe = (newRecipe) => {
      const _recipes = JSON.parse(JSON.stringify(recipes)); // deep copy of recipe
      let recipeIdx = 0;
      for (let i = 0; i < _recipes.length; i++) {
         if (newRecipe.id === _recipes[i].id) {
            _recipes[i] = newRecipe;
            recipeIdx = i;
            break;
         }
      }
      setRecipes(_recipes);
      updateRecipe(_recipes[recipeIdx]);
      setRecipeSelected(false);
   };

   const recipeIsExecutable = (_recipeIngredients) => {
      console.log("exec: _rec", _recipeIngredients);
      console.log("exec: ingred", ingredients);
      console.log("exec: recipes", recipes);
      
      if(typeof ingredients === "undefined" || ingredients.length === 0) return false;
      if(typeof _recipeIngredients === "undefined" || _recipeIngredients.length===0) return true;

      const tmp_ingredients = ingredients;
      if(typeof tmp_ingredients === "undefined" || tmp_ingredients.length===0 ) return false;
      for(var i = 0; i < _recipeIngredients.length; i++)
      {
         const idx = tmp_ingredients.findIndex(_ingredient => _ingredient.ingredientName === _recipeIngredients[i].ingredientName);
         
         if(idx !== -1)
         {
            if(tmp_ingredients[idx].quantity < _recipeIngredients[i].quantity)
            {
               return false;
            }
         }
         else
         {
            return false;
         }
      }
      return true;
   }

   const renderRecipes = () => {

      return recipes.map((_recipe, i) => (
         <tr
            key={_recipe.id}
            className="my-row"
            onClick={() => {
               handleEachItemClick(_recipe);
            }}
         >
            <th scope="row">{i + 1}</th>
            <td>{_recipe.recipe_name}</td>
            <td><Image className="img-thumbnail" src={_recipe.recipe_image} /></td>

            {(recipeIsExecutable(_recipe.ingredientList))? 
                     <td><FontAwesomeIcon icon={faSmile} size="2x" beat/></td> : 
                     <td><FontAwesomeIcon icon={faFrown} size="2x" fade /></td>
            }

         </tr>
      ));
   };

   const handleEachItemClick = (_recipe) => {
      setRecipeSelected(true);
      loadRecipe(_recipe);
   };

   const handleDeleteRecipe = (recipeId) => {
      // change the state
      const filteredRecipes = recipes.filter(
         (recipe) => recipe.id !== recipeId
      );
      setRecipes(filteredRecipes);
      deleteRecipe(recipeId);
      setRecipeSelected(false);
   };

   return (
      <Container>
         <table className="table table-striped table-hover">
            <thead>
               <tr>
                  <th scope="col">#</th>
                  <th scope="col">Recipe Name</th>
                  <th scope="col">Recipe Image</th>
                  <th scope="col">Executable</th>
               </tr>
            </thead>
            <tbody>{renderRecipes()}</tbody>
         </table>
         {
            <>
               <Link to="/recipes/create">Add Recipe</Link>

               {(recipeSelected)? <VerticallyCenteredModal recipe={recipe} 
                                       onUpdate={handleUpdateRecipe} 
                                       onDelete={handleDeleteRecipe} 
                                       show={modalShow && recipeSelected} 
                                       onHide={() => {setModalShow(false); setRecipeSelected(false)}} /> : <></>}

               {/* <MyVerticallyCenteredModal
                  recipe={recipe}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
               /> */}
            </>
         }
      </Container>
   );
}
