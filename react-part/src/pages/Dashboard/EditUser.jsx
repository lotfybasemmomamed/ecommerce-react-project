import { useParams } from "react-router-dom";
import AuthForm from "../../component/form/Form";
import { useEffect, useState } from "react";
import { getUserById } from "../../apis/UsersApis";
import Loading from "../../component/Loading";

function EditUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const[loading,setLoading]=useState(false)
  useEffect(() => {
    setLoading(true)
    getUserById(id).then((data) => {
      console.log("res get user by id", data.data);
      setUserData({
        name: data.data.name,
        email: data.data.email,
        role: data.data.role,
        password: "",
      });
    }).catch(()=>{window.location.pathname="/dashboard/page/404"}).finally(()=>setLoading(false));
  }, []);
  
  const { id } = useParams();

  return (
    <>{loading&&<Loading color="green"/>}
       <div className="h-full w-full">
      <AuthForm
        btnText="Update"
        titleForm="Update User Data"
        id={id}
        FormData={userData}
      />
    </div>
    </>
 
  );
}

export default EditUser;
