import React from 'react'
import { 
  useNavigate,
} from "react-router-dom";

import { useState } from 'react'

const axios = require('axios').default;

const REGISTER_URL = 'http://localhost:8080/api/users';

const Homepage = () => {
  let navigate = useNavigate();

  const [postResponse, setPostResponse] = useState('test');

  const app = () => {
    navigate('/');
  }

  const postUser = async (e) => {
    let payload = {
      username:"user1",
      email:"email1@gmail.com",
      password:"pwd1"
    }

    axios.post(REGISTER_URL, 
      payload
    )
    .then(function (response) {
      console.log(response);
      if(response.data === false)
      {
        console.log("Failed to insert new user.")
        setPostResponse("Failed!");
      }
      else if (response.data === true){
        setPostResponse("Success!");
      }
      else{
        setPostResponse("???!");
      }
    })
    .catch(function (error) {
      console.log(error);
      setPostResponse("Error!");
    });
}

postUser()

  return (
    <div>
      <h1>Homepage</h1>
      <p>{postResponse}</p>
      <button class="button" onClick={app}>Back</button>
    </div>
  )
}

export default Homepage