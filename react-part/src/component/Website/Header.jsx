import React, { useEffect, useState } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Plus,
  MapPin,
} from "lucide-react";
import { getCategories } from "../../apis/categoriesApis";
import truncateText from "../../helpers/truncateText";
import CartDropdown from "./CartDropdown";
import Cookies from "universal-cookie";
import { getUsers } from "../../apis/UsersApis";
import { getProductsCart } from "../../apis/cartApis";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [numberProductsCart, setNumberProductsCart] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileSection = (section) => {
    setExpandedMobileSection(
      expandedMobileSection === section ? null : section
    );
  };
  const categoryLinks = categoriesList.map((category) => (
    <a
      key={category.id}
      href="#"
      className="text-sm text-gray-700 hover:text-blue-600"
    >
      {truncateText(category.title, 10)}
    </a>
  ));

  //get role name
  function getRoleName(role) {
    switch (role) {
      case "1995":
        return "admin";
      case "1996":
        return "writer";
      case "1999":
        return "Product Manager";
      default:
        return "user";
    }
  }

  //get number of products cart
  useEffect(()=>{
    getProductsCart().then((res)=>{
      const productCart= res.data
      setNumberProductsCart(productCart.length)
    }
    )
  },[])

  //get categories
  useEffect(() => {
    getCategories().then((res) => {
      setCategoriesList(res.data);
      console.log("categories List is ", categoriesList, res);
    });
  }, []);
  //get user
  useEffect(() => {
    if (token) {
      getUsers().then((res) => {
        setUserDetails(res.data);
        console.log("getUsers res", res);
      });
    }
  }, []);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-[100]">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div  className="cursor-pointer flex items-center flex-shrink-0" onClick={()=>window.location.pathname="/"}>
              <div className="flex items-center space-x-2" >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="text-white text-sm font-bold">B</div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-blue-600 font-bold text-lg">Blue</div>
                  <div className="text-gray-800 font-bold text-lg -mt-1">
                    Circuit
                  </div>
                </div>
              </div>
            </div>

            {/* Category Dropdown & Search */}
            <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-8">
              <div className="relative">
                <select className=" bg-white border border-gray-300 rounded-l-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8">
                  <option disabled selected >Select category</option>
                  {categoriesList.map((cat)=>(<option> {truncateText(cat.title,9)}</option>))}

                  
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2.5 border-t border-b border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-r-lg hover:bg-blue-700 transition-colors">
                <Search size={18} />
              </button>
            </div>

            {/* Right Side Icons  */}
            <div className="hidden lg:flex items-center space-x-6 flex-shrink-0">
              <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
                {token ? (
                  <User size={24} className="text-green-600" />
                ) : (
                  <User size={24} />
                )}
                <div className="text-sm">
                  {token ? (
                    getRoleName(userDetails.role)
                  ) : (
                    <div className="text-gray-500">Account</div>
                  )}
                  {token ? (
                    <div className="font-semibold">{userDetails.name}</div>
                  ) : (
                    <div
                      onClick={(window.location.pathname = "/login")}
                      className="font-semibold cursor-pointer hover:text-blue-500"
                    >
                      Login
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors relative">
                <Heart size={20} />
                <div className="text-sm">
                  <div className="text-gray-500 hover:text-blue-600">3 Items</div>
                  <div className="font-semibold">Wishlist</div>
                </div>
              </div>

              <div className="relative group flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors">
                <ShoppingCart size={20} />
                <div className="text-sm hover:text-blue-600">
                  <div className="text-gray-500 hover:text-blue-600">{numberProductsCart} Items</div>
                  <div className="font-semibold">Cart</div>
                </div>
                {/* card model */}
                <div className="hidden group-hover:block ">
                  <CartDropdown />
                </div>
                {/* end card model */}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <div className="hidden lg:block bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <nav className="flex items-center space-x-8">
              <a
                onClick={() => (window.location.pathname = "/")}
                className="flex cursor-pointer items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4 ">
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                  <div className="w-1.5 h-1.5 bg-current"></div>
                </div>
                <span>Home</span>
              </a>

              {/* category icon */}
              <div className="relative group">
                <button
                  onClick={() => (window.location.pathname = "/categories")}
                  className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown size={16} />
                </button>

                <div className="hidden group-hover:block absolute top-full left-0 pt-2 z-50">
                  <div className="bg-white mt-2 border border-gray-200 rounded-lg shadow-lg px-6 py-4">
                    <div className="grid grid-cols-8 gap-x-4 gap-y-2 w-[800px]">
                      {categoryLinks}
                    </div>
                  </div>
                </div>
              </div>
              {/* end category */}

              <div className="relative">
                <button
                  onClick={() => toggleDropdown("products")}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>Products</span>
                  <ChevronDown size={16} />
                </button>
                {activeDropdown === "products" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All Products
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Featured
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      New Arrivals
                    </a>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => toggleDropdown("pages")}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>Pages</span>
                  <ChevronDown size={16} />
                </button>
                {activeDropdown === "pages" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      About Us
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Contact
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      FAQ
                    </a>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => toggleDropdown("blog")}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>Blog</span>
                  <ChevronDown size={16} />
                </button>
                {activeDropdown === "blog" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Latest Posts
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Electronics
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Laptops&PC
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Heart size={16} />
                <span>Offers</span>
              </a>
            </nav>

            <div className="flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200 transition">
              <MapPin size={16} className="text-gray-500" />
              <select>
                <option selected disabled>Select Location</option>
                <option>Cairo</option>
                <option>Mansoura</option>
                <option>Alexandria</option>
              </select>
  
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden bg-gray-50 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select className="bg-white border border-gray-300 rounded-l-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8">
            {categoriesList.map((cat)=>(<option> {truncateText(cat.title,9)}</option>))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Side Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform overflow-y-auto">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">My Menu</h3>
              <button
                onClick={toggleMobileMenu}
                className="p-1 text-red-500 hover:text-red-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {/* Home */}
              <a
                href="#"
                onClick={() => (window.location.pathname = "/")}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
              >
                <span className="text-sm">Home</span>
              </a>

              {/* Categories */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleMobileSection("categories")}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm">Categories</span>
                  <Plus
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      expandedMobileSection === "categories" ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {expandedMobileSection === "categories" && (
                  <div className="bg-gray-50 border-t border-gray-100 p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {categoryLinks}
                    </div>
                  </div>
                )}
              </div>

              {/* Products */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleMobileSection("products")}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm">Products</span>
                  <Plus
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      expandedMobileSection === "products" ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {expandedMobileSection === "products" && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    <a
                      href="#"
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white"
                    >
                      All Products
                    </a>
                    <a
                      href="#"
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white"
                    >
                      Featured
                    </a>
                    <a
                      href="#"
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white"
                    >
                      New Arrivals
                    </a>
                  </div>
                )}
              </div>

              {/* Pages */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleMobileSection("pages")}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm">Pages</span>
                  <Plus
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      expandedMobileSection === "pages" ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {expandedMobileSection === "pages" && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    <a
                      href="#"
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white"
                    >
                      About Us
                    </a>
                    <a
                      href="#"
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white"
                    >
                      Contact
                    </a>
                    <a
                      href="#"
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white"
                    >
                      FAQ
                    </a>
                  </div>
                )}
              </div>

              {/* Blog */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleMobileSection("blog")}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm">Blog</span>
                  <Plus
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      expandedMobileSection === "blog" ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {expandedMobileSection === "blog" && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    <a
                      href="#"
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white"
                    >
                      Latest Posts
                    </a>
                    <a
                      href="#"
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white"
                    >
                      Electronics
                    </a>
                    <a
                      href="#"
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white"
                    >
                      Laptops&PC
                    </a>
                  </div>
                )}
              </div>

              {/* Offers */}
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
              >
                <span className="text-sm">Offers</span>
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="px-4 py-6">
              <div className="flex justify-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition-colors">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-500 transition-colors">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-pink-600 transition-colors">
                  <span className="text-sm font-bold">ig</span>
                </div>
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-800 transition-colors">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
