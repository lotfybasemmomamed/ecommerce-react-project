import HomePage from './pages/HomePage'
import { Routes, Route } from "react-router-dom";
import AuthForm from "./pages/Auth/AuthForm";
import GoogleCallBack from "./pages/Auth/GoogleCallBack";



function App() {

  return (
  <Routes>
    {/* website routes */}
        <Route
          path="/"
          element={<HomePage/>}
        />
        <Route
          path="/register"
          element={<AuthForm btnText="Register" titleForm="Register Now" />}
        />
        <Route
          path="/login"
          element={<AuthForm btnText="Login" titleForm="Login Now" />}
        />
        <Route
          path="/auth/google/callback"
          element={<GoogleCallBack />}
        />
        {/*end website routes */}
      </Routes>                  
  )
}

export default App
