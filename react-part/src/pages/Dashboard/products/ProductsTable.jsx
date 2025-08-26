import Table from "../../../component/Dashboard/Table";
import { useEffect, useState } from "react";
import Loading from "../../../component/Loading";
import { getProducts,deleteProduct } from "../../../apis/ProductsApis";

const ProductsTable = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState(false);
  const tableHeader = [
    { name: "ID", key: "id" },
    { name: "TITLE", key: "title" },
    { name: "IMAGES", key: "images" },
    { name: "DESCRIPTION", key: "description" },
    { name: "PRICE", key: "price" },
    { name: "RATING", key: "rating" },
  ];

  //get all products
  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => {
        console.log("res products from product table is ", res);
        setProducts(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message);
      })
      .finally(() => setLoading(false));
  }, [deletedProduct]);

  //delete product
  function handleDeleteProduct(id) {
    deleteProduct(id).then(() => setDeletedProduct((prev) => !prev));
  }

  return (
    <>
      {loading && <Loading color="green" />}
      <Table
        data={products}
        deleteFunction={handleDeleteProduct}
        tableHeader={tableHeader}
        type="products"
      />
    </>
  );
};

export default ProductsTable;
