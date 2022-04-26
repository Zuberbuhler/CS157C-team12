import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

import "./IngredientList.css";
import { Link } from "react-router-dom";

export default function IngredientList() {
   const URL = "http://localhost:8080/api/users/";
   const [ingredients, setIngredients] = useState([]);
   const [ingredient, setIngredient] = useState({});
   const [modalShow, setModalShow] = useState(false);

   // Click row -> index -> ingredients[index]

   const ingredientNameRef = useRef();
   const expirationRef = useRef();
   const quantityRef = useRef();
   const parRef = useRef();
   const quantityTypeRef = useRef();

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
      console.log(result.data);
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
      setIngredient(null);
   };

   const handleUpdateIngredient = (e) => {
      e.preventDefault();
      const newIngredient = {
         ...ingredient,
         ingredientName: ingredientNameRef.current.value,
         quantity: quantityRef.current.value,
         quantityType: quantityTypeRef.current.value,
         expiration: expirationRef.current.value,
         par: parRef.current.value,
      };

      const _ingredients = JSON.parse(JSON.stringify(ingredients));
      let ingredientIdx = 0;
      for (let i = 0; i < _ingredients.length; i++) {
         if (newIngredient.id === _ingredients[i].id) {
            _ingredients[i] = newIngredient;
            ingredientIdx = i;
            break;
         }
      }

      // _ingredients.push(newIngredient);
      setIngredients(_ingredients);
      console.log(newIngredient);
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
      // console.log(ingredient);
      loadIngredient(ingredient);
   };

   const handleDeleteIngredient = (ingredientId) => {
      // change the state
      const filteredIngredients = ingredients.filter(
         (ingredient) => ingredient.id !== ingredientId
      );
      setIngredients(filteredIngredients);

      // calling api
      deleteIngredient(ingredientId);
   };

   function MyVerticallyCenteredModal(props) {
      return (
         ingredient && (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
               <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">Ingredient</Modal.Title>
               </Modal.Header>
               <Modal.Body className="show-grid">
                  <Container>
                     <Form onSubmit={handleUpdateIngredient}>
                        <Row>
                           <Col xs={5} md={8}>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                 <Form.Label>Ingredient Name</Form.Label>
                                 <Form.Control
                                    name="ingredientName"
                                    type="text"
                                    autoFocus
                                    defaultValue={ingredient.ingredientName}
                                    ref={ingredientNameRef}
                                 />
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row>
                           <Col xs={5} md={8}>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                 <Form.Label>Expiration</Form.Label>
                                 <Form.Control
                                    name="expiration"
                                    type="text"
                                    defaultValue={ingredient.expiration}
                                    readOnly
                                    ref={expirationRef}
                                 />
                              </Form.Group>
                           </Col>
                        </Row>

                        <Row>
                           <Col xs={6} md={4}>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                 <Form.Label>Par</Form.Label>
                                 <Form.Control
                                    name="par"
                                    type="number"
                                    min={0}
                                    defaultValue={ingredient.par}
                                    ref={parRef}
                                 />
                              </Form.Group>
                           </Col>

                           <Col xs={6} md={4}>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                 <Form.Label>Quantity</Form.Label>
                                 <Form.Control
                                    name="quantity"
                                    type="number"
                                    min={0}
                                    defaultValue={ingredient.quantity}
                                    ref={quantityRef}
                                 />
                              </Form.Group>
                           </Col>

                           <Col xs={6} md={4}>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                 <Form.Label>Quantity Type</Form.Label>
                                 <Form.Control
                                    name="quantityType"
                                    type="text"
                                    defaultValue={ingredient.quantityType}
                                    ref={quantityTypeRef}
                                 />
                              </Form.Group>
                           </Col>
                        </Row>

                        <Row>
                           <Modal.Footer>
                              <Button type="submit" variant="success">
                                 Update
                              </Button>
                              <Button
                                 onClick={() => handleDeleteIngredient(ingredient.id)}
                                 variant="danger"
                              >
                                 Delete
                              </Button>
                           </Modal.Footer>
                        </Row>
                     </Form>
                  </Container>
               </Modal.Body>
            </Modal>
         )
      );
   }

   return (
      <>
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

         {/* Modal box */}
         {
            <>
               <Link to="/ingredients/create">Add Ingredient</Link>

               <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
            </>
         }
      </>
   );
}
