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
export const getCategories =(categoryData)=>axios.get(`${baseUrl}/categories`,categoryData,getAuthConfig())