import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ShowUsers, getUsers } from "../../apis/UsersApis";

const Table = ({ data, deleteFunction, tableHeader, type }) => {
  const [currentUserData, setCurrentUserData] = useState({});

  //content of table
  const tableHeaderContent = tableHeader.map((item, index) => (
    <th key={index} className="px-2 py-2 sm:px-6 sm:py-3">
      {item.name}
    </th>
  ));
  // const tableBodyContent =   data.length > 0 ? (
  //   tableHeader.map((user.key)=> data.map((user) => (
  //                 <tr
  //                   key={user.id}
  //                   className="bg-white border-b hover:bg-gray-50"
  //                 >
  //                   <td className="px-2 py-2 sm:px-6 sm:py-4">{user.id}</td>
  //                   <td className="px-2 py-2 sm:px-6 sm:py-4">
  //                     {user.id === currentUserData.id
  //                       ? `${user.name} (you)`
  //                       : user.name}
  //                   </td>
  //                   <td className="px-2 py-2 sm:px-6 sm:py-4">{user.email}</td>
  //                   <td className="px-2 py-2 sm:px-6 sm:py-4">
  //                     {user.role == "1995"
  //                       ? "admin"
  //                       : user.role == "2001"
  //                       ? "user"
  //                       : user.role == "1999"?"product manager":"user"}
  //                   </td>
  //                   <td className="px-2 py-2 sm:px-6 sm:py-4 flex gap-2 sm:gap-3">
  //                     <button
  //                       disabled={user.id === currentUserData.id}
  //                       onClick={() => {
  //                         if (user.id !== currentUserData.id) {
  //                           window.location.pathname = `dashboard/user/${user.id}`;
  //                         }
  //                       }}
  //                       className="text-blue-600 disabled:text-gray-300 hover:enabled:text-blue-800 text-xs sm:text-base"
  //                     >
  //                       <FontAwesomeIcon fontSize={"15px"} icon={faEdit} />
  //                     </button>
  //                     <button
  //                       onClick={() =>
  //                         deleteFunction(user.id, currentUserData.id)
  //                       }
  //                       className="text-red-600 disabled:text-gray-300 hover:enabled:text-red-800 text-xs sm:text-base"
  //                       disabled={user.id === currentUserData.id}
  //                     >
  //                       <FontAwesomeIcon fontSize={"15px"} icon={faTrash} />
  //                     </button>
  //                   </td>
  //                 </tr>
  //               ))
  //             ) : (
  //               <tr>
  //                 <td colSpan="4" className="text-center py-4 text-gray-500">
  //                   No users found
  //                 </td>
  //               </tr>
  //             ))

  const tableBodyContent =
    data.length > 0 ? (
      data.map((row) => (
        <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
          {tableHeader.map((col) => (
            <td key={col.key} className="px-2 py-2 sm:px-6 sm:py-4">
              {col.key == "image" && type === "categories" ? (
                <img
                  src={row[col.key]}
                  alt={row.title}
                  className="w-12 h-12 object-cover rounded-md"
                />
              ) : col.key === "name" &&
                row.id === currentUserData?.id &&
                type == "users" ? (
                `${row[col.key]} (you)`
              ) : (
                row[col.key]
              )}
            </td>
          ))}

          <td className="px-2 py-2 sm:px-6 sm:py-4 flex gap-2 sm:gap-3">
            <button
              disabled={row.id === currentUserData?.id&&type === "users"}
              onClick={() => {
                if (type === "users") {
                  if (row.id !== currentUserData?.id) {
                    window.location.pathname=`dashboard/user/${currentUserData.id}`
                  }
                } else if (type === "categories") {
                  window.location.pathname = `dashboard/category/${row.id}`;
                }
              }}
              className="text-blue-600 disabled:text-gray-300 hover:enabled:text-blue-800 text-xs sm:text-base"
            >
              <FontAwesomeIcon fontSize={"15px"} icon={faEdit} />
            </button>
            <button
              onClick={() => type==="users"? deleteFunction(row.id, currentUserData?.id):deleteFunction(row.id)}
              disabled={row.id === currentUserData?.id&&type === "users"}
              className="text-red-600 disabled:text-gray-300 hover:enabled:text-red-800 text-xs sm:text-base"
            >
              <FontAwesomeIcon fontSize={"15px"} icon={faTrash} />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          colSpan={tableHeader.length + 1}
          className="text-center py-4 text-gray-500"
        >
          {type === "users" ? "No users found" : "No categories found"}
        </td>
      </tr>
    );

  //get current user Data
  useEffect(() => {
    getUsers().then((data) => {
      console.log("userData From USRTTABLE", data.data);
      setCurrentUserData(data.data);
    });
  }, []);

  // const usersFilter = users.filter((user) => user.id != currentUserId);

  return (
    <>
      <div className="h-full w-full p-2 sm:p-4">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => (window.location.pathname = `dashboard/${type==="users"?"user":"category"}/add`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} className="text-lg" />
            <span className="hidden sm:inline">
              {type === "users" ? "Add User" : "Add Category"}
            </span>
          </button>
        </div>

        <div className="h-full overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg">
          <table className="w-full h-full text-xs sm:text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                {tableHeaderContent}
                <th className="px-2 py-2 sm:px-6 sm:py-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>{tableBodyContent}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
