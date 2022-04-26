import React from "react";
import axios from "axios";
import { Button, Form, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./IngredientCreate.css";

import * as Yup from "yup";
import { useFormik } from "formik";

export default function IngredientCreate() {
   const formik = useFormik({
      initialValues: {
         ingredientName: "",
         expiration: "",
         par: "",
         quantity: "",
         quantityType: "",
      },
      validationSchema: Yup.object({
         ingredientName: Yup.string().required("*"),
         expiration: Yup.string().required("*"),
         par: Yup.number().min(1, "> 0").required("*"),
         quantity: Yup.number().min(1, "(> 0)").required("*"),
         quantityType: Yup.string().required("*"),
      }),
      onSubmit: (ingredient) => {
         createIngredient(ingredient);
      },
   });

   let navigate = useNavigate();

   const URL = "http://localhost:8080/api/users/";

   const createIngredient = (ingredient) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      axios.post(`${URL}${userId}/ingredients`, ingredient).then(() => navigate("/ingredients"));
   };

   return (
      <Card
         className=" shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light"
         style={{ width: "30rem" }}
      >
         <div className="card-header bg-transparent border-0 text-center">
            <h3>Create Ingredient</h3>
         </div>
         <Form onSubmit={formik.handleSubmit}>
            <Row>
               <Col xs={5} md={11}>
                  <Form.Group className="mb-3" controlId="formIngredientName">
                     <Form.Label className="my-inline">
                        Ingredient Name
                        {formik.touched.ingredientName && formik.errors.ingredientName ? (
                           <span className="star-error"> {formik.errors.ingredientName}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="ingredientName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.ingredientName}
                     />
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Col xs={5} md={12}>
                  <Form.Group className="mb-3" controlId="formExpiration">
                     <Form.Label>
                        Expiration
                        {formik.touched.expiration && formik.errors.expiration ? (
                           <span className="star-error"> {formik.errors.expiration}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="expiration"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.expiration}
                     />
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Col xs={6} md={4}>
                  <Form.Group className="mb-3" controlId="formPar">
                     <Form.Label>
                        Par
                        {formik.touched.par && formik.errors.par ? (
                           <span className="star-error"> {formik.errors.par}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        type="number"
                        min={0}
                        name="par"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.par}
                     />
                  </Form.Group>
               </Col>

               <Col xs={6} md={4}>
                  <Form.Group className="mb-3" controlId="formQuantity">
                     <Form.Label>
                        Quantity
                        {formik.touched.quantity && formik.errors.quantity ? (
                           <span className="star-error"> {formik.errors.quantity}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        type="number"
                        min={0}
                        name="quantity"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quantity}
                     />
                  </Form.Group>
               </Col>

               <Col xs={6} md={4}>
                  <Form.Group className="mb-3" controlId="formQuantityType">
                     <Form.Label>
                        Quantity Type
                        {formik.touched.quantityType && formik.errors.quantityType ? (
                           <span className="star-error"> {formik.errors.quantityType}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="quantityType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quantityType}
                     />
                  </Form.Group>
               </Col>
            </Row>
            <Button variant="primary" type="submit" disabled={!(formik.isValid && formik.dirty)}>
               Submit
            </Button>
         </Form>
      </Card>
   );
}
