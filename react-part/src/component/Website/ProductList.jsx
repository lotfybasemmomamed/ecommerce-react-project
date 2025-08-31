import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { getLatestsSaleProducts } from "../../apis/ProductsApis";

function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getLatestsSaleProducts().then((res) => {
      console.log("product list res", res);
      setProducts(res.data);
    });
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center">
      {products.map((productData,index) => (
        <ProductItem productData={productData} key={index} />
      ))}
    </div>
  );
}

export default ProductList;
