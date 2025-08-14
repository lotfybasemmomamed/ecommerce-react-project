import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ShowUsers } from "../../apis/UsersApis";

const UsersTable = ({ onEdit, onDelete }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    ShowUsers().then((res) => {
      console.log("res show users is", res.data);
      setUsers(res.data);
    });
  }, []);
  return (
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
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-2 py-2 sm:px-6 sm:py-4">{user.id}</td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4">{user.name}</td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4">{user.email}</td>
                  <td className="px-2 py-2 sm:px-6 sm:py-4 flex gap-2 sm:gap-3">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-800 text-xs sm:text-base"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-red-600 hover:text-red-800 text-xs sm:text-base"
                    >
                      <FontAwesomeIcon icon={faTrash} />
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
  );
};

export default UsersTable;
