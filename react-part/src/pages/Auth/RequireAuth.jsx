import Cookies from "universal-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../../component/Loading";
import { getUsers } from "../../apis/UsersApis";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Forbidden403 from "./Forbidden403";

function RequireAuth({ allowedRole }) {
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
             allowedRole.includes(userData.role ) ? (
              <Outlet />
            ) : (
              <Forbidden403 />
            )
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
