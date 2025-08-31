import Table from "../../../component/Dashboard/Table";
import { useEffect, useState } from "react";
import Loading from "../../../component/Dashboard/Loading";
import { getProducts,deleteProduct } from "../../../apis/ProductsApis";

const ProductsTable = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState(false);
  const [limit,setLimit]=useState(5)
  const [pageCount, setPageCount] = useState(5);
  const [currentPage,setCurrentPage]=useState(1)
  const pagination =()=>`limit=${limit}&page=${currentPage}`
  const tableHeader = [
    { name: "ID", key: "id" },
    { name: "TITLE", key: "title" },
    { name: "IMAGES", key: "images" },
    { name: "DESCRIPTION", key: "description" },
    { name: "CREATED AT", key: "created_at" },
    { name: "UPDATED AT", key: "updated_at" },
    { name: "PRICE", key: "price" },
    { name: "RATING", key: "rating" },
  ];

  //get all products
  useEffect(() => {
    setLoading(true);
    getProducts(pagination())
      .then((res) => {
        console.log("res products from product table is ", res);
        setProducts(res.data.data);
        setPageCount(res.data.last_page)
      })
      .catch((err) => {
        alert(err.response?.data?.message);
      })
      .finally(() => setLoading(false));
  }, [deletedProduct,currentPage]);

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
        currentPage={setCurrentPage}
        pageCount={pageCount}
      />
    </>
  );
};

export default ProductsTable;
