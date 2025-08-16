import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Form from "./component/form/Form";
import GoogleCallBack from "./pages/Auth/GoogleCallBack";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./pages/Auth/RequireAuth";
import UsersTable from "./pages/Dashboard/UsersTable";
import EditUser from "./pages/Dashboard/EditUser";
import AddUser from "./pages/Dashboard/AddUser";
import Writer from "./pages/Dashboard/Writer";
// import Forbidden403 from "./pages/Auth/Forbidden403";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<HomePage />} />
      <Route
        path="/register"
        element={<Form btnText="Register" titleForm="Register Now" />}
      />
      <Route
        path="/login"
        element={<Form btnText="Login" titleForm="Login Now" />}
      />
      <Route path="/auth/google/callback" element={<GoogleCallBack />} />
      {/* <Route path="/403" element={<Forbidden403 />} /> */}

      {/* protected routes */}
      <Route element={<RequireAuth allowedRole={["1995", "1996"]} />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route element={<RequireAuth allowedRole={["1995"]} />}>
            <Route path="users" element={<UsersTable />} />
            <Route path="user/:id" element={<EditUser />} />
            <Route path="user/add" element={<AddUser />} />
          </Route>
          <Route element={<RequireAuth allowedRole={["1996","1995"]} />}>
          <Route path="writer" element={<Writer />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
