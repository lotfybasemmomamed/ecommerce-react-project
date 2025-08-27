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
export const getCategories =(pagination)=>axios.get(`${baseUrl}/categories?${pagination}`,getAuthConfig())
export const getCategoryById =(id)=>axios.get(`${baseUrl}/category/${id}`,getAuthConfig())
export const deleteCategory =(id)=>axios.delete(`${baseUrl}/category/${id}`,getAuthConfig())
export const addCategory =(categoryData)=>axios.post(`${baseUrl}/category/add`,categoryData,{
    ...getAuthConfig(),
    headers: {
      ...getAuthConfig().headers,
      "Content-Type": "multipart/form-data",
    },
  })

export const editCategory =(id,categoryData)=>axios.post(`${baseUrl}/category/edit/${id}`,categoryData,{
    ...getAuthConfig(),
    headers: {
      ...getAuthConfig().headers,
      "Content-Type": "multipart/form-data",
    },
  })
