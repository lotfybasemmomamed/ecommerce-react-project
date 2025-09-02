import axios from "axios";
import Cookies from "universal-cookie";

const baseUrl = "http://127.0.0.1:8000/api";
const cookie = new Cookies();
function getAuthConfig() {
  const token = cookie.get("Bearer");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const addProductToCartAPi = (cartData) =>
  axios.post(`${baseUrl}/cart`, cartData, getAuthConfig());

export const getProductsCart = () =>
  axios.get(`${baseUrl}/cart`, getAuthConfig());
