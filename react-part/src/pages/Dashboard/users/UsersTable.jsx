import { deleteUser, ShowUsers } from "../../../apis/UsersApis";
import Table from "../../../component/Dashboard/Table";
// import { deleteUser } from "../../apis/UsersApis";
import { useEffect, useState } from "react";
import Loading from "../../../component/Loading";

const UsersTable = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [deletedUser, setDeletedUser] = useState(false);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = () => `limit=${limit}&page=${currentPage}`;
  const tableHeader = [
    { name: "ID", key: "id" },
    { name: "NAME", key: "name" },
    { name: "EMAIL", key: "email" },
    { name: "CREATED AT", key: "created_at" },
    { name: "UPDATED AT", key: "updated_at" },
    { name: "Role", key: "role" },
  ];

  //get all users
  useEffect(() => {
    setLoading(true);
    ShowUsers(pagination())
      .then((res) => {
        console.log("res show users is", res.data);
        setUsers(res.data.data);
        setPageCount(res.data.last_page)
      })
      .finally(() => setLoading(false));
  }, [deletedUser, currentPage]);
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
        data={users}
        deleteFunction={handleDeleteUser}
        tableHeader={tableHeader}
        type="users"
        currentPage={setCurrentPage}
        pageCount={pageCount}
      />
    </>
  );
};

export default UsersTable;
