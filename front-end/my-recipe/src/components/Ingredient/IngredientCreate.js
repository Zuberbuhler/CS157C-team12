import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function IngredientCreate() {
   let navigate = useNavigate();

   const URL = "http://localhost:8080/api/users/";
   const [ingredient, setIngredient] = useState({});
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(ingredient);
      ingredient["par"] = parseInt(ingredient["par"]);
      ingredient["quantity"] = parseInt(ingredient["quantity"]);
      createIngredient();
   };

   const handleChange = (e) => {
      let newIngredient = { ...ingredient, [e.target.name]: e.target.value };
      setIngredient(newIngredient);
   };

   const createIngredient = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      axios.post(`${URL}${userId}/ingredients`, ingredient).then(() => navigate("/ingredients"));
   };

   return (
      <>
         <Card
            className=" shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light"
            style={{ width: "30rem" }}
         >
            <div className="card-header bg-transparent border-0 text-center">
               <h3>Create Ingredient</h3>
            </div>
            <Form onSubmit={handleSubmit}>
               <Row>
                  <Col xs={5} md={12}>
                     <Form.Group className="mb-3" controlId="formIngredientName">
                        <Form.Label>Ingredient Name</Form.Label>
                        <Form.Control
                           type="text"
                           name="ingredientName"
                           onChange={(e) => handleChange(e)}
                        />
                     </Form.Group>
                  </Col>
               </Row>

               <Row>
                  <Col xs={5} md={12}>
                     <Form.Group className="mb-3" controlId="formExpiration">
                        <Form.Label>Expiration</Form.Label>
                        <Form.Control
                           type="text"
                           name="expiration"
                           onChange={(e) => handleChange(e)}
                        />
                     </Form.Group>
                  </Col>
               </Row>

               <Row>
                  <Col xs={6} md={4}>
                     <Form.Group className="mb-3" controlId="formPar">
                        <Form.Label>Par</Form.Label>
                        <Form.Control
                           type="number"
                           min={0}
                           name="par"
                           onChange={(e) => handleChange(e)}
                        />
                     </Form.Group>
                  </Col>

                  <Col xs={6} md={4}>
                     <Form.Group className="mb-3" controlId="formQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                           type="number"
                           min={0}
                           name="quantity"
                           onChange={(e) => handleChange(e)}
                        />
                     </Form.Group>
                  </Col>

                  <Col xs={6} md={4}>
                     <Form.Group className="mb-3" controlId="formQuantityType">
                        <Form.Label>Quantity Type</Form.Label>
                        <Form.Control
                           type="text"
                           name="quantityType"
                           onChange={(e) => handleChange(e)}
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <Button variant="primary" type="submit">
                  Submit
               </Button>
            </Form>
         </Card>
      </>
   );
}
