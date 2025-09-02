import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";
import { getProductById } from "../../apis/ProductsApis";

function ProductPage() {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const {id} =useParams()
  useEffect(()=>{
    getProductById(id).then((res)=>{
        console.log("res",res)

    })
  },[])
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <div className="max-w-6xl lg:mt-[20px] mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* slider */}
      <div className="rounded-2xl shadow-lg overflow-hidden">
        <ImageGallery items={images} showPlayButton={false} />
      </div>

      {/* content */}
      <div className="flex flex-col">
        {/* title */}
        <h2 className="text-3xl font-bold mb-3 text-gray-800">
          Ground Nuts Oil Pack 52g
        </h2>

        {/* rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${
                  i < 4 ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-500">(888 reviews)</p>
        </div>

        {/* description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex eum,
          ullam et consequuntur maxime nobis at soluta cum laboriosam ipsam
          possimus sequi quia hic veritatis iure debitis beatae similique minus.
        </p>

        {/* price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-blue-600">
              ${(100 - 100 * (2 / 100)).toFixed(2)}
            </span>
            <span className="text-md text-gray-400 line-through">
              ${Number(100).toFixed(2)}
            </span>
          </div>
          <p className="text-green-600 font-semibold">✅ In Stock</p>
        </div>

        {/* buttons */}
        <div className="flex items-center gap-5">
          {/* Add to cart */}
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl shadow-lg hover:bg-blue-700 transition font-semibold text-lg">
            🛒 Add to Cart
          </button>

          {/* count amount btn */}
          <div className="flex items-center border rounded-xl overflow-hidden shadow-sm">
            <button className="px-4 py-2 text-xl font-bold hover:bg-gray-100">
              -
            </button>
            <span className="px-5 py-2 text-lg font-medium">9</span>
            <button className="px-4 py-2 text-xl font-bold hover:bg-gray-100">
              +
            </button>
          </div>
        </div>
      </div>
      {/* <ProductSection title="ٌRelated Products" productData={relatedProducts} /> */}
    </div>
  );
}

export default ProductPage;
