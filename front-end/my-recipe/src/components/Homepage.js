import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
const axios = require("axios").default;

const REGISTER_URL = "http://localhost:8080/api/users";

const Homepage = () => {
   let navigate = useNavigate();

   const [postResponse, setPostResponse] = useState("Test");

   useEffect(() => {});

   const logout = () => {
      navigate("/");
      localStorage.clear();
   };

   return (
      <div>
         <ul>
            <Link to="/ingredient">
               <li>Ingredient</li>
            </Link>
            <Link to="/recipe">
               <li>Recipe</li>
            </Link>
            <Link to="/ingredients">
               <li>Ingredients</li>
            </Link>
         </ul>
         <p>{postResponse}</p>
         <button className="button" onClick={logout}>
            Logout
         </button>
      </div>
   );
};

export default Homepage;
