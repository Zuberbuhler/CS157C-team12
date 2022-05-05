import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";


const VerticallyCenteredModal = ({recipe, onUpdate, onDelete, show, onHide}) => {
   const URL = "http://localhost:8080/api/users/";

   const [ingredients, setIngredients] = useState([]);
   const [recipeIngredients, setRecipeIngredients] = useState([]);

    useEffect(() => {
       console.log("useEffect in Modal: ", recipe);
       var _ingredList = JSON.parse(JSON.stringify(recipe.ingredientList));
      for (var i = 0; i < _ingredList.length; i++) {
         var name = _ingredList[i].ingredientName;
         console.log(name);
      }
       setRecipeIngredients(_ingredList);
       loadIngredients(_ingredList);
    }, [])

 

    const loadIngredients = async (_ingredList) => {
       const user = JSON.parse(localStorage.getItem("user"));
       const userId = user["userId"];
       const result = await axios.get(`${URL}${userId}/ingredients`);

       var _recipeIngredientNames = [];
       for(var i = 0; i <_ingredList.length; i++) 
       {
         _recipeIngredientNames = [..._recipeIngredientNames, _ingredList[i].ingredientName];
       }
       console.log("recipeIngredientNames", _recipeIngredientNames);

       var _ingredients = JSON.parse(JSON.stringify(result.data));
       _ingredients = _ingredients.filter(ingredient => !_recipeIngredientNames.includes(ingredient.ingredientName));
      
       console.log("_ingredients: ", _ingredients);
       setIngredients(_ingredients);
    };

    const handleQuantityChange = (ingredient, e) => {
       console.log("Changed Quantity of ingredient: ", ingredient, " to ", e.target.value);
       const _recipeIngredients = recipeIngredients;
       const idx = _recipeIngredients.findIndex(_ingredient => _ingredient.ingredientName === ingredient.ingredientName);

       _recipeIngredients[idx].quantity = e.target.value;
       console.log(_recipeIngredients);
       setRecipeIngredients(_recipeIngredients);
    }


    const handleIngredientListItemClick = (ingredient) => {
       const ingredientRemovedList = ingredients.filter(_ingredient => _ingredient.ingredientName !== ingredient.ingredientName);
       setIngredients(ingredientRemovedList);
       ingredient.quantity = 1;
       setRecipeIngredients(prevIngredients => [...prevIngredients, ingredient]);
    };

    const handleRecipeIngredientClick = (ingredient) => {
       const ingredientRemovedList = recipeIngredients.filter(_ingredient => _ingredient.ingredientName !== ingredient.ingredientName);
       setRecipeIngredients(ingredientRemovedList);
       setIngredients(prevIngredients => [...prevIngredients, ingredient])
    };

    const renderIngredients = () => {
      return ingredients.map((ingredient, i) => ( 
         <tr
            key={i}
            className="my-row"
            onClick={() => {
               handleIngredientListItemClick(ingredient);
            }}>
            <td>{ingredient.ingredientName}</td>
         </tr>
      ));
    };

    const renderRecipeIngredients = () => {
       return recipeIngredients.map((recipeIngredient, i) => (
       <tr
          key={i}
          className="my-row"
       >
          <td>{recipeIngredient.ingredientName}</td>
          <td><input
                      type="number"
                      defaultValue={recipeIngredient.quantity}
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

    const formik = useFormik({
       initialValues: {
          id: recipe.id,
          recipe_name: recipe.recipe_name,
          recipe_image: recipe.recipe_image,
          recipe_content: recipe.recipe_content,
       },
       validationSchema: Yup.object({
          recipe_name: Yup.string().required("*"),
          recipe_image: Yup.string().required("*"),
          recipe_content: Yup.string().required("*")
       }),
       onSubmit: (recipe) => {
         recipe["ingredientList"] = recipeIngredients;
         onUpdate(recipe);
       },
    });
    
    return (
       <Modal recipe={recipe} show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
             <Modal.Title id="contained-modal-title-vcenter">Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
             <Container>
                <Form onSubmit={formik.handleSubmit}>
                   <Row>
                      <Col xs={5} md={8}>
                         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>
                               Recipe Name
                               {formik.touched.recipe_name && formik.errors.recipe_name ? (
                                  <span className="star-error">
                                     {formik.errors.recipe_name}
                                  </span>
                               ) : null}
                            </Form.Label>
                            <Form.Control
                               type="text"
                               value={formik.values.recipe_name}
                               name="recipe_name"
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                            />
                         </Form.Group>
                      </Col>
                   </Row>
                   <Row>
                      <Col xs={5} md={12}>
                         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>
                               Recipe Image URL
                               {formik.touched.recipe_image && formik.errors.recipe_image ? (
                                  <span className="star-error">{formik.errors.recipe_image}</span>
                               ) : null}
                            </Form.Label>
                            <Form.Control
                               name="recipe_image"
                               type="text"
                               value={formik.values.recipe_image}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                            />
                         </Form.Group>
                      </Col>
                   </Row>

                   <Row>
                      <Col xs={6} md={12}>
                         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>
                               Recipe Content
                               {formik.touched.recipe_content && formik.errors.recipe_content ? (
                                  <span className="star-error"> {formik.errors.recipe_content}</span>
                               ) : null}
                            </Form.Label>
                            <Form.Control
                               name="recipe_content"
                               type="text"
                               as="textarea"
                               value={formik.values.recipe_content}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
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

                           {(typeof recipe != "undefined")? <tbody>{renderIngredients()}</tbody> : <tbody></tbody>}
                           
                           
                           
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

                   <Row>
                      <Modal.Footer>
                         <Button type="submit" variant="success" disabled={!formik.isValid}>
                            Update
                         </Button>
                         <Button
                            variant="danger"
                            onClick={() => onDelete(recipe.id)}
                         >
                            Delete
                         </Button>
                      </Modal.Footer>
                   </Row>
                </Form>
             </Container>
          </Modal.Body>
       </Modal>
    );
}

export default VerticallyCenteredModal