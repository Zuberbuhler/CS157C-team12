import React from 'react'
import { useState, useEffect } from 'react'

const axios = require('axios');

const flag = false;


const Homepage = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {

      const usersFromServer = await fetchUsers();
      console.log("users:");
      console.log(usersFromServer);
      setUsers(usersFromServer);
    }
    getUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:8080/api/users')
    const data = await res.json();

    return data
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
    </div>
  )
}

export default Homepage