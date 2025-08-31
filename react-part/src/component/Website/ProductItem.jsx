export default function ProductItem({ productData }) {
  const isNewValues = ["new", "hot", "sale", "normal"];
  const isNew = isNewValues[Math.floor(Math.random() * isNewValues.length)];

  return (
    <div className="w-[95%] max-w-xs m-2 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition p-4 flex flex-col relative">
      {isNew && (
        <div className="absolute bg-blue-500 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
          NEW
        </div>
      )}

      <div className="relative w-full h-52 flex justify-center items-center overflow-hidden rounded-xl">
        <img
          src={productData.images[0].image}
          alt={productData.title}
          className="object-contain w-full h-full p-2"
        />

        {productData.discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
            -{productData.discount}%
          </span>
        )}
      </div>

      <div className="flex flex-col mt-3">
        <span className="text-blue-600 text-sm font-medium">
          {productData.category}
        </span>

        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < productData.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <h3 className="text-base font-semibold text-gray-900 mt-2 line-clamp-2">
          {productData.title}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-600">
              $
              {(
                productData.price -
                productData.price * (productData.discount / 100)
              ).toFixed(2)}
            </span>
            {productData.price && (
              <span className="text-sm text-gray-400 line-through">
                ${Number(productData.price).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-xl hover:bg-blue-700 transition">
            Add to Cart
          </button>
          <button className="flex-1 border border-blue-600 text-blue-600 text-sm py-2 rounded-xl hover:bg-blue-50 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
