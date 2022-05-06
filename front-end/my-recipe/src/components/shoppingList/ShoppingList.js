import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

import "./ShoppingList.css";
import { Link } from "react-router-dom";
import moment from "moment";


const ShoppingList = () => {
    const URL = "http://localhost:8080/api/users/";
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState({});

    useEffect(() => {
        loadIngredients();
        console.log(ingredients);
     }, []);
  
     // load all ingredients
     const loadIngredients = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user["userId"];
        const result = await axios.get(`${URL}${userId}/ingredients`);

        const _ingredientsBelowPar = result.data.filter(_ingredient => _ingredient.quantity < _ingredient.par);
        // const _ingredientsExpired = _ingredientsBelowPar.filter(_ingredient => );

        setIngredients(_ingredientsBelowPar);
     };
  
     // load an ingredient
     const loadIngredient = async (ingredient) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user["userId"];
        const ingredientId = ingredient.id;
        const result = await axios.get(`${URL}${userId}/ingredients/${ingredientId}`);
        setIngredient(result.data);
     };

  
     // delete an ingredient
     const deleteIngredient = async (ingredientId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user["userId"];
        const result = await axios.delete(`${URL}${userId}/ingredients/${ingredientId}`);
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
              <td>{ingredient.par - ingredient.quantity}</td>
              <td>{ingredient.quantityType}</td>
              <td>{moment(ingredient.expiration).format("MM/DD/yyyy")}</td>
           </tr>
        ));
     };
  
     const handleEachItemClick = (ingredient) => {
        loadIngredient(ingredient);
     };
  
     const handleDeleteIngredient = (ingredientId) => {
        // change the state
        const filteredIngredients = ingredients.filter(
           (ingredient) => ingredient.id !== ingredientId
        );
        setIngredients(filteredIngredients);
        deleteIngredient(ingredientId);
     };

    return (
        <Container>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Ingredient Name</th>
                    <th scope="col">Missing</th>
                    <th scope="col">Quantity Type</th>
                    <th scope="col">Expiration</th>
                </tr>
                </thead>
                <tbody>{renderIngredients()}</tbody>
            </table>
        </Container>
    )
}

export default ShoppingList