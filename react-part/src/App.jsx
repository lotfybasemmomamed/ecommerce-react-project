import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./pages/Auth/AuthForm";
import GoogleCallBack from "./pages/Auth/GoogleCallBack";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./pages/Auth/RequireAuth";
import UsersTable from './pages/Dashboard/UsersTable'
import EditUser from "./pages/Dashboard/EditUser";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<HomePage />} />
      <Route
        path="/register"
        element={<AuthForm btnText="Register" titleForm="Register Now" />}
      />
      <Route
        path="/login"
        element={<AuthForm btnText="Login" titleForm="Login Now" />}
      />
      <Route path="/auth/google/callback" element={<GoogleCallBack />} />
      {/* protected routes */}
      <Route element={<RequireAuth/>}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="users" element={<UsersTable/>} />
          <Route path="user/:id" element={<EditUser/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
