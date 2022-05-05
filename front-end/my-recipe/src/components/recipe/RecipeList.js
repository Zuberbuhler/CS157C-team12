import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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

   useEffect(() => {
      loadRecipes();
   }, []);

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


   // function MyVerticallyCenteredModal(props) {

   //    console.log("Modal Start");
   //    const [ingredients, setIngredients] = useState([]);
   //    const [recipeIngredients, setRecipeIngredients] = useState([]);

   //    const { recipe } = props;

   //    useEffect(() => {
   //       console.log("useEffect in Modal: ", recipe);
   //       const _recipeIngredients = recipe.ingredientList;
   //       setRecipeIngredients(_recipeIngredients);
   //       loadIngredients();
   //    }, [])

   

   //    const loadIngredients = async () => {
   //       const user = JSON.parse(localStorage.getItem("user"));
   //       const userId = user["userId"];
   //       const result = await axios.get(`${URL}${userId}/ingredients`);

   //       getRecipeIngredientNamesList();
   //       const recipeIngredientNames = [];
   //       const _tmpIngredients = result.data;

   //       // _tmpIngredients.filter((ingredient) => recipeIngredientNames.includes(ingredient.ingredientName));

   //       setIngredients(result.data);

   //       // removeIngredientsUsedByRecipe(getRecipeIngredientNamesList());
   //    };

   //    function removeIngredientsUsedByRecipe(namesOfRecipeIngredients)
   //    {
   //       const newIngredients = ingredients.filter((ingredient) => namesOfRecipeIngredients.includes(ingredient.ingredientName));
   //       // setIngredients(newIngredients);
   //    }

   //    function getRecipeIngredientNamesList() {
         
   //       console.log(recipeIngredients);

   //       const recipeIngredientNames = [];
   //    }

   //    const handleQuantityChange = (ingredient, e) => {
   //       const _recipeIngredients = recipeIngredients;
   //       const idx = _recipeIngredients.findIndex(_ingredient => _ingredient.name === ingredient.name);

   //       _recipeIngredients[idx].quantity = e.target.value;
   //       setRecipeIngredients(_recipeIngredients);
   //    }

   //    const handleIngredientListItemClick = (ingredient) => {
   //       const ingredientRemovedList = ingredients.filter(_ingredient => _ingredient.ingredientName !== ingredient.ingredientName);
   //       setIngredients(ingredientRemovedList);
   //       setRecipeIngredients(prevIngredients => [...prevIngredients, ingredient]);
   //    };

   //    const handleRecipeIngredientClick = (ingredient) => {
   //       const ingredientRemovedList = recipeIngredients.filter(_ingredient => _ingredient.ingredientName !== ingredient.ingredientName);
   //       setRecipeIngredients(ingredientRemovedList);
   //       setIngredients(prevIngredients => [...prevIngredients, ingredient])
   //    };

   //    const renderIngredients = () => {
   //    return ingredients.map((ingredient, i) => (
   //    <tr
   //       key={i}
   //       className="my-row"
   //       onClick={() => {
   //          handleIngredientListItemClick(ingredient);
   //       }}
   //    >
   //       <td>{ingredient.ingredientName}</td>
   //    </tr>
   //    ));
   //    };

   //    const renderRecipeIngredients = () => {
   //       return recipeIngredients.map((recipeIngredient, i) => (
   //       <tr
   //          key={i}
   //          className="my-row"
   //       >
   //          <td>{recipeIngredient.ingredientName}</td>
   //          <td><input
   //                      type="number"
   //                      defaultValue={"1"}
   //                      min={1}
   //                      max={999}
   //                      name="quantity"
   //                      onChange={(e) => { handleQuantityChange(recipeIngredient, e); }}
   //                   />
   //          </td>
   //          <td>{recipeIngredient.quantityType}</td>
   //          <td><FontAwesomeIcon
   //                icon={faTimes}
   //                style={{"color": "red"}}
   //                onClick={() => { handleRecipeIngredientClick(recipeIngredient); }}
   //             />
   //          </td>
   //       </tr>
   //       ));   
   //    };

   //    const formik = useFormik({
   //       initialValues: {
   //          id: recipe.id,
   //          recipe_name: recipe.recipe_name,
   //          recipe_image: recipe.recipe_image,
   //          recipe_content: recipe.recipe_content,
   //       },
   //       validationSchema: Yup.object({
   //          recipe_name: Yup.string().required("*"),
   //          recipe_image: Yup.string().required("*"),
   //          recipe_content: Yup.string().required("*")
   //       }),
   //       onSubmit: (recipe) => {
   //          handleUpdateRecipe(recipe);
   //       },
   //    });
      
   //    return (
   //       <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
   //          <Modal.Header closeButton>
   //             <Modal.Title id="contained-modal-title-vcenter">Recipe</Modal.Title>
   //          </Modal.Header>
   //          <Modal.Body className="show-grid">
   //             <Container>
   //                <Form onSubmit={formik.handleSubmit}>
   //                   <Row>
   //                      <Col xs={5} md={8}>
   //                         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
   //                            <Form.Label>
   //                               Recipe Name
   //                               {formik.touched.recipe_name && formik.errors.recipe_name ? (
   //                                  <span className="star-error">
   //                                     {formik.errors.recipe_name}
   //                                  </span>
   //                               ) : null}
   //                            </Form.Label>
   //                            <Form.Control
   //                               type="text"
   //                               value={formik.values.recipe_name}
   //                               name="recipe_name"
   //                               onChange={formik.handleChange}
   //                               onBlur={formik.handleBlur}
   //                            />
   //                         </Form.Group>
   //                      </Col>
   //                   </Row>
   //                   <Row>
   //                      <Col xs={5} md={8}>
   //                         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
   //                            <Form.Label>
   //                               Recipe Image URL
   //                               {formik.touched.recipe_image && formik.errors.recipe_image ? (
   //                                  <span className="star-error">{formik.errors.recipe_image}</span>
   //                               ) : null}
   //                            </Form.Label>
   //                            <Form.Control
   //                               name="recipe_image"
   //                               type="text"
   //                               value={formik.values.recipe_image}
   //                               onChange={formik.handleChange}
   //                               onBlur={formik.handleBlur}
   //                            />
   //                         </Form.Group>
   //                      </Col>
   //                   </Row>

   //                   <Row>
   //                      <Col xs={6} md={4}>
   //                         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
   //                            <Form.Label>
   //                               Recipe Content
   //                               {formik.touched.recipe_content && formik.errors.recipe_content ? (
   //                                  <span className="star-error"> {formik.errors.recipe_content}</span>
   //                               ) : null}
   //                            </Form.Label>
   //                            <Form.Control
   //                               name="recipe_content"
   //                               type="text"
   //                               value={formik.values.recipe_content}
   //                               onChange={formik.handleChange}
   //                               onBlur={formik.handleBlur}
   //                            />
   //                         </Form.Group>
   //                      </Col>
   //                   </Row>
   //                   <span className="addIngredToRecipe">Add Ingredients To Recipe</span>
   //                   <div className="recipe_ingredient">
   //                      <table className="table ingredTable table-striped table-hover">
   //                         <thead>
   //                            <tr>
   //                               <th scope="col">All Ingredients</th>
   //                            </tr>
   //                         </thead>
   //                         <tbody>{renderIngredients()}</tbody>
   //                      </table>
                        
   //                      <table className="table recipeIngred table-striped table-hover">
   //                         <thead>
   //                            <tr>
   //                               <th scope="col">Recipe's Ingredients</th>
   //                               <th className="quantityColumn" scope="col" >Quantity</th>
   //                               <th scope="col" >Type</th>
                                 
   //                            </tr>
   //                         </thead>
   //                         {/* <tbody>{renderRecipeIngredients()}</tbody> */}
   //                      </table>
   //                   </div>

   //                   <Row>
   //                      <Modal.Footer>
   //                         <Button type="submit" variant="success" disabled={!formik.isValid}>
   //                            Update
   //                         </Button>
   //                         <Button
   //                            variant="danger"
   //                            onClick={() => handleDeleteRecipe(recipe.id)}
   //                         >
   //                            Delete
   //                         </Button>
   //                      </Modal.Footer>
   //                   </Row>
   //                </Form>
   //             </Container>
   //          </Modal.Body>
   //       </Modal>
   //    );
   // }

   return (
      <Container>
         <table className="table table-striped table-hover">
            <thead>
               <tr>
                  <th scope="col">#</th>
                  <th scope="col">Recipe Name</th>
                  <th scope="col">Recipe Image</th>
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
