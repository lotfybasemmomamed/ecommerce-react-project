import Cookies from "universal-cookie";
import { addProductToCartAPi } from "../apis/cartApis";

// check user login or not
const checkLogin = () => {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  return token ? true : false;
};

// add product to cart
export const addToCart = async (productCartDetails) => {
  if (checkLogin()) {
    const res = await addProductToCartAPi(productCartDetails);
    console.log("addProductToCartAPi res", res);
  } else window.location.pathname = "/login";
};

// delete product from cart
export const removeProductFromCart = (cart, productId) => {
  if (checkLogin()) {
    return cart.filter((item) => item.id !== productId);
  } else window.location.pathname = "/login";
};

// update quantity for product
export const updateQuantity = (cart, productId, quantity) => {
  if (checkLogin()) {
    return cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
  } else window.location.pathname = "/login";
};

// calculate total price
export const getCartTotalPrice = (cart) => {
  return cart.reduce(
    (total, item) =>
      total + (item.price - item.price * (item.discount / 100)) * item.quantity,
    0
  );
};
