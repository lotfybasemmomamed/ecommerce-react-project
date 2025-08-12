import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api'


export const register = (formData)=>axios.post(`${baseUrl}/register`,formData)
export const login = (formData)=>axios.post(`${baseUrl}/login`,formData)