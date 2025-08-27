import Cookies  from 'universal-cookie'
import axios from 'axios'

const cookie =new Cookies()
const baseUrl = 'http://127.0.0.1:8000/api'
function getAuthConfig() {
  return {
    headers: {
      Authorization: `Bearer ${cookie.get("Bearer")}`,
    },
  };
}
export const ShowUsers =(pagination)=>axios.get(`${baseUrl}/users?${pagination}`,getAuthConfig())
export const getUsers =()=>axios.get(`${baseUrl}/user`,getAuthConfig())
export const getUserById =(id)=>axios.get(`${baseUrl}/user/${id}`,getAuthConfig())
export const editUserData =(id,userData)=>axios.post(`${baseUrl}/user/edit/${id}`,userData,getAuthConfig())
export const deleteUser =(id,)=>axios.delete(`${baseUrl}/user/${id}`,getAuthConfig())
export const addUser =(userData)=>axios.post(`${baseUrl}/user/add`,userData,getAuthConfig())