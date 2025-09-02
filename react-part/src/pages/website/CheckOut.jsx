"use client";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { getProductsCart } from "../../apis/cartApis";
import WebsiteLoading from "../../component/Website/WebsiteLoading";



export default function Checkout() {
  const [productsCart, setProductsCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "cod",
  });

  const deliveryCharges = 73.4;
  const subtotal = productsCart.reduce(
    (acc, item) => acc + item.products?.price * item.count,
    0
  );
  const discount = subtotal > 0 ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryCharges - discount;
  useEffect(() => {
    if (!token) {
      window.location.pathname = "/login";
      return;
    }
    alert("Dear customer, online payment is currently unavailable. It will be back soon.")
    setLoading(true);
    getProductsCart()
      .then((res) => {
        console.log("getProductsCart",res)
        setProductsCart(res.data);
      })
      .finally(() => setLoading(false));
  }, []);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };


  return (
    <>
      {loading ? (
        <WebsiteLoading />
      ) : (
        <div className="bg-blue-50">
          <div className=" max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-2xl shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Checkout</h2>

              <div>
                <h3 className="text-lg font-semibold mb-3">Order Review</h3>
                {productsCart.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {productsCart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b pb-3"
                      >
                        {item.image?.length > 0 ? (
                          <img
                            src={item.image[0]}
                            alt={item.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <span className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded-lg">
                            No Image
                          </span>
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{item.products?.title}</h4>
                          <p className="text-sm text-gray-600">
                            ${item.products?.price} × {item.count}
                          </p>
                        </div>
                        <span className="font-semibold">
                          ${(item.products?.price * item.count).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 mt-1"
                    rows="3"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg p-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg p-2 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </h3>
                  <div className="space-y-2">
                    {["cod", "card", "paypal"].map((method) => (
                      <label key={method} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleChange}
                        />
                        <span className="capitalize">
                          {method === "cod"
                            ? "Cash on Delivery"
                            : method === "card"
                            ? "Credit/Debit Card"
                            : "PayPal"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Place Order
                </button>
              </form>
            </div>

            <div className="col-span-1 bg-white rounded-2xl shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Order Summary
              </h2>
              <div className="text-sm text-gray-700 space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>${deliveryCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-red-500">- ${discount.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
