import axios from 'axios'
import { useState } from 'react';

export default axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
  headers: {
    Authorization: window.localStorage.getItem('token')
  }
});

