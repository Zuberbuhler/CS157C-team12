import React, { useState, useEffect } from "react";
import { ListGroup, Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

const IngredientNamesList = () => {
    const URL = "http://localhost:8080/api/users/";
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        loadIngredients();
        console.log(ingredients);
    }, []);

   // load all ingredients
    const loadIngredients = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        const userId = user["userId"];
        const result = await axios.get(`${URL}${userId}/ingredients`);
        setIngredients(result.data);
    };

    const handleEachItemClick = (ingredient) => {
        
     };
  


     return (
       <div>
           {ingredients.map((ingredient, i) => (
         <tr
            key={ingredient.id}
            className="my-row"
            onClick={() => {
               handleEachItemClick(ingredient);
            }}
         >
            <th scope="row">{i + 1}</th>
            <td>{ingredient.ingredientName}</td>
         </tr>
      ))}
       </div>
     );
}

export default IngredientNamesList