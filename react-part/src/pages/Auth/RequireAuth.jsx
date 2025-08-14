import Cookies from "universal-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../../component/Loading";
import { getUsers } from "../../apis/UsersApis";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RequireAuth() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((data) => setUserData(data.data))
      .catch(() => navigate("/login"));
    console.log("user data", userData);
  }, []);
  return (
    <div>
      <>
        {token ? (
          userData ? (
            <Outlet />
          ) : (
            <Loading color="green" />
          )
        ) : (
          <Navigate to="login" replace={true} />
        )}
      </>
    </div>
  );
}

export default RequireAuth;
