import Loading from "../../component/Loading";
import React, { useState } from "react";
import { register, login } from "../../apis/AuthApiS";
import { useNavigate } from "react-router-dom";

function AuthForm({ btnText,titleForm }) {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function showErrorMessage(message) {
    setMessageError(message);
    setTimeout(() => setMessageError(""), 3000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (btnText === "Register") {
        const res = await register(formData);
        // console.log("register res", res);
        navigate("/");
      } else {
        const res = await login(formData);
        // console.log("login res", res);
        navigate("/");
      }
    } catch (err) {
      showErrorMessage(err.response.data.message);
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
      <div className="min-h-screen flex items-center justify-center">
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
            className="flex flex-col items-start justify-start ps-5 sm:ps-10 w-full sm:w-[50%] h-full py-6"
          >
            <h1 className="text-3xl sm:text-4xl py-4 sm:py-6 text-green-500 font-medium">
              {titleForm}
            </h1>
            {btnText === "Register" && (
              <div className="div-input-custom w-full">
                <input
                  className="form-input-custom w-full"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <label className="label-custom">Name</label>
              </div>
            )}

            <div className="div-input-custom w-full">
              <input
                className="form-input-custom w-full"
                placeholder="Enter your e-mail"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <label className="label-custom">E-mail</label>
            </div>
            <div className="div-input-custom w-full">
              <input
                className="form-input-custom w-full"
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
            <button
              className=" bg-green-500 
  px-8 sm:px-12 md:px-20 
  mt-5 mb-[30px] py-[10px] 
  rounded 
  text-white 
  hover:bg-green-400 
  cursor-pointer 
  text-[15px]
  w-[40%] sm:w-auto"
            >
              {btnText}
            </button>
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

export default AuthForm;
