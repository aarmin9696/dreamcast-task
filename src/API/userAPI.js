// src/api/userAPI.js
import axios from 'axios';

export const getUsers = () => axios.get('https://jsonplaceholder.typicode.com/users');
