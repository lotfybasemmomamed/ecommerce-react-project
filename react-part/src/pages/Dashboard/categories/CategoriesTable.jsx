import { deleteUser, ShowUsers } from "../../../apis/UsersApis";
import Table from "../../../component/Dashboard/Table";
// import { deleteUser } from "../../apis/UsersApis";
import { useEffect, useState } from "react";
import Loading from "../../../component/Loading";
import { getCategories } from "../../../apis/categories";

const CategoriesTable = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deletedUser, setDeletedUser] = useState(false);
  const tableHeader = [
    { name: "ID", key: "id" },
    { name: "TITLE", key: "title" },
    { name: "IMAGE", key: "image" },
  ];

  //get all users
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((res) => {
        console.log("res show users is", res.data);
        setCategories(res.data);
      })
      .finally(() => setLoading(false));
  }, [deletedUser]);
  //delete user
  function handleDeleteUser(id, currentUserId) {
    if (id != currentUserId) {
      deleteUser(id).then(() => setDeletedUser((prev) => !prev));
    }
  }

  return (
    <>
      {loading && <Loading color="green" />}
      <Table
        data={categories}
        deleteFunction={handleDeleteUser}
        tableHeader={tableHeader}
        type="categories"
      />
    </>
  );
};

export default CategoriesTable;
