import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTh, faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import {useMenuBar} from '../../context/MenuBarContext'
import { useWindowWidth } from "../../context/WindowContext.jsx";


function TopBar() {
  const { menuBar, setMenuBar }=useMenuBar()
  const { windowWidth } = useWindowWidth();
  // console.log("menuBar",menuBar)
  return (
    <header className="bg-white z-10 relative shadow-sm px-4 py-4 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className={`flex justify-between items-center ${menuBar?"w-[230px]":"w-[50px]"} `}>
        {menuBar&&windowWidth > 768&&<span className="text-lg font-bold text-gray-800">Dashboard</span>}  
          <button className="p-2 hover:bg-gray-100 rounded">
            <FontAwesomeIcon icon={faBars} className="text-gray-600" onClick={() => setMenuBar(prev => !prev)} />
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-4 text-gray-600 text-sm">
          <span className="cursor-pointer hover:text-blue-500">Components</span>
          <span className="cursor-pointer hover:text-blue-500">Categories</span>
        </nav>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Flag as image */}
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

        {/* User */}
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-9 h-9 rounded-full"
          />
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-medium">Kate Dudley</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
