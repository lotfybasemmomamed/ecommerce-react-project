import Table from "../../../component/Dashboard/Table";
import { useEffect, useState } from "react";
import Loading from "../../../component/Loading";
import { getCategories, deleteCategory } from "../../../apis/categoriesApis";

const CategoriesTable = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deletedCategory, setDeletedCategory] = useState(false);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = () => `limit=${limit}&page=${currentPage}`;
  const tableHeader = [
    { name: "ID", key: "id" },
    { name: "TITLE", key: "title" },
    { name: "CREATED AT", key: "created_at" },
    { name: "UPDATED AT", key: "updated_at" },
    { name: "IMAGE", key: "image" },
  ];

  

  //get all categories
  useEffect(() => {
    setLoading(true);
    getCategories(pagination())
      .then((res) => {
        console.log("res getCategories from categorytable is ", res);
        setCategories(res.data.data);
        setPageCount(res.data.last_page)
      })
      .catch((err) => {
        alert(err.response?.data?.message);
      })
      .finally(() => setLoading(false));
  }, [deletedCategory,currentPage]);

  //delete category
  function handleDeleteCategory(id) {
    deleteCategory(id).then(() => setDeletedCategory((prev) => !prev));
  }

  return (
    <>
      {loading && <Loading color="green" />}
      <Table
        data={categories}
        deleteFunction={handleDeleteCategory}
        tableHeader={tableHeader}
        type="categories"
        currentPage={setCurrentPage}
        pageCount={pageCount}
      />
    </>
  );
};

export default CategoriesTable;
