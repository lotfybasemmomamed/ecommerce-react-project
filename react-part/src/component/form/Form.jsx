import Loading from "../Dashboard/Loading";
import React, { useState, useEffect } from "react";
import { register, login } from "../../apis/AuthApiS";
import { useNavigate } from "react-router-dom";
import { editUserData,addUser } from "../../apis/UsersApis";
import Cookies from "universal-cookie";
import "./Form.css";

function Form({
  btnText,
  titleForm,
  id = "",
  FormData = {
    name: "",
    email: "",
    password: "",
  },
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(FormData);
  const [messageError, setMessageError] = useState("");
  
  const disabled =
    (formData.password == "" && formData.name == "") || formData.email == "";

  const navigate = useNavigate();
  const cookie = new Cookies();

  useEffect(() => {
    if (id != "") {
      setFormData(FormData);
    }
  }, [FormData]);

  //function for show error
  function showErrorMessage(message) {
    setMessageError(message);
    setTimeout(() => setMessageError(""), 3000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //validation
    if (
      formData.name === "" &&
      (btnText === "Register" || btnText === "Update")
    ) {
      showErrorMessage("please enter your name");
      return;
    } else if (formData.email === "") {
      showErrorMessage("please enter your E-mail");
      return;
    } else if (
      formData.password.length < 8 &&
      (btnText === "Register" || btnText === "Login")
    ) {
      showErrorMessage(
        "pasword very shortly, enter password more than 8 characters"
      );
      return;
    }
    setLoading(true);

    try {
      if (btnText === "Register") {
        const res = await register(formData);
        console.log("register res", res);
        cookie.set("Bearer", res.data.token);
        const goToPage =res.data.user.role=="1995"?"/dashboard":res.data.user.role=="1996"?"/dashboard/writer":"/"
        navigate(goToPage);
      } else if (btnText === "Login") {
        const res = await login(formData);
        console.log("login res", res);
        cookie.set("Bearer", res.data.token);
        const goToPage =res.data.user.role=="1995"?"/dashboard":res.data.user.role=="1996"?"/dashboard/writer":"/"
        navigate(goToPage);
      } else if (btnText === "Add") {
       await addUser(formData);
        
        navigate("/dashboard/users");
      } else {
        editUserData(id, formData).then((res) =>
          console.log("res edit user data", res)
        );
        navigate("/dashboard/users");
      }
    } catch (err) {
      showErrorMessage(err.response.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <Loading color="green" />
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center container">
        <div
          className="
          w-[90%] sm:w-[80%] 
          h-auto sm:h-[80vh] 
          shadow-[0_4px_20px_rgba(0,0,0,0.3)] 
          rounded 
          flex flex-col sm:flex-row
          bg-white 
          sm:bg-[linear-gradient(110deg,rgba(255,255,255,1)_50%,rgba(255,255,255,0)_50%),url('/assets/register-background.jpg')]
          sm:bg-cover sm:bg-center sm:bg-no-repeat
        "
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-start ps-5 sm:ps-10 w-full sm:w-[40%] h-full py-6"
          >
            <h1 className="text-3xl sm:text-4xl py-4 sm:py-6 text-green-500 font-medium">
              {titleForm}
            </h1>
            {btnText === "Register" ||
            btnText === "Update" ||
            btnText === "Add" ? (
              <div className="div-input-custom w-full">
                <input
                  className="form-input-custom w-full"
                  placeholder="Enter your name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <label className="label-custom">Name</label>
              </div>
            ) : (
              ""
            )}

            <div className="div-input-custom w-full">
              <input
                className="form-input-custom w-full"
                placeholder="Enter your e-mail"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <label className="label-custom">E-mail</label>
            </div>
            {btnText != "Update" && (
              <div className="div-input-custom w-full">
                <input
                  className="form-input-custom w-full"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  minLength={8}
                />
                <label className="label-custom">Password</label>
              </div>
            )}
            {(btnText === "Update" ||
              btnText === "Add" )&& (
                <div className="div-input-custom w-full">
                  <select
                    className="form-input-custom w-full"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    <option value="1995">Admin</option>
                    <option value="2001">User</option>
                    <option value="1996">Writer</option>
                    <option value="1999">Product Manager</option>
                  </select>
                  <label className="label-custom">Role</label>
                </div>
              )}

            <button
              type="submit"
              disabled={disabled}
              className="
                bg-green-500 
                px-8 sm:px-12 md:px-20 
                mt-5 mb-[30px] py-[10px] 
                rounded 
                text-white 
                text-[15px]
                w-[40%] sm:w-auto
                transition
                hover:bg-green-400 
                cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:disabled:bg-green-500
              "
            >
              {btnText}
            </button>

            {(btnText == "Login" ||
              btnText == "Register") && (
                <a href="http://127.0.0.1:8000/login-google">
                  <button type="button" className="login-with-google-btn">
                    {btnText === "Register"
                      ? "Register With Google"
                      : "Login With Google"}
                  </button>
                </a>
              )}

            {messageError && <MessageError message={messageError} />}
          </form>
        </div>
      </div>
    </>
  );
}

function MessageError({ message }) {
  return (
    <div>
      <span
        className=" bg-red-300 
  px-8 sm:px-4 md:px-14 
  mt-5 mb-[30px] py-[10px] 
  rounded 
  text-white 
  hover:bg-green-400 
  cursor-pointer 
  text-[15px]
  w-[40%] sm:w-auto"
      >
        {message}
      </span>
    </div>
  );
}

export default Form;
