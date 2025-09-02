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
export const getProducts = (pagination) => {
  const url = pagination
    ? `${baseUrl}/products?${pagination}`
    : `${baseUrl}/products`;

  return axios.get(url, getAuthConfig());
};
export const getLatestsSaleProducts =()=>axios.get(`${baseUrl}/latest-sale`,getAuthConfig())
export const getLatestsProducts =()=>axios.get(`${baseUrl}/latest`,getAuthConfig())
export const getTopRatedProducts =()=>axios.get(`${baseUrl}/top-rated`,getAuthConfig())
export const getProductById =(id)=>axios.get(`${baseUrl}/product/${id}`,getAuthConfig())
export const deleteProduct =(id)=>axios.delete(`${baseUrl}/product/${id}`,getAuthConfig())
export const addProduct =(productData)=>axios.post(`${baseUrl}/product/add`,productData,{
    ...getAuthConfig(),
    headers: {
      ...getAuthConfig().headers,
      "Content-Type": "multipart/form-data",
    },
  })

export const editProduct =(id,productData)=>axios.post(`${baseUrl}/product/edit/${id}`,productData,{
    ...getAuthConfig(),
    headers: {
      ...getAuthConfig().headers,
      "Content-Type": "multipart/form-data",
    },
  })

  //image Product api
  export const addProductImage =(productImage,onUploadProgress)=>axios.post(`${baseUrl}/product-img/add`,productImage,{
    ...getAuthConfig(),
    headers: {
      ...getAuthConfig().headers,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  })

  export const deleteProductImage =(id)=>axios.delete(`${baseUrl}/product-img/${id}`,getAuthConfig())
