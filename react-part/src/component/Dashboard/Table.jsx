import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ShowUsers, getUsers } from "../../apis/UsersApis";

const Table = ({ data, deleteFunction, tableHeader, type }) => {
  const [currentUserData, setCurrentUserData] = useState({});
  const [showProductImages, setShowProductImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);

  //close Images Product Div
  function closeImagesProductDiv() {
    setShowProductImages(false);
  }

  //content of table
  const tableHeaderContent = tableHeader.map((item, index) => (
    <th key={index} className="px-2 py-2 sm:px-6 sm:py-3">
      {item.name}
    </th>
  ));

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
              ) : col.key === "images" && type === "products" ? (
                <>
                  <a
                    className="text-blue-600 text-sm font-medium underline 
              hover:text-blue-700 hover:cursor-pointer"
                    onClick={() => {
                      setShowProductImages((prev) => !prev);
                      setSelectedImages(row[col.key]);
                    }}
                  >
                    Show Images
                  </a>
                  {showProductImages && (
                    <ProductImages
                      images={selectedImages}
                      onClose={closeImagesProductDiv}
                    />
                  )}
                </>
              ) : (
                row[col.key]
              )}
            </td>
          ))}

          <td className="px-2 py-2 sm:px-6 sm:py-4 flex gap-2 sm:gap-3">
            <button
              disabled={row.id === currentUserData?.id && type === "users"}
              onClick={() => {
                if (type === "users") {
                  if (row.id !== currentUserData?.id) {
                    window.location.pathname = `dashboard/user/${currentUserData.id}`;
                  }
                } else if (type === "categories") {
                  window.location.pathname = `dashboard/category/${row.id}`;
                } else if (type === "products") {
                  window.location.pathname = `dashboard/product/${row.id}`;
                }
              }}
              className="text-blue-600 disabled:text-gray-300 hover:enabled:text-blue-800 text-xs sm:text-base"
            >
              <FontAwesomeIcon fontSize={"15px"} icon={faEdit} />
            </button>
            <button
              onClick={() =>
                type === "users"
                  ? deleteFunction(row.id, currentUserData?.id)
                  : deleteFunction(row.id)
              }
              disabled={row.id === currentUserData?.id && type === "users"}
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
          {type === "users"
            ? "No users found"
            : type === "categories"
            ? "No categories found"
            : "No products found"}
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

  return (
    <>
      <div className="h-full w-full p-2 sm:p-4">
        <div className="flex justify-end mb-2">
          <button
            onClick={() =>
              (window.location.pathname = `dashboard/${
                type === "users"
                  ? "user"
                  : type === "categories"
                  ? "category"
                  : "product"
              }/add`)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} className="text-lg" />
            <span className="hidden sm:inline">
              {type === "users"
                ? "Add User"
                : type === "categories"
                ? "Add Category"
                : "Add Product"}
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

function ProductImages({ images, onClose }) {
  const [showProductImages, setShowProductImages] = useState(true);
  console.log(images);
  return (
    <>
      {showProductImages && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-lg">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Product Images
            </h2>
            <>
              {images.length > 0 ? (
                <div className="flex gap-2 flex-wrap justify-center mb-4">
                  <>
                    {images.map((imgDetails, index) => (
                      <img
                        key={index}
                        src={imgDetails.image}
                        alt={`product-${index}`}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md border"
                      />
                    ))}
                  </>
                </div>
              ) : (
                <span className="flex justify-center text-2xl">
                  No Images
                </span>
              )}
            </>

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Table;
