import React from "react";
import ProductList from "./ProductList";

function ProductSection({title,productData}) {
  return (
    <section className="w-full bg-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-blue-600 relative">
            {title}
            <span className="absolute left-0 bottom-[-6px] w-16 h-1 bg-blue-500 rounded-full"></span>
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            View All →
          </button>
        </div>

        <ProductList products={productData} />
      </div>
    </section>
  );
}

export default ProductSection;
