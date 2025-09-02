import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProductsCart } from "../../apis/cartApis";
import WebsiteLoading from "../../component/Website/WebsiteLoading";

export default function CartDropdown() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProductsCart()
      .then((res) => {
        const dataWithCount = res.data.map((item) => ({
          id: item.id,
          title: item.products?.title || "",
          price: item.products?.price || 0,
          image:
            Array.isArray(item.products?.image) &&
            item.products.image.length > 0
              ? item.products.image[0]
              : "",
          count: item.count || 1,
        }));
        setCart(dataWithCount);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: newQty } : item))
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  if (loading) return <WebsiteLoading />;

  return (
    <div className="pt-[50px]">
      <div className="absolute right-0 mt-2 z-50 sm:w-[400px] bg-white border rounded-xl shadow-xl p-5">
        <div className="flex flex-col gap-4 max-h-72 overflow-y-auto">
          {cart.length === 0 && (
            <p className="text-gray-500 text-sm text-center">
              Your cart is empty.
            </p>
          )}

          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 bg-gray-50 rounded-lg p-3">
              <span className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded-lg">
                No Images
              </span>
              <div className="flex flex-col flex-1">
                <span className="font-medium text-sm text-gray-800">
                  {item.title}
                </span>
                <span className="text-gray-500 text-xs">${item.price}</span>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center bg-white border rounded-full px-2 py-1 shadow-sm">
                    <button
                      onClick={() => handleQuantity(item.id, item.count - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-2">{item.count}</span>
                    <button
                      onClick={() => handleQuantity(item.id, item.count + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-700 text-sm">
                      ${(item.price * item.count).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 text-xs flex items-center gap-1 hover:underline"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              View Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
