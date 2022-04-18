import React from 'react'
import { 
  BrowserRouter,
  Routes, 
  Route,
  useNavigate,
  Link 
} from "react-router-dom";
import { useState, useEffect } from 'react'

const axios = require('axios').default;

const Homepage = () => {
  let navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const usersFromServer = await fetchUsers();
    console.log("users:");
    console.log(usersFromServer);
    setUsers(usersFromServer);
  }

  async function getUsersV2() {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      console.log("axios response",response);
    } catch (error) {
      console.error(error);
    }
  }

  getUsersV2();

  useEffect(() => {
    getUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:8080/api/users')
    const data = await res.json();

    return data
  }

  const app = () => {
    navigate('/');
  }

  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        
        {
          users.map((user)=> (
            <li key={user.id}>Username: {user.username}, Password: {user.password}, Email: {user.email}</li>
        ))
        }
      </ul>
      <button class="button" onClick={app}>Back</button>
    </div>
  )
}

export default Homepage