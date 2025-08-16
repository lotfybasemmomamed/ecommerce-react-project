import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useWindowWidth } from "../../context/WindowContext.jsx";
import { useMenuBar } from "../../context/MenuBarContext";
import { getUsers } from "../../apis/UsersApis.js";

function SideBar() {
  const { menuBar } = useMenuBar();
  const { windowWidth } = useWindowWidth();
  const [userData, setUserData] = useState({});

  //get current user
  useEffect(() => {
    getUsers().then((data) => {
      console.log("userData", data);
      setUserData(data.data);
    });
  }, []);

  return (
    <>
      {windowWidth < 768 && menuBar && (
        <div className="bg-[rgba(0,0,0,0.1)] fixed left-0 top-[70px] h-full w-full"></div>
      )}
      <aside
        className={`
     top-[75px] left-0 h-screen p-4 flex flex-col bg-white shadow-xl 
    transition-all duration-300 ease-in-out
    ${
      windowWidth < 768
        ? menuBar
          ? "w-[70px] left-0"
          : "left-[-100%] "
        : menuBar
        ? "w-[250px] "
        : "w-[70px] "
    }
    ${windowWidth < 768 ? "fixed" : "sticky"}
  `}
      >
        <nav className="flex-1">
          <ul className="space-y-2 text-gray-700">
            <li className="font-semibold text-gray-400 text-xs px-2">
              {menuBar && windowWidth > 768 && "Dashboard"}
            </li>
            {userData.role == "1995" && (
              <NavLink
                to="users"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded cursor-pointer hover:${
                    !menuBar && ""
                  }
    ${
      isActive ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100 text-gray-700"
    }`
                }
              >
                <FontAwesomeIcon icon={faUsers} />{" "}
                {menuBar && windowWidth > 768 && "Users"}
              </NavLink>
            )}

            <NavLink
              to="writer"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded cursor-pointer 
    ${
      isActive ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100 text-gray-700"
    }`
              }
            >
              <FontAwesomeIcon icon={faUsers} />{" "}
              {menuBar && windowWidth > 768 && "Writer"}
            </NavLink>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
