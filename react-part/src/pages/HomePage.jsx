import AuthForm from './Auth/AuthForm'
import { Routes, Route } from "react-router-dom";

export default function HomePage() {

  return (
    <>
    <Routes>
      <Route path="/register" element={<AuthForm btnText="Register" titleForm="Register Now"/>}/>
      <Route path="/login" element={<AuthForm btnText="Login" titleForm="Login Now"/>}/>
    </Routes>
    </>
  )
}

