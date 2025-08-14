import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useWindowWidth } from "../../context/WindowContext.jsx";
import { useMenuBar } from "../../context/MenuBarContext";

function SideBar() {
  // const navigate = useNavigate();
  const { menuBar } = useMenuBar();
  const { windowWidth } = useWindowWidth();
  console.log("windowWidth", windowWidth);
  return (
 <aside
  className={`
    sticky top-[75px] left-0 h-screen p-4 flex flex-col bg-white shadow-xl 
    transition-all duration-300 ease-in-out
    ${
      windowWidth < 768
        ? menuBar
          ? "w-[70px] left-0"
          : "left-[-100%]"
        : menuBar
        ? "w-[250px]"
        : "w-[70px]"
    }
  `}
>
      <nav className="flex-1">
        <ul className="space-y-2 text-gray-700">
          <li className="font-semibold text-gray-400 text-xs px-2">{menuBar&&windowWidth > 768 && "Dashboard"}</li>
          <NavLink
            to="users"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded cursor-pointer hover:${!menuBar&&""}
    ${
      isActive ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100 text-gray-700"
    }`
            }
          >
            <FontAwesomeIcon icon={faUsers} /> {menuBar &&windowWidth > 768 && "Users"}
          </NavLink>

    

          <NavLink
            to="analytics"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded cursor-pointer 
    ${
      isActive ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100 text-gray-700"
    }`
            }
          >
            <FontAwesomeIcon icon={faUsers} /> {menuBar &&windowWidth > 768&& "Analytics"}
          </NavLink>
        </ul>
      </nav>
    </aside> 
  );
}

export default SideBar;
