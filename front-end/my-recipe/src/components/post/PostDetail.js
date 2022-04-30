import React from "react";
import { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate, useParams } from "react-router-dom";

const axios = require("axios").default;
const PostDetail = () => {
   const navigate = useNavigate();
   const URL = "http://localhost:8080/api/users";
   const params = useParams();

   const [post, setPost] = useState({});
   useEffect(() => {
      loadPost();
   }, []);

   const loadPost = async () => {
      const userObj = localStorage.getItem("user");
      if (userObj === null) {
         navigate("/");
      }
      const result = await axios.get(`${URL}/posts/${params.postId}`);
      setPost(result.data);
      console.log(result);
   };

   console.log(params);
   return (
      <Container className="mt-5">
         <Row>
            <Col xs={6}>
               <Image src={post.imgUrl} />
            </Col>
            <Col xs={6}>
               <h3 className="text-center">{post.title}</h3>
               <p style={{ fontSize: "16px" }}>{post.content}</p>
            </Col>
         </Row>
      </Container>
   );
};
export default PostDetail;
