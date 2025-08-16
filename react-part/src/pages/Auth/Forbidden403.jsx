import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../apis/UsersApis";

export default function Forbidden403() {
  const [userData, setUserData] = useState({});
  //get current user data
  useEffect(() => {
    getUsers().then((data) => {
      console.log("userData", data);
      setUserData(data.data);
    });
  }, []);
  return (
    <div className="sm:w-[100%] w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 md:p-16 w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold text-red-600 mb-4">
          403
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-gray-800">
          Access Forbidden
        </h2>
        <p className="text-gray-600 mb-8 text-sm sm:text-base md:text-lg">
          Sorry, you don’t have permission to access this page. Please return to
          the homepage or contact the administrator if you believe this is a
          mistake.
        </p>

        <Link
          to={
            userData.role == "1996" ? "/dashboard/writer" : "/"
          }
          className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white text-base sm:text-lg font-medium rounded-xl shadow hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          {userData.role == "1996" ? "Back to Writer Page" : "Back to Homepage"}
        </Link>
      </div>
    </div>
  );
}
