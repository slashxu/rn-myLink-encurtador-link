import axios from 'axios';
import { API_KEY } from 'react-native-dotenv';

export const key = { API_KEY };

const api = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4',
  headers: {
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json'
  }
})

export default api;