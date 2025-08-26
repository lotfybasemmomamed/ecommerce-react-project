import Table from "../../../component/Dashboard/Table";
import { useEffect, useState } from "react";
import Loading from "../../../component/Loading";
import { getCategories,deleteCategory } from "../../../apis/categoriesApis";

const CategoriesTable = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deletedCategory, setDeletedCategory] = useState(false);
  const tableHeader = [
    { name: "ID", key: "id" },
    { name: "TITLE", key: "title" },
    { name: "IMAGE", key: "image" },
  ];

  //get all categories
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((res) => {
        console.log("res getCategories from categorytable is ", res);
        setCategories(res.data);
      })
      .catch((err) => {
        alert(err.response?.data?.message);
      })
      .finally(() => setLoading(false));
  }, [deletedCategory]);

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
      />
    </>
  );
};

export default CategoriesTable;
