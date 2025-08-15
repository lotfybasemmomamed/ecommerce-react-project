import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTh,
  faBell,
  faCog,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useMenuBar } from "../../context/MenuBarContext";
import { useWindowWidth } from "../../context/WindowContext.jsx";
import { useState, useEffect, useRef } from "react";
import { logout } from "../../apis/AuthApiS.js";

function TopBar() {
  const { menuBar, setMenuBar } = useMenuBar();
  const { windowWidth } = useWindowWidth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close dropp down when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //handleLogout
  async function handleLogout() {
    try {
      await logout();
      window.location.pathname = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <header className="bg-white z-10 relative shadow-sm px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={`flex justify-between items-center ${
            menuBar ? "w-[230px]" : "w-[50px]"
          } `}
        >
          {menuBar && windowWidth > 768 && (
            <span className="text-lg font-bold text-gray-800">Dashboard</span>
          )}
          <button className="p-2 hover:bg-gray-100 rounded">
            <FontAwesomeIcon
              icon={faBars}
              className="text-gray-600"
              onClick={() => setMenuBar((prev) => !prev)}
            />
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-4 text-gray-600 text-sm">
          <span className="cursor-pointer hover:text-blue-500">Components</span>
          <span className="cursor-pointer hover:text-blue-500">Categories</span>
        </nav>
      </div>

      <div className="flex items-center gap-4 relative">
        <img
          src="https://www.svgrepo.com/show/405472/flag-for-flag-egypt.svg"
          alt="Egypt Flag"
          className="w-6 h-4 rounded-sm border"
        />

        <button className="hover:text-blue-500">
          <FontAwesomeIcon icon={faTh} />
        </button>
        <button className="hover:text-blue-500">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button className="hover:text-blue-500">
          <FontAwesomeIcon icon={faCog} />
        </button>

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-9 h-9 rounded-full"
            />
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium">Kate Dudley</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-500 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-1 z-20">
              <button
                disabled
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:enabled:bg-gray-100 disabled:text-gray-300"
              >
                Profile
              </button>
              <button
                disabled
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:enabled:bg-gray-100 disabled:text-gray-300"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
