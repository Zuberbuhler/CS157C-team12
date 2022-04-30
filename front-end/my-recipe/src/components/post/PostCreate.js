import React from "react";
import axios from "axios";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";

export default function PostCreate() {
   const formik = useFormik({
      initialValues: {
         title: "",
         content: "",
         imgUrl: "",
      },
      validationSchema: Yup.object({
         title: Yup.string().required("*"),
         content: Yup.string().required("*"),
         imgUrl: Yup.string().required("*"),
      }),
      onSubmit: (post) => {
         createPost(post);
      },
   });

   let navigate = useNavigate();

   const URL = "http://localhost:8080/api/users/";

   const createPost = (post) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      axios.post(`${URL}${userId}/posts`, post).then(() => navigate("/posts"));
   };

   return (
      <Card
         className=" shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light"
         style={{ width: "30rem" }}
      >
         <div className="card-header bg-transparent border-0 text-center">
            <h3>Create Post</h3>
         </div>
         <Form onSubmit={formik.handleSubmit}>
            <Row>
               <Col xs={5} md={12}>
                  <Form.Group className="mb-3" controlId="formPostTitle">
                     <Form.Label className="my-inline">
                        Title
                        {formik.touched.title && formik.errors.title ? (
                           <span className="star-error"> {formik.errors.title}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                     />
                  </Form.Group>
               </Col>
            </Row>

            <Row>
               <Col xs={5} md={12}>
                  <Form.Group className="mb-3" controlId="formContent">
                     <Form.Label>
                        Content
                        {formik.touched.content && formik.errors.content ? (
                           <span className="star-error"> {formik.errors.content}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        as="textarea"
                        name="content"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                     />
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col xs={5} md={12}>
                  <Form.Group className="mb-3" controlId="formImgUrl">
                     <Form.Label>
                        Image URL
                        {formik.touched.imgUrl && formik.errors.imgUrl ? (
                           <span className="star-error"> {formik.errors.imgUrl}</span>
                        ) : null}
                     </Form.Label>
                     <Form.Control
                        type="text"
                        name="imgUrl"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.imgUrl}
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
