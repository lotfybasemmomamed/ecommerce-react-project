import { useEffect } from "react";
import AuthForm from "./Auth/AuthForm";
import { Routes, Route } from "react-router-dom";
import { ShowUsers } from "../apis/UsersApis";
import { logout } from "../apis/AuthApiS";

export default function HomePage() {
  useEffect(() => {
    ShowUsers().then((data) => console.log(data));
  }, []);

  async function handleLogout() {
    try {
      const res = await logout();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route
          path="/register"
          element={<AuthForm btnText="Register" titleForm="Register Now" />}
        />
        <Route
          path="/login"
          element={<AuthForm btnText="Login" titleForm="Login Now" />}
        />
      </Routes>
    </>
  );
}
