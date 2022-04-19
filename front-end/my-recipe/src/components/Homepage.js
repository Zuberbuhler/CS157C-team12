import React from 'react'
import { 
  useNavigate,
} from "react-router-dom";

import { useState } from 'react'

const axios = require('axios').default;

const REGISTER_URL = 'http://localhost:8080/api/users';

const Homepage = () => {
  let navigate = useNavigate();

  const [postResponse, setPostResponse] = useState('Test');

  const app = () => {
    navigate('/');
  }

  return (
    <div>
      <h1>Homepage</h1>
      <p>{postResponse}</p>
      <button class="button" onClick={app}>Logout</button>
    </div>
  )
}

export default Homepage