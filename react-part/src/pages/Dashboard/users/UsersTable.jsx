import { deleteUser, ShowUsers } from "../../../apis/UsersApis";
import Table from "../../../component/Dashboard/Table";
// import { deleteUser } from "../../apis/UsersApis";
import { useEffect, useState } from "react";
import Loading from "../../../component/Loading";

const UsersTable = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [deletedUser, setDeletedUser] = useState(false);
  const tableHeader = [
    { name: "ID", key: "id" },
    { name: "NAME", key: "name" },
    { name: "EMAIL", key: "email" },
    { name: "Role", key: "role" },
  ];

  //get all users
  useEffect(() => {
    setLoading(true);
    ShowUsers()
      .then((res) => {
        console.log("res show users is", res.data);
        setUsers(res.data);
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
        data={users}
        deleteFunction={handleDeleteUser}
        tableHeader={tableHeader}
        type="users"
      />
    </>
  );
};

export default UsersTable;
