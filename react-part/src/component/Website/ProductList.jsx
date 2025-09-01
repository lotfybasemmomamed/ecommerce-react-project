import ProductItem from "./ProductItem";

function ProductList({products}) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center">
      {products.map((productData,index) => (
        <ProductItem productData={productData} key={index} />
      ))}
    </div>
  );
}

export default ProductList;
