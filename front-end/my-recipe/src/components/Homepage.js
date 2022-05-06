import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Container, Badge } from "react-bootstrap";
const axios = require("axios").default;

const URL = "http://localhost:8080/api/users";

const Homepage = () => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      loadPosts();
      console.log(posts);
   }, []);

   // load all posts
   const loadPosts = async () => {
      const result = await axios.get(`${URL}/posts`);
      setPosts(result.data);
      console.log(result);
   };

   const renderPosts = () => {
      return posts.map((post) => (
         <Col key={post.id}>
            <Card className="mt-1 mb-1" style={{ width: "15rem" }}>
               <Card.Img variant="top" src={post.imgUrl} style={{height: "10em", objectFit: "cover"}} />
               <Card.Body>
                  <Card.Title style={{ fontSize: "16px" }}>
                     {post.title.substring(0, 150) + "..."}
                  </Card.Title>
                  {/* <Card.Text>{post.content.substring(0, 150) + "..."}</Card.Text> */}
                  {/* <Button variant="outline-secondary">View More</Button> */}
                  <Link to={`./posts/${post.id}`}>
                     <Badge
                        pill
                        bg="light"
                        text="primary"
                        style={{ fontSize: "14px", fontWeight: "normal" }}
                     >
                        View More...
                     </Badge>
                  </Link>
               </Card.Body>
            </Card>
         </Col>
      ));
   };

   return (
      <Container>
         <Row className="mt-5">{renderPosts()}</Row>
      </Container>
   );
};

export default Homepage;
