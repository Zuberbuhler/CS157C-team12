import React, {useEffect, useState} from "react";
import axios from "axios";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CreateRecipe.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as Yup from "yup";
import { useFormik } from "formik";

export default function RecipeCreate() {

   let navigate = useNavigate();

   const URL = "http://localhost:8080/api/users/";

   const [ingredients, setIngredients] = useState([]);
   const [newRecipeIngredients, setNewRecipeIngredients] = useState([]);

    useEffect(() => {
        loadIngredients();
        console.log(ingredients);
    }, []);

   // load all ingredients
    const loadIngredients = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user["userId"];
        const result = await axios.get(`${URL}${userId}/ingredients`);

        const ingredList = [];

        console.log("result.data: ", result.data);
        result.data.forEach(_ingredient =>  ingredList.push({"id":_ingredient.id, "ingredientName":_ingredient.ingredientName, 
                                                               "quantity": 1, 
                                                               "quantityType":_ingredient.quantityType}));
        console.log("ingredList", ingredList);
        setIngredients(result.data);
    };

    const handleIngredientListItemClick = (ingredient) => {
      const ingredientRemovedList = ingredients.filter(_ingredient => _ingredient.ingredientName !== ingredient.ingredientName);
      setIngredients(ingredientRemovedList);
      ingredient.quantity = 1;
      setNewRecipeIngredients(prevIngredients => [...prevIngredients, ingredient]);
     };

     const handleRecipeIngredientClick = (ingredient) => {
      const ingredientRemovedList = newRecipeIngredients.filter(_ingredient => _ingredient.ingredientName !== ingredient.ingredientName);
      setNewRecipeIngredients(ingredientRemovedList);
      setIngredients(prevIngredients => [...prevIngredients, ingredient])
   };

   const handleQuantityChange = (ingredient, e) => {
      const _recipeIngredients = newRecipeIngredients;
      const idx = _recipeIngredients.findIndex(_ingredient => _ingredient.ingredientName === ingredient.ingredientName);

      _recipeIngredients[idx].quantity = e.target.value;
      setNewRecipeIngredients(_recipeIngredients);
   }

   const formik = useFormik({
      initialValues: {
         recipe_name: "",
         recipe_image: "",
         recipe_content: "",
      },
      validationSchema: Yup.object({
         recipe_name: Yup.string().required("*"),
         recipe_image: Yup.string().required("*"),
         recipe_content: Yup.string().required("*"),
      }),
      onSubmit: (recipe) => {
         recipe["ingredientList"] = newRecipeIngredients;
         console.log(newRecipeIngredients);
         createRecipe(recipe);
      },
   });

   const renderIngredients = () => {
      return ingredients.map((ingredient, i) => (
         <tr
            key={i}
            className="my-row"
            onClick={() => {
               handleIngredientListItemClick(ingredient);
            }}
         >
            <td>{ingredient.ingredientName}</td>
         </tr>
      ));
   };

   const renderRecipeIngredients = () => {
      return newRecipeIngredients.map((recipeIngredient, i) => (
         <tr
            key={i}
            className="my-row"
         >
            <td>{recipeIngredient.ingredientName}</td>
            <td><input
                        type="number"
                        defaultValue={"1"}
                        min={1}
                        max={999}
                        name="quantity"
                        onChange={(e) => { handleQuantityChange(recipeIngredient, e); }}
                     />
            </td>
            <td>{recipeIngredient.quantityType}</td>
            <td><FontAwesomeIcon
                  icon={faTimes}
                  style={{"color": "red"}}
                  onClick={() => { handleRecipeIngredientClick(recipeIngredient); }}
               />
            </td>
         </tr>
      ));
   };

   const createRecipe = (recipe) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      console.log("recipe: ", recipe);
      axios.post(`${URL}${userId}/recipes`, recipe).then(() => navigate("/recipes"));
   };

   return (
      <Card
         className=" shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light"
         style={{ width: "30rem" }}
      >
         <div className="card-header bg-transparent border-0 text-center">
            <h3>Create Recipe</h3>
         </div>
         <Form onSubmit={formik.handleSubmit}>
            <Row>
               <Col xs={5} md={11}>
                  <Form.Group className="mb-3" controlId="formRecipeName">
                     <Form.Label className="my-inline">
                        Recipe Name
                        {formik.touched.recipe_name && formik.errors.recipe_name ? (
                           <span className="star-error"> {formik.errors.recipe_name}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="recipe_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.recipe_ame}
                     />
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Col xs={5} md={12}>
                  <Form.Group className="mb-3" controlId="formRecipeImage">
                     <Form.Label>
                        Recipe Image URL
                        {formik.touched.recipe_image && formik.errors.recipe_image ? (
                           <span className="star-error"> {formik.errors.recipe_image}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="recipe_image"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.recipe_image}
                     />
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Col xs={10} md={12}>
                  <Form.Group className="mb-3" controlId="formRecipeContent">
                     <Form.Label>
                        Recipe Content
                        {formik.touched.recipe_content && formik.errors.recipe_content ? (
                           <span className="star-error"> {formik.errors.recipe_content}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        type="text"
                        as="textarea"
                        name="recipe_content"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.recipe_content}
                     />
               </Form.Group>
               </Col>
            </Row>
            <span className="addIngredToRecipe">Add Ingredients To Recipe</span>
                     <div className="recipe_ingredient">
                        <table className="table ingredTable table-striped table-hover">
                           <thead>
                              <tr>
                                 <th scope="col">All Ingredients</th>
                              </tr>
                           </thead>
                           <tbody>{renderIngredients()}</tbody>
                        </table>
                        
                        <table className="table recipeIngred table-striped table-hover">
                           <thead>
                              <tr>
                                 <th scope="col">Recipe's Ingredients</th>
                                 <th className="quantityColumn" scope="col" >Quantity</th>
                                 <th scope="col" >Type</th>
                                 
                              </tr>
                           </thead>
                           <tbody>{renderRecipeIngredients()}</tbody>
                        </table>
                     </div>
            <Button variant="primary" type="submit" disabled={!(formik.isValid && formik.dirty && newRecipeIngredients.length !== 0)}>
               Submit
            </Button>
         </Form>
      </Card>
   );
}
