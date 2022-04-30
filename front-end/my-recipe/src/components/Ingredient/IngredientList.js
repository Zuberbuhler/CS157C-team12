import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

import "./IngredientList.css";
import { Link } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";

export default function IngredientList() {
   const URL = "http://localhost:8080/api/users/";
   const [ingredients, setIngredients] = useState([]);
   const [ingredient, setIngredient] = useState({});
   const [modalShow, setModalShow] = useState(false);

   useEffect(() => {
      loadIngredients();
      console.log(ingredients);
   }, []);

   // load all ingredients
   const loadIngredients = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      const result = await axios.get(`${URL}${userId}/ingredients`);
      setIngredients(result.data);
   };

   // load an ingredient
   const loadIngredient = async (ingredient) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      const ingredientId = ingredient.id;
      const result = await axios.get(`${URL}${userId}/ingredients/${ingredientId}`);
      setIngredient(result.data);
      setModalShow(true);
   };

   const updateIngredient = async (_ingredient) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      await axios.put(`${URL}${userId}/ingredients`, _ingredient).then(setModalShow(false));
   };

   // delete an ingredient
   const deleteIngredient = async (ingredientId) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      const result = await axios.delete(`${URL}${userId}/ingredients/${ingredientId}`);
      setModalShow(false);
   };

   const handleUpdateIngredient = (newIngredient) => {
      const _ingredients = JSON.parse(JSON.stringify(ingredients)); // deep copy of ingredient
      let ingredientIdx = 0;
      for (let i = 0; i < _ingredients.length; i++) {
         if (newIngredient.id === _ingredients[i].id) {
            _ingredients[i] = newIngredient;
            ingredientIdx = i;
            break;
         }
      }
      setIngredients(_ingredients);
      updateIngredient(_ingredients[ingredientIdx]);
   };

   const renderIngredients = () => {
      return ingredients.map((ingredient, i) => (
         <tr
            key={ingredient.id}
            className="my-row"
            onClick={() => {
               handleEachItemClick(ingredient);
            }}
         >
            <th scope="row">{i + 1}</th>
            <td>{ingredient.ingredientName}</td>
            <td>{ingredient.quantity}</td>
            <td>{ingredient.expiration}</td>
         </tr>
      ));
   };

   const handleEachItemClick = (ingredient) => {
      loadIngredient(ingredient);
   };

   const handleDeleteIngredient = (ingredientId) => {
      // change the state
      const filteredIngredients = ingredients.filter(
         (ingredient) => ingredient.id !== ingredientId
      );
      setIngredients(filteredIngredients);
      deleteIngredient(ingredientId);
   };

   function MyVerticallyCenteredModal(props) {
      const { ingredient } = props;
      const formik = useFormik({
         initialValues: {
            id: ingredient.id,
            ingredientName: ingredient.ingredientName,
            expiration: ingredient.expiration,
            par: ingredient.par,
            quantity: ingredient.quantity,
            quantityType: ingredient.quantityType,
         },
         validationSchema: Yup.object({
            ingredientName: Yup.string().required("*"),
            expiration: Yup.string().required("*"),
            par: Yup.number().min(1, " > 0").required("*"),
            quantity: Yup.number().min(1, " > 0").required("*"),
            quantityType: Yup.string().required("*"),
         }),
         onSubmit: (ingredient) => {
            handleUpdateIngredient(ingredient);
         },
      });
      
      return (
         <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">Ingredient</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
               <Container>
                  <Form onSubmit={formik.handleSubmit}>
                     <Row>
                        <Col xs={5} md={8}>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>
                                 Ingredient Name
                                 {formik.touched.ingredientName && formik.errors.ingredientName ? (
                                    <span className="star-error">
                                       {formik.errors.ingredientName}
                                    </span>
                                 ) : null}
                              </Form.Label>
                              <Form.Control
                                 type="text"
                                 value={formik.values.ingredientName}
                                 name="ingredientName"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                              />
                           </Form.Group>
                        </Col>
                     </Row>
                     <Row>
                        <Col xs={5} md={8}>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>
                                 Expiration
                                 {formik.touched.expiration && formik.errors.expiration ? (
                                    <span className="star-error">{formik.errors.expiration}</span>
                                 ) : null}
                              </Form.Label>
                              <Form.Control
                                 name="expiration"
                                 type="text"
                                 value={formik.values.expiration}
                                 readOnly
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                              />
                           </Form.Group>
                        </Col>
                     </Row>

                     <Row>
                        <Col xs={6} md={4}>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>
                                 Par
                                 {formik.touched.par && formik.errors.par ? (
                                    <span className="star-error"> {formik.errors.par}</span>
                                 ) : null}
                              </Form.Label>
                              <Form.Control
                                 name="par"
                                 type="number"
                                 min={1}
                                 value={formik.values.par}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                              />
                           </Form.Group>
                        </Col>

                        <Col xs={6} md={4}>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>
                                 Quantity
                                 {formik.touched.quantity && formik.errors.quantity ? (
                                    <span className="star-error">{formik.errors.quantity}</span>
                                 ) : null}
                              </Form.Label>
                              <Form.Control
                                 name="quantity"
                                 type="number"
                                 min={1}
                                 value={formik.values.quantity}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                              />
                           </Form.Group>
                        </Col>

                        <Col xs={6} md={4}>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>
                                 Quantity Type
                                 {formik.touched.quantityType && formik.errors.quantityType ? (
                                    <span className="star-error">{formik.errors.quantityType}</span>
                                 ) : null}
                              </Form.Label>
                              <Form.Control
                                 name="quantityType"
                                 type="text"
                                 value={formik.values.quantityType}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                              />
                           </Form.Group>
                        </Col>
                     </Row>

                     <Row>
                        <Modal.Footer>
                           <Button type="submit" variant="success" disabled={!formik.isValid}>
                              Update
                           </Button>
                           <Button
                              variant="danger"
                              onClick={() => handleDeleteIngredient(ingredient.id)}
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
   return (
      <Container>
         <table className="table table-striped table-hover">
            <thead>
               <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ingredient Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Expiration</th>
               </tr>
            </thead>
            <tbody>{renderIngredients()}</tbody>
         </table>
         {
            <>
               <Link to="/ingredients/create">Add Ingredient</Link>

               <MyVerticallyCenteredModal
                  ingredient={ingredient}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
               />
            </>
         }
      </Container>
   );
}
