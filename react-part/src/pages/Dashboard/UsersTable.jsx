import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ShowUsers,deleteUser,getUsers } from "../../apis/UsersApis";
import Loading from "../../component/Loading";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteuser, setDeleteUesr] = useState(false);

//get id fot curent user
  useEffect(()=>{
    getUsers().then((data)=>{
      console.log("userData",data)
      setCurrentUserId(data.data.id)})
  },[])

  //get all users
  useEffect(() => {
    setLoading(true)
    ShowUsers().then((res) => {
      console.log("res show users is", res.data);
      setUsers(res.data);
      
    }).finally(()=>setLoading(false))
  }, [deleteuser]);

  function handleDeleteUser(id){
    deleteUser(id).then(()=>setDeleteUesr(prev=>!prev))
  }
  const usersFilter =users.filter((user)=>user.id!=currentUserId)

  return (
    <>
    
    {loading && <Loading color="green" />}
    <div className="h-full w-full p-2 sm:p-4">
      <div className="h-full overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg">
        <table className="w-full h-full text-xs sm:text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-2 py-2 sm:px-6 sm:py-3">ID</th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">Name</th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">Email</th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersFilter.length > 0 ? (
              usersFilter.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-2 py-2 sm:px-6 sm:py-4">{user.id}</td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4">{user.name}</td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4">{user.email}</td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4 flex gap-2 sm:gap-3">
                    <button
                      onClick={() => window.location.pathname=`dashboard/user/${user.id}`}
                      className="text-blue-600 hover:text-blue-800 text-xs sm:text-base"
                    >
                      <FontAwesomeIcon fontSize={"15px"} icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-800 text-xs sm:text-base"
                    >
                      <FontAwesomeIcon fontSize={"15px"} icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default UsersTable;
