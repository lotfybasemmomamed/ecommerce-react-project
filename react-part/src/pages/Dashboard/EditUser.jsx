import { useParams } from "react-router-dom";
import AuthForm from "../../component/form/Form";
import { useEffect, useState } from "react";
import { getUserById } from "../../apis/UsersApis";

function EditUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    getUserById(id).then((data) => {
      console.log("res get user by id", data.data);
      setUserData({
        name: data.data.name,
        email: data.data.email,
        role: data.data.role,
        password: "",
      });
    });
  }, []);
  
  const { id } = useParams();

  return (
    <div className="h-full w-full">
      <AuthForm
        btnText="Update"
        titleForm="Update User Data"
        id={id}
        FormData={userData}
      />
    </div>
  );
}

export default EditUser;
