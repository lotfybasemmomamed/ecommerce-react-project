import HomePage from "./pages/website/HomePage";
import { Routes, Route } from "react-router-dom";
import Form from "./component/form/Form";
import GoogleCallBack from "./pages/Auth/GoogleCallBack";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./pages/Auth/RequireAuth";
import UsersTable from "./pages/Dashboard/users/UsersTable";
import EditUser from "./pages/Dashboard/users/EditUser";
import AddUser from "./pages/Dashboard/users/AddUser";
import Writer from "./pages/Dashboard/Writer";
import RequireBack from "./pages/Auth/RequireBack";
import Error404 from "./pages/Auth/Error404";
import CategoriesTable from "./pages/Dashboard/categories/CategoriesTable";
import EditCatogery from "./pages/Dashboard/categories/EditCatogery";
import AddCategory from "./pages/Dashboard/categories/AddCategory";
import ProductsTable from "./pages/Dashboard/products/ProductsTable";
import EditProduct from "./pages/Dashboard/products/EditProduct";
import AddProduct from "./pages/Dashboard/products/AddProduct";
import Website from "./pages/website/Website";
import CategoriesPage from "./pages/website/CategoriesPage";
import ProductPage from "./pages/website/ProductPage";
import Cart from "./pages/website/Cart";
import CheckOut from "./pages/website/CheckOut";
function App() {
  return (
    <Routes>
      {/* public routes */}

      <Route path="/*" element={<Error404 />} />
      <Route element={<RequireBack />}>
        <Route
          path="/register"
          element={<Form btnText="Register" titleForm="Register Now" />}
        />
        <Route
          path="/login"
          element={<Form btnText="Login" titleForm="Login Now" />}
        />
      </Route>
      <Route path="/auth/google/callback" element={<GoogleCallBack />} />
      {/* website */}
      <Route path="/" element={<Website />}>
        <Route path="/" element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
      {/* protected routes */}
      <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
            {/* users */}
            <Route path="users" element={<UsersTable />} />
            <Route path="user/:id" element={<EditUser />} />
            <Route path="user/add" element={<AddUser />} />
            {/* categories */}
            <Route path="categories" element={<CategoriesTable />} />
            <Route path="category/:id" element={<EditCatogery />} />
            <Route path="category/add" element={<AddCategory />} />
            {/* products */}
            <Route path="products" element={<ProductsTable />} />
            <Route path="product/:id" element={<EditProduct />} />
            <Route path="product/add" element={<AddProduct />} />
          </Route>
          <Route
            element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}
          >
            <Route path="writer" element={<Writer />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
