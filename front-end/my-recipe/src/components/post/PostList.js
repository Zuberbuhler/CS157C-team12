import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function PostList() {
   const URL = "http://localhost:8080/api/users/";
   const [posts, setPosts] = useState([]);
   const [post, setPost] = useState({});
   const [modalShow, setModalShow] = useState(false);

   useEffect(() => {
      loadPosts();
      console.log(posts);
   }, []);

   // load all posts
   const loadPosts = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      const result = await axios.get(`${URL}${userId}/posts`);
      setPosts(result.data);
   };

   // load an post
   const loadPost = async (post) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      const postId = post.id;
      const result = await axios.get(`${URL}${userId}/posts/${postId}`);
      setPost(result.data);
      setModalShow(true);
   };

   const updatePost = async (_post) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      await axios.put(`${URL}${userId}/posts`, _post).then(setModalShow(false));
   };

   // delete an post
   const deletePost = async (postId) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user["userId"];
      const result = await axios.delete(`${URL}${userId}/posts/${postId}`);
      setModalShow(false);
   };

   const handleUpdatePost = (newPost) => {
      const _posts = JSON.parse(JSON.stringify(posts));
      let postIdx = 0;
      for (let i = 0; i < _posts.length; i++) {
         if (newPost.id === _posts[i].id) {
            _posts[i] = newPost;
            postIdx = i;
            break;
         }
      }
      setPosts(_posts);
      updatePost(_posts[postIdx]);
   };

   const renderPosts = () => {
      return posts.map((post, i) => (
         <tr
            key={post.id}
            className="my-row"
            onClick={() => {
               handleEachItemClick(post);
            }}
         >
            <th scope="row">{i + 1}</th>
            <td>{post.title}</td>
            <td>{post.content.substring(0, 100) + "..."}</td>
         </tr>
      ));
   };

   const handleEachItemClick = (post) => {
      loadPost(post);
   };

   const handleDeletePost = (postId) => {
      // change the state
      const filteredPosts = posts.filter((post) => post.id !== postId);
      setPosts(filteredPosts);

      // calling api
      deletePost(postId);
   };

   function MyVerticallyCenteredModal(props) {
      const { post } = props;
      const formik = useFormik({
         initialValues: {
            id: post.id,
            title: post.title,
            content: post.content,
            imgUrl: post.imgUrl,
         },
         validationSchema: Yup.object({
            title: Yup.string().required("*"),
            content: Yup.string().required("*"),
            imgUrl: Yup.string().required("*"),
         }),
         onSubmit: (post) => {
            handleUpdatePost(post);
         },
      });

      return (
         <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
               <Container>
                  <Form onSubmit={formik.handleSubmit}>
                     <Row>
                        <Col xs={5} md={12}>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>
                                 Title
                                 {formik.touched.title && formik.errors.title ? (
                                    <span className="star-error">{formik.errors.title}</span>
                                 ) : null}
                              </Form.Label>
                              <Form.Control
                                 type="text"
                                 value={formik.values.title}
                                 name="title"
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 // ref={ingredientNameRef}
                              />
                           </Form.Group>
                        </Col>
                     </Row>
                     <Row>
                        <Col xs={5} md={12}>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>
                                 Content
                                 {formik.touched.content && formik.errors.content ? (
                                    <span className="star-error">{formik.errors.content}</span>
                                 ) : null}
                              </Form.Label>
                              <Form.Control
                                 name="content"
                                 as="textarea"
                                 value={formik.values.content}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 // ref={expirationRef}
                              />
                           </Form.Group>
                        </Col>
                     </Row>

                     <Row>
                        <Col xs={6} md={10}>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>
                                 Image URL
                                 {formik.touched.imgUrl && formik.errors.imgUrl ? (
                                    <span className="star-error">{formik.errors.imgUrl}</span>
                                 ) : null}
                              </Form.Label>
                              <Form.Control
                                 name="imgUrl"
                                 type="text"
                                 value={formik.values.imgUrl}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                 // ref={quantityTypeRef}
                              />
                           </Form.Group>
                        </Col>
                     </Row>

                     <Row>
                        <Modal.Footer>
                           <Button type="submit" variant="success" disabled={!formik.isValid}>
                              Update
                           </Button>
                           <Button variant="danger" onClick={() => handleDeletePost(post.id)}>
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
                  <th scope="col">Title</th>
                  <th scope="col">Content</th>
               </tr>
            </thead>
            <tbody>{renderPosts()}</tbody>
         </table>

         {/* Modal box */}
         {
            <>
               <Link to="/posts/create">Add Post</Link>

               <MyVerticallyCenteredModal
                  post={post}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
               />
            </>
         }
      </Container>
   );
}
