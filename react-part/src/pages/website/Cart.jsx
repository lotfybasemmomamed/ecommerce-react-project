import { useEffect, useState } from "react";
import { getProductsCart } from "../../apis/cartApis";
import Cookies from "universal-cookie";
import WebsiteLoading from "../../component/Website/WebsiteLoading";

export default function CartPage() {
  const [productsCart, setProductsCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const deliveryCharges = 73.4;

  const subtotal = productsCart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const discount = coupon === "DISCOUNT10" ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryCharges - discount;

  const handleQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setProductsCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: newQty } : item))
    );
  };

  const handleRemove = (id) => {
    setProductsCart((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (!token) {
      window.location.pathname = "/login";
      return;
    }
    setLoading(true);
    getProductsCart()
      .then((res) => {
        const dataWithCount = res.data.map((item) => ({
          ...item,
          count: item.count || 1,
          price: item.products?.price || 0,
          title: item.products?.title || "",
          image: item.products?.image || [],
        }));
        setProductsCart(dataWithCount);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <WebsiteLoading />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6">
          {/* Summary */}
          <div className="col-span-1 bg-white rounded-2xl shadow p-5 flex flex-col gap-4 order-2 lg:order-1">
            <h2 className="text-lg font-semibold text-gray-800">Summary</h2>

            <div className="border-t pt-4 text-sm text-gray-700">
              <div className="flex justify-between mb-2">
                <span>Sub-Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span>${deliveryCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Coupon Discount</span>
                <span className="text-red-500">
                  {discount > 0 ? `- $${discount.toFixed(2)}` : "Apply Coupon"}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon Code"
                className="flex-1 border rounded-lg p-2"
              />
              <button className="bg-blue-600 text-white px-4 rounded-lg">
                Apply
              </button>
            </div>

            <div className="flex justify-between text-lg font-bold border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Products */}
          <div className="col-span-2 bg-white rounded-2xl shadow p-5 order-1 lg:order-2">
            {productsCart.length === 0 ? (
              <p className="text-center text-gray-500">Cart is empty</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="pb-2">Product</th>
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Quantity</th>
                      <th className="pb-2">Total</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsCart.map((item) => (
                      <tr key={item.id} className="border-b last:border-0">
                        <td className="py-3 flex items-center gap-3">
                          {item.image.length > 0 ? (
                            <img
                              src={item.image[0]}
                              alt={item.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <span className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded-lg">
                              No Images
                            </span>
                          )}
                          <span className="font-medium">{item.title}</span>
                        </td>
                        <td>${item.price}</td>
                        <td>
                          <div className="flex items-center border rounded-lg w-24 justify-between">
                            <button
                              onClick={() =>
                                handleQuantity(item.id, item.count - 1)
                              }
                              className="px-2"
                            >
                              -
                            </button>
                            <span>{item.count}</span>
                            <button
                              onClick={() =>
                                handleQuantity(item.id, item.count + 1)
                              }
                              className="px-2"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${(item.price * item.count).toFixed(2)}</td>
                        <td>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
