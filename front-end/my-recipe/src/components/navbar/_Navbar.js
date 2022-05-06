import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./_Navbar.css";

export default function _Navbar() {
   let navigate = useNavigate();
   const handleLogout = () => {
      navigate(0);
      localStorage.clear();
   };
   return (
      <Navbar expand="lg" bg="light" variant="light">
         <Container>
            <Navbar.Brand as={Link} to="/homepage">
               RecipeZ
            </Navbar.Brand>
            <Nav className="me-auto">
               <Nav.Link as={Link} to="/homepage">
                  Home
               </Nav.Link>
               <Nav.Link as={Link} to="/ingredients">
                  Ingredient
               </Nav.Link>
               <Nav.Link as={Link} to="/recipes">
                  Recipe
               </Nav.Link>
               <Nav.Link as={Link} to="/shopping">
                  Shopping
               </Nav.Link>
               <Nav.Link as={Link} to="/posts">
                  Post
               </Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
               <Navbar.Text>
                  <Button
                     variant="link"
                     style={{ marginTop: 0, paddingTop: 0 }}
                     onClick={handleLogout}
                  >
                     Signout
                  </Button>
               </Navbar.Text>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}
