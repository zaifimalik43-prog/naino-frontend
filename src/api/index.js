import axios from 'axios'

const API = axios.create({
  baseURL: 'https://naino-backend-production.up.railway.app',
})

export const getProducts = () => API.get('/products')
export const getProduct = (id) => API.get(`/products/${id}`)
export const getProductsByCategory = (category) => API.get(`/products/category/${category}`)