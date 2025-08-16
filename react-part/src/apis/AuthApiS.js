import axios from 'axios'
import Cookies  from 'universal-cookie'

const baseUrl = 'http://127.0.0.1:8000/api'
const cookie =new Cookies()
function getAuthConfig() {
  const token = cookie.get("Bearer");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}


export const register = (formData)=>axios.post(`${baseUrl}/register`,formData)
export const login = (formData)=>axios.post(`${baseUrl}/login`,formData)
export const logout = ()=>axios.get(`${baseUrl}/logout`,getAuthConfig())
export const googleCallBack =(location)=>axios.get(`${baseUrl}/auth/google/callback${location}`)





